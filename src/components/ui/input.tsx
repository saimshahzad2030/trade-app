import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3   text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

        // Glowing focus (light blue-ish glow)
        // "focus-visible:shadow-[0_0_8px_2px_rgba(56,189,248,0.6)]",

        // Red glow on error
        "aria-invalid:shadow-[0_0_8px_2px_rgba(239,68,68,0.6)] aria-invalid:border-red-500",

        className
      )}
      {...props}
    />
  );
}
function CustomInput({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3   text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

        "aria-invalid:shadow-[0_0_8px_2px_rgba(239,68,68,0.6)] aria-invalid:border-red-500",

        className
      )}
      {...props}
    />
  );
}
export { Input, CustomInput };
