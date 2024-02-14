const { getFirestore } = require("firebase-admin/firestore");
const { initializeApp } = require("firebase-admin/app");

const {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc,
} = require("firebase/firestore");

const db = getFirestore();

async function addMessage(req, res) {
  const { contents, recipientId, aiResponse } = req.body;

  try {
    const messageDoc = await db.collection("messages").add({
      sender: sender,
      contents: contents,
      recipientId: recipientId, // recipient?
      sentTimestamp: Date.now(),
      aiResponse: aiResponse,
    });

    res.status(200).send({
      status: "success",
      message: `message added successfully with ID ${messageDoc.id}`,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function getSingleMessage(req, res) {
  try {
    const messageRef = db.collection("messages").doc(req.params.messageId);
    const doc = await messageRef.get();

    if (!doc.exists) {
      res
        .status(404)
        .json({ message: "The Message you requested does not exist" });
    } else {
      res.status(200).json(doc.data());
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function getAllMessages(req, res) {
  try {
    const messagesRef = db.collection("messages");
    const messageDocs = await messagesRef.get();

    result = [];

    messageDocs.forEach((doc) => {
      result.push(doc.data());
    });

    res.status(200).json({ messages: result });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function updateMessage(req, res) {
  const shouldMerge = req.query.shouldMerge === "true";

  try {
    const messageRef = db.collection("messages").doc(req.params.messageId);
    const messageDoc = await messageRef.get();

    if (!messageDoc.exists) {
      res
        .status(404)
        .json({ message: "The Message Document you requested does not exist" });
    } else {
      const result = await messageRef.set( 
        { ...req.body },
        { merge: shouldMerge }
      );
      res
        .status(200)
        .json({ message: `Successfully updated Message ${messageDoc.id}` });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function deleteMessage(req, res) {
  try {
    const messageRef = db.collection("messages").doc(req.params.messageId);
    const messageDoc = await messageRef.get();

    if (!messageDoc.exists) {
      res
        .status(404)
        .json({ message: "The Message Document you requested does not exist" });
    } else {
      await db.collection("messages").doc(req.params.messageId).delete();
      res.status(200).json({ message: "message Document Deleted Successfully" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = {
  getSingleMessage,
  getAllMessages,
  addMessage,
  deleteMessage,
  updateMessage,
};
