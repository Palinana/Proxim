"use server";

import connectDB from "@/config/database";
import Staffing from "@/models/Staffing";
import { revalidatePath } from "next/cache";

export async function updateStaffing(id, formData) {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("Unauthorized");
    }

    const existingStaffing = await Staffing.findById(id);

    // Verify ownership
    if (existingStaffing.owner.toString() !== session.user.id) {
        throw new Error('Current user does not own this staffing.');
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
        preferredSchedule: data.preferredSchedule?.split(",") || [],
        workload: {
          visits: Number(data.workloadVisits),
          duration: Number(data.workloadDuration),
          frequency: data.workloadFreq,
        },
    });

    revalidatePath("/admin");
}
