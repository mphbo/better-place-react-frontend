import { getDistance } from "geolib";
import Geocode from "react-geocode";

export const getDistances = (lat, lng, opps) => {
  const rows = [...opps];

  rows.forEach((opp) => {
    opp.distance = getDistance(
      { latitude: Number(opp.lat), longitude: Number(opp.lng) },
      { latitude: lat, longitude: lng }
    );
  });
  return rows;
};

export const getCoords = (address) => {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
  Geocode.setLanguage("en");

  Geocode.setLocationType("ROOFTOP");

  Geocode.enableDebug();
  let coords = "";
  return Geocode.fromAddress(address).then(
    (response) => {
      coords = response.results[0].geometry.location;
      return coords;
    },
    (error) => {
      console.error(error);
    }
  );
};
//
