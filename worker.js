onmessage = function (e) {
    console.log('Message received from main script');
    insertionSort(e.data[0], true);
    console.log(e.data[0]);
    console.log('Posting message back to main script');
    postMessage(done);
}


const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const DETECT_COLOR = 'yellow';
const ANIMATION_SPEED_MS = 25;

export default function insertionSort(array, compare) {
    const animations2 = getInsertionSortAnimation(array);
    if (!compare) {
        document.getElementsByClassName('card-title')[0].firstElementChild.innerHTML = 'Insertion Sort';
    }
    var colorChanged = false;
    for (let i = 0; i < animations2.length; i++) {
        if (!compare) {
            var arrayBars = document.getElementsByClassName('array-bar');
            var arrayValues = document.getElementsByClassName('array-value');
        }
        else {
            var arrayBars = document.getElementsByClassName('array-bar2');
        }
        const barOneIdx = animations2[i][0];
        const barTwoIdx = animations2[i][1];
        const barThreeIdx = animations2[i][2];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const barThreeStyle = arrayBars[barThreeIdx].style;
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            if (!colorChanged) {
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    barThreeStyle.backgroundColor = DETECT_COLOR;
                }, i * ANIMATION_SPEED_MS);
                colorChanged = true;
            }
            else {
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                    barThreeStyle.backgroundColor = PRIMARY_COLOR;
                }, i * ANIMATION_SPEED_MS + 20);
                colorChanged = false;
            }
        }
        else {
            setTimeout(() => {
                const barOneHeight = barOneStyle.height;
                const barTwoHeight = barTwoStyle.height;
                barOneStyle.height = `${barTwoHeight}`;
                barTwoStyle.height = `${barOneHeight}`;
                if (!compare) {
                    const valOneStyle = arrayValues[barOneIdx];
                    const valTwoStyle = arrayValues[barTwoIdx];
                    valOneStyle.innerHTML = barTwoHeight.match(/(\d+)/)[0];
                    valTwoStyle.innerHTML = barOneHeight.match(/(\d+)/)[0];
                }
            }, i * ANIMATION_SPEED_MS + 5);
        }
    }
}

export default function getInsertionSortAnimation(array) {
    const animations2 = [];
    var i, key, j, n = array.length;  
    for (i = 1; i < n; i++) 
    {  
        key = array[i];  
        j = i - 1;  
  
        while (j >= 0 && array[j] > key) 
        {
            animations2.push([j, j+1, i]);
            animations2.push([j, j+1, i]);
            animations2.push([j, j+1, i]);
            array[j + 1] = array[j];  
            j = j - 1;  
        }  
        array[j + 1] = key;  
    }
    return animations2
}