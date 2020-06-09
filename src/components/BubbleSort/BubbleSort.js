import getBubblesortAnimation from './BubbleSortAnimation';

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
var ANIMATION_SPEED_MS = 20;
const animationIds = [];

export default function bubbleSort(array, compare) {
    const animations1 = getBubblesortAnimation(array);
    if (!compare) {
        ANIMATION_SPEED_MS = 20;
        document.getElementsByClassName('card-title')[0].firstElementChild.innerHTML = 'Bubble Sort';
    }
    else {
        ANIMATION_SPEED_MS = 1;
    }
    var colorChanged = false;
    for (let i = 0; i < animations1.length; i++) {
        if (!compare) {
            var arrayBars = document.getElementsByClassName('array-bar');
            var arrayValues = document.getElementsByClassName('array-value');
        }
        else {
            var arrayBars = document.getElementsByClassName('array-bar1');
        }
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations1[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            if (!colorChanged) {
                const animationId = setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i*ANIMATION_SPEED_MS);
                animationIds.push(animationId);
                colorChanged = true;
            }
            else {
                const animationId = setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, i*ANIMATION_SPEED_MS+20);
                animationIds.push(animationId);
                colorChanged = false;
            }
        } 
        else {
            if (animations1[i][2] === true) {
                const animationId = setTimeout(() => {
                    const [barOneIdx, barTwoIdx] = animations1[i];
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
                animationIds.push(animationId);
            }
        }
    }
    return animationIds;
}