var s = Integer.random(0, G.length - 1);
var e; // e = end node
do {
    e = Integer.random(0, G.length - 1);
} while (s === e);
var MAX_VALUE = Infinity;
var S = [];
for (var i = 0; i < G.length; i++) S[i] = MAX_VALUE;

function Dijkstra(G, start, end) {
    var minIndex, minDistance;
    var D = [];
    for (var i = 0; i < G.length; i++) D.push(false);
    S[start] = 0;
    var k = G.length;
    while (k--) {
        minDistance = MAX_VALUE;
        for (i = 0; i < G.length; i++) {
            if (S[i] < minDistance && !D[i]) {
                minDistance = S[i];
                minIndex = i;
            }
        }
        if (minDistance === MAX_VALUE) break;
        D[minIndex] = true;
        for (i = 0; i < G.length; i++) {
            if (G[minIndex][i] && S[i] > S[minIndex] + G[minIndex][i]) {
                S[i] = S[minIndex] + G[minIndex][i];
            }
        }
    }

    return S[end];
}

Dijkstra(G, s, e);
