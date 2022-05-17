// helper functions

// const getData = async function (url) {
//   const response = await fetch(url);
//   const json = await response.json();
//   return json.data;
// };

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
  secrets.MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiY3NrYXJvdWxpcyIsImEiOiJjbDJ0Nm13bTgwMWR5M2VubzFhNjlvdjk3In0.6k5UuNZEzw4WOUt01ICgPA";

  const map = createMap(
    {
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-71.142554, 42.406066],
      zoom: 12,
    },
    secrets.MAPBOX_ACCESS_TOKEN
  );

  // const locations = [];
  let counter = 0;

  // getData(
  //   `https://api-v3.mbta.com/stops?filter[route]=77&filter[direction_id]=0&api_key=${secrets.MBTA_API_KEY}`
  // ).then(function (data) {
  //   data.map((busStop) => {
  //     locations.push([
  //       busStop.attributes.longitude,
  //       busStop.attributes.latitude,
  //     ]);
  //   });
  let locations = [
    [-71.118956, 42.373362],
    [-71.119941, 42.377805],
    [-71.119571, 42.381631],
    [-71.119263, 42.384891],
    [-71.119253, 42.388034],
    [-71.119806, 42.389308],
    [-71.123235, 42.391505],
    [-71.124913, 42.392855],
    [-71.126799, 42.394514],
    [-71.12889, 42.396361],
    [-71.130684, 42.397954],
    [-71.133258, 42.399844],
    [-71.13535, 42.400762],
    [-71.136788, 42.401469],
    [-71.138361, 42.402768],
    [-71.14048, 42.404463],
    [-71.142554, 42.406066],
    [-71.145042, 42.408008],
    [-71.146681, 42.409321],
    [-71.14824, 42.41151],
    [-71.149407, 42.413326],
    [-71.151369, 42.414833],
    [-71.153427, 42.415673],
    [-71.156865, 42.416337],
    [-71.159705, 42.416736],
    [-71.164714, 42.417833],
    [-71.167129, 42.418987],
    [-71.169933, 42.420463],
    [-71.172726, 42.422001],
    [-71.17585, 42.423592],
    [-71.179491, 42.424217],
    [-71.182803, 42.424328],
    [-71.184975, 42.424903],
  ];

  // create and move marker
  const marker = createMarker(map, locations[0]);
  moveMarker(marker, counter, locations);
  // });
}

window.onload = () => {
  main();
};
