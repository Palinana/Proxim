"use client";

import { useState, useMemo } from "react";
import StaffingMap from "../Map/StaffingMap";
import StaffingPanel from "../Staffing/StaffingPanel";
import MobileStaffingToggle from "@/components/Staffing/MobileStaffingToggle";

export default function DashboardClient({ staffings }) {
    const [selectedStaffingId, setSelectedStaffingId] = useState(null);

    const selectedStaffing = useMemo(
        () => staffings.find(s => s._id === selectedStaffingId),
        [staffings, selectedStaffingId]
    );

    return (
        <div className="flex flex-1 overflow-hidden bg-card">
            <aside className="hidden md:block w-[420px] lg:w-[480px] border-r overflow-y-auto">
                <StaffingPanel
                    staffings={staffings}
                    selectedStaffingId={selectedStaffingId}
                    onSelectStaffing={setSelectedStaffingId}
                />
            </aside>

            <section className="flex-1 relative">
                <StaffingMap
                    staffings={staffings}
                    selectedStaffingId={selectedStaffingId} // to highlight the selected item on the map if needed
                    onSelectStaffing={setSelectedStaffingId}
                />

                <MobileStaffingToggle>
                <StaffingPanel
                    staffings={staffings}
                    selectedStaffingId={selectedStaffingId}
                    onSelectStaffing={setSelectedStaffingId}
                />
                </MobileStaffingToggle>
            </section>
        </div>
    );
}
