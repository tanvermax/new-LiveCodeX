

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

export function ScrollArea({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ScrollAreaPrimitive.Root className={cn("overflow-hidden", className)}>
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className="flex touch-none select-none p-1"
      >
        <ScrollAreaPrimitive.Thumb className="rounded-full bg-gray-300" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  );
}

