let count = 0;
function updateCounter(action) {
    function modify() {
        if (action === 'increment') count++;
        else if (action === 'decrement') count--;
    }
    modify();
    console.log("Current Count after " + action + ": " + count);
}
updateCounter('increment');
updateCounter('increment');
updateCounter('decrement');
