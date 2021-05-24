# firestore-timestamp-converter 
[![NPM version](https://badge.fury.io/js/firestore-timestamp-converter.svg)](https://npmjs.org/package/firestore-timestamp-converter)
[![CircleCI](https://circleci.com/gh/AlexHayton/firestore-timestamp-converter.svg?style=shield)](https://circleci.com/gh/AlexHayton/firestore-timestamp-converter)
[![Dependency Status][daviddm-image]][daviddm-url]

🔥 ➡️ ⏱
> Easily convert between Firestore Timestamps and JS Dates

## What problem does this solve?

Firestore stores all its dates/times with a custom Timestamp data type, which isn't understood by the majority of Javascript libraries etc.

This library makes it easy to convert between and 'think' in terms of JS Dates without having to keep remembering to call `.toDate()` on the Firestore outputs.

This works with all the normal methods for fetching data `get` and `onSnapshot` and doesn't interfere with the process of saving back to the Firestore document with `set` or `add`

## Usage

```js
interface TypeWithDates {
  dateValue: Date;
}

// Before TimestampConverter
// =========================
const snapshot = await db
  .collection("firestore-timestamp-converter")
  .doc(id)

const data = snapshot.data();
data.dateValue instanceof Timestamp // true
myFunc(data); // This function now has to remember that dateValue is a Timestamp not a JS date!

// With TimestampConverter
// =======================
const snapshot = await db
  .collection("firestore-timestamp-converter")
  .doc(id)
  .withConverter(new TimestampConverter<TypeWithDates>())
  .get(); // Now I will return a TypeWithDates instead of a DocumentData!

const data = snapshot.data();
data.dateValue instanceof Date // true
myFunc(data); // This function receives a JS date!
```

## Installation

Use your favourite package manager to add the package to your package.json

```sh
yarn add firestore-timestamp-converter
```

[daviddm-image]: https://david-dm.org/alexhayton/firestore-timestamp-converter.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/alexhayton/firestore-timestamp-converter
