//imports
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
console.log(app)

type ValuesObject = {
  name: string;
  state: string;
  country: string;
};

// Add a new document in collection "cities"
async function setCity(cityId: string, values: ValuesObject) {
  await setDoc(
    doc(db, "cities", cityId),
    {
      name: values.name,
      state: values.state,
      country: values.country,
    },
    { merge: false }
    // If merge == False, and document exists it will override it.
    // IF merge is set to true it will merge new field and update existing ones.
  );

  return;
}

setCity("LA", { name: "Richmond", state: "VA", country: "USA" })
  .then(() => {
    // Optionally do something after the setCity operation is complete.
    // Note: You don't need to terminate the connection explicitly.
    console.log("Successfully created a city");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error setting city:", error);
  });
