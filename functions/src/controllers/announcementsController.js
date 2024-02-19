const { getFirestore,
  FieldValue,
  Timestamp,
} = require("firebase-admin/firestore");


const { initializeApp } = require("firebase-admin/app");

const db = getFirestore();

async function addAnnouncements(req, res) {
  const { message} = req.body;

  try {
    

    const announcementDoc = await db.collection("announcements").add({
      createdBy: req.user.user_id,
      createdAt: Timestamp.now(),
      message:message
    });

    res.status(201).send({
      status: "success",
      message: `announcement added successfully with ID ${announcementDoc.id}`,
    });
  } catch (error) {
    if (error.code) res.status(error.code).json(error.error.message);
    else res.status(500).json(error.message);
  }
}

async function getAllAnnouncements(req, res) {
  try {
    const announcementsRef = db.collection("announcements");
    const announcementDocs = await announcementsRef.get();

    result = [];

    announcementDocs.forEach((doc) => {
      result.push(doc.data());
    });

    res.status(200).json({ announcements: result });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function getSingleAnnouncement(req, res) {
  try {
    const announcementRef = db.collection("announcements").doc(req.params.announcementId);
    const doc = await announcementRef.get();

    if (!doc.exists) {
      res
        .status(404)
        .json({ message: "The announcement you requested does not exist" });
    } else {
      res.status(200).json(doc.data());
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function deleteAnnouncement(req, res) {
  try {
    const announcementRef = db.collection("announcements").doc(req.params.announcementId);
    const announcementDoc = await announcementRef.get();

    if (!announcementDoc.exists) {
      res
        .status(404)
        .json({ message: "The announcement Document you requested does not exist" });
    } else {
      await db.collection("announcements").doc(req.params.announcementId).delete();
      res.status(200).json({ message: "announcement Document Deleted Successfully" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function updateAnnouncement(req, res) {
  const shouldMerge = req.query.shouldMerge === "true";

  try {
    validatePutAnnouncement(req.body);

    const announcementRef = db.collection("announcements").doc(req.params.announcementId);
    const announcementDoc = await announcementRef.get();

    if (!announcementDoc.exists) {
      res
        .status(404)
        .json({ message: "The announcement Document you requested does not exist" });
    } else {
      const result = await announcementRef.set(
        { ...req.body },
        { merge: shouldMerge }
      );
      res
        .status(200)
        .json({ message: `Successfully updated announcement ${announcementDoc.id}` });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = {
  getAllAnnouncements,
  addAnnouncement,
  getSingleAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
};
