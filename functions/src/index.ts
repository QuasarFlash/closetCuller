import * as functions from 'firebase-functions';
const express = require('express');
import * as admin from 'firebase-admin';
const svcAct = require('../key.json');
admin.initializeApp({
    credential: admin.credential.cert(svcAct),
    databaseURL: "https://closet-culler.firebaseio.com"
});
const db = admin.firestore();
const app = express();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

app.post('/updateItem', (req, res) => {
    const itemId = req.body.itemId;
    const uid = req.body.uid;
    const itemRef = db.doc(`users/${uid}/clothes/${itemId}`);

    itemRef.update({
        lastWorn: Date.now()
    });
    
    res.send('success');
})

const api = functions.https.onRequest(app);

module.exports = {
    api
}
