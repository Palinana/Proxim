"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { HiOutlinePencil } from "react-icons/hi";
import { useState, useTransition } from "react";
import { updateStaffing } from "@/app/actions/updateStaffing";
import { useRouter } from "next/navigation";
import MultiSelectPopoverSchedule from "./MultiSelectPopoverSchedule";

export default function EditStaffingDialog({ staffing }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // fields
  const [serviceType, setServiceType] = useState(staffing.serviceType || "");
  const [status, setStatus] = useState(staffing.status || "");
  const [caseId, setCaseId] = useState(staffing.caseId || "");
  const [city, setCity] = useState(staffing.location?.city || "");
  const [state, setState] = useState(staffing.location?.state || "");
  const [zipcode, setZipcode] = useState(staffing.location?.zipcode || "");
//   const [preferredSchedule, setPreferredSchedule] = useState(
//     staffing.preferredSchedule || []
//   );
  
    const [workloadVisits, setWorkloadVisits] = useState(staffing.workload?.visits || "");
  const [workloadDuration, setWorkloadDuration] = useState(staffing.workload?.duration || "");
  const [workloadFreq, setWorkloadFreq] = useState(staffing.workload?.frequency || "");
  
//   const handleScheduleChange = (vals) => {
//     const unique = Array.from(new Set(vals));
  
//     if (unique.includes("Any")) {
//       setPreferredSchedule(["Any"]);
//       return;
//     }
  
//     setPreferredSchedule(unique.filter(v => v !== "Any"));
//   };

const normalizeSchedule = (value) => {
    if (!value) return [];
  
    // If it's a string, make it an array
    if (typeof value === "string") return [value];
  
    // If it's an array of objects, extract `.value`
    if (Array.isArray(value) && value.length && typeof value[0] === "object") {
      return value.map((v) => v.value || v.label || "").filter(Boolean);
    }
  
    // If it's already array of strings
    if (Array.isArray(value)) return value;
  
    return [];
  };
  
  const [preferredSchedule, setPreferredSchedule] = useState(
    normalizeSchedule(staffing.preferredSchedule)
  );
  
  const handleScheduleChange = (next) => {
    // next is the array passed from the popover
    const unique = [];
  
    next.forEach((v) => {
      const lower = v.toLowerCase();
      if (!unique.some((x) => x.toLowerCase() === lower)) {
        unique.push(v);
      }
    });
  
    // If Any is selected, it overrides everything
    if (unique.some((v) => v.toLowerCase() === "any")) {
      setPreferredSchedule(["Any"]);
      return;
    }
  
    setPreferredSchedule(unique);
  };
  
  
  
  
  return (
    <>
      <button onClick={() => setOpen(true)}>
        <HiOutlinePencil />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white shadow-lg rounded-2xl max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Staffing</DialogTitle>
          </DialogHeader>

          <form
            action={(formData) => {
              startTransition(async () => {
                await updateStaffing(staffing._id, formData);
                router.refresh();
                setOpen(false);
              });
            }}
            className="space-y-4"
          >
            {/* Service Type Select */}
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="ST">ST</SelectItem>
                <SelectItem value="OT">OT</SelectItem>
                <SelectItem value="PT">PT</SelectItem>
                <SelectItem value="SI">SI</SelectItem>
                <SelectItem value="ABA">ABA</SelectItem>
              </SelectContent>
            </Select>

            {/* Status */}
            <Input
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Status"
            />

            {/* Case ID */}
            <Input
              name="caseId"
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              placeholder="EI #"
            />

            {/* Location */}
            <Input
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
            <Input
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
            />
            <Input
              name="zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              placeholder="Zipcode"
            />

            {/* Preferred Schedule Select */}
            {/* <Select
              value={preferredSchedule.join(",")}
              onValueChange={(val) => setPreferredSchedule(val.split(","))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Preferred Schedule" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Morning">Morning</SelectItem>
                <SelectItem value="Afternoon">Afternoon</SelectItem>
                <SelectItem value="Evening">Evening</SelectItem>
                <SelectItem value="Any">Any</SelectItem>
              </SelectContent>
            </Select> */}

<MultiSelectPopoverSchedule
  label="Preferred Schedule"
  options={[
    { label: "Morning", value: "Morning" },
    { label: "Afternoon", value: "Afternoon" },
    { label: "Evening", value: "Evening" },
    { label: "Any", value: "Any" },
  ]}
  value={preferredSchedule}
  onChange={handleScheduleChange}
  className="bg-white text-gray-700 border border-gray-300"
/>




            {/* Workload */}
                <div className="grid grid-cols-3 gap-2">
                <Input
                    name="workloadVisits"
                    className="border border-gray-300"

                    value={workloadVisits}
                    onChange={(e) => setWorkloadVisits(e.target.value.replace(/\D/g, ""))}
                    placeholder="Visits"
                />
                <Input
                    name="workloadDuration"
                    value={workloadDuration}
                    onChange={(e) => setWorkloadVisits(e.target.value.replace(/\D/g, ""))}
                    placeholder="Duration"
                />
                {/* Frequency */}
                <Select value={workloadFreq} onValueChange={setWorkloadFreq}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Frequency" />
  </SelectTrigger>

  <SelectContent className="bg-white">
    <SelectItem value="Weekly">Weekly</SelectItem>
    <SelectItem value="Monthly">Monthly</SelectItem>
  </SelectContent>
</Select>

                </div>


                <div className="flex justify-center mt-4">
  <Button type="submit" disabled={isPending}>
    Save
  </Button>
</div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
