const geocodeLocation = async (location, country) => {
  try {
    const query = `${location}, ${country}`;

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${process.env.MAPBOX_TOKEN}`
    );

    const data = await response.json();

    if (data.features.length > 0) {
      const [lng, lat] = data.features[0].center;

      return {
        latitude: lat,
        longitude: lng
      };
    }

    return {
      latitude: 20.5937,
      longitude: 78.9629
    };

  } catch (err) {
    console.log("Geocode error:", err.message);

    return {
      latitude: 20.5937,
      longitude: 78.9629
    };
  }
};

module.exports = { geocodeLocation };