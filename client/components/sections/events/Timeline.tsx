import type { PastEvent } from "@/lib/types/cms.types";
import TimelineItem from "./TimelineItem";
import { getYear } from "@/lib/utils/formatDate";

interface TimelineProps {
  events: PastEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  if (!events || events.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">
        暂无活动记录。
      </p>
    );
  }

  // Group events by year
  const eventsByYear = new Map<number, PastEvent[]>();
  for (const event of events) {
    const year = getYear(event.date);
    const group = eventsByYear.get(year) || [];
    group.push(event);
    eventsByYear.set(year, group);
  }

  // Sort years descending
  const sortedYears = Array.from(eventsByYear.keys()).sort((a, b) => b - a);

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-0.5" />

      {sortedYears.map((year) => (
        <div key={year} className="mb-12">
          {/* Year label */}
          <div className="relative mb-8 flex justify-start md:justify-center">
            <span className="relative z-10 ml-10 rounded-full bg-primary px-4 py-1 text-sm font-bold text-primary-foreground md:ml-0">
              {year}
            </span>
          </div>

          {/* Events for this year */}
          {eventsByYear.get(year)?.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              isRight={index % 2 === 0}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
