import React, { Component } from 'react';
import '../App.css';
import { Button } from 'reactstrap';
import graph from '../data-structures/graph';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';

var i = 0;
var nodes = [];
var edges = [];
var arrowStarted = false;
var initialPoint = {};
var startNode = {};
var startNodeSelected = false;
var bftAlgo = false;
var dftAlgo = false;
var bfsAlgo = false;
var dijkstraAlgo = false;
var g = new graph(30);

function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10;
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

function findPointOfIntersection(initPont, finalPoint, center, radius) {
    var m = (finalPoint.y - initPont.y) / (finalPoint.x - initPont.x);
    var C = -m * initPont.x + initPont.y;
    var A = center.x;
    var B = center.y;
    var R = radius;
    var a = 1 + m * m;
    var b = ((-2 * A) + (2 * m * C) - (2 * m * B));
    var c = ((Math.pow(A, 2)) + (Math.pow(C, 2)) - (2 * B * C) + (Math.pow(B, 2)) - (Math.pow(R, 2)));
    var x1 = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
    var x2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
    var y1 = m * x1 + C;
    var y2 = m * x2 + C;
    return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
}

class Graph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            weigth: 0,
            nodes: [],
            edges: [],
            directed: true,
            addWeight: false,
            deleteNode: false
        }

        this.animateBFS = this.animateBFS.bind(this);
        this.animateBFT = this.animateBFT.bind(this);

    }

    componentDidMount() {
        var currentComponent = this;
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
    }

    componentDidUpdate() {
        console.log("component did update");
        console.log(this.state);
        console.log(this.state.nodes);
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');

        for (let j = 0; j < this.state.nodes.length; ++j) {
            context.beginPath();
            context.fillStyle = 'black';
            context.arc(this.state.nodes[j].x, this.state.nodes[j].y, this.state.nodes[j].radius, 0, 2 * Math.PI);
            context.fill();
            context.fillStyle = 'white';
            context.font = "20px Arial";
            context.textBaseline = "ideographic";
            context.fillText(this.state.nodes[j].id, this.state.nodes[j].x - 7, this.state.nodes[j].y + 7);
            context.stroke();
        }
    }

    drawNode(evt) {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');

        var rect = canvas.getBoundingClientRect();
        var x = evt.clientX - rect.left;
        var y = evt.clientY - rect.top;
        var j = 0, node, edge, k = 0;

        while (node = this.state.nodes[j++]) {
            context.beginPath();
            context.fillStyle = 'black';
            context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
            if (context.isPointInPath(x, y)) {
                if (bftAlgo) {
                    const animationBFT = g.bft(node);
                    this.animateBFT(context, animationBFT);
                }
                if (dftAlgo) {
                    const animationDFS = g.dft(node);
                    this.animateDFS(context, animationDFS);
                }
                if (bfsAlgo && !startNodeSelected) {
                    startNode = node;
                    startNodeSelected = true;
                    alert("click any node to search");
                }
                else if (bfsAlgo && startNodeSelected) {
                    const animationBFS = g.shortestPathBfs(startNode, node);
                    this.animateBFS(context, animationBFS);
                    bfsAlgo = false;
                    startNodeSelected = false;
                }
                if (dijkstraAlgo) {
                    g.dijkshra(node);
                    dijkstraAlgo = false;
                }
                if (this.state.deleteNode) {
                    context.globalAlpha = 0.2;
                    context.fill();
                    context.globalAlpha = 1;
                }
                return;
            }
        }

        while (edge = this.state.edges[k++]) {
            context.beginPath();
            context.fillStyle = "black";
            context.moveTo(edge.initialPoint.x, edge.initialPoint.y);
            context.arc((edge.initialPoint.x + edge.finalPoint.x)/2, (edge.initialPoint.y + edge.finalPoint.y)/2, 15, 0, 2 * Math.PI);
            if (context.isPointInPath(x, y)) {
                alert("clcked");
                return;
            }
        }

        if (!arrowStarted && !this.state.addWeight) {
            this.setState({
                nodes: this.state.nodes.concat({
                    id: i,
                    x: x,
                    y: y,
                    radius: 30
                })
            });
            i++;
        }
    }

    drawEdge(evt) {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');

        var rect = canvas.getBoundingClientRect();
        var x = evt.clientX - rect.left;
        var y = evt.clientY - rect.top;
        var j = 0, node;
        while (node = this.state.nodes[j++]) {
            context.beginPath();
            context.fillStyle = 'white';
            context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
            if (context.isPointInPath(x, y)) {
                console.log("mousedown", node);
                if (evt.type === 'mousedown') {
                    initialPoint = node;
                    arrowStarted = true;
                }
                else if (evt.type === 'mouseup') {
                    console.log('mouseup', node);
                    if (arrowStarted) {
                        context.beginPath();
                        if (this.state.directed) {
                            const pointOfIntersection = findPointOfIntersection(initialPoint, node, node, node.radius);
                            if (initialPoint.x < node.x) {
                                canvas_arrow(context, initialPoint.x, initialPoint.y, pointOfIntersection[1].x, pointOfIntersection[1].y);
                            }
                            else {
                                canvas_arrow(context, initialPoint.x, initialPoint.y, pointOfIntersection[0].x, pointOfIntersection[0].y);
                            }
                            this.state.edges.push({
                                initialPoint: initialPoint,
                                finalPoint: node,
                                intersectionPoint: pointOfIntersection,
                                directed: true,
                                weigth: 0
                            })
                            g.addEdges(initialPoint, node, 3, true);
                        }
                        else {
                            context.moveTo(initialPoint.x, initialPoint.y);
                            context.lineTo(node.x, node.y);
                            this.state.edges.push({
                                initialPoint: initialPoint,
                                finalPoint: node,
                                intersectionPoint: null,
                                directed: false,
                                weigth: 0
                            })
                            g.addEdges(initialPoint, node, 3, false);
                        }
                        // this.setState({ isModalOpen: true });
                        context.lineWidth = 3;
                        // context.fillStyle = 'blue';
                        // context.font = "25px Arial";
                        // context.textBaseline = "ideographic";
                        // context.fillText(4, (initialPoint.x + node.x) / 2, (node.y + initialPoint.y) / 2);
                        context.stroke();
                        context.fillStyle = 'white';
                        context.font = "20px Arial";
                        context.textBaseline = "ideographic";
                        context.fillText(initialPoint.id, initialPoint.x - 7, initialPoint.y + 7);
                        context.fillText(node.id, node.x - 7, node.y + 7);
                        arrowStarted = false;
                    }
                }
            }
        }
    }

    animateBFS(context, animationBFS) {
        for (let i = 0; i < animationBFS.length; ++i) {
            setTimeout(() => {
                context.beginPath();
                context.fillStyle = 'white';
                context.arc(animationBFS[i][0], animationBFS[i][1], animationBFS[i][2], 0, 2 * Math.PI);
                context.globalAlpha = 0.5;
                context.fill();
                context.stroke();
                if (i === animationBFS.length - 1) {
                    context.globalAlpha = 1;
                    setTimeout(() => {
                        console.log("making normal");
                        for (let j = 0; j < this.state.nodes.length; ++j) {
                            context.beginPath();
                            context.fillStyle = 'black';
                            context.arc(this.state.nodes[j].x, this.state.nodes[j].y, this.state.nodes[j].radius, 0, 2 * Math.PI);
                            context.fill();
                            context.fillStyle = 'white';
                            context.font = "20px Arial";
                            context.textAlign = "center";
                            context.fillText(this.state.nodes[j].id, this.state.nodes[j].x - 7, this.state.nodes[j].y + 7);
                            context.stroke();
                            bftAlgo = false;
                        }
                    }, 100);
                }
            }, i * 1000);
        }
    }

    animateBFT(context, animationBFT) {
        for (let i = 0; i < animationBFT.length; ++i) {
            setTimeout(() => {
                context.beginPath();
                context.fillStyle = 'white';
                context.arc(animationBFT[i][0], animationBFT[i][1], animationBFT[i][2], 0, 2 * Math.PI);
                context.globalAlpha = 0.5;
                context.fill();
                context.stroke();
                if (i === animationBFT.length - 1) {
                    context.globalAlpha = 1;
                    setTimeout(() => {
                        console.log("making normal");
                        for (let j = 0; j < this.state.nodes.length; ++j) {
                            context.beginPath();
                            context.fillStyle = 'black';
                            context.arc(this.state.nodes[j].x, this.state.nodes[j].y, this.state.nodes[j].radius, 0, 2 * Math.PI);
                            context.fill();
                            context.fillStyle = 'white';
                            context.font = "20px Arial";
                            context.textAlign = "center";
                            context.fillText(this.state.nodes[j].id, this.state.nodes[j].x - 7, this.state.nodes[j].y + 7);
                            context.stroke();
                            bftAlgo = false;
                        }
                    }, 100);
                }
            }, i * 1000);
        }
    }

    animateDFS(context, animationDFS) {
        console.log(animationDFS);
        for (let i = 0; i < animationDFS.length; ++i) {
            setTimeout(() => {
                context.beginPath();
                context.fillStyle = 'white';
                context.arc(animationDFS[i][0], animationDFS[i][1], animationDFS[i][2], 0, 2 * Math.PI);
                context.globalAlpha = 0.5;
                context.fill();
                context.stroke();
                if (i === animationDFS.length - 1) {
                    context.globalAlpha = 1;
                    setTimeout(() => {
                        for (let j = 0; j < this.state.nodes.length; ++j) {
                            context.beginPath();
                            context.fillStyle = 'black';
                            context.arc(this.state.nodes[j].x, this.state.nodes[j].y, this.state.nodes[j].radius, 0, 2 * Math.PI);
                            context.fill();
                            context.fillStyle = 'white';
                            context.font = "20px Arial";
                            context.textAlign = "center";
                            context.fillText(this.state.nodes[j].id, this.state.nodes[j].x - 7, this.state.nodes[j].y + 7);
                            context.stroke();
                            dftAlgo = false;
                        }
                    }, 100);
                }
            }, i * 1000);
        }
    }

    assignWeigth(evt) {
        this.setState({ weigth: this.weigth.value });
    }

    resetGraph() {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        i = 0;
        nodes = [];
        edges = [];
        g = new graph(30);
        this.setState({
            isModalOpen: false,
            weigth: 0,
            nodes: [],
            edges: [],
            directed: true,
            addWeight: false,
            deleteNode: false
        })
    }

    bft() {
        bftAlgo = true;
        alert("click any node to start traversal");
    }

    dft() {
        dftAlgo = true;
        alert("click any node to start traversal");
    }

    bfs() {
        bfsAlgo = true;
        alert("click any node to start Search");
    }

    dijkstra() {
        dijkstraAlgo = true;
        alert("click any node to start Search");
    }

    handleAlgo(evt) {
        if (evt.target.value === "Breadth First traversal") {
            this.bft();
        }
        else if (evt.target.value === "Depth First traversal") {
            this.dft();
        }
        else if (evt.target.value === "Breadth First Search") {
            this.bfs();
        }
        else if (evt.target.value === "Dijstra's path finding algo") {
            this.dijkstra();
        }
    }

    handleEdge(evt) {
        if (evt.target.value === "directed") {
            this.setState({ directed: true })
        }
        else if (evt.target.value === "undirected") {
            this.setState({ directed: false })
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex" style={{ marginTop: "10px" }}>
                    <div><Button style={{ marginLeft: '10px' }} onClick={this.resetGraph}>Reset</Button></div>
                    <div><Button style={{ marginLeft: '10px' }} onClick={() => this.setState({ addWeight: false, deleteNode: false })}>AddNode</Button></div>
                    {/* <div><Button style={{ marginLeft: '10px' }} onClick={() => this.setState({ deleteNode: true })}>DeleteNode</Button></div>
                    <div><Button style={{ marginLeft: '10px' }} onClick={() => this.setState({ addWeight: true })}>AddWeight</Button></div> */}
                    <div className="d-flex">
                        <Label style={{ marginLeft: '10px' }} for="selectEdge">Add edges</Label>
                        <Input type="select" name="select" id="selectEdge" onChange={(evt) => this.handleEdge(evt)}>
                            <option>select</option>
                            <option>directed</option>
                            <option>undirected</option>
                        </Input>
                    </div>
                    <div className="d-flex">
                        <Label style={{ marginLeft: '10px' }} for="selectAlgo">Algorithm: </Label>
                        <Input type="select" name="select" id="selectAlgo" onChange={(evt) => this.handleAlgo(evt)}>
                            <option>select</option>
                            <option>Breadth First traversal</option>
                            <option>Depth First traversal</option>
                            <option>Breadth First Search</option>
                            <option>Dijstra's path finding algo</option>
                        </Input>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen}>
                    <ModalHeader>Weight</ModalHeader>
                    <ModalBody>
                        <Input type="number" min={0} max={10000} id="weightInput" onKeyPress={(evt) => {
                            if (evt.key === "Enter") {
                                this.setState({
                                    isModalOpen: !this.state.isModalOpen,
                                    weigth: evt.target.value
                                });
                            }
                        }}
                        />
                        <Button id="myButton" onClick={() => { this.setState({ isModalOpen: !this.state.isModalOpen }) }} color="primary">Enter</Button>
                    </ModalBody>
                </Modal>
                <canvas id="myCanvas" width="1000" height="2000"
                    onClick={(evt) => this.drawNode(evt)} onMouseDown={(evt) => this.drawEdge(evt)}
                    onMouseUp={(evt) => this.drawEdge(evt)} ></canvas>
            </div>
        );
    }
}

export default Graph;