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
async function addChat(req, res) {
  const { recipientId } = req.body;

  try {
    const chat = await db.collection("chats").add({
      senderId: req.user.user_id,
      recipientId: recipientId,
      messages:[],
      CreatedOn: Date.now(),
      UpdatedOn: Date.now(),
    });

    res.status(200).send({
      status: "success",
      message: `message added successfully with ID ${chat.id}`,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function getSingleChat(req, res) {
  try {
    const chatRef = db.collection("chats").doc(req.params.chatId);
    const doc = await chatRef.get();

    if (!doc.exists) {
      res
        .status(404)
        .json({ message: "The chat you requested does not exist" });
    } else {
      res.status(200).json(doc.data());
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
async function getAllChats(req, res) {
  try {
    const chatsRef = db.collection("chats");
    const chatsDocs = await chatsRef.get();

    result = [];

    chatsDocs.forEach((doc) => {
      result.push(doc.data());
    });

    res.status(200).json({ chat: result });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
async function updateChat(req, res) {
  const shouldMerge = req.query.shouldMerge === "true";

  try {
    const chatRef = db.collection("chats").doc(req.params.chatId);
    const chatDoc = await chatRef.get();

    if (!chatDoc.exists) {
      res
        .status(404)
        .json({ message: "The chat Document you requested does not exist" });
    } else {
      const result = await chatRef.set({
        ...req.body,
        UpdatedOn: Date.now()},
        { merge: shouldMerge }
      );
      res
        .status(200)

        .json({ message: `Successfully updated chat ${chatDoc.id}` });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
async function deleteChat(req, res) {
  try {
    const chatRef = db.collection("chats").doc(req.params.chatId);
    const chatDoc = await chatRef.get();

    if (!chatDoc.exists) {
      res
        .status(404)
        .json({ message: "The Message Document you requested does not exist" });
    } else {
      await db.collection("chats").doc(req.params.chatId).delete();
      res
        .status(200)
        .json({ message: "chat Document Deleted Successfully" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = {
  addChat,
  getSingleChat,
  getAllChats,
  updateChat,
  deleteChat
};