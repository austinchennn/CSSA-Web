import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPastEventById, getPastEvents } from "@/lib/graphql";
import { formatEventDate } from "@/lib/utils/formatDate";

export const revalidate = 60;

export async function generateStaticParams() {
  const events = await getPastEvents();
  return events.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await getPastEventById(id);
  return { title: event?.title ?? "活动详情" };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getPastEventById(id);

  if (!event) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <Link
        href="/events"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        ← 返回活动列表
      </Link>

      {event.coverImageUrl && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
          <Image
            src={event.coverImageUrl}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl font-bold text-foreground mb-3">{event.title}</h1>
      <p className="text-muted-foreground mb-8">{formatEventDate(event.date)}</p>

      {event.description && (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-foreground leading-relaxed whitespace-pre-line">
            {event.description}
          </p>
        </div>
      )}
    </div>
  );
}
