

//gitint - initialize github directory
//



// https://github.com/louischatriot/nedb
//first we used npm init
// secondly we used npm install express
// now we call the express package into the script
const express = require('express');

//adding nedb package dependancy to be able to start the data base
const DataStore = require('nedb');
const app = express();
const fetch = require('node-fetch');

const port = process.env.PORT || 3000;

app.listen(port,  ()=> {
  console.log(`Starting Server at ${port}`)
});
app.use(express.static('public')); //public is the directory name
app.use(express.json({limit:'1mb'}));
require('dotenv').config();

//Loging in server enviorment variables
console.log(process.env);


//starting the data base

const database = new DataStore('database.db'); //Datastore('nameOfDataBase')
database.loadDatabase(); // this function either creates the file for storage or
//logs in the preexisting db file


/// get function service
/// El ordern de la funcion afecta al servidor (request, response)
app.get('/api2',(request,response) => {
  database.find({},(err,data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  }); // ({}) this means it will do a querry for everything
});


app.post('/api',(request,response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp  = timestamp;
  // inster elements into data base
  console.log(data);
  database.insert(data);
  response.json({
    status: 'succes',
    timestamp: timestamp,
    latitude: data.lat,
    longitud: data.lng,
    //   const data = {lat,lng,weatherStat,temperature,pm25_status,pm10_status};
    weather: data.weatherStat,
    temperature: data.temperature,
    pm25_: data.pm25_status,
    pm10_status:data.pm10_status
  })
  // response.end(); // important to end the response process
}); // seting up an addres ('/api') & and a callback function


//we make a new endo point to avoid CORS error;
//This basically ensures that the api request is done from a server and not from the client side
// this is called a proxy server
app.get('/weather/:latlng', async  (request,response) =>{

  //   request.params[latlon] also works
  console.log(request.params);
  const latlng = request.params.latlng.split(',');
  console.log(latlng);
  // const lat = request.params.lat;
  // const lng = request.params.lng;
  const lat = latlng[0];
  const lng = latlng[1];
  //console.log(lat,lng);
  const api_key_dark = process.env.API_KEY;
  console.log(api_key_dark);
  const api_url =`https://api.darksky.net/forecast/${api_key_dark}/${lat},${lng}/?units=si`;
  console.log(api_url);
  //const api_url =`https://api.darksky.net/forecast/d9053ac200cc24128b3c51edb0f36e9a/48.1817667,11.6117022`;
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});

app.get('/airq/:latlng', async (request,response)=>{
  console.log(request.params);
  const latlng = request.params.latlng.split(',');
  console.log(latlng);

  const lat = latlng[0];
  const lng = latlng[1];
  console.log(lat,lng);
  const api_url =`https://api.openaq.org/v1/latest?coordinates=${lat},${lng}`;

  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);

} )




///
