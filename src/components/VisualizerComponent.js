import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, CardHeader, Navbar } from 'reactstrap';
import selectionSort from './SelectionSort/SelectionSort';
import insertionSort from './InsertionSort/InsertionSort';
import mergeSort from './MergeSort/mergeSort';
import quickSort from './QuickSort/quickSort';
import '../App.css';
import bubbleSort from './BubbleSort/BubbleSort';
import heapSort from './HeapSort/heapSort';

var NUMBER_OF_ARRAY_BARS = 45;
const PRIMARY_COLOR = 'turquoise';
var animationIds = [];


class Visualizer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            sorting: false,
        }
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        this.resetAnimation();
        const array = [];
        NUMBER_OF_ARRAY_BARS = (45*window.screen.width)/1375;
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(Math.floor(Math.random() * (400 - 5) + 5));
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
        for (let i = 0; i < animationIds.length; ++i) {
            clearTimeout(animationIds[i]);
        }
        this.resetColor();
    }

    render() {
        var array = [];
        if (!this.state.sorting) {
            array = this.state.array;
        }
        else {
            array = this.state.array;
        }
        return (
            <div style={{ backgroundColor: '#f8f9fa' }}>
                <Navbar light color="white" style={{ borderBottom: '1px ridge' }}>
                    <div className="algorithms d-flex">
                        <Button className="button"
                            disabled={this.state.sorting}
                            color="primary"
                            onClick={() => {
                                this.resetArray();
                            }}>Reset Array</Button>
                        <Button className="button"
                            disabled={this.state.sorting}
                            onClick={() => {
                                this.setState({ sorting: true });
                                setTimeout(() => {
                                    animationIds = bubbleSort(this.state.array, false);
                                }, 10);
                            }}>Bubble sort</Button>
                        <Button className="button"
                            disabled={this.state.sorting}
                            onClick={() => {
                                this.setState({ sorting: true });
                                setTimeout(() => {
                                    animationIds = selectionSort(this.state.array, false);
                                }, 10);
                            }}>Selection sort</Button>
                        <Button className="button"
                            disabled={this.state.sorting}
                            onClick={() => {
                                this.setState({ sorting: true });
                                setTimeout(() => {
                                    animationIds = insertionSort(this.state.array, false);
                                }, 10);
                            }}>Insertion sort</Button>
                        <Button className="button"
                            disabled={this.state.sorting}
                            onClick={() => {
                                this.setState({ sorting: true });
                                setTimeout(() => {
                                    animationIds = mergeSort(this.state.array, false);
                                }, 10);
                            }}>Merge sort</Button>
                        <Button className="button"
                            disabled={this.state.sorting}
                            onClick={() => {
                                this.setState({ sorting: true });
                                setTimeout(() => {
                                    animationIds = quickSort(this.state.array, false);
                                }, 10);
                            }}>Quick sort</Button>
                        <Button className="button"
                            disabled={this.state.sorting}
                            onClick={() => {
                                this.setState({ sorting: true });
                                setTimeout(() => {
                                    animationIds = heapSort(this.state.array, false);
                                }, 10);
                            }}>Heap sort</Button>
                        <Button className="button"
                            onClick={() => {
                                document.getElementsByClassName('card-title')[0].firstElementChild.innerHTML = '';
                                this.setState({ sorting: false });
                                this.resetArray();
                                this.resetAnimation();
                            }}>Check other</Button>
                    </div>
                </Navbar>
                <div className="container visualizer-container">
                    <Card className="card">
                        <CardHeader><CardTitle className="card-title"><h2></h2></CardTitle></CardHeader>
                        <CardBody className="array-container d-flex flex-row align-items-end" >
                            {array.map((value, idx) => (
                                <div className="array-bar-div">
                                    <div
                                        className="array-bar"
                                        key={idx}
                                        style={{
                                            backgroundColor: PRIMARY_COLOR,
                                            height: `${value}px`,
                                            border: '2px ridge',
                                            width: '18px',
                                            margin: '0 3px'
                                        }}></div>
                                    <div
                                        className="array-value"
                                        key={idx}>
                                        {value}
                                    </div>
                                </div>
                            ))}
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Visualizer;