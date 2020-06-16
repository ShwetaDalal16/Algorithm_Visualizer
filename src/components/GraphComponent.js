import React, { Component } from 'react';
import '../App.css';
import { Button } from 'reactstrap';
import Queue from '../data-structures/queue';

class graph {
    constructor(n) {
        this.numberOfNodes = n;
        this.adj = new Array(n);
        for (let j = 0; j < this.adj.length; ++j) {
            this.adj[j] = [];
        }
    }

    addEdges(first, second) {
        console.log(first);
        if (first.id != second.id) {
            this.adj[first.id].push(second);
        }
    }

    printGraph() {
        console.log("Graph: ");
        console.log(this.adj);
        for (let i = 0; i < this.n; ++i) {
            for (let j = 0; j < this.adj[i].length; ++j) {
                console.log(this.adj[i][j]);
            }
        }
    }

    bfs(start, context) {
        var visitedBfs = [];
        for (let i = 0; i < this.n; ++i) {
            visitedBfs.push(false);
        }

        console.log("visitedBfs", visitedBfs);

        var q = new Queue;

        visitedBfs[start.id] = true;

        q.enqueue(start);
        var j;

        animationBFS.push([start.x, start.y, start.radius]);
        while (!q.isEmpty()) {
            var s = q.front();
            q.dequeue();
            for (j = 0; j < this.adj[s.id].length; ++j) {
                console.log(this.adj[s.id][j]);
                var x = this.adj[s.id][j].x;
                var y = this.adj[s.id][j].y;
                var radius = this.adj[s.id][j].radius;
                animationBFS.push([x, y, radius]);

                if (!visitedBfs[this.adj[s.id][j].id]) {
                    visitedBfs[this.adj[s.id][j].id] = true;
                    q.enqueue(this.adj[s.id][j]);
                }
            }
        }
        console.log("visitedBfs", visitedBfs);
        bfsAlgo = false;
        animateBFS(context);
    }

    dfs(start, context) {
        var visitedDfs = [];
        for (let i = 0; i < this.n; ++i) {
            visitedDfs.push(false);
        }

        console.log("visitedDfs", visitedDfs);
        animationDFS.push([start.x, start.y, start.radius]);
        this.dfsHelper(start, visitedDfs)
        dfsAlgo = false;
        animateDFS(context);
    }

    dfsHelper(start, visitedDfs) {
        console.log("visitedDfs", visitedDfs);
        visitedDfs[start.id] = true;

        var j;
        for (j = 0; j < this.adj[start.id].length; ++j) {
            var x = this.adj[start.id][j].x;
            var y = this.adj[start.id][j].y;
            var radius = this.adj[start.id][j].radius;
            animationDFS.push([x, y, radius]);
            if (!visitedDfs[this.adj[start.id][j].id]) {
                this.dfsHelper(this.adj[start.id][j], visitedDfs);
            }
        }
        console.log("visitedDfs", visitedDfs);
    }
}

function animateBFS(context) {
    for (let i = 0; i < animationBFS.length; ++i) {
        setTimeout(() => {
            context.beginPath();
            context.fillStyle = 'white';
            context.arc(animationBFS[i][0], animationBFS[i][1], animationBFS[i][2], 0, 2 * Math.PI);
            context.globalAlpha = 0.5;
            context.fill();
            context.stroke();
        }, i * 1000);
    }
}

function animateDFS(context) {
    for (let i = 0; i < animationDFS.length; ++i) {
        setTimeout(() => {
            context.beginPath();
            context.fillStyle = 'white';
            context.arc(animationDFS[i][0], animationDFS[i][1], animationDFS[i][2], 0, 2 * Math.PI);
            context.globalAlpha = 0.5;
            context.fill();
            context.stroke();
        }, i * 1000);
    }
}


var i = 0;
var nodes = [];
var edges = [];
var arrowStarted = false;
var initialPoint = {};
const animationBFS = [];
const animationDFS = [];
var g = new graph(30);
var bfsAlgo = false;
var dfsAlgo = false;

function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
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

    drawNode(evt) {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');

        var rect = canvas.getBoundingClientRect();
        var x = evt.clientX - rect.left;
        var y = evt.clientY - rect.top;
        var j = 0, node;

        while (node = nodes[j++]) {
            console.log(i);
            context.beginPath();
            context.fillStyle = 'white';
            context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
            if (context.isPointInPath(x, y)) {
                if (bfsAlgo) {
                    g.bfs(node, context);
                }
                if (dfsAlgo) {
                    g.dfs(node, context);
                }
                return;
            }
        }

        if (!arrowStarted) {
            context.beginPath();
            context.fillStyle = 'black';
            context.arc(x, y, 30, 0, 2 * Math.PI);
            context.fill();
            context.fillStyle = 'white';
            context.font = "20px Arial";
            context.textAlign = "center";
            context.fillText(i, x, y);
            nodes.push({
                id: i,
                x: x,
                y: y,
                radius: 30
            });
            context.stroke();
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
        while (node = nodes[j++]) {
            context.beginPath();
            context.fillStyle = 'white';
            context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
            if (context.isPointInPath(x, y)) {
                if (evt.type === 'mousedown') {
                    initialPoint = node;
                    console.log('arrow started');
                    arrowStarted = true;
                }
                else if (evt.type === 'mouseup') {
                    console.log('mouseup');
                    if (arrowStarted) {
                        console.log(node.x, node.y);
                        context.beginPath();
                        const pointOfIntersection = findPointOfIntersection(initialPoint, node, node, node.radius);
                        console.log(pointOfIntersection);
                        if (initialPoint.x < node.x) {
                            canvas_arrow(context, initialPoint.x, initialPoint.y, pointOfIntersection[1].x, pointOfIntersection[1].y);
                        }
                        else {
                            canvas_arrow(context, initialPoint.x, initialPoint.y, pointOfIntersection[0].x, pointOfIntersection[0].y);
                        }
                        edges.push({
                            initialPoint: initialPoint,
                            finalPoint: node,
                            intersectionPoint: pointOfIntersection
                        })
                        g.addEdges(initialPoint, node);
                        context.lineWidth = 3;
                        context.stroke();
                        context.fillStyle = 'white';
                        context.font = "20px Arial";
                        context.textAlign = "center";
                        context.fillText(initialPoint.id, initialPoint.x, initialPoint.y);
                        arrowStarted = false;
                    }
                }
            }
        }
    }

    printGraph() {
        console.log("the graph is: ");
        g.printGraph();
    }

    bfs() {
        bfsAlgo = true;
        alert("click any node");
    }

    dfs() {
        dfsAlgo = true;
        alert("click any node");
    }

    render() {
        return (
            <div>
                <div>
                    <Button style={{ marginLeft: '10px' }} onClick={this.printGraph}>print graph</Button>
                    <Button style={{ marginLeft: '10px' }} onClick={this.bfs}>Breadth First traversal</Button>
                    <Button style={{ marginLeft: '10px' }} onClick={this.dfs}>Depth First traversal</Button>
                </div>
                <canvas id="myCanvas" width="1000" height="1000" onClick={this.drawNode} onMouseDown={this.drawEdge} onMouseUp={this.drawEdge} ></canvas>
            </div>
        );
    }
}

export default Graph;