import connectDB from "@/config/database";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Unauthorized" });

    await connectDB();

    const user = await User.findById(session.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.method === "PATCH") {
        const { email, phone } = req.body;

        user.email = email || user.email;
        user.phone = phone || user.phone;

        await user.save();
        return res.status(200).json({ message: "Updated" });
    }

    res.status(405).json({ message: "Method not allowed" });
}
