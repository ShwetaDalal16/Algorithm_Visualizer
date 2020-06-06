export default function getSelectionSortAnimation(array4) {
    const animations4 = [];
    var i, j, min_idx, n = array4.length; 
    
    for (i = 0; i < n-1; i++)  
    {  
        min_idx = i; 
        for (j = i+1; j < n; j++) 
        {
            animations4.push([min_idx, j, i, 'noSwap', 'notFound']);
        
            animations4.push([min_idx, j, i, 'noSwap', 'notFound']);
            if (array4[j] < array4[min_idx])
                min_idx = j; 
                animations4.push([min_idx, j, i, 'noSwap', 'found']);
                animations4.push([min_idx, j, i, 'noSwap', 'found']);
        }

        animations4.push([min_idx, i, i, 'Swap']);
        var temp = array4[min_idx];
        array4[min_idx] = array4[i];
        array4[i] = temp;
    }
    return animations4;
}