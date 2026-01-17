import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function StaffingCard({ staffing }) {
    const { serviceType, status, workload, location, preferredSchedule, caseId, coordinator } = staffing;

    const workloadText = workload
        ? `${workload.visits}x${workload.duration}/${workload.frequency}`
        : "Not set";

    const coordLine = coordinator
    ? `${coordinator.name} • ${coordinator.phone} • ${coordinator.email}`
    : "Coordinator info not set";

    return (
        <Card className="w-full border-default">
            <CardHeader>
                <CardTitle className="text-lg font-bold">
                    {serviceType} {workloadText}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-1">
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
