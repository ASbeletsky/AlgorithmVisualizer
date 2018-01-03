var random = (min, max) => {
    return (Math.random() * (max - min + 1) | 0) + min;
};

var s = random(0, G.length - 1); // s = start node
var e; // e = start node
do {
    e = random(0, G.length - 1);
} while (s === e);
var MAX_VALUE = Infinity;

function BFS() {
    var W = []; // W[i] indicates the length of the shortest path from start node to the i-th node
    var Q = [];
    var i;
    for (i = 0; i < G.length; i++) {
        W.push(MAX_VALUE);
    }
    W[s] = 0;
    Q.push(s); // add start node to queue
    while (Q.length > 0) {
        var node = Q.shift(); // dequeue
        for (i = 0; i < G[node].length; i++) {
            if (G[node][i]) { // if the edge from current node to the i-th node exists
                if (W[i] > W[node] + G[node][i]) { // if current path is shorter than the previously shortest path
                    W[i] = W[node] + G[node][i]; // update the length of the shortest path
                    Q.push(i); // add child node to queue
                }
            }
        }
    }
    return W[e];
}

var minWeight = BFS(s);

