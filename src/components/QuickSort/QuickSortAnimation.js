export default function getQuickSortAnimation(array, low, high, animations5)  
{  
    if (low < high)  
    {
        var pi = partition(array, low, high, animations5);

        getQuickSortAnimation(array, low, pi - 1, animations5);  
        getQuickSortAnimation(array, pi + 1, high, animations5);  
    }
}

function partition (array, low, high, animations5)  
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