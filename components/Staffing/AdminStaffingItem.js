"use client";

import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import EditStaffingDialog from "./EditStaffingDialog";
import { deleteStaffing } from "@/app/actions/deleteStaffing";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function AdminStaffingItem({ staffing }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <div className="border rounded-lg p-4 flex justify-between items-start bg-gray-50">
            <div>
                <div className="font-semibold">
                {   staffing.serviceType} · {staffing.location?.city}
                </div>
                <div className="text-sm text-gray-600">
                    Status: {staffing.status}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <EditStaffingDialog staffing={staffing} />

                <button
                    onClick={() => {
                        if (!confirm("Delete this staffing?")) return;
                        startTransition(async () => {
                        await deleteStaffing(staffing._id);
                        router.refresh();
                        });
                    }}
                className="text-red-600 hover:text-red-800"
                >
                    <HiOutlineTrash />
                </button>
            </div>
        </div>
    );
}
