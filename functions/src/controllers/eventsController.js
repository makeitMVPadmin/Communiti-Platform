const db = require("../config/firebaseConfig");
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

async function addEvents(req, res) {
  const { title, text } = req.body;

  try {
    // const eventsRef = collection(db, "events");

    const docRef = await addDoc(collection(db, "events"), {
      title: title,
      text: text,
    });

    res.status(200).send({
      status: "success",
      message: `event added successfully with ID ${docRef.id}`,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function getAllEvents(req, res) {
  try {
    const allEvents = [];
    const querySnapshot = await db.collection("events").get();
    querySnapshot.forEach((doc) => allEvents.push(doc.data()));

    return res.status(200).json(allEvents);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function getSingleEvent(req, res) {
  try {
    console.log("111");
    const docRef = doc(db, "events", req.params.eventId);
    console.log("222");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("333");
      return res.status(200).json(docSnap.data());
    } else {
      return res.status(404).json({ Error: "Event Document Does not exist. " });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = { getAllEvents, addEvents, getSingleEvent };
