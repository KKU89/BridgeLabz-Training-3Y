"use strict";
function outer() {
    console.log("Outer count before assignment:", count); // undefined
    var count = 5;

    function inner() {
        console.log("Inner count before assignment:", count); // undefined: inner var shadows outer
        var count = 10;
        console.log("Inner count after assignment:", count); // 10
    }

    inner();
    console.log("Outer count after inner:", count); // 5
}
outer();
function outerArrowDemo() {
    let count = 5;
    const inner = () => {
        let count = 10;
        console.log("Arrow inner count:", count);
    };
    inner();
    console.log("Arrow demo outer count:", count);
}
outerArrowDemo();

