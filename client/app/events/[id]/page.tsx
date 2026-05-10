import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
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

      <h1 className="text-3xl font-bold text-foreground mb-4">{event.title}</h1>
      <div className="flex flex-col gap-1 mb-8 text-muted-foreground">
        <p><span className="font-medium text-foreground">活动日期：</span>{formatEventDate(event.date)}</p>
        {event.location && (
          <p><span className="font-medium text-foreground">活动地点：</span>{event.location}</p>
        )}
      </div>

      {event.description && (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown>{event.description}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
