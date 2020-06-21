import React, { Component } from 'react';
import '../App.css';
import { Button } from 'reactstrap';
import graph from '../data-structures/graph';
import { Input, Label } from 'reactstrap';

var i = 0;
var arrowStarted = false;
var startNode = {};
var start = {};
var endNode = {};
var startNodeSelected = false;
var g = new graph(30);

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
            nodes: [],
            edges: [],
            directed: true,
            deleteNode: false,
            algo: false,
            dijkstraAlgo: false,
            bftAlgo: false,
            dftAlgo: false,
            bfsAlgo: false,
            addNode: false,
            addWeight: false,
            addEdges: false
        }
        this.svgAnimateBFT = this.svgAnimateBFT.bind(this);

    }

    nodeClick(evt) {
        document.getElementsByClassName('info')[0].innerHTML = "";
        evt.preventDefault()
        evt.stopPropagation();
        evt.stopImmediatePropagation()
        if (this.state.bftAlgo) {
            const node = this.state.nodes.filter((node) => node.id === Number(evt.target.getAttributeNS(null, 'id')))[0];
            const svgAnimationBFT = g.bft(node);
            this.svgAnimateBFT(svgAnimationBFT);
        }
        if (this.state.dftAlgo) {
            const node = this.state.nodes.filter((node) => node.id === Number(evt.target.getAttributeNS(null, 'id')))[0];
            const svgAnimationDFS = g.dft(node);
            this.svgAnimateBFT(svgAnimationDFS);
        }
        if (this.state.bfsAlgo && !startNodeSelected) {
            start = this.state.nodes.filter((node) => node.id === Number(evt.target.getAttributeNS(null, 'id')))[0];
            startNodeSelected = true;
            alert("click any node to search");
            document.getElementsByClassName('info')[0].innerHTML = "click any node to search";
        }
        else if (this.state.bfsAlgo && startNodeSelected) {
            const node = this.state.nodes.filter((node) => node.id === Number(evt.target.getAttributeNS(null, 'id')))[0];
            const svgAnimationBFS = g.shortestPathBfs(start, node);
            this.svgAnimateBFT(svgAnimationBFS);
            startNodeSelected = false;
        }
        if (this.state.dijkstraAlgo && !startNodeSelected) {
            start = this.state.nodes.filter((node) => node.id === Number(evt.target.getAttributeNS(null, 'id')))[0];
            startNodeSelected = true;
            alert("click any node to search");
            document.getElementsByClassName('info')[0].innerHTML = "click any node to search";
        }
        else if (this.state.dijkstraAlgo && startNodeSelected) {
            const node = this.state.nodes.filter((node) => node.id === Number(evt.target.getAttributeNS(null, 'id')))[0];
            const svgAnimationDijkstra = g.dijkshra(start, node);
            this.dijstraDistAnimate(svgAnimationDijkstra);
            startNodeSelected = false;
        }
        return false;

    }

    svgAnimateBFT(svgAnimationBFT) {
        if (svgAnimationBFT.length === 0) {
            document.getElementsByClassName('info')[0].style.color = 'red';
            document.getElementsByClassName('info')[0].innerHTML = "No path";
            setTimeout(() => {
                document.getElementsByClassName('info')[0].style.color = 'black';
                document.getElementsByClassName('info')[0].innerHTML = "click any node to start Search";

            }, 1500)
        }
        for (let i = 0; i < svgAnimationBFT.length; ++i) {
            setTimeout(() => {
                if (svgAnimationBFT[i] >= 0) {
                    document.getElementById(`${svgAnimationBFT[i]}`).style.fill = this.state.bfsAlgo ? 'green' : "grey";
                    if (i === svgAnimationBFT.length - 1) {
                        setTimeout(() => {
                            for (let j = 0; j < svgAnimationBFT.length; ++j) {
                                if (svgAnimationBFT[j] >= 0) {
                                    document.getElementById(`${svgAnimationBFT[j]}`).style.fill = "black";
                                }
                            }
                            if (this.state.bftAlgo) {
                                document.getElementsByClassName('info')[0].innerHTML = "click any node to start traversal";
                            }
                            if (this.state.dftAlgo) {
                                document.getElementsByClassName('info')[0].innerHTML = "click any node to start traversal";
                            }
                            if (this.state.bfsAlgo) {
                                document.getElementsByClassName('info')[0].innerHTML = "click any node to start Search";
                            }
                            svgAnimationBFT = [];
                            this.setState({ algo: false });
                        }, 100);
                    }
                }
            }, i * 1000);
        }
    }

    dijstraDistAnimate(svgAnimationDijkstra) {
        const distance = svgAnimationDijkstra[1];
        for (let i = 0; i < distance.length; ++i) {
            setTimeout(() => {
                document.getElementById(`${distance[i][0]}`).style.fill = "grey";
                document.getElementById(`d_${distance[i][0]}`).innerHTML = distance[i][1];
                if (i === distance.length - 1) {
                    const path = svgAnimationDijkstra[0];
                    for (let j = 1; j < path.length; ++j) {
                        setTimeout(() => {
                            document.getElementById(`${path[j]}`).style.fill = "green";
                            if (j === path.length - 1) {
                                for (let k = 0; k < distance.length; ++k) {
                                    setTimeout(() => {
                                        document.getElementById(`${distance[k][0]}`).style.fill = "grey";
                                        document.getElementById(`d_${distance[k][0]}`).innerHTML = "";
                                        // dijkstraAlgo = false;
                                        if (this.state.dijkstraAlgo) {
                                            document.getElementsByClassName('info')[0].innerHTML = "click any node to start Search";
                                        }
                                        this.setState({ algo: false });
                                        svgAnimationDijkstra = [];
                                    }, 300);
                                }
                            }
                        }, j * 1000);
                    }
                }
            }, i * 1000);
        }
    }

    drawNodeSvg(evt) {
        if (this.state.addNode) {
            if (!arrowStarted) {
                var ns = 'http://www.w3.org/2000/svg';
                var svg = document.getElementById('svg')
                var rect = svg.getBoundingClientRect();
                var x = evt.clientX - rect.left;
                var y = evt.clientY - rect.top;
                var g_node = document.createElementNS(ns, 'g');
                var node = document.createElementNS(ns, 'circle');
                node.setAttributeNS(null, "cx", x);
                node.setAttributeNS(null, "cy", y);
                node.setAttributeNS(null, 'r', 30);
                node.setAttributeNS(null, 'id', i);
                node.setAttributeNS(null, 'fill', 'black');
                node.addEventListener('click', (evt) => this.nodeClick(evt), false);
                node.addEventListener('mousedown', (evt) => { this.drawEdgeSvg(evt) }, false);
                node.addEventListener('mouseup', (evt) => { this.drawEdgeSvg(evt) }, false);
                var nodeVal = document.createElementNS(ns, 'text');
                nodeVal.setAttributeNS(null, 'x', x)
                nodeVal.setAttributeNS(null, 'y', y + 5);
                nodeVal.setAttributeNS(null, 'class', 'nodeval')
                nodeVal.setAttributeNS(null, 'style', 'fill: white; stroke: white;  font-size: 25px;');
                nodeVal.addEventListener('click', (evt) => { evt.stopPropagation() }, false);
                nodeVal.addEventListener('mousedown', (evt) => { this.drawEdgeSvg(evt) }, false);
                nodeVal.addEventListener('mouseup', (evt) => { this.drawEdgeSvg(evt) }, false);
                nodeVal.innerHTML = i;
                nodeVal.style.color = 'white';
                var distVal = document.createElementNS(ns, 'text');
                distVal.setAttributeNS(null, 'x', x + 30)
                distVal.setAttributeNS(null, 'y', y);
                distVal.setAttributeNS(null, 'style', 'fill: white; stroke: green;  font-size: 15px;');
                distVal.setAttributeNS(null, 'id', `d_${i}`);
                g_node.appendChild(node);
                g_node.appendChild(nodeVal);
                g_node.appendChild(distVal);
                g_node.setAttributeNS(null, 'class', 'svgElement');
                svg.appendChild(g_node);
                this.setState({
                    nodes: this.state.nodes.concat({
                        x: x,
                        y: y,
                        radius: 30,
                        id: i
                    })
                });
                i++;
            }
        }
    }

    drawEdgeSvg(evt) {
        if (this.state.addEdges) {
            if (evt.type === 'mousedown') {
                startNode = this.state.nodes.filter((node) => node.id === Number(evt.target.getAttributeNS(null, 'id')))[0];
                arrowStarted = true;
            }
            else if (evt.type === 'mouseup' && arrowStarted) {
                endNode = this.state.nodes.filter((node) => node.id === Number(evt.target.getAttributeNS(null, 'id')))[0];
                if (startNode !== endNode) {
                    var startPoint = findPointOfIntersection(startNode, endNode, startNode, startNode.radius);
                    var endPoint = findPointOfIntersection(startNode, endNode, endNode, endNode.radius);
                    var x1, y1, x2, y2;
                    if (startNode.x < endNode.x) {
                        x1 = startPoint[0].x;
                        y1 = startPoint[0].y;
                        x2 = endPoint[1].x;
                        y2 = endPoint[1].y;
                    }
                    else {
                        x1 = startPoint[1].x;
                        y1 = startPoint[1].y;
                        x2 = endPoint[0].x;
                        y2 = endPoint[0].y;
                    }
                    var ns = 'http://www.w3.org/2000/svg';
                    var svg = document.getElementById('svg')
                    var g_edge = document.createElementNS(ns, 'g');
                    var edge = document.createElementNS(ns, 'line');
                    var weightVal = document.createElementNS(ns, 'text');
                    var weight_x = (startNode.x + endNode.x) / 2;
                    var weight_y = (startNode.y + endNode.y) / 2;
                    weightVal.setAttributeNS(null, 'x', weight_x)
                    weightVal.setAttributeNS(null, 'y', weight_y - 5);
                    edge.setAttributeNS(null, 'x1', x1);
                    edge.setAttributeNS(null, 'y1', y1);
                    edge.setAttributeNS(null, 'x2', x2);
                    edge.setAttributeNS(null, 'y2', y2);
                    if (this.state.directed) {
                        edge.setAttributeNS(null, 'style', 'marker-end: url(#markerArrow)');
                        weightVal.setAttributeNS(null, 'id', `d_${startNode.id}_${endNode.id}`);
                        g.addEdges(startNode, endNode, 0, true);
                        this.setState({
                            edges: this.state.edges.concat({
                                id: `${startNode.id}-${endNode.id}`,
                                startNode: startNode,
                                endNode: endNode,
                                startPoint: startPoint,
                                endPoint: endPoint,
                                directed: true,
                                weigth: 0
                            })
                        })
                    }
                    else {
                        weightVal.setAttributeNS(null, 'id', `u_${startNode.id}_${endNode.id}`);
                        g.addEdges(startNode, endNode, 0, false);
                        this.setState({
                            edges: this.state.edges.concat({
                                id: `${startNode.id}-${endNode.id}`,
                                startNode: startNode,
                                endNode: endNode,
                                startPoint: startPoint,
                                endPoint: endPoint,
                                directed: false,
                                weigth: 0
                            })
                        })
                    }
                    edge.setAttributeNS(null, 'class', 'edge');
                    edge.addEventListener('click', (evt) => this.addWeight(evt), false)
                    edge.setAttributeNS(null, 'id', `${startNode.id}-${endNode.id}`);
                    weightVal.setAttributeNS(null, 'class', 'weightval');
                    weightVal.setAttributeNS(null, 'style', 'font-size: 25px;');
                    weightVal.addEventListener('click', (evt) => this.addWeight(evt), false);
                    weightVal.innerHTML = '0';
                    g_edge.appendChild(edge);
                    g_edge.appendChild(weightVal);
                    g_edge.setAttributeNS(null, 'class', 'svgElement');
                    svg.appendChild(g_edge);
                }
                setTimeout(() => {
                    arrowStarted = false;
                }, 5);
            }
        }
    }

    addWeight(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        if (this.state.addWeight) {
            var id = evt.target.getAttributeNS(null, 'id');
            var id1, id2, d;
            [d, id1, id2] = id.split('_');
            const weight = prompt('enter weight');
            document.getElementById(id).innerHTML = weight ? weight : 0;
            if (d === 'd') {
                g.editWeight(id1, id2, Number(weight), true);
            }
            else {
                g.editWeight(id1, id2, Number(weight), false);
            }
        }
        return false;
    }

    resetGraph() {
        const arr = [];
        i = 0;
        this.setState({
            nodes: [],
            edges: [],
            directed: true,
            deleteNode: false,
            algo: false,
            dijkstraAlgo: false,
            bftAlgo: false,
            dftAlgo: false,
            bfsAlgo: false,
            addNode: false,
            addWeight: false,
            addEdges: false
        });
        g = new graph(30);
        var a = document.getElementsByClassName('svgElement');
        var b = document.getElementById('svg');
        document.getElementsByClassName('info')[0] = '';
        document.getElementsByClassName('heading')[0] = '';
        for (let j = document.getElementsByClassName('svgElement').length - 1; j >= 0; j--) {
            document.getElementById('svg').removeChild(document.getElementsByClassName('svgElement')[j]);
        }
    }

    handleAlgo(evt) {
        if (evt.target.value === "Breadth First traversal") {
            document.getElementsByClassName('heading')[0].innerHTML = "Breadth First traversal";
            this.setState({
                algo: true,
                bftAlgo: true,
                dftAlgo: false,
                bfsAlgo: false,
                dijkstraAlgo: false
            });
            // bftAlgo = true;
            alert("click any node to start traversal");
            document.getElementsByClassName('info')[0].innerHTML = "click any node to start traversal";
        }
        else if (evt.target.value === "Depth First traversal") {
            document.getElementsByClassName('heading')[0].innerHTML = "Depth First traversal";
            this.setState({
                algo: true,
                bftAlgo: false,
                dftAlgo: true,
                bfsAlgo: false,
                dijkstraAlgo: false
            });
            // dftAlgo = true;
            alert("click any node to start traversal");
            document.getElementsByClassName('info')[0].innerHTML = "click any node to start traversal";
        }
        else if (evt.target.value === "Breadth First Search") {
            document.getElementsByClassName('heading')[0].innerHTML = "Breadth First Search";
            this.setState({
                algo: true,
                bftAlgo: false,
                dftAlgo: false,
                bfsAlgo: true,
                dijkstraAlgo: false
            });
            // bfsAlgo = true;
            alert("click any node to start Search");
            document.getElementsByClassName('info')[0].innerHTML = "click any node to start Search";
        }
        else if (evt.target.value === "Dijkstra's path finding algo") {
            document.getElementsByClassName('heading')[0].innerHTML = "Dijkstra's path finding algorithm";
            this.setState({
                algo: true,
                bftAlgo: false,
                dftAlgo: false,
                bfsAlgo: false,
                dijkstraAlgo: true
            });
            // dijkstraAlgo = true;
            alert("click any node to start Search");
            document.getElementsByClassName('info')[0].innerHTML = "click any node to start Search";
        }
    }

    handleEdge(evt) {
        if (this.state.addEdges) {
            if (evt.target.value === "directed") {
                this.setState({ directed: true })
            }
            else if (evt.target.value === "undirected") {
                this.setState({ directed: false })
            }
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex" style={{ margin: "10px", backgroundColor: 'white' }}>
                    <div style={{marginBottom: '10px'}}>
                        <Label style={{ marginLeft: '30px' }}><Input onChange={() => this.setState({ addNode: true, addEdges: false, addWeight: false })}
                            type="radio" name="radio1" /> Add Node</Label>
                        <Label style={{ marginLeft: '30px' }}><Input onChange={() => this.setState({ addNode: false, addEdges: false, addWeight: true })}
                            type="radio" name="radio1" /> Add Weight</Label>
                        <Label style={{ marginLeft: '30px' }}><Input onChange={() => this.setState({ addNode: false, addEdges: true, addWeight: false })}
                            type="radio" name="radio1" /> Add edges</Label>
                    </div>
                    <div style={{marginBottom: '10px'}} className="d-flex">
                        <Label style={{ marginLeft: '10px' }} for="selectEdge">Edge: </Label>
                        <Input disabled={this.state.addNode || this.state.addWeight} type="select" name="select" id="selectEdge"
                            onChange={(evt) => { this.handleEdge(evt) }}>
                            <option>select</option>
                            <option>directed</option>
                            <option>undirected</option>
                        </Input>
                    </div>
                    <div style={{marginBottom: '10px'}} className="d-flex">
                        <Label style={{ marginLeft: '10px' }} for="selectAlgo">Algorithm: </Label>
                        <Input disabled={this.state.algo} type="select" name="select" id="selectAlgo"
                            onChange={
                                (evt) => {
                                    this.handleAlgo(evt)
                                }}>
                            <option>select</option>
                            <option>Breadth First traversal</option>
                            <option>Depth First traversal</option>
                            <option>Breadth First Search</option>
                            <option>Dijkstra's path finding algo</option>
                        </Input>
                    </div>
                    <div style={{marginBottom: '10px'}} className="ml-auto"><Button style={{ marginLeft: '10px' }}
                        onClick={() => this.resetGraph()}>Reset</Button></div>
                </div>
                <div>
                    <h2 className="heading"></h2>
                    <h4 className="info"></h4>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" id="svg"
                    onClick={(evt) => this.drawNodeSvg(evt)}
                    width="1350" height="2000">
                    <defs>
                        <marker id="markerArrow" markerWidth="13" markerHeight="13" refX="6.1" refY="3.5"
                            orient="auto">
                            <polygon points="-1 0, 7 3.5, 0, 6" style={{ fill: 'black' }} />
                        </marker>
                    </defs>
                </svg>
            </div >
        );
    }
}

export default Graph;