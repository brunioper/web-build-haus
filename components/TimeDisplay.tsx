"use client";

import { useEffect, useState } from "react";

const cities = [
  { label: "Montevideo", zone: "America/Montevideo" },
  { label: "New York", zone: "America/New_York" },
  { label: "Barcelona", zone: "Europe/Madrid" },
];

export default function TimeDisplay() {
  const [times, setTimes] = useState<string[]>(cities.map(() => "--:--"));

  useEffect(() => {
    const update = () =>
      setTimes(
        cities.map(({ zone }) =>
          new Date().toLocaleTimeString("en-US", {
            timeZone: zone,
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        )
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden md:flex items-center gap-8">
      {cities.map(({ label }, i) => (
        <div key={label} className="flex flex-col gap-0.5">
          <span
            className="text-xs tabular-nums font-medium"
            style={{ color: "var(--text)", fontFamily: "var(--font)", letterSpacing: "0.02em" }}
          >
            {times[i]}
          </span>
          <span
            className="text-[10px] uppercase tracking-widest"
            style={{ color: "var(--muted)", fontFamily: "var(--font)" }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
