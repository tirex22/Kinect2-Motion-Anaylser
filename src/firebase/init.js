const firebase = require("firebase");
require("firebase/firestore");

// Initialize Firebase App
firebase.initializeApp({
    apiKey: 'AIzaSyfirestoreDiqloPKDLXDhglR8INnZRAq7FUdWL4I',
    projectId: 'motion-analysis',
    storageBucket: 'gs://motion-analysis.appspot.com/'
});

// Initialize Cloud Firestore through Firebase
var firestore = firebase.firestore();

// Initialize Cloud Storage through Firebase
var storage = firebase.storage();

export { firestore, storage };