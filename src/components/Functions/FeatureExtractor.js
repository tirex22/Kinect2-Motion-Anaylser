// Returns the depth and vetical distance
function getYDistance(p1, p2) {
    let diffY = Math.pow((p1.cameraY - p2.cameraY), 2);
    let distance = Math.pow((diffY), .5);
    return (distance);
}

function getZDistance(p1, p2) {
    let diffY = Math.pow((p1.cameraZ - p2.cameraZ), 2);
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

function getAngle(p1, p2, p3) {
    var p12 = Math.sqrt(Math.pow((p1.cameraX - p2.cameraX), 2) + Math.pow((p1.cameraZ - p2.cameraZ), 2));
    var p13 = Math.sqrt(Math.pow((p1.cameraX - p3.cameraX), 2) + Math.pow((p1.cameraZ - p3.cameraZ), 2));
    var p23 = Math.sqrt(Math.pow((p2.cameraX - p3.cameraX), 2) + Math.pow((p2.cameraZ - p3.cameraZ), 2));

    //angle in radians
    var resultRadian = Math.acos(((Math.pow(p12, 2)) + (Math.pow(p13, 2)) - (Math.pow(p23, 2))) / (2 * p12 * p13));

    //angle in degrees
    var resultDegree = Math.acos(((Math.pow(p12, 2)) + (Math.pow(p13, 2)) - (Math.pow(p23, 2))) / (2 * p12 * p13)) * 180 / Math.PI;

    return resultDegree;
}

export {
    getYDistance, getZDistance, getMovementLevel, getAngle
};
