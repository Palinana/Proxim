"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function MultiSelectPopoverSchedule({
  label,
  options,
  value,
  onChange,
  className,
}) {
  const [open, setOpen] = useState(false);

  const current = Array.isArray(value) ? value : [];

  // normalize and trim for comparison
  const normalized = current
    .filter((v) => typeof v === "string")
    .map((v) => v.trim().toLowerCase());

  const toggleOption = (val) => {
    const cleanVal = val.trim();
    const normalizedVal = cleanVal.toLowerCase();

    if (normalized.includes(normalizedVal)) {
      // REMOVE it
      const next = current.filter(
        (v) => v.trim().toLowerCase() !== normalizedVal
      );
      onChange(next);
    } else {
      // ADD it (clean + dedupe)
      const next = [...current, cleanVal]
        .map((v) => (typeof v === "string" ? v.trim() : v))
        .filter((v, idx, arr) => {
          if (typeof v !== "string") return true;
          const lower = v.toLowerCase();
          return arr.findIndex((x) => typeof x === "string" && x.toLowerCase() === lower) === idx;
        });

      onChange(next);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-between text-left ${className}`}
        >
          {current.length ? current.join(", ") : label}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full">
        <div className="flex flex-col gap-2 p-2">
          {options.map((opt) => {
            const isChecked = normalized.includes(opt.value.trim().toLowerCase());

            return (
              <div key={opt.value} className="flex items-center gap-2">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggleOption(opt.value)}
                />
                <span className="text-sm">{opt.label}</span>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
