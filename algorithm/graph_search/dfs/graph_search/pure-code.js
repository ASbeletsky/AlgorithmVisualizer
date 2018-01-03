var random = (min, max) => {
    return (Math.random() * (max - min + 1) | 0) + min;
};

var s = random(0, G.length - 1); // s = start node
var e; // e = end node
do {
    e = random(0, G.length - 1);
} while (s === e);
var MAX_VALUE = Infinity;
var minWeight = MAX_VALUE;
var D = []; // D[i] indicates whether the i-th node is discovered or not
for (var i = 0; i < G.length; i++) D.push(false);

function DFS(node, parent, weight) { // node = current node, parent = previous node
    if (minWeight < weight) return;
    if (node === e) {
        if (minWeight > weight) {
            minWeight = weight;
        }
        return;
    }
    D[node] = true; // label current node as discovered
    for (var i = 0; i < G[node].length; i++) {
        if (G[node][i]) { // if the path from current node to the i-th node exists
            if (!D[i]) { // if the i-th node is not labeled as discovered
                DFS(i, node, weight + G[node][i]); // recursively call DFS
            }
        }
    }
    D[node] = false; // label current node as undiscovered
}

DFS(s, undefined, 0);
