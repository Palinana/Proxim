"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiOutlinePencil } from "react-icons/hi";
import { useState, useTransition } from "react";
import { updateStaffing } from "@/app/actions/updateStaffing";
import { useRouter } from "next/navigation";

export default function EditStaffingDialog({ staffing }) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(staffing.status);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <>
            <button onClick={() => setOpen(true)}>
                <HiOutlinePencil />
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
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
                        <Input name="status" value={status} onChange={(e) => setStatus(e.target.value)} />

                        <Button type="submit" disabled={isPending}>
                            Save
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
