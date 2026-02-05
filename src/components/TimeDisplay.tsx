import * as React from "react";

export function TimeDisplay() {
  const [time, setTime] = React.useState<string>("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Europe/London",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(new Date()),
      );
    }, 1000);

    setTime(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/London",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(new Date()),
    );

    return () => clearInterval(interval);
  }, []);

  if (!time) return <span className="opacity-0">--:-- AM</span>;

  return (
    <span className="tabular-nums font-medium text-muted-foreground">
      Manchester • {time}
    </span>
  );
}
