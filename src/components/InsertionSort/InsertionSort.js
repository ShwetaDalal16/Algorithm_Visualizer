import getInsertionSortAnimation from './InsertionSortAnimation';

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const DETECT_COLOR = 'yellow';
const ANIMATION_SPEED_MS = 1;

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
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const barOneIdx = animations2[i][0];
            const barTwoIdx = animations2[i][1];
            const barThreeIdx = animations2[i][2];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const barThreeStyle = arrayBars[barThreeIdx].style;
            if (!colorChanged) {
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    barThreeStyle.backgroundColor = DETECT_COLOR;
                }, i*ANIMATION_SPEED_MS);
                colorChanged = true;
            }
            else {
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                    barThreeStyle.backgroundColor = PRIMARY_COLOR;
                }, i*ANIMATION_SPEED_MS);
                colorChanged = false;
            }
        }
        else {
            setTimeout(() => {
                const barOneIdx = animations2[i][0];
                const barTwoIdx = animations2[i][1];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
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
            }, i * ANIMATION_SPEED_MS+5);
        }
    }
}