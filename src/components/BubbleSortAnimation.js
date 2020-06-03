export default function getBubblesortAnimation(array) {
    const arr = [];
    var len = array.length,
        i, j;

    for (i = 0; i < len - 1; i++) {
        for (j = 0; j < len - i - 1; j++) {
            arr.push([j, j + 1]);

            arr.push([j, j + 1]);
            if (array[j] > array[j + 1]) {
                arr.push([j, j + 1, true]);
                swap(array, j, j + 1);
            }
            else {
                arr.push([j, j + 1, false]);
            }
        }
    }
    return arr;
}

function swap(arr, first_Index, second_Index) {
    var temp = arr[first_Index];
    arr[first_Index] = arr[second_Index];
    arr[second_Index] = temp;
}