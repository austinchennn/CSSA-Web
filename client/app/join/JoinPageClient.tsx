"use client";

import { useState } from "react";
import type { ActiveEvent } from "@/lib/types/cms.types";
import DynamicForm from "@/components/sections/join/DynamicForm";
import { cn } from "@/lib/utils/cn";

interface JoinPageClientProps {
  events: ActiveEvent[];
}

export default function JoinPageClient({ events }: JoinPageClientProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedEvent = events[selectedIndex];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Event selector tabs (if multiple events) */}
      {events.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {events.map((event, index) => (
            <button
              key={event.id}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                index === selectedIndex
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              )}
            >
              {event.title}
            </button>
          ))}
        </div>
      )}

      {/* Dynamic registration form */}
      {selectedEvent && (
        <DynamicForm
          key={selectedEvent.id}
          event={selectedEvent}
          onSuccess={() => {
            // Could show a thank-you state
          }}
        />
      )}
    </div>
  );
}
