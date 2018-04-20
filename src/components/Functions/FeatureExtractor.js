// Returns the depth and vetical distance
function getYZDistance(p1, p2) {
    let diffY = Math.pow((p1.cameraY - p2.cameraY), 2);
    let diffZ = Math.pow((p1.cameraZ - p2.cameraZ), 2);
    let distance = Math.pow((diffY + diffZ), .5);
    return (distance);
}

export {
    getYZDistance,
};
