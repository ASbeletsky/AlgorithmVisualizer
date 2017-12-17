var random = (min, max) => {
    return (Math.random() * (max - min + 1) | 0) + min;
};
var src = random(0, G.length - 1), dest;
var MAX_VALUE = Infinity;
var minWeight;

do {
    dest = random(0, G.length - 1);
}
while (src === dest);

function BELLMAN_FORD(src, dest) {
    var weights = new Array(G.length), i, j;
    for (i = 0; i < G.length; i++) {
        weights[i] = MAX_VALUE;
    }
    weights[src] = 0;
    var k = G.length;
    while (k--) {
        for (i = 0; i < G.length; i++) {
            for (j = 0; j < G.length; j++) {
                if (G[i][j]) {
                    if (weights[j] > (weights[i] + G[i][j])) {
                        weights[j] = weights[i] + G[i][j];
                    }
                }
            }
        }
    }

    for (i = 0; i < G.length; i++) {
        for (j = 0; j < G.length; j++) {
            if (G[i][j]) {
                if (weights[j] > (weights[i] + G[i][j])) {
                    return (MAX_VALUE);
                }
            }
        }
    }

    return weights[dest];
}

minWeight = BELLMAN_FORD(src, dest);