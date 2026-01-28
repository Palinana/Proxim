import { geocodeAddress } from "./geocodeAddress";
import { roundLatLng } from "./roundCoordinates";

export async function getApproximateLocation({ street, city, state, zipcode }) {
    const fullAddress = `${street}, ${city}, ${state} ${zipcode}`;

    const { lat, lng } = await geocodeAddress(fullAddress);

    // Round to ~110m accuracy
    return roundLatLng(lat, lng, 3);
}
