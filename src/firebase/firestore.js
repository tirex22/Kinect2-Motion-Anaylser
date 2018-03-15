const firebase = require("firebase");
require("firebase/firestore");

// ============================================ Initialization ===================================================



// Initialize Firebase App
firebase.initializeApp({
    apiKey: 'AIzaSyDBDiqloPKDLXDhglR8INnZRAq7FUdWL4I',
    projectId: 'motion-analysis',
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();



// ================================================ Functions =====================================================


function getAllDatasets(callback) {
    db.collection("datasets").get()
        .then(function (collection) {
            let datasets = [];
            collection.forEach(function (doc) {
                datasets.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            callback({ 'success': true, 'dataSets': datasets });
        })
        .catch(function (error) {
            callback({ 'success': false, 'msg': "Something Went Wrong" });
        });
}


function createDataset(name, callback) {
    db.collection("datasets").add({ name: name, motion_models: [], })
        .then(function (docRef) {
            callback({ 'success': true, 'id': docRef.id });
        })
        .catch(function (error) {
            callback({ 'success': false, 'msg': "Something Went Wrong" });
        });
}


function createMotionModel(datasetId, bodyFrames, callback) {
    db.collection("motion_models").add(bodyFrames)
        .then(function (docRef) {
            newMotionModel = { _id: docRef.id, date_created: Date.now() };
            updateDatasetMotionModels(datasetId, newMotionModel, (res) => {
                callback(res);
            });
        })
        .catch(function (error) {
            callback({ 'success': false, 'msg': "Something Went Wrong" });
        });
}


function updateDatasetMotionModels(datasetId, newMotionModel, callback) {
    db.collection("datasets").doc(datasetId).get()
        .then(function (doc) {
            let motionModels = doc.data().motion_models;
            motionModels.push(newMotionModel);
            db.collection("datasets").doc(datasetId).update({ motion_models: motionModels })
                .then(function (docRef) {
                    callback({ 'success': true });
                })
                .catch(function (error) {
                    callback({ 'success': false, 'msg': "Something Went Wrong" });
                });
        })
        .catch(function (error) {
            callback({ 'success': false, 'msg': "Something Went Wrong" });
        });
}


export {
    getAllDataSets, createDataSet
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

// addMotionModel('H1kTpMro5AHU4TU7OuqB', { name: 'heee' }, (res) => {
//     console.log(res);
// });