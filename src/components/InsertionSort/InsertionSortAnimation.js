export default function getInsertionSortAnimation(array2) {
    const animations2 = [];
    var i, key, j, n = array2.length;  
    for (i = 1; i < n; i++) 
    {  
        key = array2[i];  
        j = i - 1;  
  
        while (j >= 0 && array2[j] > key) 
        {
            animations2.push([j, j+1, i]);
            animations2.push([j, j+1, i]);
            animations2.push([j, j+1, i]);
            array2[j + 1] = array2[j];  
            j = j - 1;  
        }  
        array2[j + 1] = key;  
    }
    return animations2;
}