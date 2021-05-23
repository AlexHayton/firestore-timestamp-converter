/* eslint-disable class-methods-use-this */
import firebase from "firebase";
import {
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
} from "@firebase/firestore-types";

const { Timestamp } = firebase.firestore;

export class TimestampConverter<T extends DocumentData>
  implements FirestoreDataConverter<DocumentData>
{
  toFirestore(modelObject: DocumentData): DocumentData {
    return modelObject;
  }

  fromFirestore(snapshot: QueryDocumentSnapshot): T {
    const data = snapshot.data();

    /* eslint-disable-next-line unicorn/no-reduce */
    const converted = Object.keys(data).reduce<DocumentData>(
      (accumulator, key) => {
        if (data[key] instanceof Timestamp) {
          accumulator[key] = data[key].toDate();
        } else {
          accumulator[key] = data[key];
        }

        return accumulator;
      },
      {}
    );

    return converted as T;
  }
}
