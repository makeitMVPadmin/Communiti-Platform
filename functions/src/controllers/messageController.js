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

const db=getFirestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

async function sendMessage(chatID, messageID, senderId, message, attachment) {
  try {
    const messageData = {
      senderId,
      message,
      timestamp: timestamp,
      attachment, 
    };

    await db.collection('chats').doc(chatID).collection('messages').doc(messageID).set(messageData);

    res.status(200).send({
      status: "success",
      message: `Chat added successfully with ID ${messageID}`,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}
async function getChatMessages(chatID) {
  try {
    const snapshot = await db.collection('chats').doc(chatID).collection('messages').get();
    const messages = snapshot.docs.map((doc) => doc.data());
    return messages;
  } catch (error) {
    console.error('Error retrieving chat messages:', error);
    throw new Error('Failed to retrieve chat messages');
  }
}
db.collection('chatMessages').doc(chatID).collection('messages')
  .onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const newMessage = change.doc.data();
        // Handle the new message (e.g., update UI)
      }
    });
  });

module.exports = {
  getAllchats,
  addchats,
  getSinglechat,
  
};
