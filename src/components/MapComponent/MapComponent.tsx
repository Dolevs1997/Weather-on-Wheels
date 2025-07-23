import { Map } from "@vis.gl/react-google-maps";
import style from "./MapComponent.module.css";
import { useEffect, useState } from "react";

interface Coord {
  lat: number;
  lon: number;
}

type Place = {
  country: string;
  cityName: string;
  coord: Coord;
};
const MapComponent = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  useEffect(() => {
    async function fetchWeatherData() {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=45017ea56ecca68d10012b50cec53ea5`
      );
      if (!response.ok) {
        console.error("Failed to fetch weather data");
        return;
      }
      const data = await response.json();

      console.log("Weather data:", data);
      setPlaces(
        data.city.map((item: Place) => ({
          country: item.country,
          cityName: item.cityName,
          coord: {
            lat: item.coord.lat,
            log: item.coord.lon,
          },
        }))
      );
      console.log("places", places);
    }
    fetchWeatherData();
  }, [places]);
  return (
    <div className={style.mapContainer}>
      <Map
        mapId="ca47a18342e53752ad95b0d0"
        style={{ width: "50vw", height: "100vh" }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={13}
        disableDefaultUI={true}
      />
    </div>
  );
};
export default MapComponent;
