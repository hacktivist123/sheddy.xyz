const RAINDROP_API_BASE = "https://api.raindrop.io/rest/v1";
const RAINDROP_PER_PAGE = 50;
const requestCache = new Map<string, Promise<unknown>>();
const collectionsCache = new Map<string, Promise<RaindropCollection[]>>();
const configuredCollectionsCache = new Map<
	string,
	Promise<BookmarkCollectionSummary[]>
>();
const bookmarkItemsCache = new Map<string, Promise<BookmarkItem[]>>();

export interface BookmarkCollectionConfig {
	id: number;
	slug: string;
	title?: string;
	description?: string;
	accent?: string;
}

export interface RaindropCollection {
	id: number;
	title: string;
	count: number;
	color?: string;
	cover?: string;
	created?: string;
	parentId?: number;
	public: boolean;
	sort: number;
	view?: string;
}

export interface BookmarkCollectionSummary extends BookmarkCollectionConfig {
	title: string;
	description: string;
	count: number;
	cover?: string;
	color?: string;
	public: boolean;
	view?: string;
}

export interface BookmarkItem {
	id: number;
	title: string;
	link: string;
	excerpt?: string;
	note?: string;
	cover?: string;
	domain?: string;
	type?: string;
	created?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function getString(value: unknown): string | undefined {
	return typeof value === "string" && value.trim().length > 0
		? value
		: undefined;
}

function getNumber(value: unknown): number | undefined {
	return typeof value === "number" && Number.isFinite(value)
		? value
		: undefined;
}

function getBoolean(value: unknown): boolean {
	return value === true;
}

function getFirstString(values: unknown): string | undefined {
	if (!Array.isArray(values)) {
		return undefined;
	}

	return values.find(
		(value): value is string => typeof value === "string" && value.length > 0,
	);
}

function getNestedNumber(
	record: Record<string, unknown>,
	key: string,
): number | undefined {
	const nested = record[key];

	if (!isRecord(nested)) {
		return undefined;
	}

	return getNumber(nested.$id);
}

function parseCollection(value: unknown): RaindropCollection | null {
	if (!isRecord(value)) {
		return null;
	}

	const id = getNumber(value._id);
	const title = getString(value.title);

	if (id === undefined || title === undefined) {
		return null;
	}

	return {
		id,
		title,
		count: getNumber(value.count) ?? 0,
		color: getString(value.color),
		cover: getFirstString(value.cover),
		created: getString(value.created),
		parentId: getNestedNumber(value, "parent"),
		public: getBoolean(value.public),
		sort: getNumber(value.sort) ?? 0,
		view: getString(value.view),
	};
}

function parseBookmarkItem(value: unknown): BookmarkItem | null {
	if (!isRecord(value)) {
		return null;
	}

	const id = getNumber(value._id);
	const title = getString(value.title);
	const link = getString(value.link);

	if (id === undefined || title === undefined || link === undefined) {
		return null;
	}

	let cover = getString(value.cover);

	if (cover === undefined && Array.isArray(value.media)) {
		cover = value.media
			.map((entry) => (isRecord(entry) ? getString(entry.link) : undefined))
			.find((entry): entry is string => entry !== undefined);
	}

	return {
		id,
		title,
		link,
		excerpt: getString(value.excerpt),
		note: getString(value.note),
		cover,
		domain: getString(value.domain),
		type: getString(value.type),
		created: getString(value.created),
	};
}

function readItemsArray(payload: unknown): unknown[] {
	if (!isRecord(payload)) {
		return [];
	}

	if (Array.isArray(payload.items)) {
		return payload.items;
	}

	if (!isRecord(payload.items)) {
		return [];
	}

	if (Array.isArray(payload.items.collections)) {
		return payload.items.collections;
	}

	if (Array.isArray(payload.items.items)) {
		return payload.items.items;
	}

	return [];
}

function getRaindropToken(): string | undefined {
	const token = import.meta.env.RAINDROP_ACCESS_TOKEN;
	return typeof token === "string" && token.trim().length > 0
		? token.trim()
		: undefined;
}

function createRaindropUrl(path: string, searchParams?: URLSearchParams): URL {
	const url = new URL(path, `${RAINDROP_API_BASE}/`);

	if (searchParams !== undefined) {
		url.search = searchParams.toString();
	}

	return url;
}

function createCacheKey(prefix: string, value: string): string {
	const token = getRaindropToken() ?? "";
	return `${prefix}:${token}:${value}`;
}

function getConfigCacheKey(configs: BookmarkCollectionConfig[]): string {
	return configs
		.map((config) =>
			[
				config.id,
				config.slug,
				config.title ?? "",
				config.description ?? "",
				config.accent ?? "",
			].join("|"),
		)
		.join(";");
}

function getOrSetCache<T>(
	cache: Map<string, Promise<T>>,
	key: string,
	loader: () => Promise<T>,
): Promise<T> {
	const cached = cache.get(key);

	if (cached !== undefined) {
		return cached;
	}

	const pending = loader().catch((error) => {
		cache.delete(key);
		throw error;
	});

	cache.set(key, pending);
	return pending;
}

async function raindropFetch(
	path: string,
	searchParams?: URLSearchParams,
): Promise<unknown> {
	const requestCacheKey = createCacheKey(
		"request",
		searchParams === undefined ? path : `${path}?${searchParams.toString()}`,
	);

	return getOrSetCache(requestCache, requestCacheKey, async () => {
		const token = getRaindropToken();

		if (token === undefined) {
			throw new Error("Missing RAINDROP_ACCESS_TOKEN");
		}

		const response = await fetch(createRaindropUrl(path, searchParams), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(
				`Raindrop API request failed with status ${response.status}`,
			);
		}

		return response.json();
	});
}

export function hasRaindropToken(): boolean {
	return getRaindropToken() !== undefined;
}

export async function getRaindropCollections(): Promise<RaindropCollection[]> {
	return getOrSetCache(
		collectionsCache,
		createCacheKey("collections", "all"),
		async () => {
			const [rootPayload, nestedPayload] = await Promise.all([
				raindropFetch("collections"),
				raindropFetch("collections/childrens"),
			]);

			const collections = [
				...readItemsArray(rootPayload),
				...readItemsArray(nestedPayload),
			]
				.map(parseCollection)
				.filter(
					(collection): collection is RaindropCollection => collection !== null,
				);

			const uniqueCollections = new Map<number, RaindropCollection>();

			for (const collection of collections) {
				uniqueCollections.set(collection.id, collection);
			}

			return [...uniqueCollections.values()];
		},
	);
}

export async function getCollectionBookmarks(
	collectionId: number,
): Promise<BookmarkItem[]> {
	return getOrSetCache(
		bookmarkItemsCache,
		createCacheKey("bookmarks", String(collectionId)),
		async () => {
			const items: BookmarkItem[] = [];
			let page = 0;

			while (true) {
				const payload = await raindropFetch(
					`raindrops/${collectionId}`,
					new URLSearchParams({
						page: String(page),
						perpage: String(RAINDROP_PER_PAGE),
					}),
				);

				const batch = readItemsArray(payload)
					.map(parseBookmarkItem)
					.filter((item): item is BookmarkItem => item !== null);

				items.push(...batch);

				if (batch.length < RAINDROP_PER_PAGE) {
					break;
				}

				page += 1;
			}

			return items;
		},
	);
}

export async function getConfiguredCollections(
	configs: BookmarkCollectionConfig[],
): Promise<BookmarkCollectionSummary[]> {
	if (configs.length === 0) {
		return [];
	}

	return getOrSetCache(
		configuredCollectionsCache,
		createCacheKey("configured", getConfigCacheKey(configs)),
		async () => {
			const collections = await getRaindropCollections();
			const collectionsById = new Map(
				collections.map((collection) => [collection.id, collection]),
			);

			return configs.flatMap((config) => {
				const collection = collectionsById.get(config.id);

				if (collection === undefined) {
					return [];
				}

				return [
					{
						...config,
						title: config.title ?? collection.title,
						description:
							config.description ??
							`Browse ${collection.count} saved link${collection.count === 1 ? "" : "s"}.`,
						count: collection.count,
						cover: collection.cover,
						color: config.accent ?? collection.color,
						public: collection.public,
						view: collection.view,
					},
				];
			});
		},
	);
}
