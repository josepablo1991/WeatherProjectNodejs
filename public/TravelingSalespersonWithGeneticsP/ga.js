  // Functions relevant for genetic algorithm

function calcFitness() {
  for(var i=0;i<population.length;i++){

      var d = calcDistance(cities,population[i]);
        fitness[i] =d;
      if(d < recordDistance){
        recordDistance = d;
        bestEver = population[i];
        logs.push(d.toFixed(2));
      }
      fitness[i]= 1/(d+1);
  }
}

function normalizeFitness(){
  var sum = 0;
  for (var i=0; i<fitness.length;i++){

    sum += fitness[i];
    fitness[i] = fitness[i]/sum;
  }
}

function nextGeneration(){

  var newPopulation = [];
  for( var i=0; i < population.length; i++){

    popA = pickOne(population,fitness);
    popB = pickOne(population,fitness);
    order = crossOver(popA,popB);
    mutate(order,mr);
    newPopulation[i] = order;
  }
  population = newPopulation;
}

function pickOne(list,prob){

  var index =0;
  var r = random(1);

  while(r>0){
    r = r - prob[index];
    index ++;
  }
  index --;
  return list[index].slice();
}

function mutate(order, mutationRate){
  for (var i =0; i< totalCities;i++){
    if(random(1)<mutationRate){
      shuffle(order,1);
    }else{
      return order;
    }
  }
}

function crossOver(a,b){

  var start = floor(random(a.length));
  var end = floor(random(start+1,a.length));
  var newOrder = a.slice(start,end);

    for(var i=0; i < b.length;i++){
      var city = b[i];
      if(!newOrder.includes(city)){
        newOrder.push(city);
      }
    }
  return newOrder;

}

