import getSelectionSortAnimation from './SelectionSortAnimation';

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const DETECT_COLOR = 'yellow';
var ANIMATION_SPEED_MS = 2;
var animationIds = [];

export default function selectionSort(array, compare) {
    const animations4 = getSelectionSortAnimation(array);
    if (!compare) {
        ANIMATION_SPEED_MS = 20;
        document.getElementsByClassName('card-title')[0].firstElementChild.innerHTML = 'Selection Sort';
    }
    else {
        ANIMATION_SPEED_MS = 2;
    }
    var colorChanged = false;
    for (let i = 0; i < animations4.length; i++) {
        if (!compare) {
            var arrayBars = document.getElementsByClassName('array-bar');
            var arrayValues = document.getElementsByClassName('array-value');
        }
        else {
            var arrayBars = document.getElementsByClassName('array-bar4');
        }
        const barOneIdx = animations4[i][0];
        const barTwoIdx = animations4[i][1];
        const barThreeIdx = animations4[i][2];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const barThreeStyle = arrayBars[barThreeIdx].style;
        if (animations4[i][3] === 'noSwap') {
            if (!colorChanged) {
                const animationId = setTimeout(() => {
                    if (animations4[i][4] === 'found'){
                        barOneStyle.backgroundColor = SECONDARY_COLOR;
                        barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    }
                    barThreeStyle.backgroundColor = DETECT_COLOR;
                }, i*ANIMATION_SPEED_MS);
                animationIds.push(animationId);
                colorChanged = true;
            }
            else {
                const animationId = setTimeout(() => {
                    if (animations4[i][4] === 'found'){
                        barOneStyle.backgroundColor = PRIMARY_COLOR;
                        barTwoStyle.backgroundColor = PRIMARY_COLOR;
                    }
                    barThreeStyle.backgroundColor = PRIMARY_COLOR;
                }, i*ANIMATION_SPEED_MS);
                animationIds.push(animationId);
                colorChanged = false;
            }
        }
        else if (animations4[i][3] === 'Swap') {
            const animationId = setTimeout(() => {
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