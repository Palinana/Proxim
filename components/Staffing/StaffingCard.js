import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function getServiceColor(type) {
    switch (type) {
        case "OT": return "bg-blue-500";
        case "PT": return "bg-green-500";
        case "ST": return "bg-red-500";
        case "SI": return "bg-pink-500";
        case "ABA": return "bg-yellow-500";
        default: return "bg-gray-400";
    }
}

export default function StaffingCard({ staffing }) {
    const { serviceType, status, workload, location, preferredSchedule, caseId, coordinator } = staffing;

    const workloadText = workload
        ? `${workload.visits}x${workload.duration}/${workload.frequency}`
        : "Not set";

    const coordLine = coordinator
        ? `${coordinator.name} • ${coordinator.phone} • ${coordinator.email}`
        : "Coordinator info not set";

    return (
        <Card className="w-full border-default bg-staffing-card">
            <CardHeader className="flex items-start justify-between py-3 px-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${getServiceColor(serviceType)}`} />
                    {serviceType} {workloadText}
                </CardTitle>
            </CardHeader>

            <CardContent className="pt-0 pb-3 px-4 space-y-1 text-sm">
                <div><strong>Status:</strong> {status}</div>
                <div><strong>EI #:</strong> {caseId || "N/A"}</div>

                <div>
                    <strong>Location:</strong> {location.city}, {location.state} {location.zipcode}
                </div>
                <div>
                    <strong>Preferred:</strong>{" "}
                    {preferredSchedule?.length ? preferredSchedule.join(", ") : "Any"}
                </div>

                <div className="pt-2 border-t border-gray-200 text-sm text-muted">
                <div><strong>Coordinator:</strong> {coordinator?.name}</div>
                    <div className="text-xs text-muted-foreground">
                        {coordinator?.phone} • {coordinator?.email}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
