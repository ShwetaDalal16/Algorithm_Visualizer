function merge(array3, l, m, r) 
{
    animations3.push([l, m, r, 'noSwap']);
    animations3.push([l, m, r, 'noSwap']);
    var i, j, k; 
    var n1 = m - l + 1; 
    var n2 =  r - m; 
  
    var L = [], R = []; 
  
    for (i = 0; i < n1; i++) 
        L[i] = array3[l + i]; 
    for (j = 0; j < n2; j++) 
        R[j] = array3[m + 1+ j]; 

    i = 0;
    j = 0;
    k = l;
    while (i < n1 && j < n2) 
    {
        if (L[i] <= R[j]) 
        {
            animations3.push([k, L[i], j, 'Swap']);
            array3[k] = L[i]; 
            i++; 
        } 
        else
        {
            animations3.push([k, R[j], i, 'Swap']);
            array3[k] = R[j]; 
            j++; 
        } 
        k++; 
    } 

    while (i < n1) 
    {
        animations3.push([k, L[i], j, 'Swap']);
        array3[k] = L[i]; 
        i++; 
        k++; 
    } 

    while (j < n2) 
    {
        animations3.push([k, R[j], i, 'Swap']);
        array3[k] = R[j]; 
        j++; 
        k++; 
    } 
}
const animations3 = [];
export default function getMergeSortAnimation( array3, l, r) 
{
    if (l < r) 
    {
        var m = Math.floor(l+(r-l)/2);

        animations3.push([l,m,r, 'noSwap']);
        animations3.push([l,m,r, 'noSwap']);

        getMergeSortAnimation(array3, l, m); 
        getMergeSortAnimation(array3, m+1, r); 
  
        merge(array3, l, m, r); 
    }
    return animations3;
} 