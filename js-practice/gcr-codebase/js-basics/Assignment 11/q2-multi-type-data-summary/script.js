let strVal = "B.Tech CSE";
let numVal = 21;
let boolVal = true;
let arrVal = ["Java", "JavaScript", "Python"];
let objVal = { university: "GLA University", semester: "Fifth" };
let nullVal = null;
let undefVal;

let summaryTable = [
    { Field: "String", Value: strVal, Type: typeof strVal, IsArray: Array.isArray(strVal) },
    { Field: "Number", Value: numVal, Type: typeof numVal, IsArray: Array.isArray(numVal) },
    { Field: "Boolean", Value: boolVal, Type: typeof boolVal, IsArray: Array.isArray(boolVal) },
    { Field: "Array", Value: arrVal, Type: typeof arrVal, IsArray: Array.isArray(arrVal) },
    { Field: "Object", Value: objVal, Type: typeof objVal, IsArray: Array.isArray(objVal) },
    { Field: "Null", Value: nullVal, Type: typeof nullVal, IsArray: Array.isArray(nullVal) },
    { Field: "Undefined", Value: undefVal, Type: typeof undefVal, IsArray: Array.isArray(undefVal) }
];

console.table(summaryTable);
