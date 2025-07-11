const axios = require('axios');

exports.getPlaceSuggestions = async (req, res) => {
  const query = req.query.query;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  try {
    // Autocomplete API: Get up to 5 predictions
    const autoRes = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
      {
        params: {
          input: query,
          key: apiKey,
          components: 'country:MY', // Optional: limit to Malaysia
        },
      }
    );

    const predictions = autoRes.data.predictions;
    //console.log("xxxx", autoRes);
    // Fetch details for top 5 predictions in parallel
    const detailRequests = predictions.slice(0, 5).map((prediction) =>
      axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
        params: {
          place_id: prediction.place_id,
          key: apiKey,
        },
      })
    );

    const detailResponses = await Promise.all(detailRequests);
    const detailedPlaces = detailResponses.map((resp) => resp.data.result);

    res.json({ results: detailedPlaces });
  } catch (err) {
    console.error('Autocomplete error:', err.message);
    res.status(500).json({ error: 'Failed to fetch place suggestions' });
  }
};
