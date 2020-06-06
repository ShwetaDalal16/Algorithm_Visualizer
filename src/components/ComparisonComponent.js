import React, { Component } from 'react';
import { Button, Container, Row, Col, Card, CardBody, CardTitle, CardHeader, Navbar, CardFooter } from 'reactstrap';
import bubbleSort from './BubbleSort/BubbleSort';
import selectionSort from './SelectionSort/SelectionSort';
import insertionSort from './InsertionSort/InsertionSort';
import mergeSort from './MergeSort/mergeSort';
import '../App.css';

const NUMBER_OF_ARRAY_BARS = 60;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const DETECT_COLOR = 'yellow';

class Comparison extends Component {
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
            array.push(Math.floor(Math.random() * (230 - 5) + 5));
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
        var array1 = new Array().concat(this.state.array);
        var array2 = new Array().concat(this.state.array);
        var array3 = new Array().concat(this.state.array);
        var array4 = new Array().concat(this.state.array);
        return (
            <div className="visualizer-container" style={{ backgroundColor: '#f8f9fa' }}>
                <div style={{backgroundColor: 'white', padding: '10px'}}>
                    <Button style={{marginLeft: '1250px'}}
                        onClick={() => {
                        insertionSort(array1, true);
                        mergeSort(array2, true);
                        bubbleSort(array3, true);
                        selectionSort(array4, true);
                    }}>Start</Button>
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
                </div>
                <div className="d-flex">
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
                </div>
            </div>
        );
    }
}
export default Comparison;