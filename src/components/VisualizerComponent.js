import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, CardHeader, Navbar } from 'reactstrap';
import bubbleSort from './BubbleSort/BubbleSort';
import selectionSort from './SelectionSort/SelectionSort';
import insertionSort from './InsertionSort/InsertionSort';
import mergeSort from './MergeSort/mergeSort';
import '../App.css';

const NUMBER_OF_ARRAY_BARS = 45;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const DETECT_COLOR = 'yellow';
const ANIMATION_SPEED_MS = 200;

class Visualizer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: []
        }
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
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

    render() {
        const { array } = this.state;
        return (
            <div style={{backgroundColor: '#f8f9fa'}}>
                <Navbar light color="white" style={{borderBottom: '1px ridge'}}>
                    <div className="algorithms">
                        <Button className="button"
                            color="primary"
                            onClick={() => {
                                this.resetArray()
                            }}>Reset Array</Button>
                        <Button className="button"
                            onClick={() => {
                                this.resetColor();
                                bubbleSort(this.state.array, false);
                            }}>Bubble sort</Button>
                        <Button className="button"
                            onClick={() => {
                                this.resetColor();
                                selectionSort(this.state.array, false);
                            }}>Selection sort</Button>
                        <Button className="button"
                            onClick={() => {
                                this.resetColor();
                                insertionSort(this.state.array, false);
                            }}>Insertion sort</Button>
                        <Button className="button"
                            onClick={() => {
                                this.resetColor();
                                mergeSort(this.state.array, false);
                            }}>Merge sort</Button>
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
                                            border: '2px ridge'
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