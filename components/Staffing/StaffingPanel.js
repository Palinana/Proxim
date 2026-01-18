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
        <div className="bg-surface h-full flex flex-col">
            <div className="sticky top-0 z-10 border-b border-default">
                <StaffingPanelHeader total={staffings.length} />
            </div>
    
            <div className="flex-1 overflow-y-auto">
                <div className="space-y-3 p-4">
                    {staffings.map((s) => (
                        <StaffingCard key={s._id} staffing={s} />
                    ))}
                </div>
            </div>
        </div>
    );
};
  
export default StaffingPanel;
  