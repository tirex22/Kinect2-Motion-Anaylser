const firebase = require("firebase");
require("firebase/firestore");

// ============================================ Initialization ===================================================



// Initialize Firebase App
firebase.initializeApp({
    apiKey: 'AIzaSyfirestoreDiqloPKDLXDhglR8INnZRAq7FUdWL4I',
    projectId: 'motion-analysis',
});

// Initialize Cloud Firestore through Firebase
var firestore = firebase.firestore();




// ================================================ Functions =====================================================

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

function createDataset(name, callback) {
    firestore.collection("datasets").add({ name: name, motion_models: [], })
        .then(function (docRef) {
            callback({ 'success': true, 'id': docRef.id });
        })
        .catch(function (error) {
            callback({ 'success': false, 'msg': error });
        });
}

function createMotionModel(datasetId, motionModel, callback) {
    compressMotionModel(motionModel, (compressed) => {
        let motionObject = { 'motion_model': compressed };
        firestore.collection("motion_models").add(motionObject)
            .then(function (docRef) {
                let newMotionModel = { _id: docRef.id, date_created: Date.now() };
                updateDatasetMotionModels(datasetId, newMotionModel, (res) => {
                    callback(res);
                });
            })
            .catch(function (error) {
                callback({ 'success': false, 'msg': error });
            });
    });
}

function updateDatasetMotionModels(datasetId, newMotionModel, callback) {
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

function deleteMoionModel(motionModelId) {
    firestore.collection("motion_models").doc(motionModelId).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

function deleteAllMotionModels() {
    getAllDatasets((res) => {
        let motionModels = [];
        res.datasets.forEach((dataset) => {
            motionModels = dataset.data.motion_models;
            motionModels.forEach((motionModel) => {
                deleteMoionModel(motionModel._id);
            });
        });
    });
    return;
}


export {
    getAllDatasets, createDataset, createMotionModel, deleteAllMotionModels, deleteMoionModel,
}


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



