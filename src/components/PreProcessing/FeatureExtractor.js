function getDistance(p1, p2) {
    let diffX = (p1.x - p2.x) ^ 2;
    let diffY = (p1.y - p2.y) ^ 2;
    let diffZ = (p1.z - p2.z) ^ 2;
    let distance = (diffX + diffY + diffZ) ^ .5
    return (distance);
}