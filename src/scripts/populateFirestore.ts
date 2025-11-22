import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";

// Initial data as specified in the requirements
const basesData = [
  { "id": "b1", "name": "Black Tea", "color": "#8B4513" },
  { "id": "b2", "name": "Green Tea", "color": "#C8E6C9" },
  { "id": "b3", "name": "Coffee", "color": "#6F4E37" }
];

const creamersData = [
  { "id": "c1", "name": "No Creamer", "color": "transparent" },
  { "id": "c2", "name": "Milk", "color": "AliceBlue" },
  { "id": "c3", "name": "Cream", "color": "#F5F5DC" },
  { "id": "c4", "name": "Half & Half", "color": "#FFFACD" }
];

const syrupsData = [
  { "id": "s1", "name": "No Syrup", "color": "#c6c6c6" },
  { "id": "s2", "name": "Vanilla", "color": "#FFEFD5" },
  { "id": "s3", "name": "Caramel", "color": "#DAA520" },
  { "id": "s4", "name": "Hazelnut", "color": "#6B4423" }
];

async function populateFirestore() {
  try {
    console.log("Starting Firestore population...");

    // Populate bases collection
    console.log("Adding bases...");
    for (const base of basesData) {
      await addDoc(collection(db, "bases"), base);
      console.log(`Added base: ${base.name}`);
    }

    // Populate creamers collection
    console.log("Adding creamers...");
    for (const creamer of creamersData) {
      await addDoc(collection(db, "creamers"), creamer);
      console.log(`Added creamer: ${creamer.name}`);
    }

    // Populate syrups collection
    console.log("Adding syrups...");
    for (const syrup of syrupsData) {
      await addDoc(collection(db, "syrups"), syrup);
      console.log(`Added syrup: ${syrup.name}`);
    }

    console.log("Firestore population completed successfully!");
  } catch (error) {
    console.error("Error populating Firestore:", error);
  }
}

// Run the population script
populateFirestore();
