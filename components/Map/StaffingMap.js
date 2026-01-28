// const StaffingMap = ({ staffings }) => {
//     return (
//         <div className="absolute inset-0">
//             {/* <MapboxMap /> */}
//             {/* Render map based on staffings */}
//             MapboxMap
//         </div>
//     );
// }

// export default StaffingMap;

"use client";

import React, { useMemo, useState } from "react";
import Map, { Source, Layer } from "react-map-gl/mapbox";

export default function StaffingMap({ staffings }) {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const [hoverInfo, setHoverInfo] = useState(null);

    const features = useMemo(() => {
        if (!staffings?.length) return [];

        return staffings
            .filter(s => s.location?.coordinates?.lat && s.location?.coordinates?.lng)
            .map((s) => ({
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [
                    s.location.coordinates.lng,
                    s.location.coordinates.lat
                  ],
                },
                properties: {
                    id: s._id,
                    serviceType: s.serviceType,
                    title: `${s.serviceType} services – approximate location`,
                },                  
        }));
    }, [staffings]);

    const geojson = useMemo(() => ({
        type: "FeatureCollection",
        features,
    }), [features]);

    if (!features.length) {
        return <div className="p-4 text-sm text-gray-500">No map data available</div>;
    }

    const circleLayer = {
        id: "circle",
        type: "circle",
        paint: {
            // "circle-radius": 80,
            "circle-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                9,   4,   // very small when zoomed out
                11,  8,
                13,  14,
                15,  22   // comfortable when zoomed in
            ],  
            // "circle-color": "#7C3AED",
            "circle-color": [
                "match",
                ["get", "serviceType"],
                "OT", "#3B82F6",  // bg-service-OT
                "PT", "#22C55E",  // bg-service-PT
                "ST", "#A855F7",  // bg-service-ST
                "SI", "#F97316",  // bg-service-SI
                "ABA", "#EF4444", // bg-service-ABA
                "#9CA3AF"         // default gray
            ],  
            // "circle-opacity": 0.18,
            // "circle-stroke-color": "#7C3AED",
            // "circle-stroke-width": 2,
            // "circle-stroke-opacity": 0.7,
            "circle-opacity": 0.45,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#111827",
            "circle-stroke-opacity": 0.6,
        },
    };

    const hoverLayer = {
        id: "circle-hover",
        type: "circle",
        filter: ["==", ["get", "id"], hoverInfo?.id || ""],
        paint: {
          "circle-radius": 28,
          "circle-opacity": 0.25,
          "circle-color": "#000",
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
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={token}
                interactiveLayerIds={["circle"]} // 👈 important
                onMouseEnter={() => {
                    document.body.style.cursor = "pointer";
                }}
                onMouseMove={(e) => {
                    if (!e.features?.length) return;
                    const feature = e.features[0];
                  
                    setHoverInfo({
                      longitude: e.lngLat.lng,
                      latitude: e.lngLat.lat,
                      title: feature.properties.title,
                    });
                }}
                  
                onMouseLeave={() => {
                    setHoverInfo(null);
                    document.body.style.cursor = "";
                }}  
            >
                <Source id="points" type="geojson" data={geojson}>

                {hoverInfo && (
                    <div
                        className="absolute bg-white px-2 py-1 rounded shadow text-xs pointer-events-none"
                        style={{
                        left: "50%",
                        top: "10px",
                        transform: "translateX(-50%)",
                        }}
                    >
                        {hoverInfo.title}
                    </div>
                )}
                <Layer {...circleLayer} />
                    {hoverInfo && <Layer {...hoverLayer} />}

                </Source>
            </Map>
        </div>
    );
}
