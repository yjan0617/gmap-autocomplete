export const fetchPlaces = async (query) => {
  try {
    const res = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.results; // Array of detailed places
  } catch (err) {
    console.error('Error fetching places:', err);
    return [];
  }
};
