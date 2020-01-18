//https://darksky.net/dev/account

function setup() {
  let lat, lng;
  noCanvas();

  const button = document.getElementById('geo')
  // src="geolocation.js"


  if( 'geolocation' in navigator) {

    console.log('geolocation available');

    //arrow sintax => substitutes for function(position)

    navigator.geolocation.getCurrentPosition(async position=> {

      let lat,lng,weatherStat,temperature,pm25_status,pm10_status;


    try{
       lat = position.coords.latitude;
       lng = position.coords.longitude;

      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = lng;
      //  console.log(position.coords);

      //const api_url =`/weather`;
      const api_url =`weather/${lat},${lng}`;

      const response = await fetch(api_url);
      const json = await response.json();
      console.log(json);


      const api_aq_url =`airq/${lat},${lng}`;
      const response_aq = await fetch(api_aq_url);
      const json_aq = await response_aq.json();
      console.log(json_aq);

      weatherStat = json.currently.summary;
      temperature = json.currently.temperature;

      document.getElementById('summary').textContent = weatherStat;
      document.getElementById('temperature').textContent = temperature ;

      //Handling aq request and response

      const pm25 = json_aq.results[0].measurements[0];
      const pm10 = json_aq.results[0].measurements[1];

      pm25_status = pm25.value;
      pm10_status = pm10.value;

       document.getElementById('pm25').textContent = pm25_status;
       document.getElementById('last_aq_update_pm25').textContent = pm25.lastUpdated;
       document.getElementById('pm10').textContent = pm10_status;
       document.getElementById('last_aq_update_pm10').textContent = pm10.lastUpdated;

    } catch(error){

      lat = position.coords.latitude;
      lng = position.coords.longitude;

      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = lng;
      //  console.log(position.coords);

      //const api_url =`/weather`;
      const api_url =`weather/${lat},${lng}`;

      const response = await fetch(api_url);
      const json = await response.json();
      console.log(json);

      console.log('No aq data');

      document.getElementById('pm25').textContent = 'No aq data';
      document.getElementById('last_aq_update_pm25').textContent= 'No aq data';
      document.getElementById('pm10').textContent= 'No aq data';
      document.getElementById('last_aq_update_pm10').textContent= 'No aq data';

      weatherStat = 'No data'
      temperature = -1
      pm25_status = -1
      pm10_status = -1

      }


      button.addEventListener('click', async event => {

      const data = {lat,lng,weatherStat,temperature,pm25_status,pm10_status};
      const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(data),
      };
        const response = await fetch('/api',options);
        const json_data = await response.json();
        console.log(json_data);
      });



    });

  } else {
      console.log('geolocation not available');
  }
}


