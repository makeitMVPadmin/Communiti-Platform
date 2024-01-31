//imports
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

type ValuesObject = {
  name?: string;
  state?: string;
  country?: string;
};

// Update a document If exists
async function updateCity(cityId: string, values: ValuesObject) {
  const docRef = doc(db, "cities", cityId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await setDoc(
      docRef,
      {
        ...values,
      },
      { merge: true }
    );
  } else {
    console.log("No such document!");
  }
}

// We're updating only the 'state' field, previously 'CA" will now display in Firestore as 'California'
updateCity("LA", { state: "California" })
  .then(() => {
    console.log("Updated successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error Updating City:", error);
  });
