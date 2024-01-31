// Imports
import { initializeApp } from "firebase/app";
import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Add a new document in collection "cities"
async function deleteCity(cityId: string) {
  await deleteDoc(doc(db, "cities", cityId));
}

deleteCity("LA")
  .then(() => {
    // Optionally do something after the setCity operation is complete.
    // Note: You don't need to terminate the connection explicitly.
    console.log("Successfully deleted city");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error deleting city:", error);
  });
