"use client";

import StaffingItem from "./StaffingItem";
import AddStaffingDialog from "./AddStaffingDialog";

export default function StaffingList({  staffings, admins = [], isSuperadmin = false,}) {
    return (
        <div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
            <h2 className="text-lg font-semibold">Staffing Cases</h2>
    
            {/* show Add button */}
            <AddStaffingDialog admins={admins} isSuperadmin={isSuperadmin} />
          </div>
    
          <div className="space-y-3">
            {staffings.length ? (
              staffings.map((s) => (
                <StaffingItem
                    key={s._id}
                    staffing={s}
                    admins={admins}
                    isSuperadmin={isSuperadmin}
                />
              ))
            ) : (
              <div className="text-gray-500">No staffing cases yet.</div>
            )}
          </div>
        </div>
      );
}
