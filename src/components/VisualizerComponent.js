import React, { Component } from 'react';
import getBubblesortAnimation from './BubbleSortAnimation';
import getSelectionSortAnimation from './SelectionSortAnimation'
import '../App.css';

const NUMBER_OF_ARRAY_BARS = 60;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const ANIMATION_SPEED_MS = 10;

class Visualizer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            animation: []
        }
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(Math.floor(Math.random() * (600 - 5) + 5));
        }
        this.setState({ array });
    }

    animate() {
        const arr = [];
        for (var i = 0; i < this.state.array.length; ++i) {
            console.log(this.state.array[i]);
            if (this.state.array[i] > 401) {
                arr.push([i, i, true]);
            }
            else {
                arr.push([i, i, false]);
            }
        }
        return arr;
    }

    search() {
        const animation = this.animate();
        // console.log(animation);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (var i = 0; i < animation.length; ++i) {
            const barStyle = arrayBars[i].style;
            for (var j = 0; j < animation[i].length; ++j) {
                console.log(animation[i][j]);
                if (j === 0) {
                    setTimeout(() => {
                        barStyle.backgroundColor = SECONDARY_COLOR;
                        console.log('secondary');
                    }, i * ANIMATION_SPEED_MS);
                }
                else if (j === 1) {
                    setTimeout(() => {
                        barStyle.backgroundColor = PRIMARY_COLOR;
                        console.log('primary');
                    }, i * ANIMATION_SPEED_MS + 5);
                }
                else if (j === 2) {
                    if (animation[i][j]) {
                        setTimeout(() => {
                            barStyle.backgroundColor = "yellow";
                            console.log('primary');
                        }, i * ANIMATION_SPEED_MS + 15);
                    }
                }

            }
        }
    }

    bubbleSort() {
        const animations = getBubblesortAnimation(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } 
            else {
                if (animations[i][2] == true) {
                    setTimeout(() => {
                        const [barOneIdx, barTwoIdx] = animations[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        const barOneHeight = barOneStyle.height;
                        const barTwoHeight = barTwoStyle.height;
                        barOneStyle.height = `${barTwoHeight}`;
                        barTwoStyle.height = `${barOneHeight}`;
                    }, i * ANIMATION_SPEED_MS+5);
                }
            }
        }
    }

    selectionSort() {
        const animations = getSelectionSortAnimation(this.state.array);
        var colorChanged = false;
        console.log(animations);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const barOneIdx = animations[i][0];
            const barTwoIdx = animations[i][1];
            console.log(i);
            console.log(barOneIdx, barTwoIdx);
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            if (animations[i][2] === 'noSwap') {
                if (!colorChanged) {
                    console.log("secondary");
                    setTimeout(() => {
                        barOneStyle.backgroundColor = SECONDARY_COLOR;
                        barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    }, i*ANIMATION_SPEED_MS);
                    colorChanged = true;
                }
                else {
                    console.log("primary");
                    setTimeout(() => {
                        barOneStyle.backgroundColor = PRIMARY_COLOR;
                        barTwoStyle.backgroundColor = PRIMARY_COLOR;
                    }, i*ANIMATION_SPEED_MS);
                    colorChanged = false;
                }
            }
            else if (animations[i][2] === 'Swap') {
                setTimeout(() => {
                    const barOneHeight = barOneStyle.height;
                    const barTwoHeight = barTwoStyle.height;
                    barOneStyle.height = `${barTwoHeight}`;
                    barTwoStyle.height = `${barOneHeight}`;
                }, i*ANIMATION_SPEED_MS);
            }
        }
    }

    render() {
        const { array } = this.state;
        const {Search} = this.props.VisualizeSearch? true : false;
        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px`,
                        }}></div>
                ))}
                <button onClick={() => this.search()}>Search</button>
                <button onClick={() => this.bubbleSort()}>Bubble sort</button>
                <button onClick={() => this.selectionSort()}>Selection sort</button>
            </div>
        );
    }
}

export default Visualizer;