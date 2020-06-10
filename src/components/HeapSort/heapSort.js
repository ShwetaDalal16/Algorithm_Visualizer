import getHeapSortAnimation from './HeapSortAnimation';

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const DETECT_COLOR = 'yellow';
var ANIMATION_SPEED_MS = 2;
var animationIds = [];

export default function heapSort(array, compare) {
    const animations6 = [];
    getHeapSortAnimation(array, array.length-1, animations6);
    if (!compare) {
        ANIMATION_SPEED_MS = 20;
        document.getElementsByClassName('card-title')[0].firstElementChild.innerHTML = 'Merge Sort';
    }
    else{
        ANIMATION_SPEED_MS = 2;
    }
    var colorChanged = false;
    for (let i = 0; i < animations6.length; i++) {
        if (!compare) {
            var arrayBars = document.getElementsByClassName('array-bar');
            var arrayValues = document.getElementsByClassName('array-value');
        }
        else {
            var arrayBars = document.getElementsByClassName('array-bar6');
        }
        if (animations6[i][3] === 'noSwap') {
            const barOneIdx = animations6[i][0]?animations6[i][0]:false;
            const barTwoIdx = animations6[i][1]?animations6[i][1]:false;
            const barThreeIdx = animations6[i][2];
            const barOneStyle = barOneIdx? arrayBars[barOneIdx].style:false;
            const barTwoStyle = barTwoIdx? arrayBars[barTwoIdx].style: false;
            const barThreeStyle = arrayBars[barThreeIdx].style;
            if (!colorChanged) {
                const animationId = setTimeout(() => {
                    if (barOneStyle){
                        barOneStyle.backgroundColor = SECONDARY_COLOR;
                    }
                    if (barTwoStyle) {
                        barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    }
                    barThreeStyle.backgroundColor = DETECT_COLOR;
                }, i * ANIMATION_SPEED_MS);
                colorChanged = true;
                animationIds.push(animationId);
            }
            else {
                const animationId = setTimeout(() => {
                    if (barOneStyle) {
                        barOneStyle.backgroundColor = PRIMARY_COLOR;
                    }
                    if (barTwoStyle) {
                        barTwoStyle.backgroundColor = PRIMARY_COLOR;
                    }
                    barThreeStyle.backgroundColor = PRIMARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
                colorChanged = false;
                animationIds.push(animationId);
            }
        }
        else {
            const animationId = setTimeout(() => {
                const barOneIdx = animations6[i][0];
                const barTwoIdx = animations6[i][1];
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
            }, i*ANIMATION_SPEED_MS+5);
            animationIds.push(animationId);
        }
    }
    return animationIds;
}
