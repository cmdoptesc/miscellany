
var makeUnsorted = function(quantity, max) {
  max = max || 100;
  var unsorted = [];
  for(var i=0; i<quantity; i++) {
    unsorted.push(Math.floor(Math.random()*max));
  }
  return unsorted;
};

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

function quickSort(unsorted) {
  if(unsorted.length > 1) {
    var sorted = unsorted.slice();     // copy the original array

      // finds the pivot using the median of the first, middle, and last elements
    var lt = sorted[0];
    var mid = sorted[Math.floor(sorted.length/2)];
    var rt = sorted[sorted.length-1];

    var pivot;
    if(lt <= mid && mid <= rt) {
      pivot = sorted.splice(Math.floor(sorted.length/2), 1);
    } else if(mid <= lt && lt <= rt) {
      pivot = sorted.splice(0, 1);
    } else {
      pivot = sorted.splice(sorted.length-1, 1);
    }

    var left = [];
    var right = [];

    for(var i=0; i<sorted.length; i++) {
      if(sorted[i] < pivot[0]) {
        left.push(sorted[i]);
      } else {
        right.push(sorted[i]);
      }
    }

    return quickSort(left).concat(pivot, quickSort(right));
  } else {
    return unsorted;
  }
}

function quickSortInPlace(unsorted, lb, rb) {
  if(typeof lb === 'undefined') { lb = 0; }
  if(typeof rb === 'undefined') { rb = unsorted.length-1; }

  if(lb < rb) {
    var pivot = unsorted[Math.floor((lb+rb)/2)];
    var l = lb, r = rb;
    var tmpSwap;

    while(l < r) {
      while(unsorted[l] < pivot) { l++; }
      while(pivot < unsorted[r]) { r--; }
      if(l <= r) {
        tmpSwap = unsorted[l];
        unsorted[l] = unsorted[r];
        unsorted[r] = tmpSwap;
        l++;
        r--;
      }
    }
    quickSortInPlace(unsorted, lb, r);
    quickSortInPlace(unsorted, l, rb);
    return unsorted;
  }
}

