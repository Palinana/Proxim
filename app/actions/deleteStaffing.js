"use server";

import connectDB from "@/config/database";
import Staffing from "@/models/Staffing";
import { revalidatePath } from "next/cache";

export async function deleteStaffing(id) {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("Unauthorized");
    }

    const staffing = await Staffing.findById(id);
    if (!staffing) throw new Error("Not found");

    if (session.user.role === "admin" && staffing.coordinator.toString() !== session.user.id) {
        throw new Error("Not allowed");
    }

    await Staffing.findByIdAndDelete(id);
    revalidatePath("/admin");
}
