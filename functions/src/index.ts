import * as functions from 'firebase-functions';
const express = require('express');
const cors = require('cors');
import * as admin from 'firebase-admin';
const svcAct = require('../key.json');
admin.initializeApp({
    credential: admin.credential.cert(svcAct),
    databaseURL: "https://closet-culler.firebaseio.com"
});
const db = admin.firestore();
const app = express();
app.use(cors());

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

app.post('/updateItem', async (req, res) => {
    const itemId = req.body.itemId;
    const uid = req.body.uid;
    const itemRef = db.doc(`users/${uid}/clothes/${itemId}`);

    await itemRef.update({
        last_worn: Date.now()
    }).then(ret => {
        res.send(ret);
    }).catch(err => {
        res.send(err);
    });
})

const api = functions.https.onRequest(app);

module.exports = {
    api
}
