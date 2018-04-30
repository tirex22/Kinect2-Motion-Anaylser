// Returns the depth and vetical distance
function getYDistance(p1, p2) {
    let diffY = Math.pow((p1.cameraY - p2.cameraY), 2);
    let distance = Math.pow((diffY), .5);
    return (distance);
}

function getDistance(p1, p2) {
    let diffX = Math.pow((p1.cameraX - p2.cameraX), 2);
    let diffY = Math.pow((p1.cameraY - p2.cameraY), 2);
    let diffZ = Math.pow((p1.cameraZ - p2.cameraZ), 2);
    let distance = Math.pow((diffX + diffY + diffZ), .5);
    return (distance);
}

function getMovementLevel(bodyFrame1, bodyframe2) {
    let diff = 0;
    for (let i = 0; i < 25; i++) {
        diff = diff + getDistance(bodyFrame1[i], bodyframe2[i])
    }
    return diff;
}

export {
    getYDistance, getMovementLevel
};
