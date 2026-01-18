import connectDB from "@/config/database";
import Staffing from "@/models/Staffing";
import StaffingCard from "./StaffingCard";
import StaffingPanelHeader from "./StaffingPanelHeader";
import { Badge } from "@/components/ui/badge";

const StaffingPanel = async ({ searchParams }) => {
    await connectDB();

    const sort = searchParams?.sort === "old" ? 1 : -1;

    const staffings = await Staffing.find({})
        .sort({ createdAt: sort })
        .lean();

    return (
        <div className="bg-surface">
            <div className="border-b border-default">
                <StaffingPanelHeader total={staffings.length} sort={sort} />
            </div>
        
            <div className="p-4 space-y-3">
                {staffings.map((s) => (
                    <StaffingCard key={s._id} staffing={s} />
                ))}
            </div>
        </div>
    );
}

export default StaffingPanel;
