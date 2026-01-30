// "use client";

// import React, { useMemo, useState } from "react";
// import Map, { Source, Layer, Popup } from "react-map-gl/mapbox";
// import "mapbox-gl/dist/mapbox-gl.css";

// export default function StaffingMap({ staffings }) {
//     const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
//     const [hoverInfo, setHoverInfo] = useState(null);

//     const features = useMemo(() => {
//         if (!staffings?.length) return [];

//         return staffings
//             .filter(s => s.location?.coordinates?.lat && s.location?.coordinates?.lng)
//             .map((s) => ({
//                 type: "Feature",
//                 geometry: {
//                   type: "Point",
//                   coordinates: [
//                     s.location.coordinates.lng,
//                     s.location.coordinates.lat
//                   ],
//                 },
//                 properties: {
//                     id: s._id,
//                     serviceType: s.serviceType,
//                     title: `${s.serviceType} services – approximate location`,
//                 },                  
//         }));
//     }, [staffings]);

//     const geojson = useMemo(() => ({
//         type: "FeatureCollection",
//         features,
//     }), [features]);

//     if (!features.length) {
//         return <div className="p-4 text-sm text-gray-500">No map data available</div>;
//     }

//     const circleLayer = {
//         id: "circle",
//         type: "circle",
//         paint: {
//             "circle-radius": [
//                 "interpolate",
//                 ["linear"],
//                 ["zoom"],
//                 9,   4,   // very small when zoomed out
//                 11,  8,
//                 13,  14,
//                 15,  22   // comfortable when zoomed in
//             ],  
//             "circle-color": [
//                 "match",
//                 ["get", "serviceType"],
//                 "OT", "#8699F6",  // bg-service-OT
//                 "PT", "#71BD85",  // bg-service-PT
//                 "ST", "#DA6736",  // bg-service-ST
//                 "SI", "#E276BE",  // bg-service-SI
//                 "ABA", "#F7DC4E", // bg-service-ABA
//                 "#9CA3AF"         // default gray
//             ],  
//             "circle-opacity": 0.45,
//             "circle-stroke-width": 1,
//             "circle-stroke-color": "#111827",
//             "circle-stroke-opacity": 0.6,
//         },
//     };

//     const hoverLayer = {
//         id: "circle-hover",
//         type: "circle",
//         filter: ["==", ["get", "id"], hoverInfo?.id || ""],
//         paint: {
//           "circle-radius": 28,
//           "circle-opacity": 0.25,
//           "circle-color": "#000",
//         },
//     };
      
//     return (
//         <div className="absolute inset-0">
//             <Map
//                 initialViewState={{
//                     longitude: features[0].geometry.coordinates[0],
//                     latitude: features[0].geometry.coordinates[1],
//                     zoom: 11,
//                 }}
//                 style={{ width: "100%", height: "100%" }}
//                 mapStyle="mapbox://styles/mapbox/streets-v11"
//                 mapboxAccessToken={token}
//                 interactiveLayerIds={["circle"]}
//                 onMouseMove={(e) => {
//                     if (!e.features?.length) {
//                         setHoverInfo(null);
//                         return;
//                     }

//                     const feature = e.features[0];
//                     if (!feature) return;

//                     // setHoverInfo({
//                     //     id: feature.properties.id,
//                     //     longitude: e.lngLat.lng,
//                     //     latitude: e.lngLat.lat,
//                     //     title: feature.properties.title,
//                     // });
//                     setHoverInfo({
//                         coordinates: feature.geometry.coordinates,
//                         items: feature.properties.items
//                       });

//                 }}
//                 onMouseEnter={() => {
//                     document.body.style.cursor = "default";
//                 }}
//                 onMouseLeave={() => {
//                     setHoverInfo(null);
//                     document.body.style.cursor = "default";
//                 }}  
//                 >
//                 <Source id="points" type="geojson" data={geojson}>
//                     <Layer {...circleLayer} />
//                     {hoverInfo && <Layer {...hoverLayer} />}
//                 </Source>

//                 {hoverInfo && (
//                     <Popup
//                         longitude={hoverInfo.longitude}
//                         latitude={hoverInfo.latitude}
//                         closeButton={false}
//                         closeOnClick={false}
//                         anchor="top"
//                         offset={[0, -8]}
//                     >
//                         <div className="text-xs font-medium">
//                             {hoverInfo.title}
//                         </div>
//                     </Popup>
//                 )}
//             </Map>
//         </div>
//     );
// }


"use client";

import React, { useMemo, useState } from "react";
import Map, { Source, Layer, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export default function StaffingMap({ staffings }) {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const [hoverInfo, setHoverInfo] = useState(null);

    const round = (num, decimals = 2) => {
        const factor = Math.pow(10, decimals);
        return Math.round(num * factor) / factor;
    };

    const features = useMemo(() => {
        if (!staffings?.length) return [];

        const groups = {};

        staffings
            .filter((s) => s.location?.coordinates?.lat && s.location?.coordinates?.lng)
            .forEach((s) => {
                const lat = round(s.location.coordinates.lat, 2);
                const lng = round(s.location.coordinates.lng, 2);
                const key = `${lat}-${lng}`;

                const title = `${s.serviceType} - ${s.workload.visits}x${s.workload.duration}/${s.workload.frequency} – approximate location`;

                if (!groups[key]) {
                groups[key] = {
                    lat,
                    lng,
                    titles: [],
                    serviceType: s.serviceType 
                };
            }

            groups[key].titles.push(title);
        });

        return Object.values(groups).map((g, idx) => ({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [g.lng, g.lat],
            },
            properties: {
                id: `loc-${idx}`,
                titles: JSON.stringify(g.titles),
                serviceType: g.serviceType,
            },
        }));
    }, [staffings]);

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
            mapStyle="mapbox://styles/mapbox/light-v10"
            // mapStyle="mapbox://styles/palina/cml191eta00c301s33eytffih"
            // mapStyle="mapbox://styles/palina/cml19ex6e00ha01qreais9dqn"
            mapboxAccessToken={token}
            interactiveLayerIds={["circle"]}
            onMouseMove={(e) => {
                if (!e.features?.length) {
                    setHoverInfo(null);
                    return;
                }

                const feature = e.features[0];
                if (!feature) return;

                setHoverInfo({
                    id: feature.properties.id,
                    longitude: feature.geometry.coordinates[0],
                    latitude: feature.geometry.coordinates[1],
                    properties: feature.properties,
                });
            }}

            onMouseEnter={() => {
                document.body.style.cursor = "default";
            }}

            onMouseLeave={() => {
                setHoverInfo(null);
                document.body.style.cursor = "default";
            }}
        >
            <Source id="points" type="geojson" data={geojson}>
                <Layer {...circleLayer} />
                {hoverInfo && <Layer {...hoverLayer} />}
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
                        {JSON.parse(hoverInfo.properties.titles).map((t, index) => (
                            <div key={index}>{t}</div>
                        ))}
                    </div>
                </Popup>
            )}
        </Map>
        </div>
    );
}
