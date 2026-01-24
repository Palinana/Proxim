"use client";

import StaffingItem from "./StaffingItem";
import AddStaffingDialog from "./AddStaffingDialog";
import FilterBarAdminPage from "../Filter/FilterBarAdminPage";

export default function StaffingList({ staffings, allStaffing, total, admins = [], isSuperadmin = false,}) {
    return (
      //   <div className="h-full flex flex-col">
      //     <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
      //         <h2 className="text-lg font-semibold">Staffing Cases</h2>
      //         <AddStaffingDialog admins={admins} isSuperadmin={isSuperadmin} />
      //     </div>

      //     {/* Scrollable list container */}
      //     <div className="flex-1 overflow-y-auto space-y-3">
      //         {staffings.length ? (
      //             staffings.map((s) => (
      //               <StaffingItem
      //                 key={s._id}
      //                 staffing={s}
      //                 admins={admins}
      //                 isSuperadmin={isSuperadmin}
      //               />
      //           ))
      //         ) : (
      //             <div className="text-gray-500">No staffing cases yet.</div>
      //         )}
      //     </div>
      // </div>

      // working:
      <div className="h-full flex flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
              {/* <h2 className="text-lg font-semibold">Staffing Cases</h2> */}

              <div className="text-primary font-semibold">Staffing Cases: {total}</div>
              <AddStaffingDialog admins={admins} isSuperadmin={isSuperadmin} />
          </div>

          <div className="border-b bg-background px-6 md:px-8 py-3">
                <FilterBarAdminPage coordinators={[]} showCoordinator={false} staffings={staffings} allStaffing={allStaffing}/>
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
