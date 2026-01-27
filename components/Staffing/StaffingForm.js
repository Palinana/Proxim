"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import MultiSelectPopoverSchedule from "./MultiSelectPopoverSchedule";

export default function StaffingForm({ staffing, admins, isSuperadmin, isPending }) {
    const [serviceType, setServiceType] = useState(staffing.serviceType || "");
    const [status, setStatus] = useState(staffing.status || "");
    const [caseId, setCaseId] = useState(staffing.caseId || "");
    const [city, setCity] = useState(staffing.location?.city || "");
    const [state, setState] = useState(staffing.location?.state || "");
    const [zipcode, setZipcode] = useState(staffing.location?.zipcode || "");

    const [workloadVisits, setWorkloadVisits] = useState(staffing.workload?.visits || "");
    const [workloadDuration, setWorkloadDuration] = useState(staffing.workload?.duration || "");
    const [workloadFreq, setWorkloadFreq] = useState(staffing.workload?.frequency || "Weekly");

    const [preferredSchedule, setPreferredSchedule] = useState(staffing.preferredSchedule || []);

    const [coordinatorId, setCoordinatorId] = useState("");

    console.log("admins ", admins)
    return (
        <div className="space-y-4">
          {/* Service Type */}
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
          <input type="hidden" name="serviceType" value={serviceType} />

          {/* Status */}
          <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status"/>
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          <input type="hidden" name="status" value={status} />

          {/* Coordinator for Superadmin */}
          {isSuperadmin && (
              <>
                <Select value={coordinatorId} onValueChange={setCoordinatorId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Coordinator" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    {admins.map((a) => (
                      <SelectItem key={a.value} value={a.value}>
                        {a.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* hidden input for server action */}
                <input type="hidden" name="coordinatorId" value={coordinatorId} />
              </>
          )}

          {/* Case */}
          <Input name="caseId" value={caseId} onChange={(e) => setCaseId(e.target.value)} placeholder="EI #" />

          {/* Location */}
          <Input name="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
          <Input name="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
          <Input name="zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} placeholder="Zipcode" />

          {/* Preferred Schedule */}
          <MultiSelectPopoverSchedule
            label="Preferred Schedule"
            options={[
              { label: "Morning", value: "Morning" },
              { label: "Afternoon", value: "Afternoon" },
              { label: "Evening", value: "Evening" },
              { label: "Any", value: "Any" },
            ]}
            value={preferredSchedule}
            onChange={setPreferredSchedule}
          />

          {preferredSchedule.map((val) => (
            <input key={val} type="hidden" name="preferredSchedule" value={val} />
          ))}

          {/* Workload */}
          <div className="grid grid-cols-3 gap-2">
            <Input
              name="workloadVisits"
              value={workloadVisits}
              onChange={(e) => setWorkloadVisits(e.target.value.replace(/\D/g, ""))}
              placeholder="Visits"
            />
            <Input
              name="workloadDuration"
              value={workloadDuration}
              onChange={(e) => setWorkloadDuration(e.target.value.replace(/\D/g, ""))}
              placeholder="Duration"
            />

            <Select value={workloadFreq} onValueChange={setWorkloadFreq}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Frequency" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="workloadFreq" value={workloadFreq} />
          </div>

          <div className="flex justify-center mt-4">
              <Button type="submit" disabled={isPending}>
                Save
              </Button>
          </div>
      </div>
    );
}
