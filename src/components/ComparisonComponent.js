import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, CardFooter } from 'reactstrap';
import bubbleSort from './BubbleSort/BubbleSort';
import selectionSort from './SelectionSort/SelectionSort';
import insertionSort from './InsertionSort/InsertionSort';
import mergeSort from './MergeSort/mergeSort';
import '../App.css';
import quickSort from './QuickSort/quickSort';
import heapSort from './HeapSort/heapSort';

const NUMBER_OF_ARRAY_BARS = 40;
const PRIMARY_COLOR = 'turquoise';
var animationIds1 = [];
var animationIds2 = [];
var animationIds3 = [];
var animationIds4 = [];
var animationIds5 = [];
var animationIds6 = [];

class Comparison extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            sorting: false
        }
    }

    componentDidMount() {
        this.randomizeArray();
    }

    randomizeArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(Math.floor(Math.random() * (230 - 5) + 5));
        }
        this.setState({ array: array });
    }

    sortedArray() {
        const array = [];
        var j = 5;
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(j);
            console.log(j);
            j += 5
        }
        this.setState({ array: array });
    }

    reversedArray() {
        const array = [];
        var j = 200;
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(j);
            console.log(j);
            j -= 5
        }
        this.setState({ array: array });
    }

    resetColor() {
        const arrayBars = document.getElementsByClassName('array-bar');
        for (var i = 0; i < arrayBars.length; ++i) {
            arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        }
    }

    resetAnimation() {
        for (let i = 0; i < animationIds3.length; ++i) {
            clearTimeout(animationIds3[i]);
        }
        for (let i = 0; i < animationIds4.length; ++i) {
            clearTimeout(animationIds4[i]);
        }
        for (let i = 0; i < animationIds1.length; ++i) {
            clearTimeout(animationIds1[i]);
        }
        for (let i = 0; i < animationIds2.length; ++i) {
            clearTimeout(animationIds2[i]);
        }
        for (let i = 0; i < animationIds5.length; ++i) {
            clearTimeout(animationIds5[i]);
        }
        for (let i = 0; i < animationIds6.length; ++i) {
            clearTimeout(animationIds6[i]);
        }
        this.resetColor();
    }

    render() {
        var array1 = [].concat(this.state.array);
        var array2 = [].concat(this.state.array);
        var array3 = [].concat(this.state.array);
        var array4 = [].concat(this.state.array);
        var array5 = [].concat(this.state.array);
        var array6 = [].concat(this.state.array);
        return (
            <div className="visualizer-container" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex" style={{ backgroundColor: 'white', padding: '10px' }}>
                    <Button
                        disabled={this.state.sorting}
                        style={{ marginLeft: '10px' }}
                        onClick={() => {
                            this.randomizeArray();
                            this.forceUpdate();
                        }}>
                        Randomize Array
                        </Button>
                    <Button
                        disabled={this.state.sorting}
                        style={{ marginLeft: '10px' }}
                        onClick={() => {
                            this.sortedArray();
                            this.forceUpdate();
                        }}>
                        Sorted Array
                        </Button>
                    <Button
                        disabled={this.state.sorting}
                        style={{ marginLeft: '10px' }}
                        onClick={() => {
                            this.reversedArray();
                            this.forceUpdate();
                        }}>
                        Reversed Array
                        </Button>
                    <Button className="ml-auto"
                        disabled={this.state.sorting}
                        onClick={() => {
                            this.setState({ sorting: true });
                            setTimeout(() => {
                                animationIds1 = insertionSort(array1, true);
                                animationIds2 = mergeSort(array2, true);
                                animationIds3 = bubbleSort(array3, true);
                                animationIds4 = selectionSort(array4, true);
                                animationIds5 = quickSort(array5, true);
                                animationIds6 = heapSort(array6, true);
                            }, 10);
                        }}>Sort</Button>
                    <Button className="button"
                        onClick={() => {
                            this.setState({ sorting: false });
                            this.randomizeArray();
                        }}>Check other</Button>
                </div>
                <div className="d-flex">
                    <Card className="container card1 compare-cards">
                        <CardBody className="array-container1 d-flex flex-row align-items-end" >
                            {array1.map((value, idx) => (
                                <div className="array-bar-div1">
                                    <div
                                        className="array-bar1 compare-bar"
                                        key={idx}
                                        style={{
                                            backgroundColor: PRIMARY_COLOR,
                                            height: `${value}px`,
                                            border: '2px ridge'
                                        }}></div>
                                </div>
                            ))}
                        </CardBody>
                        <CardFooter><CardTitle className="card-title1"><h4>Bubble Sort</h4></CardTitle></CardFooter>
                    </Card>
                    <Card className="container card2 compare-cards">
                        <CardBody className="array-container2 d-flex flex-row align-items-end" >
                            {array2.map((value, idx) => (
                                <div className="array-bar-div2">
                                    <div
                                        className="array-bar2 compare-bar"
                                        key={idx}
                                        style={{
                                            backgroundColor: PRIMARY_COLOR,
                                            height: `${value}px`,
                                            border: '2px ridge'
                                        }}></div>
                                </div>
                            ))}
                        </CardBody>
                        <CardFooter><CardTitle className="card-title2"><h4>Insertion Sort</h4></CardTitle></CardFooter>
                    </Card>
                    <Card className="container card3 compare-cards">
                        <CardBody className="array-container3 d-flex flex-row align-items-end" >
                            {array3.map((value, idx) => (
                                <div className="array-bar-div3">
                                    <div
                                        className="array-bar3 compare-bar"
                                        key={idx}
                                        style={{
                                            backgroundColor: PRIMARY_COLOR,
                                            height: `${value}px`,
                                            border: '2px ridge'
                                        }}></div>
                                </div>
                            ))}
                        </CardBody>
                        <CardFooter><CardTitle className="card-title3"><h4>Merge Sort</h4></CardTitle></CardFooter>
                    </Card>
                </div>
                <div className="d-flex">
                    <Card className="container card4 compare-cards">
                        <CardBody className="array-container4 d-flex flex-row align-items-end" >
                            {array4.map((value, idx) => (
                                <div className="array-bar-div4">
                                    <div
                                        className="array-bar4 compare-bar"
                                        key={idx}
                                        style={{
                                            backgroundColor: PRIMARY_COLOR,
                                            height: `${value}px`,
                                            border: '2px ridge'
                                        }}></div>
                                </div>
                            ))}
                        </CardBody>
                        <CardFooter><CardTitle className="card-title4"><h4>Selection Sort</h4></CardTitle></CardFooter>
                    </Card>
                    <Card className="container card5 compare-cards">
                        <CardBody className="array-container5 d-flex flex-row align-items-end" >
                            {array5.map((value, idx) => (
                                <div className="array-bar-div5">
                                    <div
                                        className="array-bar5 compare-bar"
                                        key={idx}
                                        style={{
                                            backgroundColor: PRIMARY_COLOR,
                                            height: `${value}px`,
                                            border: '2px ridge'
                                        }}></div>
                                </div>
                            ))}
                        </CardBody>
                        <CardFooter><CardTitle className="card-title5"><h4>Quick Sort</h4></CardTitle></CardFooter>
                    </Card>
                    <Card className="container card6 compare-cards">
                        <CardBody className="array-container6 d-flex flex-row align-items-end" >
                            {array5.map((value, idx) => (
                                <div className="array-bar-div6">
                                    <div
                                        className="array-bar6 compare-bar"
                                        key={idx}
                                        style={{
                                            backgroundColor: PRIMARY_COLOR,
                                            height: `${value}px`,
                                            border: '2px ridge'
                                        }}></div>
                                </div>
                            ))}
                        </CardBody>
                        <CardFooter><CardTitle className="card-title6"><h4>Heap Sort</h4></CardTitle></CardFooter>
                    </Card>
                </div>
            </div>
        );
    }
}
export default Comparison;