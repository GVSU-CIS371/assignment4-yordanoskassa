import { defineStore } from "pinia";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";
import tempretures from "../data/tempretures.json";
import db from "../firebase.ts";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    currentTemp: tempretures[0],
    bases: [] as BaseBeverageType[],
    currentBase: null as BaseBeverageType | null,
    syrups: [] as SyrupType[],
    currentSyrup: null as SyrupType | null,
    creamers: [] as CreamerType[],
    currentCreamer: null as CreamerType | null,
    beverages: [] as BeverageType[],
    currentBeverage: null as BeverageType | null,
    currentName: "",
  }),

  actions: {
    async init() {
      try {
        // Load bases collection
        const basesSnapshot = await getDocs(collection(db, "bases"));
        this.bases = basesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as BaseBeverageType));

        // Load creamers collection
        const creamersSnapshot = await getDocs(collection(db, "creamers"));
        this.creamers = creamersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as CreamerType));

        // Load syrups collection
        const syrupsSnapshot = await getDocs(collection(db, "syrups"));
        this.syrups = syrupsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as SyrupType));

        // Set default values
        this.currentBase = this.bases[0] || null;
        this.currentCreamer = this.creamers[0] || null;
        this.currentSyrup = this.syrups[0] || null;

        // Load existing beverages
        const beveragesSnapshot = await getDocs(collection(db, "beverages"));
        this.beverages = beveragesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as BeverageType));

      } catch (error) {
        console.error("Error initializing store:", error);
      }
    },

    async makeBeverage() {
      if (!this.currentBase || !this.currentCreamer || !this.currentSyrup || !this.currentName.trim()) {
        console.error("Missing required beverage components");
        return;
      }

      try {
        const newBeverage: Omit<BeverageType, 'id'> = {
          name: this.currentName,
          base: this.currentBase,
          creamer: this.currentCreamer,
          syrup: this.currentSyrup,
          temp: this.currentTemp,
          createdAt: new Date().toISOString()
        };

        const docRef = await addDoc(collection(db, "beverages"), newBeverage);
        
        // Add to local state
        this.beverages.push({
          id: docRef.id,
          ...newBeverage
        } as BeverageType);

        // Clear the current name
        this.currentName = "";
        
        console.log("Beverage saved successfully!");
      } catch (error) {
        console.error("Error saving beverage:", error);
      }
    },

    showBeverage(beverage: BeverageType) {
      this.currentBeverage = beverage;
      this.currentBase = beverage.base;
      this.currentCreamer = beverage.creamer;
      this.currentSyrup = beverage.syrup;
      this.currentTemp = beverage.temp;
    },
  },
});
