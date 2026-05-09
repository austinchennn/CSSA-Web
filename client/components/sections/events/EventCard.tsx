import Image from "next/image";
import Link from "next/link";
import type { PastEvent } from "@/lib/types/cms.types";
import { Card } from "@/components/ui/Card";
import { formatEventDate } from "@/lib/utils/formatDate";

interface EventCardProps {
  event: PastEvent;
  priority?: boolean;
}

export default function EventCard({ event, priority = false }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`} className="block">
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full cursor-pointer">
      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {event.coverImageUrl ? (
          <Image
            src={event.coverImageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-muted-foreground text-sm">暂无图片</span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2">
          {event.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatEventDate(event.date)}
        </p>
        {event.description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        )}
      </div>
    </Card>
    </Link>
  );
}
