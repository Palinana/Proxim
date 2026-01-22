"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function MultiSelectPopoverSchedule({ label, options, value, onChange, className }) {
    // ["Afternoon, Morning"] // initally ONE string
    const current = Array.isArray(value) ? value : typeof value === "string"
        ? value.split(",").map(v => v.trim()).filter(Boolean)
        : [];


    const toggleOption = (val) => {
        // If user selects "Any"
        if (val === "Any") {
          onChange([]);
          return;
        }
    
        // If currently "Any" (empty array) and user selects something
        if (current.length === 0) {
          onChange([val]);
          return;
        }
    
        // Toggle normally
        if (current.includes(val)) {
          onChange(current.filter((v) => v !== val));
        } else {
          onChange([...current, val]);
        }
    };
    
    const isChecked = (val) => {
        if (val === "Any") return current.length === 0;
        return current.includes(val);
    };
      

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className={`w-full justify-between text-left ${className}`}
                >
                    {current.length ? current.join(", ") : "Any"}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-2 bg-white">
                <div className="flex flex-col gap-2">
                    {options.map((opt) => (
                        <label
                            key={opt.value}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <Checkbox
                                checked={isChecked(opt.value)}
                                onCheckedChange={() => toggleOption(opt.value)}
                            />
                            <span className="text-sm">{opt.label}</span>
                        </label>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
