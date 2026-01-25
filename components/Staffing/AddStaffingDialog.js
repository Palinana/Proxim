// "use client";

// import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { HiOutlinePlus } from "react-icons/hi";
// import StaffingForm from "./StaffingForm";
// import { addStaffing } from "@/app/actions/addStaffing";


// export default function AddStaffingDialog({ admins, isSuperadmin }) {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">
//           <HiOutlinePlus className="mr-2" /> Add Staffing
//         </Button>
//       </DialogTrigger>

//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add Staffing</DialogTitle>
//         </DialogHeader>

//         <StaffingForm
//   initialValues={{}}
//   admins={admins}
//   isSuperadmin={isSuperadmin}
//   onSubmit={addStaffing}
// />

//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HiOutlinePlus } from "react-icons/hi";
import OutlineButton from "../Elements/OutlineGreenButton";
import StaffingForm from "./StaffingForm";
import { addStaffing } from "@/app/actions/addStaffing";

export default function AddStaffingDialog({ admins = [], isSuperadmin = false }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // blank default values for new staffing
  const emptyStaffing = {
    serviceType: "",
    status: "",
    caseId: "",
    location: { city: "", state: "", zipcode: "" },
    workload: { visits: "", duration: "", frequency: "Weekly" },
    preferredSchedule: [],
  };

  return (
    <>
      {/* <button onClick={() => setOpen(true)} className="flex items-center gap-2">
        <HiOutlinePlus />
        Add Staffing
      </button> */}

      {/* <OutlineButton onClick={() => setOpen(true)}>
        <HiOutlinePlus className="h-4 w-4 shrink-0" />
        Add Staffing
      </OutlineButton>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white shadow-lg rounded-2xl max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Staffing</DialogTitle>
          </DialogHeader>

          <form
            action={(formData) => {
              startTransition(async () => {
                await addStaffing(formData);
                router.refresh();
                setOpen(false);
              });
            }}
          >
            <StaffingForm
              staffing={emptyStaffing}
              admins={admins}
              isSuperadmin={isSuperadmin}
              isPending={isPending}
            />
          </form>
        </DialogContent>
      </Dialog> */}

      {/* <OutlineButton onClick={() => setOpen(true)}>
        <HiOutlinePlus className="h-4 w-4 shrink-0" />
        Add Staffing
      </OutlineButton> */}
      

      <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
              <OutlineButton>
                  <HiOutlinePlus className="h-4 w-4 shrink-0" />
                  Add Staffing
              </OutlineButton>
          </DialogTrigger>

          <DialogContent className="bg-white shadow-lg rounded-2xl max-w-lg">
              <DialogHeader>
                  <DialogTitle>Add Staffing</DialogTitle>
              </DialogHeader>

              <form
                  action={(formData) => {
                    startTransition(async () => {
                      await addStaffing(formData);
                      router.refresh();
                      setOpen(false);
                    });
                  }}
              >
                <StaffingForm
                    staffing={emptyStaffing}
                    admins={admins}
                    isSuperadmin={isSuperadmin}
                    isPending={isPending}
                />
              </form>
          </DialogContent>
      </Dialog>
    </>
  );
}
