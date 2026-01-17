import connectDB from "@/config/database";
import Staffing from "@/models/Staffing";
import StaffingCard from "./StaffingCard";
import { Badge } from "@/components/ui/badge";

const StaffingPanel = async () => {
    await connectDB();

    const staffings = await Staffing.find({}).lean();

    return (
        <div className="space-y-4 py-3">
            {staffings.map((s) => (
                <StaffingCard key={s._id} staffing={s} />
            ))}
        </div>
      );
}

export default StaffingPanel;
