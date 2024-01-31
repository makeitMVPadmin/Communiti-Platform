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
// Imports
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseConfig_1 = __importDefault(require("../firebaseConfig"));
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig_1.default);
// Initialize Cloud Firestore and get a reference to the service
const db = (0, firestore_1.getFirestore)(app);
// Add a new document in collection "cities"
function deleteCity(cityId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(db, "cities", cityId));
    });
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
