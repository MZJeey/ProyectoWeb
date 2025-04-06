const areaData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-74.006, 40.7128], // NY
            [-118.2437, 34.0522], // LA
            [-99.1332, 19.4326], // CDMX
          ],
        ],
      },
    },
  ],
};

new Mapkick.Map("map", areaData, {
  provider: "mapbox",
  style: "mapbox://styles/mapbox/dark-v10",
});
