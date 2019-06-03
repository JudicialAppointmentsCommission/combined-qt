const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();
const NotifyClient = require("notifications-node-client").NotifyClient;

const createRecord = async (record, collection) => {
  console.info({ collection: "received" });

  record.createdAt = new Date();
  await firestore
    .collection(collection)
    .doc()
    .set(record);
  return true;
}

const sendEmail = async (email) => {
  const client = new NotifyClient(functions.config().notify.key);

  await client
    .sendEmail(
      functions.config().notify.templates.deputy_district_judge_civil,
      email,
      {});

  console.info({ emailSentTo: email });
  return true;
}

exports.startScenario = functions.https.onRequest((request, response) => {
  return createRecord(request.body, "startScenario")
    .then(() => {
      return response.status(200).send({status: 'OK'});
    })
    .catch((e) => {
      console.error(e);
      return response.status(500).send({status: 'Error'});
    });
});

exports.finishScenario = functions.https.onRequest((request, response) => {
  return createRecord(request.body, "finishScenario")
    .then(() => {
      return sendEmail(request.body.email);
    })
    .then(() => {
      return response.status(200).send({status: 'OK'});
    })
    .catch((e) => {
      console.error(e);
      return response.status(500).send({status: 'Error'});
    });
});
