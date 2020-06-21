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

    editWeight(id1, id2, weight, directed) {
        for (let i = 0; i < this.adj[id1].length; ++i) {
            if (this.adj[id1][i][0].id == id2) {
                this.adj[id1][i][1] = weight;
            }
        }
        if (!directed) {
            for (let i = 0; i < this.adj[id2].length; ++i) {
                if (this.adj[id2][i][0].id == id1) {
                    this.adj[id2][i][1] = weight;
                }
            }
        }
    }

    printGraph() {
        for (let i = 0; i < this.numberOfNodes; ++i) {
            for (let j = 0; j < this.adj[i].length; ++j) {
                // console.log(this.adj[i][j][0]);
            }
        }
    }

    bft(start) {
        const svgAnimationBFT = [];
        var visitedBfs = [];
        for (let i = 0; i < this.numberOfNodes; ++i) {
            visitedBfs.push(false);
        }

        var q = new Queue;

        visitedBfs[start.id] = true;

        q.enqueue(start);
        var j;

        svgAnimationBFT.push(start.id);
        while (!q.isEmpty()) {
            var s = q.front();
            q.dequeue();
            for (j = 0; j < this.adj[s.id].length; ++j) {

                if (!visitedBfs[this.adj[s.id][j][0].id]) {
                    var x = this.adj[s.id][j][0].x;
                    var y = this.adj[s.id][j][0].y;
                    var radius = this.adj[s.id][j][0].radius;
                    svgAnimationBFT.push(this.adj[s.id][j][0].id);
                    visitedBfs[this.adj[s.id][j][0].id] = true;
                    q.enqueue(this.adj[s.id][j][0]);
                }
            }
        }
        return svgAnimationBFT;
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

        while (!q.isEmpty()) {
            var s = q.front();
            q.dequeue();
            for (let i = 0; i < this.adj[s.id].length; ++i) {

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
        var pred = [], dist = [];
        const svgAnimationBFS = [];
        if (this.BFS(src, dest, pred, dist) === false) {
            return svgAnimationBFS;
        }

        var node = dest;
        svgAnimationBFS.unshift(node.id);
        while (pred[node.id]) {
            svgAnimationBFS.unshift(pred[node.id].id);
            node = pred[node.id];
        }
        return svgAnimationBFS;
    }

    dft(start) {
        const svgAnimationDFS = [];
        var visitedDfs = [];
        for (let i = 0; i < this.numberOfNodes; ++i) {
            visitedDfs.push(false);
        }

        svgAnimationDFS.push(start.id);
        this.dfsHelper(start, visitedDfs, svgAnimationDFS);
        return svgAnimationDFS;
    }

    dfsHelper(start, visitedDfs, svgAnimationDFS) {
        visitedDfs[start.id] = true;

        var j;
        for (j = 0; j < this.adj[start.id].length; ++j) {
            if (!visitedDfs[this.adj[start.id][j][0].id]) {
                var x = this.adj[start.id][j][0].x;
                var y = this.adj[start.id][j][0].y;
                var radius = this.adj[start.id][j][0].radius;
                svgAnimationDFS.push(this.adj[start.id][j][0].id);
                this.dfsHelper(this.adj[start.id][j][0], visitedDfs, svgAnimationDFS);
            }
        }
    }

    dijkshra(start, dest) {
        var pq = new PriorityQueue();

        var dist1 = [];
        var pred = [];
        var visitedDijkstra = [];
        var animationDijkstra = [];
        var path = [];
        var distances = [];
        var size = this.numberOfNodes;
        while (size--) dist1.push(Number.POSITIVE_INFINITY);
        size = this.numberOfNodes;
        while (size--) pred.push(-1);
        size = this.numberOfNodes;
        while(size--) visitedDijkstra.push(false);

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
                    pred[this.adj[s.id][i][0].id] = s;
                    pq.enqueue(node, dist1[node.id]);
                }
            }
            pq.printPQueue();
        }

        for (let i = 0; i < this.numberOfNodes; ++i) {
            if (dist1[i] != Number.POSITIVE_INFINITY) {
                distances.push([i, dist1[i]]);
            }
        }
        var node = dest;
        path.unshift(node.id);
        while (pred[node.id]) {
            path.unshift(pred[node.id].id);
            node = pred[node.id];
        }
        animationDijkstra.push(path, distances);
        return animationDijkstra;
    }
}