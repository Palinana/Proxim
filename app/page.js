import MapContainer from '../components/Map/MapContainer';
import FilterBar from '../components/Filter/FilterBar';
import StaffingPanel from '../components/Staffing/StaffingPanel';

const Dashboard = () => {

    return (
         <div className="flex flex-col h-full">
            {/* 1. Filter Bar */}
            <div className="border-b bg-background px-6 md:px-8 py-3">
                <FilterBar />
            </div>
        
            {/* 2. Main Content */}
            <div className="flex flex-1 overflow-hidden bg-card ">

                {/* Staffings (desktop only) */}
                <aside className="hidden md:block w-[420px] lg:w-[480px] bg-surface border-r border-default overflow-y-auto px-6 md:px-8">
                    <StaffingPanel />
                </aside>

                {/* Map */}
                <section className="flex-1 relative bg-surface">
                    <MapContainer />

                    {/* Mobile Staffings Button */}
                    <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                        StaffingsPanelSheetTrigger
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;
