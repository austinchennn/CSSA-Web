"use client";

import { useEffect, useRef, useState } from "react";
import type { ActiveEvent } from "@/lib/types/cms.types";
import DynamicForm from "@/components/sections/join/DynamicForm";
import { cn } from "@/lib/utils/cn";

interface RegistrationPanelProps {
  events: ActiveEvent[];
}

export default function RegistrationPanel({ events }: RegistrationPanelProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const selectedEvent = events.find((e) => e.id === selectedId) ?? null;

  function handleCardClick(eventId: string) {
    setSelectedId((prev) => (prev === eventId ? null : eventId));
  }

  useEffect(() => {
    if (selectedId && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedId]);

  return (
    <div className="space-y-10">
      {/* Event cards grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => {
          const isSelected = selectedId === event.id;
          const isFull =
            event.capacity != null &&
            (event.registrationCount ?? 0) >= event.capacity;

          return (
            <button
              key={event.id}
              onClick={() => !isFull && handleCardClick(event.id)}
              disabled={isFull}
              className={cn(
                "text-left rounded-xl border p-6 transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isFull
                  ? "border-border bg-muted/40 cursor-not-allowed opacity-60"
                  : isSelected
                  ? "border-primary bg-primary/5 shadow-md cursor-pointer"
                  : "border-border bg-card hover:border-primary/50 hover:shadow-sm cursor-pointer"
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-foreground text-base leading-snug">
                  {event.title}
                </h3>
                {isSelected && (
                  <span className="shrink-0 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    已选
                  </span>
                )}
                {isFull && (
                  <span className="shrink-0 text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    已满
                  </span>
                )}
              </div>

              {event.description && (
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {event.description}
                </p>
              )}

              <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                {event.capacity ? (
                  <span className="text-xs text-muted-foreground">
                    名额：{event.registrationCount ?? 0} / {event.capacity}
                  </span>
                ) : (
                  <span />
                )}
                {!isFull && (
                  <span
                    className={cn(
                      "text-xs font-medium transition-colors",
                      isSelected ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {isSelected ? "收起 ↑" : "点击报名 →"}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Registration form — appears when a card is selected */}
      {selectedEvent && (
        <div ref={formRef} className="max-w-2xl mx-auto scroll-mt-24">
          <DynamicForm
            key={selectedEvent.id}
            event={selectedEvent}
            onSuccess={() => setSelectedId(null)}
          />
        </div>
      )}
    </div>
  );
}
