export default function getHeapSortAnimation(array, n, animations6) {

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(array, n, i, animations6);
 
    for (let i = n; i > 0; i--) {
        animations6.push([0, i, 'Swap']);
        var temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        heapify(array, i, 0, animations6);
    }
}

function heapify(array, n, i, animations6) {
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;

    animations6.push([l<n?l:false, r<n?r:false, largest, 'noSwap']);
    animations6.push([l<n?l:false, r<n?r:false, largest, 'noSwap']);
 
    if (l < n && array[l] > array[largest])
        largest = l;

    if (r < n && array[r] > array[largest])
        largest = r;

    if (largest !== i) {
        animations6.push([i, largest, 'Swap']);
        var temp = array[i];
        array[i] = array[largest];
        array[largest] = temp;

        heapify(array, n, largest, animations6);
    }
}

