import firebase from "firebase";
import { v4 as uuid } from "uuid";

import { TimestampConverter } from ".";

interface TypeWithDates {
  boolValue: boolean;
  stringValue: string;
  numberValue: number;
  dateValue: Date;
}

const firebaseConfig = {
  authDomain: "local-emulator.firebaseapp.com",
  projectId: "local-emulator",
  storageBucket: "local-emulator.appspot.com",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.useEmulator("localhost", 8080);

describe("Converter tests", () => {
  const sampleData: TypeWithDates = {
    boolValue: true,
    stringValue: "hello",
    numberValue: 123,
    dateValue: new Date(),
  };

  describe("toFirestore", () => {
    const id = uuid();

    it("Converts dates to Timestamps", async () => {
      const docRef = await db
        .collection("firestore-timestamp-converter")
        .doc(id)
        .withConverter(new TimestampConverter<TypeWithDates>());

      await docRef.set(sampleData);

      const snapshot = await await db
        .collection("firestore-timestamp-converter")
        .doc(id)
        .get();
      expect(snapshot.exists).toEqual(true);

      const data = snapshot.data();
      if (!data) {
        throw new Error("Expected data to exist");
      }
      expect(data.dateValue).toBeInstanceOf(firebase.firestore.Timestamp);
      expect(data.stringValue).toEqual(sampleData.stringValue);
      expect(data.numberValue).toEqual(sampleData.numberValue);
      expect(data.boolValue).toEqual(sampleData.boolValue);
    });
  });

  describe("fromFirestore", () => {
    const id = uuid();

    beforeAll(async () => {
      await db
        .collection("firestore-timestamp-converter")
        .doc(id)
        .set(sampleData);
    });

    it("Converts Timestamps to dates", async () => {
      const snapshot = await db
        .collection("firestore-timestamp-converter")
        .doc(id)
        .withConverter(new TimestampConverter<TypeWithDates>())
        .get();

      expect(snapshot.exists).toEqual(true);

      const data = snapshot.data();
      expect(data).toEqual(sampleData);
    });
  });
});
