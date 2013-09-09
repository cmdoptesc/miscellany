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

function quickSort(unsortedArray) {
  if(unsortedArray.length > 1) {
    var unsorted = unsortedArray.slice();     // copy the original array

      // finds the pivot using the median of the first, middle, and last elements
    var lt = unsorted[0];
    var mid = unsorted[Math.floor(unsorted.length/2)]
    var rt = unsorted[unsorted.length-1];

    var pivot;
    if(lt <= mid && mid <= rt) {
      pivot = unsorted.splice(Math.floor(unsorted.length/2), 1);
    } else if(mid <= lt && lt <= rt) {
      pivot = unsorted.splice(0, 1);
    } else {
      pivot = unsorted.splice(unsorted.length-1, 1);
    }

    var left = [];
    var right = [];

    for(var i=0; i<unsorted.length; i++) {
      if(unsorted[i] < pivot[0]) {
        left.push(unsorted[i]);
      } else {
        right.push(unsorted[i]);
      }
    }

    return quickSort(left).concat(pivot, quickSort(right));
  } else {
    return unsortedArray;
  }
}