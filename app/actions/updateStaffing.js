"use server";

import connectDB from "@/config/database";
import Staffing from "@/models/Staffing";
import { revalidatePath } from "next/cache";

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function updateStaffing(id, formData) {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("Unauthorized");
    }

    const existingStaffing = await Staffing.findById(id);

    // Verify ownership
    const coordinatorId = existingStaffing.coordinator._id.toString();
    const userId = session.user.id;

    const isOwner = coordinatorId === userId;
    const isSuperAdmin = session.user.role === "superadmin";

    if (!isOwner && !isSuperAdmin) {
        throw new Error("Current user does not own this staffing.");
    }

    const data = Object.fromEntries(formData);

    // const workloadFreq = formData.get("workloadFreq") || data.workloadFreq;

    // preferredSchedule from form
    const preferredScheduleRaw = formData.getAll("preferredSchedule");

    const preferredSchedule = Array.from(
        new Set(preferredScheduleRaw.map(v => v.trim()).filter(Boolean))
    );

    if (preferredSchedule.includes("Any")) {
        preferredSchedule.length = 0; // store empty array
    }

    await Staffing.findByIdAndUpdate(id, {
        serviceType: data.serviceType,
        status: data.status,
        caseId: data.caseId,
        location: {
            city: data.city,
            state: data.state,
            zipcode: data.zipcode,
        },
        preferredSchedule: preferredSchedule,
        workload: {
            visits: Number(data.workloadVisits),
            duration: Number(data.workloadDuration),
            frequency: data.workloadFreq || "Weekly",
        },
        
    });

    revalidatePath("/admin");
}
