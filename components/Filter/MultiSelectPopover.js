"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function MultiSelectPopover({ label, options, value = [], onChange }) {
    const toggle = (val) => {
        if (value.includes(val)) onChange(value.filter((v) => v !== val));
        else onChange([...value, val]);
    };

    // console.log("options - ", options)

    return (
        <Popover>
            <PopoverTrigger asChild>
                  <Button variant="outline" className="w-43 bg-white font-normal text-secondary-2 text-secondary-2-hover:hover justify-between border border-gray-300">
                      {value.length ? value.map((id) => options.find(o => o.value === id)?.label || id).join(", ") : label}
                  </Button>
            </PopoverTrigger>

            <PopoverContent className="w-43 bg-white border border-gray-200 shadow-md">
                <div className="space-y-1">
                    {options.map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 rounded bg-white"
                      >
                          <Checkbox
                            checked={value.includes(opt.value)}
                            onCheckedChange={() => toggle(opt.value)}
                          />
                        {opt.label}
                      </label>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
