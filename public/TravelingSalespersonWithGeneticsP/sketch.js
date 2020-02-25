var cities =[];
var totalCities = 12;

var count=0;

var logs= [];

var population = []; // population of many orders
var populationSize =1000;
var fitness = [];
// var d = [];
 var dsum = 0;

var bestEver = [];
var order = [];

var recordDistance = Infinity;
var mr = 0.01;


function setup() {
  width = 800;
  height = 800;
  createCanvas(width,height);
  var order = [];

  for (var i=0 ; i < totalCities ; i++ ){
    var v = createVector(random(width),random(height/2));
    cities[i] = v;
    order[i] = i;
  }

  for(var i=0; i< populationSize; i++){
    population[i] = order.slice(); // slice() makes a copy partial or entire of an array
    shuffle(population[i],10);
  }

  statusP = createP('').style('font-size', '32pt');


}

function draw() {

  calcFitness();
  normalizeFitness();


  background(0);
  stroke(255);
  beginShape();
  fill(255);
  for(var i = 0; i < cities.length; i++ ) {
    ellipse(cities[i].x,cities[i].y,8,8);
  }
//
  ///Make new shape

    beginShape();
    stroke(255,0,255);
    strokeWeight(2);
    noFill();
    for(var i = 0; i < bestEver.length; i++ ) {
      var n = bestEver[i]
      vertex(cities[n].x,cities[n].y);
    }
    noFill();
    endShape();

    nextGeneration();

    translate(0, height / 2);

///


  beginShape();
  stroke(255);
  strokeWeight(0.5);
  noFill();
  for (var i =0;i<population.length;i++){
      for(var j = 0; j < population[i].length; j++ ) {
        var n = population[i][j];
        vertex(cities[n].x,cities[n].y);
      }
  }
  noFill();
  endShape();

  count += 1 + populationSize;

console.log(6);

//  textSize(12);
//  var s = '';
//  for (var i=0; i< order.length;i++ ){
//   s +=order[i];
//  }
//  fill(255);
//  text(s,20,height/2 - 50 );
//  text( '%'+ progress ,20,height/2 - 30 );
//  text( 'Total Cities '+ totalCities ,20,height/2 - 20 );
//  nextOrder();
//
}

