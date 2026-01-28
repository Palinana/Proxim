export async function geocodeAddress(address) {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ;
  
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=${token}&limit=1`;
  
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Failed to geocode address");
    }
  
    const data = await res.json();
  
    if (!data.features || !data.features.length) {
        throw new Error("No geocoding result found");
    }
  
    const [lng, lat] = data.features[0].center;
    return { lat, lng };
}
  