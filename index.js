import { setFirebaseListeners } from "./src/utils/setFirebaseListeners";
import { setPushConfig } from "./src/utils/setPushConfig";

console.log("INDEX START");

setPushConfig();

console.log("PUSH CONFIG DONE");

setFirebaseListeners();

console.log("FIREBASE LISTENER DONE");

import "expo-router/entry";
