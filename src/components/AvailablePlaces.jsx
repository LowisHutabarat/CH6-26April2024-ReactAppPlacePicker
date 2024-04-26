import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

// const places = localStorage.getItem('places')

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [error, setError] = useState()

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true)

      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json()
      // logic jika ada error dari hit api backend
        if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      setAvailablePlaces(resData.places);

      } catch(error) {
        setError({message: error.message || "Could not fetch data, please try again later !"});
      }

      setIsFetching(false)
    }
    fetchData();
  }, []);

  if (error) {
    return <Error title="An error eccoured!" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Wait.... Data is Fetching. . ."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
