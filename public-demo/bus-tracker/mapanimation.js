// helper functions

const getData = async function (url) {
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
};

const createMap = function (config, accessToken) {
  mapboxgl.accessToken = accessToken;
  let map = new mapboxgl.Map(config);
  return map;
};

const createMarker = function (map, longLat) {
  let marker = new mapboxgl.Marker().setLngLat(longLat).addTo(map);
  return marker;
};

function moveMarker(marker, counter, locations) {
  setTimeout(() => {
    if (counter >= locations.length) return;
    marker.setLngLat(locations[counter]);
    counter++;
    moveMarker(marker, counter, locations);
  }, 1000);
}

async function main() {
  const secrets = {};

  // NOTE: REMOVE SECRETS BEFORE GIT ADD/COMMIT
  secrets.MBTA_API_KEY = "";
  secrets.MAPBOX_API_KEY = "";
  secrets.MAPBOX_ACCESS_TOKEN = "";

  const map = createMap(
    {
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-71.142554, 42.406066],
      zoom: 13,
    },
    secrets.MAPBOX_ACCESS_TOKEN
  );

  const locations = [];
  let counter = 0;

  getData(
    `https://api-v3.mbta.com/stops?filter[route]=77&filter[direction_id]=0&api_key=${secrets.MBTA_API_KEY}`
  ).then(function (data) {
    data.map((busStop) => {
      locations.push([
        busStop.attributes.longitude,
        busStop.attributes.latitude,
      ]);
    });

    // create and move marker
    const marker = createMarker(map, locations[0]);
    moveMarker(marker, counter, locations);
  });
}

window.onload = () => {
  main();
};
