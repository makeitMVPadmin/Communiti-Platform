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

//Add user
async function addUser(req, res) {
  const { fullName, 
    email, 
    profilePhoto, 
    displayName, 
    discipline, 
    expertise, 
    industry, 
    bio, 
    mentor, 
    mentee, 
    location, 
    phoneNumber} = req.body;

  try {
    const userDoc = await db.collection("users").add({
      fullName: fullName,
      createdAt: Date.now(),
      email: email,
      profilePhoto: profilePhoto,
      displayName: displayName,
      discipline: discipline,
      expertise: expertise,
      industry: industry,
      bio: bio,
      mentor: mentor == "true",
      mentee: mentee == "true",
      location: location,
      phoneNumber: phoneNumber,
      meetings: [],
      chats: [],
      connections: [],
      events: [],
      communitiesJoined: [],
      communitiesManaged: []
    });

    res.status(200).send({
      status: "success",
      message: `user added successfully with ID ${userDoc.id}`,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

//Get all users
async function getAllUsers(req, res) {
  try {
    const usersRef = db.collection("users");
    const usersDocs = await usersRef.get();

    result = [];

    usersDocs.forEach((doc) => {
      result.push(doc.data());
    });

    res.status(200).json({ users: result });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
//Get user
async function getUser(req, res) {
  try {
    const userRef = db.collection("users").doc(req.params.userId);
    const doc = await userRef.get();
    
    if (!doc.exists) {
      res
        .status(404)
        .json({ message: "The User you requested does not exist" });
    } else {
      res.status(200).json(doc.data());
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

//Delete user
async function deleteUser(req, res) {
  try {
    const userRef = db.collection("users").doc(req.params.userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      res
        .status(404)
        .json({ message: "The User you requested does not exist" });
    } else if(req.params.user_id != req.user.user_id){
     
      res
      .status(401)
      .json({ message: "User is not authorized to delete User"})
    } else {
      await db.collection("users").doc(req.params.userId).delete();
      res.status(200).json({ message: "User Document Deleted Successfully" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

//Update user
async function updateUser(req, res) {
  const shouldMerge = req.query.shouldMerge === "true";

  try {
    const userRef = db.collection("users").doc(req.params.userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      res
        .status(404)
        .json({ message: "The User Document you requested does not exist" });
    } else if(req.params.user_id != req.user.user_id){
      res
      .status(401)
      .json({ message: "User is not authorized to update User"})
    } else {
      const result = await userRef.set(
        { ...req.body },
        { merge: shouldMerge }
      );
      res
        .status(200)
        .json({ message: `Successfully updated User ${userDoc.id}` });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

//currently anyone can add meeting to any user
async function addMeetingToUser(req, res) {
  const userId = req.params.userId;
  //ID of meeting to be added
  const {meetingId} = req.query;

  try{
    const userRef = db.collection("users").doc(userId);
    const meetingRef = db.collection("meetings").doc(meetingId);
    
    await userRef.update({
      meetings: FieldValue.arrayUnion(meetingId)
    });

    res.status(200).json({
      message: `Successfully added meeting to user.`
    });
  } catch(error){
    return res.status(500).json(error.message);
  }
}

async function deleteMeetingFromUser(req, res) {
  const userId = req.params.userId;
  //ID of member to be deleted
  const {meetingId} = req.query;
 
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    const meetingRef = db.collection("meetings").doc(meetingId);


    //should only be allowed to delete meeting if it's meeting creator or the person themselves.
    if(!(meetingRef.owner == req.user.user_id || userId == req.user.user_id)){
      res
      .status(401)
      .json({ message: "User is not authorized to delete user from meeting"})
    }
    if(!userData.meetings.includes(meetingId)){
      res
      .status(404)
      .json({ message: "Meeting not found in user."})
    }
    await userRef.update({
      meetings: FieldValue.arrayRemove(meetingId)
    });

    //prints successful even if member doesn't exist

    res.status(200).json({
      message: `Successfully removed member from community.`
    });

  } catch (error) {
    return res.status(500).json(error.message);
  }
}

//currently anyone can add chat with any user
async function addChatToUser(req, res) {
  const userId = req.params.userId;
  //ID of meeting to be added
  const {chatId} = req.query;

  try{
    const userRef = db.collection("users").doc(userId);
    // const chatRef = db.collection("chats").doc(chatId);
    
    await userRef.update({
      chats: FieldValue.arrayUnion(chatId)
    });

    res.status(200).json({
      message: `Successfully added chat to user.`
    });
  } catch(error){
    return res.status(500).json(error.message);
  }
}

async function deleteChatFromUser(req, res) {
  const userId = req.params.userId;
  //ID of member to be deleted
  const {chatId} = req.query;
 
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    // const chatRef = db.collection("chats").doc(chatId);


    if(!userData.chats.includes(chatId)){
      res
      .status(404)
      .json({ message: "Chat not found in user."})
    }
    await userRef.update({
      chats: FieldValue.arrayRemove(chatId)
    });

    //prints successful even if member doesn't exist

    res.status(200).json({
      message: `Successfully removed member from community.`
    });

  } catch (error) {
    return res.status(500).json(error.message);
  }
}

//does not also add user to community (uni-directional)
async function joinCommunity(req, res) {
  const userId = req.params.userId;
  //ID of meeting to be added
  const {communityId} = req.query;

  try{
    const userRef = db.collection("users").doc(userId);
    // const communityRef = db.collection("communities").doc(communityId);
    
    await userRef.update({
      communitiesJoined: FieldValue.arrayUnion(communityId)
    });

    res.status(200).json({
      message: `Successfully added community to user.`
    });
  } catch(error){
    return res.status(500).json(error.message);
  }
}

async function leaveCommunity(req, res) {
  const userId = req.params.userId;
  //ID of member to be deleted
  const {communityId} = req.query;
 
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    const communityRef = db.collection("communities").doc(communityId);


    //should only be allowed to leave community if it's the user themselves or communtiy creator.
    if(!(communityRef.createdBy == req.user.user_id || userId == req.user.user_id)){
      res
      .status(401)
      .json({ message: "User is not authorized to remove the user from the community"})
    }
    if(!userData.communities.includes(communityId)){
      res
      .status(404)
      .json({ message: "User is not in that community."})
    }
    await userRef.update({
      communitiesJoined: FieldValue.arrayRemove(communityId)
    });

    //prints successful even if member doesn't exist

    res.status(200).json({
      message: `Successfully removed member from community.`
    });

  } catch (error) {
    return res.status(500).json(error.message);
  }
}

//currently anyone can add connection between any users
async function addConnection(req, res) {
  const userId = req.params.userId;
  //ID of meeting to be added
  const {toConnect} = req.query;

  try{
    const userRef = db.collection("users").doc(userId);
    // const toConnectRef = db.collection("users").doc(toConnect);
    
    await userRef.update({
      connections: FieldValue.arrayUnion(toConnect)
    });

    res.status(200).json({
      message: `Successfully added connection.`
    });
  } catch(error){
    return res.status(500).json(error.message);
  }
}

async function deleteConnection(req, res) {
  const userId = req.params.userId;
  //ID of member to be deleted
  const {toDisconnect} = req.query;
 
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    // const toDisconnectRef = db.collection("users").doc(toDisconnect);


    if(!userData.connections.includes(toDisconnect)){
      res
      .status(404)
      .json({ message: "Connection not found."})
    }
    await userRef.update({
      connections: FieldValue.arrayRemove(toDisconnect)
    });

    res.status(200).json({
      message: `Successfully removed connection`
    });

  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function joinEvent(req, res) {
  const userId = req.params.userId;
  //ID of meeting to be added
  const {event} = req.query;

  try{
    const userRef = db.collection("users").doc(userId);
    // const eventRef = db.collection("events").doc(event);
    
    await userRef.update({
      events: FieldValue.arrayUnion(toConnect)
    });

    res.status(200).json({
      message: `Successfully joined event.`
    });
  } catch(error){
    return res.status(500).json(error.message);
  }
}

async function leaveEvent(req, res) {
  const userId = req.params.userId;
  //ID of member to be deleted
  const {event} = req.query;
 
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    // const eventRef = db.collection("events").doc(event);


    if(!userData.events.includes(event)){
      res
      .status(404)
      .json({ message: "Event not found."})
    }
    await userRef.update({
      events: FieldValue.arrayRemove(event)
    });

    res.status(200).json({
      message: `Successfully removed event`
    });

  } catch (error) {
    return res.status(500).json(error.message);
  }
}


async function addCreatedCommunity(req, res) {
  const userId = req.params.userId;
  //ID of meeting to be added
  const {communityId} = req.query;

  try{
    const userRef = db.collection("users").doc(userId);
    // const communityRef = db.collection("communities").doc(communityId);
    
    await userRef.update({
      communitiesManaged: FieldValue.arrayUnion(communityId)
    });

    res.status(200).json({
      message: `Successfully added community to manage.`
    });
  } catch(error){
    return res.status(500).json(error.message);
  }
}

async function deleteManagedCommunity(req, res) {
  const userId = req.params.userId;
  //ID of member to be deleted
  const {communityId} = req.query;
 
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    // const communityRef = db.collection("communities").doc(communityId);


    if(!userData.communitiesManaged.includes(communityId)){
      res
      .status(404)
      .json({ message: "Community not found."})
    }
    await userRef.update({
      communitiesManaged: FieldValue.arrayRemove(communityId)
    });

    res.status(200).json({
      message: `Successfully delete community.`
    });

  } catch (error) {
    return res.status(500).json(error.message);
  }
}



module.exports = {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addMeetingToUser,
  deleteMeetingFromUser,
  addChatToUser,
  deleteChatFromUser,
  joinCommunity,
  leaveCommunity,
  addConnection,
  deleteConnection,
  joinEvent,
  leaveEvent,
  addCreatedCommunity,
  deleteManagedCommunity

};
