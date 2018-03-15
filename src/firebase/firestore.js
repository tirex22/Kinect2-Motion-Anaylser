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


function getAllDataSets(callback) {
    db.collection("data-sets").get()
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


function createDataSet(name, callback) {
    db.collection("data-sets").add({ name: name, motionModelCount: 0, })
        .then(function (docRef) {
            callback({ 'success': true, 'id': docRef.id });
        })
        .catch(function (error) {
            callback({ 'success': false, 'msg': "Something Went Wrong" });
        });
}

// getAllDataSets((res) => {
//     console.log(res);
// });

// createDataSet("Shoulder Raise", (res) => {
//     console.log(res);
// });

export {
    getAllDataSets, createDataSet
}