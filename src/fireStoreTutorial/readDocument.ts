//imports
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// READ a document in collection "cities"
async function getCity(cityId: string) {
  const docRef = doc(db, "cities", cityId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

getCity("LA")
  .then(() => {
    console.log("Successfully Read City");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error Reading city:", error);
  });
