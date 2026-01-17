import connectDB from "@/config/database";
import Staffing from "@/models/Staffing";

const StaffingPanel = async () => {
    await connectDB();

    const staffings = await Staffing.find({}).lean();

    return (
        <div className="space-y-4 py-3">
            StaffingPanel
          {/* <StaffingCard />
          <StaffingCard />
          <StaffingCard /> */}
        </div>
      );
}

export default StaffingPanel;
