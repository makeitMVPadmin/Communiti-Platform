"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//imports
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseConfig_1 = __importDefault(require("../firebaseConfig"));
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig_1.default);
// Initialize Cloud Firestore and get a reference to the service
const db = (0, firestore_1.getFirestore)(app);
// Update a document If exists
function updateCity(cityId, values) {
    return __awaiter(this, void 0, void 0, function* () {
        const docRef = (0, firestore_1.doc)(db, "cities", cityId);
        const docSnap = yield (0, firestore_1.getDoc)(docRef);
        if (docSnap.exists()) {
            yield (0, firestore_1.setDoc)(docRef, Object.assign({}, values), { merge: true });
        }
        else {
            console.log("No such document!");
        }
    });
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
