import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import connectDB from "@/config/database";
import User from "@/models/User";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
    await connectDB();
    
    const session = await getServerSession(authOptions);

    if (!session) return null;

    const userDoc = await User.findById(session.user.id)
        .select("first_name last_name email phone role")
        .lean();

    const user = {
        ...userDoc,
        _id: userDoc._id.toString(),
    };

    return <ProfileClient user={user} />;
}
