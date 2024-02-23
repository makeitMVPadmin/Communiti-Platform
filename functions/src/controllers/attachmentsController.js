const { getFirestore } = require("firebase-admin/firestore");
const { initializeApp } = require("firebase-admin/app");
const { uploadBytes } = require("firebase/storage");

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

const storage = getStorage(db);

async function addAttachment(req, res) {
  const { name, type, blob } = req.body;

  try {
    const storageRef = ref(storage, `files/myImage.jpeg`);
    const metadata = {
      contentType: "image/jpeg",
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      blob.buffer,
      metadata
    );

    const downloadURL = await getDownloadURL(snapshot.ref);

    // const eventDoc = await db.collection("attachments").add({
    //   name: name,
    //   type: type,
    //   blob: blob,
    //   createdBy: req.user.user_id,
    //   createdAt: Date.now(),
    //});

    res.status(200).send({
      status: "success",
      message: `Attachment added successfully with ID ${eventDoc.id}`,
      downloadURL: downloadURL,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function getAllAttachments(req, res) {
  try {
    const eventsRef = db.collection("events");
    const eventDocs = await eventsRef.get();

    result = [];

    eventDocs.forEach((doc) => {
      result.push(doc.data());
    });

    res.status(200).json({ events: result });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function getSingleAttachment(req, res) {
  try {
    const eventRef = db.collection("attachments").doc(req.params.attachmentId);
    const doc = await eventRef.get();

    if (!doc.exists) {
      res.status(404).json({
        message: "The Attachment Document you requested does not exist",
      });
    } else {
      res.status(200).json(doc.data());
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function deleteAttachment(req, res) {
  try {
    const eventRef = db.collection("attachments").doc(req.params.attachmentId);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      res.status(404).json({
        message: "The Attachment Document you requested does not exist",
      });
    } else {
      await db.collection("attachments").doc(req.params.attachmentId).delete();
      res
        .status(200)
        .json({ message: "Attachment Document deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function deleteAttachment(req, res) {
  try {
    const eventRef = db.collection("events").doc(req.params.attachmentId);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      res.status(404).json({
        message: "The Attachment Document you requested does not exist",
      });
    } else {
      await db.collection("attachments").doc(req.params.attachmentId).delete();
      res
        .status(200)
        .json({ message: "Attachment Document deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function updateAttachment(req, res) {
  const shouldMerge = req.query.shouldMerge === "true";

  try {
    const eventRef = db.collection("attachments").doc(req.params.attachmentId);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      res.status(404).json({
        message: "The Attachment Document you requested does not exist",
      });
    } else {
      const result = await eventRef.set(
        { ...req.body },
        { merge: shouldMerge }
      );
      res.status(200).json({
        message: `Successfully updated attachment ${attachmentDoc.id}`,
      });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = {
  addAttachment,
  getSingleAttachment,
  getAllAttachments,
  deleteAttachment,
  updateAttachment,
};
