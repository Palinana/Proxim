"use client";

import AdminStaffingItem from "./AdminStaffingItem";

export default function AdminStaffingList({ staffings }) {
    if (!staffings.length) {
        return (
            <div className="text-center text-gray-500 py-10">
                No staffing cases yet.
            </div>
        );
    }
    
    return (
        <div className="space-y-3">
            {staffings.map((staffing) => (
                <AdminStaffingItem key={staffing._id} staffing={staffing} />
            ))}
        </div>
    );
}
