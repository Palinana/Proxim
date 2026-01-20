"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultiCheckboxDropdown from "./MultiSelectPopover";
import MultiSelectPopover from "./MultiSelectPopover";

export default function FilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const setParam = (key, value) => {
        const params = new URLSearchParams(searchParams);
        if (!value) params.delete(key);
        else params.set(key, value);
        router.push(`/?${params.toString()}`);
    };

    const setMultiParam = (key, values) => {
        const params = new URLSearchParams(searchParams);
        if (!values.length) params.delete(key);
        else params.set(key, values.join(","));
        router.push(`/?${params.toString()}`);
    };

  return (
    <div className="flex flex-wrap gap-3 items-center">
        {/* Service */}
        <Select
            value={searchParams.get("service") || ""}
            onValueChange={(v) => setParam("service", v)}
        >
            <SelectTrigger className="bg-white w-[180px] border border-gray-300">
                <SelectValue placeholder="Service" />
            </SelectTrigger>
        
            <SelectContent className="bg-white border border-gray-200">
                <SelectItem className="bg-white hover:bg-gray-50" value="ST">ST</SelectItem>
                <SelectItem className="bg-white hover:bg-gray-50" value="OT">OT</SelectItem>
                <SelectItem className="bg-white hover:bg-gray-50" value="PT">PT</SelectItem>
                <SelectItem className="bg-white hover:bg-gray-50" value="ABA">ABA</SelectItem>
            </SelectContent>
        </Select>

        {/* Status */}
        <Select
            value={searchParams.get("status") || ""}
            onValueChange={(v) => setParam("status", v)}
        >
            <SelectTrigger className="w-36 bg-white border border-gray-300">
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
                <SelectItem value="open" className="bg-white hover:bg-gray-50">Open</SelectItem>
                <SelectItem value="pending" className="bg-white hover:bg-gray-50">Pending</SelectItem>
                <SelectItem value="filled" className="bg-white hover:bg-gray-50">Filled</SelectItem>
                <SelectItem value="closed" className="bg-white hover:bg-gray-50">Closed</SelectItem>
            </SelectContent>
        </Select>

        {/* Mandate */}
        <MultiSelectPopover
            label="Mandate"
            options={[
                { label: "2x30", value: "2x30" },
                { label: "1x30", value: "1x30" },
                { label: "1x60", value: "1x60" },
                { label: "5x60", value: "5x60" },
                { label: "10x60", value: "10x60" },
            ]}
            value={(searchParams.get("mandate") || "").split(",").filter(Boolean)}
            onChange={(vals) => setMultiParam("mandate", vals)}
        />

        <Select
            value={searchParams.get("borough") || ""}
            onValueChange={(v) => setParam("borough", v)}
        >
        <SelectTrigger className="w-44 bg-white border border-gray-300">
            <SelectValue placeholder="Borough" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200">
            <SelectItem className="bg-white hover:bg-gray-50" value="Brooklyn">Brooklyn</SelectItem>
            <SelectItem className="bg-white hover:bg-gray-50" value="Staten Island">Staten Island</SelectItem>
        </SelectContent>
        </Select>

        {/* ZIP */}
        <MultiSelectPopover
            label="ZIP"
            options={[
                { label: "10301", value: "10301" },
                { label: "10302", value: "10302" },
                { label: "10303", value: "10303" },
                { label: "10305", value: "10305" },
                { label: "10306", value: "10306" },
                { label: "10307", value: "10307" },
                { label: "10308", value: "10308" },
                { label: "10309", value: "10309" },
                { label: "10310", value: "10310" },
                { label: "10312", value: "10312" },
            ]}
            value={(searchParams.get("zip") || "").split(",").filter(Boolean)}
            onChange={(vals) => setMultiParam("zip", vals)}
        />

        {/* Clear */}
        <button
            onClick={() => router.push("/")}
            className="px-3 py-2 text-sm border rounded bg-white border border-blue-300 hover:bg-gray-100"
        >
            Clear filters
        </button>
    </div>
  );
}
