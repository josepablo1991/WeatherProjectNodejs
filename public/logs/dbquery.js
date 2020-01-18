
   getData();

   async function getData() {
     const response = await fetch('/api2'); // we can reuse the route '/api' because it will be handle as a get request
     const data = await response.json();

     for (item of data) {
       const root = document.createElement('p');

       const location = document.createElement('div');
       location.textContent = `location: ${item.lat}º ${item.lng}º`;

       const date = document.createElement('div');
       const DateString = new Date(item.timestamp).toLocaleString();
       date.textContent = DateString;

       const weatherStat = document.createElement('div');
       weatherStat.textContent = `Weather Summary: ${item.weatherStat}`;

       const temperature = document.createElement('div');
       temperature.textContent = `Temperature: ${item.temperature}`;

       const pm25_status = document.createElement('div');
       pm25_status.textContent = `pm25 [µg/m³]: ${item.pm25_status}`;

       const pm10_status = document.createElement('div');
       pm10_status.textContent = `pm10 [µg/m³]: ${item.pm10_status}`;

       root.append(location,date,weatherStat,temperature,pm25_status,pm10_status);
       document.body.append(root);

     }
     console.log(data);
   };


//
// <script src="../p5.min.js"></script>
// <script src="../addons/p5.dom.min.js"></script>
// <script src="../addons/p5.sound.min.js"></script>