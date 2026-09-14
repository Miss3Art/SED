"use client";

import { useState } from "react";
import buildings from "./utils/data.json";

export default function Page() {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  const filtered = buildings.filter((b) => {
    const term = query.toLowerCase();
    return (
      b.name.toLowerCase().includes(term) ||
      b.city.toLowerCase().includes(term) ||
      b.country.toLowerCase().includes(term)
    );
  });

  return (
    <main className="min-h-screen bg-[#1B1D1F] px-16 py-10">
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, city, or country..."
          className="w-full max-w-md rounded-md bg-[#26282B] px-4 py-2 font-sans text-sm text-[#ECE9E2] placeholder-[#8B93A1]"
        />

        {filtered.length === 0 && (
          <p className="mt-6 font-sans text-sm text-[#8B93A1]">
            No buildings match.
          </p>
        )}

        <div className="mt-8 grid grid-cols-3 gap-6">
          {filtered.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelected(b)}
              className="overflow-hidden rounded-lg bg-[#26282B] text-left transition hover:bg-[#2E3033]"
            >
              <div className="p-4">
                <p className="font-sans text-base font-semibold text-[#ECE9E2]">
                  {b.name}
                </p>
                <p className="mt-1 font-sans text-xs text-[#8B93A1]">
                  {b.city}, {b.country}
                </p>
                <p className="mt-2 font-mono text-xs text-[#5C6577]">
                  {b.heightMeters}m · {b.floors} floors · {b.yearCreated}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 flex items-center justify-center bg-black/70 px-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md overflow-hidden rounded-lg bg-[#26282B]"
          >
            <div className="p-6">
              <p className="font-sans text-2xl font-bold text-[#ECE9E2]">
                {selected.name}
              </p>
              <p className="mt-1 font-sans text-sm text-[#8B93A1]">
                {selected.city}, {selected.country}
              </p>
              <div className="mt-4 space-y-1 font-mono text-sm text-[#ECE9E2]">
                <p>Height: {selected.heightMeters}m</p>
                <p>Floors: {selected.floors}</p>
                <p>Built: {selected.yearCreated}</p>
                <p>Type: {selected.type}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="mt-6 font-sans text-sm text-[#8B93A1] underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}