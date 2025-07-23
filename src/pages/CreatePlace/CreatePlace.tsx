import { useState } from "react";
import styles from "./CreatePlace.module.css";
import Spinner from "react-bootstrap/Spinner";
import { APIProvider } from "@vis.gl/react-google-maps";
import MapComponent from "../../components/MapComponent/MapComponent";

const CreatePlace = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [placeName, setPlaceName] = useState("");
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!placeName) {
      alert("Please enter a place name");
      return;
    }
    setIsLoading(true);

    //mock API call
    setTimeout(() => {
      setIsLoading(false);
      setPlaceName("");
    }, 3000);
    await fetch(`api/place/${placeName}`, {
      method: "POST",
    });
  }

  return (
    <div className={styles.containerCreatePlace}>
      <h1>Weather On Wheels🌍</h1>
      <h2>Create a new place</h2>
      <form className={styles.createPlaceForm}>
        <input
          type="text"
          placeholder="Enter place name"
          className={styles.input}
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Search for Place
        </button>
      </form>
      {isLoading && <Spinner animation="border" variant="success" />}
      <APIProvider apiKey="">
        <MapComponent />
      </APIProvider>
    </div>
  );
};
export default CreatePlace;
