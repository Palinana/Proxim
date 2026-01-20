import connectDB from "@/config/database";
import Staffing from "@/models/Staffing";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

import MapContainer from "../components/Map/MapContainer";
import FilterBar from "../components/Filter/FilterBar";
import StaffingPanel from "../components/Staffing/StaffingPanel";
import MobileStaffingToggle from "@/components/Staffing/MobileStaffingToggle";

const Dashboard = async ({ searchParams }) => {
    await connectDB();

    const params = await searchParams;

    const session = await getServerSession(authOptions);
    const role = session?.user?.role;
    const userId = session?.user?.id;

    const query = {};

    // Admin sees only their own staffing
    if (role === "admin") {
        query.coordinator = userId;
    }

    // Public filter by admin link
    if (!role && params?.admin) {
        query.coordinator = params.admin;
    }

    // Filters
    if (params?.borough) query["location.city"] = params.borough;
    if (params?.service) query.serviceType = params.service;
    if (params?.status) query.status = params.status;

    if (params?.zip) {
        query["location.zipcode"] = { $in: params.zip.split(",") };
    }

    // Mandate filter (visits x duration)
    if (params?.mandate) {
        const mandates = params.mandate.split(",");
        const mandateQueries = mandates.map((m) => {
        const [visits, duration] = m.split("x").map(Number);
        return {
            "workload.visits": visits,
            "workload.duration": duration,
        };
        });
        query.$or = mandateQueries;
    }

    // role-based visibility
    if (role === "admin") {
        query.coordinator = userId;
    }
    
    // public share link (admin=ID)
    if (params.admin) {
        query.coordinator = params.admin;
    }

    const sort = params?.sort === "old" ? 1 : -1;

    const staffings = await Staffing.find(query)
        .sort({ createdAt: sort })
        .lean();

    return (
        <div className="flex flex-col h-full">
            <div className="border-b bg-background px-6 md:px-8 py-3">
                <FilterBar />
            </div>

            <div className="flex flex-1 overflow-hidden bg-card">
                <aside className="hidden md:block w-[420px] lg:w-[480px] border-r border-default overflow-y-auto pl-6 md:pl-8 pr-0">
                    <StaffingPanel staffings={staffings} />
                </aside>

                <section className="flex-1 relative bg-surface">
                    <MapContainer staffings={staffings} />

                    <MobileStaffingToggle>
                        <StaffingPanel staffings={staffings} />
                    </MobileStaffingToggle>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
