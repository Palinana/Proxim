'use server';

import connectDB from '@/config/database';
import User from '@/models/User';
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData) {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("Unauthorized");
    }

    const updates = {
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
    };

    // Remove empty fields
    Object.keys(updates).forEach(
        (key) => updates[key] === "" && delete updates[key]
    );

    await User.findByIdAndUpdate(session.user.id, updates);
    return { success: true };

    revalidatePath("/profile");
}
