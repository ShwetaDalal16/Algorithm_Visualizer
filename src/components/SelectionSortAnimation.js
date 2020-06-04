export default function getSelectionSortAnimation(array) {
    const arr = [];
    var i, j, min_idx, n = array.length; 
    
    for (i = 0; i < n-1; i++)  
    {  
        min_idx = i;  
        for (j = i+1; j < n; j++) 
        {
            arr.push([min_idx, j, 'noSwap']);
        
            arr.push([min_idx, j, 'noSwap']);
            if (array[j] < array[min_idx])
                min_idx = j; 
                arr.push([min_idx, j, 'noSwap']);
                arr.push([min_idx, j, 'noSwap']);
        }

        arr.push([min_idx, i, 'Swap']);
        var temp = array[min_idx];
        array[min_idx] = array[i];
        array[i] = temp;
    }
    return arr;
}

function swap(array, first_Index, second_Index) {
    var temp = array[first_Index];
    array[first_Index] = array[second_Index];
    array[second_Index] = temp;
}