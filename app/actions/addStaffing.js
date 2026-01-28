"use server";

import connectDB from "@/config/database";
import Staffing from "@/models/Staffing";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { getAgeRange } from "@/utils/getAgeRange";

export async function addStaffing(formData) {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const data = Object.fromEntries(formData);

    const preferredScheduleRaw = formData.getAll("preferredSchedule");
    const preferredSchedule = Array.from(
      new Set(preferredScheduleRaw.map((v) => v.trim()).filter(Boolean))
    );

    if (preferredSchedule.includes("Any")) {
        preferredSchedule.length = 0;
    }

    // set coordinator
    const coordinatorId = session.user.role === "superadmin"
        ? data.coordinatorId // chosen by superadmin
        : session.user.id;   // admin creates own staffing

    // define range for the age
    const ageRange = getAgeRange(data.dob);

    if (!data.dob) {
        throw new Error("DOB is required to calculate age");
    }      

    await Staffing.create({
        serviceType: data.serviceType,
        // status: data.status,
        caseId: data.caseId,
        location: {
            city: data.city,
            state: data.state,
            zipcode: data.zipcode,
        },
        preferredSchedule,
        workload: {
            visits: Number(data.workloadVisits),
            duration: Number(data.workloadDuration),
            frequency: data.workloadFreq || "Weekly",
        },
        coordinator: coordinatorId,
        ageRange
    });

    revalidatePath("/admin");
}
