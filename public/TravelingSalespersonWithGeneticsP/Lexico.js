function nextOrder(){

  count ++


  //Step1
  largestI =-1;
  for(var i = 0; i<order.length-1;i++){

    if(order[i]<order[i+1]){
      largestI = i;
    }
  }

  if(largestI == -1){
    noLoop();
    console.log('finished');
  }


    //Step2

      var largestJ = -1

      for(var j =0; j<order.length;j++){
        if(order[j]>order[largestI]){
          largestJ = j
        }
      }
    //Step3
      Swap(order,largestI,largestJ)

    //Step4
    var endArray = order.splice(largestI+1);
    endArray.reverse();
    order= order.concat(endArray);


    }

