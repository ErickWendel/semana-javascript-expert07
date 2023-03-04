import { knownGesture, gestureStrings } from "./gestures.js";

const fingerLookupIndexes = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

export { fingerLookupIndexes, knownGesture, gestureStrings };
