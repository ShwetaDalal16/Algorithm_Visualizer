const animations5 = [];

export default function getQuickSortAnimation(array, low, high)  
{  
    if (low < high)  
    {
        var pi = partition(array, low, high);

        getQuickSortAnimation(array, low, pi - 1);  
        getQuickSortAnimation(array, pi + 1, high);  
    }
    // console.log(animations5);
    return animations5;
}

function partition (array, low, high)  
{  
    var pivot = array[high]; 
    var i = (low - 1);
  
    for (var j = low; j <= high - 1; j++)  
    {
        animations5.push([i, j, high, 'noSwap']);
        animations5.push([i, j, high, 'noSwap']);
        if (array[j] < pivot)  
        {
            i++;
            animations5.push([i, j, high, 'noSwap']);
            animations5.push([i, j, high, 'noSwap']);
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            animations5.push([i, j, 'Swap']);
        }
    }
    var temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    animations5.push([i+1, high, 'Swap']);
    return (i + 1);  
}