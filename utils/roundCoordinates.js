export function roundLatLng(lat, lng, decimals = 3) {
    if (
        typeof lat !== "number" ||
        typeof lng !== "number" ||
        lat < -90 || lat > 90 ||
        lng < -180 || lng > 180
    ) {
        throw new Error("Invalid coordinates");
    }
  
    return {
        lat: Number(lat.toFixed(decimals)),
        lng: Number(lng.toFixed(decimals)),
    };
}
  