const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
} = require("firebase/firestore");

const db = getFirestore();

async function addchats(sender, receiver) {
 
  try {
    const chat=await db.collection("chats").add({
      users: [user1ID, user2ID],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).send({
      status: "success",
      message: `chat added successfully with ID ${chat.id}`,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}




module.exports = {
  addchats

  
};
