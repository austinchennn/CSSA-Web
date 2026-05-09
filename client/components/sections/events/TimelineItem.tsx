"use client";

import Link from "next/link";
import type { PastEvent } from "@/lib/types/cms.types";
import { formatEventDate } from "@/lib/utils/formatDate";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils/cn";

interface TimelineItemProps {
  event: PastEvent;
  isRight: boolean;
}

export default function TimelineItem({ event, isRight }: TimelineItemProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex mb-8 transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        "flex-row pl-12 md:pl-0",
        isRight ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* Dot on the timeline */}
      <div className="absolute left-3 top-2 z-10 h-3 w-3 rounded-full bg-primary border-2 border-background md:left-1/2 md:-translate-x-1.5" />

      {/* Spacer for alternate layout */}
      <div className="hidden md:block md:w-1/2" />

      {/* Content card */}
      <div className="w-full md:w-1/2 md:px-8">
        <Link href={`/events/${event.id}`} className="block">
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <h4 className="font-semibold text-foreground">{event.title}</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatEventDate(event.date)}
            </p>
            {event.description && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {event.description}
              </p>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
