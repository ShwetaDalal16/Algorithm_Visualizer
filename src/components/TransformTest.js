import React, { Component } from 'react';
import { Button, Card, CardBody, CardTitle, CardHeader, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

const NUMBER_OF_ARRAY_BARS = 40;
var animationIds = [];
var animationId;
var ret = false;

var delay = 100;

function swap(el1, el2) {
    const container = document.querySelector(".array-container");
    return new Promise(resolve => {
        const style1 = window.getComputedStyle(el1);
        const style2 = window.getComputedStyle(el2);

        const transform1 = style1.getPropertyValue("transform");
        const transform2 = style2.getPropertyValue("transform");

        el1.style.transform = transform2;
        el2.style.transform = transform1;

        // Wait for the transition to end!
        window.requestAnimationFrame(function () {
            animationId = setTimeout(() => {
                if (ret) {
                    ret = false;
                    return;
                }
                container.insertBefore(el2, el1);
                resolve();
            }, delay);
        });
        animationIds.push(animationId);
    })
        .then((a) => console.log(a.json()))
        .catch((err) => console.log(err.message));
}

async function TranfBubbleSort() {
    let blocks = document.querySelectorAll(".array-bar");
    let blocks_values = document.querySelectorAll(".array-value");
    for (let i = 0; i < blocks.length - 1; i += 1) {
        for (let j = 0; j < blocks.length - i - 1; j += 1) {
            if (ret) {
                ret = false;
                return;
            }
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";
            await new Promise(resolve =>
                animationId = setTimeout(() => {
                    resolve();
                }, delay)
            );
            animationIds.push(animationId);

            const val1 = Number(blocks[j].childNodes[0].innerHTML);
            const val2 = Number(blocks[j + 1].childNodes[0].innerHTML);

            if (val1 > val2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".array-bar");
            }
            blocks[j].style.backgroundColor = "#58B7FF";
            blocks[j + 1].style.backgroundColor = "#58B7FF";
        }
        blocks[blocks.length - i - 1].style.backgroundColor = '#13CE66';
    }

}

class BubbleSort extends Component {

    constructor(props) {
        super(props);

        this.state = {
            array: [],
            sorting: false
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
        const arrayBars = document.getElementsByClassName('array-bar');
        for (var i = 0; i < arrayBars.length; ++i) {
            arrayBars[i].style.backgroundColor = '#58B7FF';
        }
    }

    render() {
        const array = this.state.array;
        return (
            <Card className="card">
                <CardHeader><CardTitle className="card-title d-flex flex-row">
                    <h2>Bubble Sort</h2>
                    <div className="ml-auto">
                        <Label htmlFor="customRange1">animation speed</Label>
                        <Input type="range" min={0.001} max={500} onChange={(e) => { delay = 500 - e.target.value }} className="custom-range" id="customRange1" />
                    </div>
                    <Link to='/home'><Button onClick={() => {
                        ret = true;
                        for (let i = 0; i < animationIds.length; ++i) {
                            clearTimeout(animationIds[i]);
                        }
                    }
                    }>back</Button></Link>
                    <Button
                        disabled={this.state.sorting}
                        onClick={() => {
                            this.setState({ sorting: false });
                            this.resetArray();
                        }}>Reset array</Button>
                    <Button
                        disabled={this.state.sorting}
                        onClick={() => {
                            ret = false;
                            this.setState({ sorting: true });
                            delay = 100;
                            TranfBubbleSort();
                            this.setState({ sorting: false });
                        }}>Sort</Button>
                </CardTitle></CardHeader>
                <CardBody className="array-container d-flex flex-row align-items-end" >
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: '#58B7FF',
                                height: `${value}px`,
                                border: '2px ridge',
                                width: '18px',
                                margin: '0 1px',
                                transform: `translateX(${idx}px)`,
                                value: { value }
                            }}><label className='block__id d-none'>{value}</label>
                        </div>
                    ))}
                </CardBody>
            </Card>
        );
    }
}

export default BubbleSort;