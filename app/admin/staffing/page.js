import connectDB from "@/config/database";
import Staffing from "@/models/Staffing";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import StaffingList from "@/components/staffing/StaffingList";

export default async function AdminStaffingPage() {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
        return null; // or redirect
    }

    const staffings = await Staffing.find({
        "coordinator._id": session.user.id
    })
        .sort({ createdAt: -1 })
        .lean();
      
    const plainStaffings = staffings.map((s) => ({
        ...s,
        _id: s._id.toString(),
    }));

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Top bar */}
            <div className="border-b bg-background px-6 md:px-8 py-3">
                <h1 className="text-xl font-semibold">My Staffing</h1>
            </div>
        
            {/* Centered content */}
            <div className="flex flex-1 justify-center py-10">
                <div className="w-full max-w-4xl bg-white rounded-2xl p-6 shadow-sm">
                    <StaffingList staffings={plainStaffings} />
                </div>
            </div>
        </div>
    );
}
