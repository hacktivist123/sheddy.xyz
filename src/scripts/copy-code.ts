const codeBlocks = Array.from(document.querySelectorAll("pre"));

const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`;

for (const codeBlock of codeBlocks) {
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";

  const copyButton = document.createElement("button");
  copyButton.className =
    "absolute right-2 top-2 rounded-md border border-border bg-muted p-2 text-muted-foreground opacity-0 transition-all hover:bg-accent hover:text-accent-foreground group-hover:opacity-100 focus:opacity-100";
  copyButton.innerHTML = copyIcon;
  copyButton.setAttribute("aria-label", "Copy code");

  codeBlock.setAttribute("tabindex", "0");
  codeBlock.appendChild(copyButton);

  const parent = codeBlock.parentNode;
  if (parent) {
    parent.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);
    wrapper.appendChild(copyButton);
    wrapper.className = "group relative mb-4";
  }

  copyButton.addEventListener("click", async () => {
    await copyCode(codeBlock, copyButton);
  });
}

async function copyCode(block: HTMLPreElement, button: HTMLButtonElement) {
  const code = block.querySelector("code");
  const text = code?.innerText || "";

  await navigator.clipboard.writeText(text);

  button.innerHTML = checkIcon;

  setTimeout(() => {
    button.innerHTML = copyIcon;
  }, 2000);
}
