const {
  getFirestore,
  FieldValue,
  Timestamp,
} = require("firebase-admin/firestore");

const validatePostEvent = require("../utilities/validatePostEvent");
const validatePutEvent = require("../utilities/validatePutEvent");
const { initializeApp } = require("firebase-admin/app");

const db = getFirestore();

async function addEvent(req, res) {
  const {
    title,
    description,
    date,
    startTime,
    endTime,
    eventImage,
    locationType,
    timezone,
    venueAddress,
    requiresApproval,
  } = req.body;

  try {
    console.log(req.user);

    validatePostEvent(req.body);

    const eventDoc = await db.collection("events").add({
      hostUser: req.user.user_id,
      title: title,
      description: description,
      date: Timestamp.fromMillis(new Date(date).getTime()), // ISO Date String of shape "YYYY-MM-DD"
      createdAt: Timestamp.now(),
      startTime: Timestamp.fromMillis(startTime), // We expect start time in the milliseconds
      endTime: Timestamp.fromMillis(endTime),
      eventImage: eventImage,
      locationType: locationType,
      timezone: timezone,
      venueAddress: venueAddress,
      requiresApproval: requiresApproval,
      attendees: [],
      requests: [],
    });

    res.status(201).send({
      status: "success",
      message: `event added successfully with ID ${eventDoc.id}`,
    });
  } catch (error) {
    if (error.code) res.status(error.code).json(error.error.message);
    else res.status(500).json(error.message);
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

async function updateEvent(req, res) {
  const shouldMerge = req.query.shouldMerge === "true";

  try {
    validatePutEvent(req.body);

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
  addEvent,
  getSingleEvent,
  deleteEvent,
  updateEvent,
  addAttendingUsersToEvent,
};
