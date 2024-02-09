const { getFirestore, FieldValue } = require("firebase-admin/firestore");
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

async function addEvents(req, res) {
  const { title, text } = req.body;

  try {
    const eventDoc = await db.collection("events").add({
      title: title,
      text: text,
    });

    res.status(200).send({
      status: "success",
      message: `event added successfully with ID ${eventDoc.id}`,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function getAllEvents(req, res) {
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

async function getSingleEvent(req, res) {
  try {
    const eventRef = db.collection("events").doc(req.params.eventId);
    const doc = await eventRef.get();

    if (!doc.exists) {
      res
        .status(404)
        .json({ message: "The Event you requested does not exist" });
    } else {
      res.status(200).json(doc.data());
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function deleteEvent(req, res) {
  try {
    const eventRef = db.collection("events").doc(req.params.eventId);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      res
        .status(404)
        .json({ message: "The Event Document you requested does not exist" });
    } else {
      await db.collection("events").doc(req.params.eventId).delete();
      res.status(200).json({ message: "Event Document Deleted Successfully" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function deleteEvent(req, res) {
  try {
    const eventRef = db.collection("events").doc(req.params.eventId);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      res
        .status(404)
        .json({ message: "The Event Document you requested does not exist" });
    } else {
      await db.collection("events").doc(req.params.eventId).delete();
      res.status(200).json({ message: "Event Document Deleted Successfully" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function updateEvent(req, res) {
  const shouldMerge = req.query.shouldMerge === "true";

  try {
    const eventRef = db.collection("events").doc(req.params.eventId);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      res
        .status(404)
        .json({ message: "The Event Document you requested does not exist" });
    } else {
      const result = await eventRef.set(
        { ...req.body },
        { merge: shouldMerge }
      );
      res
        .status(200)
        .json({ message: `Successfully updated event ${eventDoc.id}` });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function addAttendingUsersToEvent(req, res) {
  const eventId = req.params.eventId;

  // attendingUsersIds is an array of ids of the form [ "UvGlK6WZvOPsRg6zol92", ... ]
  const { attendingUsersIds } = req.body;

  try {
    //get Reference for particular event
    const eventRef = db.collection("events").doc(eventId);

    // GET an array of references to the provided users by their ID
    const usersRef = attendingUsersIds.map((userId) =>
      db.collection("users").doc(userId)
    );

    // Use the UPDATE interface and arrayUnion to add new elements to the users array while keeing existing ones
    await eventRef.update({
      users: FieldValue.arrayUnion(...usersRef),
    });

    res.status(200).json({
      message: `Successfully added users to event `,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
module.exports = {
  getAllEvents,
  addEvents,
  getSingleEvent,
  deleteEvent,
  updateEvent,
  addAttendingUsersToEvent,
};
