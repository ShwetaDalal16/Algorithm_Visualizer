import getMergeSortAnimation from './MergeSortAnimation';

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const DETECT_COLOR = 'yellow';
var ANIMATION_SPEED_MS = 1;
var animationIds = [];

export default function mergeSort(array, compare) {
    const animations3 = getMergeSortAnimation(array, 0, array.length-1);
    if (!compare) {
        ANIMATION_SPEED_MS = 20;
        document.getElementsByClassName('card-title')[0].firstElementChild.innerHTML = 'Merge Sort';
    }
    else {
        ANIMATION_SPEED_MS = 1;
    }
    var colorChanged = false;
    for (let i = 0; i < animations3.length; i++) {
        if (!compare) {
            var arrayBars = document.getElementsByClassName('array-bar');
            var arrayValues = document.getElementsByClassName('array-value');
        }
        else {
            var arrayBars = document.getElementsByClassName('array-bar3');
        }
        if (animations3[i][3] === 'noSwap') {
            const barOneIdx = animations3[i][0];
            const barTwoIdx = animations3[i][1];
            const barThreeIdx = animations3[i][2];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const barThreeStyle = arrayBars[barThreeIdx].style;
            if (!colorChanged) {
                const animationId = setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = DETECT_COLOR;
                    barThreeStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
                animationIds.push(animationId);
                colorChanged = true;
            }
            else {
                const animationId =  setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                    barThreeStyle.backgroundColor = PRIMARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
                animationIds.push(animationId);
                colorChanged = false;
            }
        }
        else {
            const barOneIdx = animations3[i][0];
            const barOneStyle = arrayBars[barOneIdx].style;
            const animationId = setTimeout(() => {
                const height = animations3[i][1];
                barOneStyle.height = `${height}px`;
                if (!compare) {
                    const valOneStyle = arrayValues[barOneIdx];
                    valOneStyle.innerHTML = height;
                }
            }, i*ANIMATION_SPEED_MS+5);
            animationIds.push(animationId);
        }
    }
    return animationIds;
}
