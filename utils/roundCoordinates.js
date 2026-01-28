export function roundLatLng(lat, lng, decimals = 3) {
    if (typeof lat !== "number" || typeof lng !== "number") {
        throw new Error("Invalid coordinates");
    }
  
    return {
        lat: Number(lat.toFixed(decimals)),
        lng: Number(lng.toFixed(decimals)),
    };
}
