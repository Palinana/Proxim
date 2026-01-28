"use client";

import StaffingItem from "./StaffingItem";
import AddStaffingDialog from "./AddStaffingDialog";
import FilterBarAdminPage from "../Filter/FilterBarAdminPage";

export default function StaffingList({ staffings = [], allStaffing = [], total = 0, admins = [], isSuperadmin = false, coordinators = []}) {
    const showCoordinator = isSuperadmin;

    return (
      <div className="h-full flex flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="text-primary font-semibold">Staffing Cases: {total}</div>
              <AddStaffingDialog admins={admins} isSuperadmin={isSuperadmin} />
          </div>

          <div className="bg-background py-3">
              <FilterBarAdminPage coordinators={coordinators} showCoordinator={showCoordinator} staffings={staffings} allStaffing={allStaffing}/>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3">
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
