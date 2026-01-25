"use server";

import connectDB from "@/config/database";
import Staffing from "@/models/Staffing";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function deleteStaffing(id) {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("Unauthorized");
    }

    const role = session.user.role;

    // Only admin or superadmin can delete
    if (role !== "admin" && role !== "superadmin") {
        throw new Error("Not allowed");
    }

    const staffing = await Staffing.findById(id);
    if (!staffing) throw new Error("Not found");

    // Admin can only delete their own staffings
    if (role === "admin" && staffing.coordinator.toString() !== session.user.id) {
        throw new Error("Not allowed");
    }

    await Staffing.findByIdAndDelete(id);
    revalidatePath("/admin");
}
