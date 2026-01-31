"use client";

import React, { useMemo, useState } from "react";
import Map, { Source, Layer, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export default function StaffingMap({ staffings, selectedStaffingId, onSelectStaffing }) {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const [hoverInfo, setHoverInfo] = useState(null);

    // Build grouped features
    const features = useMemo(() => {
        if (!staffings?.length) return [];

        const groups = {};

        staffings
            .filter((s) => s.location?.coordinates?.lat && s.location?.coordinates?.lng)
            .forEach((s, idx) => {
                const lat = s.location.coordinates.lat;
                const lng = s.location.coordinates.lng;
                const key = `${lat}-${lng}`;

                if (!groups[key]) {
                    console.log("serviceType", s.serviceType)
                groups[key] = { lat, lng, items: [], serviceType: s.serviceType };
                }

                groups[key].items.push({
                id: s._id || `${key}-${idx}`,
                serviceType: s.serviceType,
                workloadText: `${s.workload.visits}x${s.workload.duration}/${s.workload.frequency}`,
                });
            });

        return Object.values(groups).map((g, idx) => ({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [g.lng, g.lat],
            },
            properties: {
                id: `loc-${idx}`,
                items: g.items,
                serviceType: g.serviceType
            },
        }));
    }, [staffings]);

    // Find the group containing the selected staffing
    const selectedGroupId = useMemo(() => {
        if (!selectedStaffingId) return null;

        const group = features.find((f) =>
            (f.properties.items || []).some((item) => item.id === selectedStaffingId)
        );

        return group?.properties?.id || null;
    }, [features, selectedStaffingId]);

    const geojson = useMemo(
        () => ({
            type: "FeatureCollection",
            features,
        }),
        [features]
    );

    if (!features.length) {
        return (
            <div className="p-4 text-sm text-gray-500">No map data available</div>
        );
    }

    const circleLayer = {
        id: "circle",
        type: "circle",
        paint: {
            "circle-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                9,   6,   // very small when zoomed out
                11,  12,
                13,  18,
                15,  26   // comfortable when zoomed in
            ],  
            "circle-color": [
                "match",
                ["get", "serviceType"],
                "OT", "#8699F6",  // bg-service-OT
                "PT", "#71BD85",  // bg-service-PT
                "ST", "#DA6736",  // bg-service-ST
                "SI", "#E276BE",  // bg-service-SI
                "ABA", "#F7DC4E", // bg-service-ABA
                "#9CA3AF"         // default gray
            ],  
            "circle-opacity": 0.8,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#6b727f",
            "circle-stroke-opacity": 0.6,
        },
    };

    // selected circle layer (highlight)
    const selectedLayer = {
        id: "circle-selected",
        type: "circle",
        filter: ["==", ["get", "id"], selectedGroupId || ""],
        paint: {
            "circle-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                9, 8,
                11, 16,
                13, 24,
                15, 34,
        ],
        "circle-color": "#88CE26",   // highlight
        "circle-opacity": 0.65,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#88CE26",
        },
    };

    return (
        <div className="absolute inset-0">
            <Map
                initialViewState={{
                    longitude: features[0].geometry.coordinates[0],
                    latitude: features[0].geometry.coordinates[1],
                    zoom: 11,
                }}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/light-v10"
                mapboxAccessToken={token}
                interactiveLayerIds={["circle"]}
                onMouseMove={(e) => {
                    if (!e.features?.length) {
                        setHoverInfo(null);
                        return;
                    }

                    const feature = e.features[0];
                    if (!feature) return;

                    const items = Array.isArray(feature.properties.items)
                        ? feature.properties.items
                        : JSON.parse(feature.properties.items || "[]");

                    setHoverInfo({
                        id: feature.properties.id,
                        longitude: feature.geometry.coordinates[0],
                        latitude: feature.geometry.coordinates[1],
                        items,
                    });
                }}
                onMouseLeave={() => {
                setHoverInfo(null);
                }}
            >

                <Source id="points" type="geojson" data={geojson}>
                    <Layer {...circleLayer} />
                    {selectedGroupId && <Layer {...selectedLayer} />}
                </Source>

                {hoverInfo && (
                    <Popup
                        longitude={hoverInfo.longitude}
                        latitude={hoverInfo.latitude}
                        closeButton={false}
                        closeOnClick={false}
                        anchor="top"
                        offset={[0, -8]}
                    >
                        <div className="text-xs font-medium">
                            {hoverInfo.items.map((item, idx) => (
                                <div
                                key={`${item.id}-${idx}`}
                                className="cursor-pointer hover:text-blue-600"
                                onClick={() => onSelectStaffing(item.id)}
                                >
                                {item.serviceType} - {item.workloadText} – approximate location
                                </div>
                            ))}
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}


