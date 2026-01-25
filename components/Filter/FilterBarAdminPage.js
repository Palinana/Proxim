"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MultiSelectPopover from "./MultiSelectPopover";

export default function FilterBarAdminPage({ staffings = [], allStaffing = [], showCoordinator = false, coordinators = [] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const setParam = (key, value) => {
        const params = new URLSearchParams(searchParams);
        if (!value) params.delete(key);
        else params.set(key, value);
        router.push(`${pathname}?${params.toString()}`);
    };

    const setMultiParam = (key, values) => {
        const params = new URLSearchParams(searchParams);
        if (!values.length) params.delete(key);
        else params.set(key, values.join(","));
        router.push(`${pathname}?${params.toString()}`);
    };

    // const caseIds = [...new Set(allStaffing.map((s) => s.caseId).filter(Boolean))];

    // ----------------------------
    // EI List (fallback to staffings)
    // ----------------------------
    const eiList = (allStaffing?.length ? allStaffing : staffings) || [];
    const uniqueEIs = Array.from(new Set(eiList.map((s) => s.caseId)));

    const handleClear = () => {
        router.push(pathname);
    };
  
    return (
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center flex-wrap">
                {/* EI # */}
                <Select
                  value={searchParams.get("ei") || ""}
                  onValueChange={(v) => setParam("ei", v)}
                >
                  <SelectTrigger className="w-[130px] shrink-0 bg-white text-secondary-2 border border-gray-300">
                    <SelectValue placeholder="EI #" />
                  </SelectTrigger>

                  <SelectContent className="bg-white border border-gray-200">
                    {uniqueEIs.map((ei) => (
                      <SelectItem key={ei} value={ei}>
                        {ei}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Service */}
                <Select
                  value={searchParams.get("service") || ""}
                  onValueChange={(v) => setParam("service", v)}
                >
                  <SelectTrigger className="w-[130px] shrink-0 bg-white text-secondary-2 border border-gray-300">
                    <SelectValue placeholder="Service" />
                  </SelectTrigger>

                  <SelectContent className="bg-white border border-gray-200">
                    <SelectItem value="ST">ST</SelectItem>
                    <SelectItem value="OT">OT</SelectItem>
                    <SelectItem value="PT">PT</SelectItem>
                    <SelectItem value="ABA">ABA</SelectItem>
                  </SelectContent>
                </Select>

                {/* Status */}
                <Select
                  value={searchParams.get("status") || ""}
                  onValueChange={(v) => setParam("status", v)}
                >
                  <SelectTrigger className="w-[130px] bg-white text-secondary-2 border border-gray-300">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>

                  <SelectContent className="bg-white border border-gray-200">
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Filled">Filled</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
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
              </div>
              <div className="flex gap-2 items-center flex-wrap">
                  {/* Borough */}
                  <Select
                    value={searchParams.get("borough") || ""}
                    onValueChange={(v) => setParam("borough", v)}
                  >
                    <SelectTrigger className="bg-white text-secondary-2 w-[130px] shrink-0 border border-gray-300">
                      <SelectValue placeholder="Borough" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200">
                      <SelectItem value="Brooklyn">Brooklyn</SelectItem>
                      <SelectItem value="Staten Island">Staten Island</SelectItem>
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

                  {/* Coordinator (only for superadmin) */}
                  {showCoordinator && (
                      <MultiSelectPopover
                        label="Coordinator"
                        options={coordinators}
                        value={(searchParams.get("coordinator") || "").split(",").filter(Boolean)}
                        onChange={(vals) => setMultiParam("coordinator", vals)}
                      />
                  )}

                  {/* Coordinator */}
                  {/* {showCoordinator && (
                    <MultiSelectPopover
                      label="Coordinator"
                      options={coordinators}
                      value={(searchParams.get("coordinator") || "").split(",").filter(Boolean)}
                      onChange={(vals) => setMultiParam("coordinator", vals)}
                    />
                  )} */}
              </div>
          </div>

          <button
            onClick={handleClear}
            className="text-sm text-secondary-2 hover:underline !font-bold"
          >
              Clear filters
          </button>
      </div>
    );
}

