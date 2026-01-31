import StaffingCard from "./StaffingCard";
import StaffingPanelHeader from "./StaffingPanelHeader";

export default function StaffingPanel({ staffings, selectedStaffingId, onSelectStaffing }) {
    return (
        <div className="bg-surface h-full flex flex-col">
            <div className="sticky top-0 z-10 border-b border-default">
                <StaffingPanelHeader total={staffings.length} />
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="space-y-3 p-4">
                    {staffings.map((s) => (
                        <StaffingCard 
                            key={s._id} 
                            staffing={s}
                            isSelected={s._id === selectedStaffingId}
                            onSelect={() => onSelectStaffing(s._id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
