import type { Metadata } from "next";
import { getPastEvents } from "@/lib/graphql";
import EventCard from "@/components/sections/events/EventCard";
import Timeline from "@/components/sections/events/Timeline";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedSection from "@/components/shared/AnimatedSection";

export const metadata: Metadata = {
  title: "往期活动",
};

export const revalidate = 60;

export default async function EventsPage() {
  const allEvents = await getPastEvents();

  // Sort by date descending
  const sortedEvents = [...allEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featuredEvents = sortedEvents.slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        title="往期活动"
        subtitle="了解我们举办过的精彩活动"
      />

      {sortedEvents.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          暂无活动记录。
        </p>
      ) : (
        <>
          {/* Featured events cards */}
          {featuredEvents.length > 0 && (
            <AnimatedSection className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8">
                精选活动
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredEvents.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    priority={index < 2}
                  />
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Timeline */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              活动时间线
            </h3>
            <Timeline events={sortedEvents} />
          </div>
        </>
      )}
    </div>
  );
}
