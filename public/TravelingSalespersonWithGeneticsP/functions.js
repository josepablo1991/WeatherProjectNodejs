function Swap(a,i,j){

  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}


function calcDistance(points,order){

  d = [];
  sum = 0;
  a = order.length;

  for(var i = a-1 ; i>=0; i --)
   {
     if(i-1>=0){
       var cityAIndex = order[i]
       var cityA = points[cityAIndex];

       var cityBIndex = order[i-1]
       var cityB = points[cityBIndex];
      x1= cityA.x;
      y1= cityA.y;
      x2= cityB.x;
      y2= cityB.x;
      calcDis= dist(x1,y1,x2,y2);
    //  calcDis= sqrt(((x2-x1)^2)-((y2-y1)^2));
      sum += calcDis;
      d.push(x1,x2,y1,y2);

    }
    else{
      break;
    }
    //console.log(d)
  }
  return sum;
}

//recursive function
function factorial(n){

  if(n==1){
    return 1;
  } else {
    return n * factorial(n-1);
  }
}

function shuffle(arr,times){
  for (var i=0;i<times;i++){
    var indexA = floor(random(arr.length));
    var indexB = floor(random(arr.length));
    arr.Swap(arr,indexA,indexB);
  }
}


