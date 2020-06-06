export default function getBubblesortAnimation(array1) {
    const animations1 = [];
    var len = array1.length,
        i, j;

    for (i = 0; i < len - 1; i++) {
        for (j = 0; j < len - i - 1; j++) {
            animations1.push([j, j + 1]);

            animations1.push([j, j + 1]);
            if (array1[j] > array1[j + 1]) {
                animations1.push([j, j + 1, true]);
                swap(array1, j, j + 1);
            }
            else {
                animations1.push([j, j + 1, false]);
            }
        }
    }
    return animations1;
}

function swap(array1, first_Index, second_Index) {
    var temp = array1[first_Index];
    array1[first_Index] = array1[second_Index];
    array1[second_Index] = temp;
}