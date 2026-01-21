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
        status: formData.get("status"),
    });

    revalidatePath("/admin");
}
