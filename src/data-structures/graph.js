import Queue from './queue';
import PriorityQueue from './priorityQueue';

export default class graph {
    constructor(n) {
        this.numberOfNodes = n;
        this.adj = new Array(n);
        for (let j = 0; j < this.adj.length; ++j) {
            this.adj[j] = [];
        }
    }

    addEdges(first, second, weight, directed) {
        if (directed) {
            if (first.id != second.id) {
                this.adj[first.id].push([second, weight]);
            }
        }
        else {
            if (first.id != second.id) {
                this.adj[first.id].push([second, weight]);
                this.adj[second.id].push([first, weight]);
            }
        }
    }

    printGraph() {
        console.log("Graph: ");
        console.log(this.adj);
        for (let i = 0; i < this.numberOfNodes; ++i) {
            for (let j = 0; j < this.adj[i].length; ++j) {
                console.log(this.adj[i][j][0]);
            }
        }
    }

    bft(start) {
        const animationBFT = [];
        var visitedBfs = [];
        for (let i = 0; i < this.numberOfNodes; ++i) {
            visitedBfs.push(false);
        }

        console.log("visitedBfs", visitedBfs);

        var q = new Queue;

        visitedBfs[start.id] = true;

        q.enqueue(start);
        var j;

        animationBFT.push([start.x, start.y, start.radius]);
        while (!q.isEmpty()) {
            var s = q.front();
            q.dequeue();
            for (j = 0; j < this.adj[s.id].length; ++j) {
                console.log(this.adj[s.id][j][0]);

                if (!visitedBfs[this.adj[s.id][j][0].id]) {
                    var x = this.adj[s.id][j][0].x;
                    var y = this.adj[s.id][j][0].y;
                    var radius = this.adj[s.id][j][0].radius;
                    animationBFT.push([x, y, radius]);
                    visitedBfs[this.adj[s.id][j][0].id] = true;
                    q.enqueue(this.adj[s.id][j][0]);
                }
            }
        }
        console.log("visitedBfs", visitedBfs);
        return animationBFT;
    }

    BFS(src, dest, pred, dist) {
        var q = new Queue;
        var visitedBFS = [];

        for (let i = 0; i < this.numberOfNodes; ++i) {
            visitedBFS[i] = 0;
            dist[i] = Number.MAX_VALUE;
            pred[i] = -1;
        }

        visitedBFS[src.id] = true;
        dist[src.id] = 0;
        q.enqueue(src);
        console.log("adj: ", this.adj);

        while (!q.isEmpty()) {
            var s = q.front();
            console.log("s: ", s);
            q.dequeue();
            for (let i = 0; i < this.adj[s.id].length; ++i) {
                console.log(visitedBFS[this.adj[s.id][i][0].id]);

                if (!visitedBFS[this.adj[s.id][i][0].id]) {
                    visitedBFS[this.adj[s.id][i][0].id] = true;
                    dist[this.adj[s.id][i][0].id] = dist[s.id] + 1;
                    pred[this.adj[s.id][i][0].id] = s;
                    q.enqueue(this.adj[s.id][i][0]);

                    if (this.adj[s.id][i][0].id === dest.id) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    shortestPathBfs(src, dest) {
        console.log("src: ", src);
        console.log("dest: ", dest);
        var pred = [], dist = [];
        const animationBFS = [];
        if (this.BFS(src, dest, pred, dist) === false) {
            console.log("no path");
            return;
        }

        var node = dest;
        animationBFS.unshift([node.x, node.y, node.radius]);
        console.log("pred: ", pred);
        while (pred[node.id]) {
            animationBFS.unshift([pred[node.id].x, pred[node.id].y, pred[node.id].radius]);
            node = pred[node.id];
        }

        return animationBFS;
    }

    dft(start) {
        const animationDFS = [];
        var visitedDfs = [];
        for (let i = 0; i < this.numberOfNodes; ++i) {
            visitedDfs.push(false);
        }

        console.log("visitedDfs", visitedDfs);
        animationDFS.push([start.x, start.y, start.radius]);
        this.dfsHelper(start, visitedDfs, animationDFS);
        return animationDFS;
    }

    dfsHelper(start, visitedDfs, animationDFS) {
        console.log("visitedDfs", visitedDfs);
        visitedDfs[start.id] = true;

        var j;
        for (j = 0; j < this.adj[start.id].length; ++j) {
            if (!visitedDfs[this.adj[start.id][j][0].id]) {
                var x = this.adj[start.id][j][0].x;
                var y = this.adj[start.id][j][0].y;
                var radius = this.adj[start.id][j][0].radius;
                animationDFS.push([x, y, radius]);
                this.dfsHelper(this.adj[start.id][j][0], visitedDfs, animationDFS);
            }
        }
        console.log("visitedDfs", visitedDfs);
    }

    dijkshra(start) {
        console.log("called");
        console.log(start);
        var pq = new PriorityQueue();

        console.log(this.numberOfNodes);
        var dist1 = [];
        var size = this.numberOfNodes;
        while (size--) dist1.push(Number.POSITIVE_INFINITY);

        pq.enqueue(start, 0);
        dist1[start.id] = 0;

        while (!pq.isEmpty()) {
            var s = pq.front().element;
            pq.dequeue();

            var i;
            for (i = 0; i < this.adj[s.id].length; ++i) {
                var node = this.adj[s.id][i][0];
                var weight = this.adj[s.id][i][1];
                if (dist1[node.id] > dist1[s.id] + weight) {
                    dist1[node.id] = dist1[s.id] + weight;
                    pq.enqueue(node, dist1[node.id]);
                }
            }
            pq.printPQueue();
        }

        for (let i = 0; i < this.numberOfNodes; ++i) {
            console.log(i, dist1[i]);
        }
    }
}