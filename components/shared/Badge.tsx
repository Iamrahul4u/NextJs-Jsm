import { Badge } from "@/components/ui/badge";

export function BadgeDemo({ title }: { title: string }) {
  return (
    <Badge
      variant="outline"
      className="rounded-md bg-orange-400 p-1 text-xs text-white drop-shadow-sm hover:bg-orange-500 hover:text-white dark:bg-zinc-500 dark:text-white dark:hover:bg-orange-400 dark:hover:text-white md:px-4 md:py-2"
    >
      {title}
    </Badge>
  );
}
