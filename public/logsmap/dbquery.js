
//Making a map and tiles
  const mymap = L.map('weatherMap').setView([0,0], 0);
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl, { attribution });
  let firstLoad = true;

  tiles.addTo(mymap);


  async function getData() {

     const response = await fetch('/api2'); // we can reuse the route '/api' because it will be handle as a get request
    const data = await response.json();
    console.log(data);

   //  L.marker([latitude, longitude]).addTo(mymap);
   for (item of data) {

     const lat = item.lat;
     const lng = item.lng;0
     const day = new Date(item.timestamp).getDate();
     const month = new Date(item.timestamp).getMonth()+1;
     const year = new Date(item.timestamp).getFullYear();

     const txt =  `<p>
        latitude: ${lat}
        longitud: ${lng}
      </p>
      <p>The weather here was ${item.weatherStat} with a temperature of ${item.temperature}&deg; C
        </p>

        <p>pm25 [µg/m³]:  ${item.pm25_status}  </br>
          pm 10 [µg/m³]:  ${item.pm10_status} </br>
          Registered Time: ${day}/${month}/${year}
        </p>`


    console.log(lat,lng);
     const marker = L.marker([lat,lng]).addTo(mymap);
     marker.bindPopup(txt);
     if(firstLoad){
     mymap.setView([lat,lng],3);
     firstLoad = false;

     }
    }
   }
getData();
