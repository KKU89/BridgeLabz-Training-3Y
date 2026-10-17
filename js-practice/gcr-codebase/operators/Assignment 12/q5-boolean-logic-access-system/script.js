let isDoorLocked = true;
let isWindowClosed = true;
let isAlarmOn = true;
let isOwnerInside = true;

let hasAccess = isAlarmOn && isDoorLocked && isWindowClosed && isOwnerInside;
console.log("System Status: " + (hasAccess ? "Secure" : "Unsafe"));
