var unsorted = [];
var quant = 20;

for(var i=0; i<quant; i++) {
  unsorted.push(Math.floor(Math.random()*100));
}

function mergeSort(unsorted) {
  if(unsorted.length > 1) {
    var mid = Math.floor(unsorted.length/2);
    var left = mergeSort(unsorted.slice(0, mid));
    var right = mergeSort(unsorted.slice(mid, unsorted.length));

    var merged = [];
    var l = 0, r = 0;
    while( l < left.length || r < right.length ) {
      if( r >= right.length || (l < left.length && left[l] < right[r]) ) {
        merged.push(left[l]);
        l++;
      } else {
        merged.push(right[r]);
        r++;
      }
    }
    return merged;
  } else {
    return unsorted;
  }
}