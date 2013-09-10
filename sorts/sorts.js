
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

var insertionSort = function(array) {

    // function returns the position array[index] belongs to
  function insertBefore(array, index) {
    for(var i=0; i<index; i++) {
      if(array[index] < array[i]) { break; }
    }
    return i;
  }

    // similar idea as above, but uses binary search to find the index
    // also, there are elements equal to array[index], this will generally
    // put return an index before them, whereas the above returns one after
    /*

        linearSearch([1,2,3,4,4,5,6,4], 7);
          returns 5
        binarySearch()
          returns 3
    */

  function binarySearch(array, index) {
    var m, l = 0, r = index;
    m = Math.floor(r/2);

    while(l < r) {
      if(array[m] < array[index]) { l = m + 1; }
      else if(array[index] < array[m]) { r = m; }
      else { break; }
      m = l + Math.floor((r-l)/2);
    }
    return m;
  }

  function shiftRight(array, start, end) {
    if(end <= start || array.length <= end) { return; }
    var tmp = array[end];
    for(var i=end; i>start; i--) {
      array[i] = array[i-1];
    }
    return tmp;
  }

  for(var i=1; i<array.length; i++) {
    var index = binarySearch(array, i);
    var tmp = array[i];
    shiftRight(array, index, i);
    array[index] = tmp;
  }

  return array;
};