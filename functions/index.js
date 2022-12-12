import functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

//Create collection notifications
const createNotification = (notification) => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification)
    .then((doc) => {
      console.log("Notification added", doc);
    });
};

//Trigger cuando creamos un documento dentro de la collection facturas en firetore
export const facturaCreada = functions.firestore
  .document("facturas/{id}")
  .onCreate((doc) => {
    const factura = doc.data();
    //Notification Object
    const notification = {
      content: "Added a new Invoice",
      user: `${factura.uid}`,
      time: admin.firestore.FieldValue.serverTimestamp(),
    };

    return createNotification(notification);
  });

//Trigger cuando un nuevo usuario se registra
export const userJoined = functions.auth.user().onCreate((user) => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
      const newUser = doc.data();
      const notification = {
        content: "Joined the party",
        user: `${newUser.uid} ${newUser.username}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
      };

      return createNotification(notification);
    });
});
