import { firestore, storage } from './init';

// Fetches all datasets from the database ( with motion model references )
function getAllDatasets(callback) {
    firestore.collection("datasets").get()
        .then(function (collection) {
            let datasets = [];
            collection.forEach(function (doc) {
                datasets.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            callback({ 'success': true, 'datasets': datasets });
        })
        .catch(function (error) {
            callback({ 'success': false, 'msg': error });
        });
}


// Creates a new dataset
function createDataset(datasetInfo, callback) {
    firestore.collection("datasets").add(datasetInfo)
        .then(function (docRef) {
            callback({ 'success': true, 'id': docRef.id });
        })
        .catch(function (error) {
            callback({ 'success': false, 'msg': error });
        });
}


// Uploads a new motion model to its relevant dataset folder
function uploadMotionModel(datasetId, motionModel, callback) {
    compressMotionModel(motionModel, (compressed) => {
        let now = Date.now();
        let fileName = now + ".json";
        let fileRef = storage.ref().child(datasetId + '/' + fileName);
        let content = JSON.stringify({ motionModel: compressed });
        fileRef.putString(content).then((snapshot) => {
            if (snapshot.state === "success") {
                let newMotionModel = {
                    file_name: fileName,
                    date_created: Date.now(),
                    frame_count: motionModel.length
                };
                addMotionModelToDataset(datasetId, newMotionModel, (res) => {
                    callback(res);
                });
            } else {
                callback({ 'success': false, 'msg': "Failed to upload motion model." });
            }
        });
    });
}


// Adds a new motion model reference to its relevant dataset
function addMotionModelToDataset(datasetId, newMotionModel, callback) {
    firestore.collection("datasets").doc(datasetId).get()
        .then(function (doc) {
            let motionModels = doc.data().motion_models;
            motionModels.push(newMotionModel);
            firestore.collection("datasets").doc(datasetId).update({ motion_models: motionModels })
                .then(function (docRef) {
                    callback({ 'success': true });
                })
                .catch(function (error) {
                    callback({ 'success': false, 'msg': error });
                });
        })
        .catch(function (error) {
            callback({ 'success': false, 'msg': error });
        });
}


// Converts a motion model to an array of frames ( smaller file size  )
function compressMotionModel(motionModel, callback) {
    let newMotionModel = [];
    let jointsPosition = [];
    let newJointsPosition = {};

    motionModel.forEach(function (element) {

        element.bodies.forEach(function (elem) {
            if (elem.joints) {
                jointsPosition = elem.joints;
                newJointsPosition = {};
                jointsPosition.forEach(function (position, i) {
                    newJointsPosition["" + i] = {
                        x: position.depthX,
                        y: position.depthY,
                        // z: position.depthZ,
                    };
                });
                newMotionModel.push(newJointsPosition);
            }
        });
    });
    callback(newMotionModel);
}

// Creates a new user
function createUser(name, callback) {
    firestore.collection("users").add({
        info: {
            name: name,
            profile_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzaLMnex1QwV83TBQgxLTaoDAQlFswsYy62L3mO4Su-CMkk3jX",
        },
        statistics: {

        }
    })
        .then(function (docRef) {
            callback({ 'success': true, 'id': docRef.id });
        })
        .catch(function (error) {
            callback({ 'success': false, 'msg': error });
        });
}

// Fetches all users from the database
function getAllUsers(callback) {
    firestore.collection("users").get()
        .then(function (collection) {
            let users = [];
            collection.forEach(function (doc) {
                users.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            callback({ 'success': true, 'users': users });
        })
        .catch(function (error) {
            callback({ 'success': false, 'msg': error });
        });
}


export {
    getAllDatasets, createDataset, uploadMotionModel, createUser, getAllUsers
};


// ================================================ Testing Functions =====================================================



// getAllDatasets((res) => {
//     console.log(res);
// });

// createDataset("Default Dataset", (res) => {
//     console.log(res);
// });

// updateDatasetMotionModels('lpAKm07bVbXi0DQc8ftt', (res) => {
//     console.log(res);
// });

// deleteMoionModel('2FVAOMXi7cLdlEv646vQdO');



// // Fake motion model

// let frames = 150;
// let motionModel = [];

// for (let i = 0; i < frames; i++) {
//     let bodyFrame = {};
//     for (let j = 0; j < 25; j++) {
//         bodyFrame["" + j] = {
//             x: 1,
//             y: 2,
//             z: 3
//         }
//     }
//     motionModel.push(bodyFrame);
//     if (i === (frames - 1)) {
//         //     createMotionModel('H1kTpMro5AHU4TU7OuqB', { motionModel: motionModel }, (res) => {
//         //         console.log(res);
//         //     });
//         // }
//         console.log(motionModel);

//     }
// }



