import type { PastEvent } from "@/lib/types/cms.types";
import EventCard from "@/components/sections/events/EventCard";
import AnimatedSection from "@/components/shared/AnimatedSection";

interface FeaturedEventsProps {
  events: PastEvent[];
}

export default function FeaturedEvents({ events }: FeaturedEventsProps) {
  if (!events || events.length === 0) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              精选活动
            </h2>
            <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-primary" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.slice(0, 4).map((event, index) => (
            <AnimatedSection key={event.id} delay={index * 0.1}>
              <EventCard event={event} priority={index < 2} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
