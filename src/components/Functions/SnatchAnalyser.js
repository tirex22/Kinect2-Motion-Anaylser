import motion from './motion.json';
import { getYZDistance } from './FeatureExtractor';

function getBarLevel() {
    let data = [];
    for (let i = 0; i < motion.length; i++) {
        let dist = getYZDistance(motion[i][6], motion[i][10]);
        data.push(dist);
    }
    return data;
}

export {
    getBarLevel,
}