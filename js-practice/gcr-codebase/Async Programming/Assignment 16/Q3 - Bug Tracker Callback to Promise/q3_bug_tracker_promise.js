const bugsDatabase = [
    { id: 1, title: "Login button not working", severity: "high", status: "open", assignee: "Alice" },
    { id: 2, title: "CSS misalignment on dashboard", severity: "low", status: "open", assignee: "Bob" },
    { id: 3, title: "API timeout on large requests", severity: "critical", status: "in-progress", assignee: "Alice" },
    { id: 4, title: "Memory leak in image uploader", severity: "high", status: "open", assignee: "Charlie" },
    { id: 5, title: "Typo in error message", severity: "low", status: "resolved", assignee: "Bob" },
];

function fetchBugCallback(bugId, callback) {
    console.log(`[Callback] Fetching bug #${bugId}...`);
    setTimeout(() => {
        const bug = bugsDatabase.find((b) => b.id === bugId);
        if (bug) {
            callback(null, bug);
        } else {
            callback(new Error(`Bug #${bugId} not found`), null);
        }
    }, 1000);
}

function updateBugStatusCallback(bugId, newStatus, callback) {
    console.log(`[Callback] Updating bug #${bugId} to "${newStatus}"...`);
    setTimeout(() => {
        const bug = bugsDatabase.find((b) => b.id === bugId);
        if (bug) {
            bug.status = newStatus;
            callback(null, bug);
        } else {
            callback(new Error(`Bug #${bugId} not found`), null);
        }
    }, 800);
}

function fetchBugsByAssigneeCallback(assignee, callback) {
    console.log(`[Callback] Fetching bugs assigned to ${assignee}...`);
    setTimeout(() => {
        const bugs = bugsDatabase.filter((b) => b.assignee === assignee);
        if (bugs.length > 0) {
            callback(null, bugs);
        } else {
            callback(new Error(`No bugs found for ${assignee}`), null);
        }
    }, 900);
}

function fetchBugPromise(bugId) {
    return new Promise((resolve, reject) => {
        console.log(`[Promise] Fetching bug #${bugId}...`);
        setTimeout(() => {
            const bug = bugsDatabase.find((b) => b.id === bugId);
            if (bug) {
                resolve(bug);
            } else {
                reject(new Error(`Bug #${bugId} not found`));
            }
        }, 1000);
    });
}

function updateBugStatusPromise(bugId, newStatus) {
    return new Promise((resolve, reject) => {
        console.log(`[Promise] Updating bug #${bugId} to "${newStatus}"...`);
        setTimeout(() => {
            const bug = bugsDatabase.find((b) => b.id === bugId);
            if (bug) {
                bug.status = newStatus;
                resolve(bug);
            } else {
                reject(new Error(`Bug #${bugId} not found`));
            }
        }, 800);
    });
}

function fetchBugsByAssigneePromise(assignee) {
    return new Promise((resolve, reject) => {
        console.log(`[Promise] Fetching bugs assigned to ${assignee}...`);
        setTimeout(() => {
            const bugs = bugsDatabase.filter((b) => b.assignee === assignee);
            if (bugs.length > 0) {
                resolve(bugs);
            } else {
                reject(new Error(`No bugs found for ${assignee}`));
            }
        }, 900);
    });
}

function demoCallbackApproach() {
    return new Promise((resolve) => {
        console.log("\n===== CALLBACK APPROACH =====\n");

        fetchBugCallback(1, (err, bug) => {
            if (err) {
                console.error("Error:", err.message);
                resolve();
                return;
            }
            console.log("Found:", bug.title);

            updateBugStatusCallback(bug.id, "in-progress", (err, updatedBug) => {
                if (err) {
                    console.error("Error:", err.message);
                    resolve();
                    return;
                }
                console.log(`Updated: ${updatedBug.title} → ${updatedBug.status}`);

                fetchBugsByAssigneeCallback(updatedBug.assignee, (err, bugs) => {
                    if (err) {
                        console.error("Error:", err.message);
                        resolve();
                        return;
                    }
                    console.log(`\nAll bugs for ${updatedBug.assignee}:`);
                    bugs.forEach((b) => console.log(`  - [${b.severity}] ${b.title} (${b.status})`));
                    resolve();
                });
            });
        });
    });
}

function demoPromiseChaining() {
    console.log("\n===== PROMISE CHAINING APPROACH =====\n");

    let foundBug;

    return fetchBugPromise(3)
        .then((bug) => {
            foundBug = bug;
            console.log("Found:", bug.title);
            return updateBugStatusPromise(bug.id, "resolved");
        })
        .then((updatedBug) => {
            console.log(`Updated: ${updatedBug.title} → ${updatedBug.status}`);
            return fetchBugsByAssigneePromise(updatedBug.assignee);
        })
        .then((bugs) => {
            console.log(`\nAll bugs for ${foundBug.assignee}:`);
            bugs.forEach((b) => console.log(`  - [${b.severity}] ${b.title} (${b.status})`));
        })
        .catch((error) => {
            console.error("❌ Error in promise chain:", error.message);
        });
}

async function demoAsyncAwait() {
    console.log("\n===== ASYNC/AWAIT APPROACH =====\n");

    try {
        const bug = await fetchBugPromise(4);
        console.log("Found:", bug.title);

        const updatedBug = await updateBugStatusPromise(bug.id, "in-progress");
        console.log(`Updated: ${updatedBug.title} → ${updatedBug.status}`);

        const bugs = await fetchBugsByAssigneePromise(updatedBug.assignee);
        console.log(`\nAll bugs for ${updatedBug.assignee}:`);
        bugs.forEach((b) => console.log(`  - [${b.severity}] ${b.title} (${b.status})`));
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

async function demoErrorHandling() {
    console.log("\n===== ERROR HANDLING DEMO =====\n");

    try {

        const bug = await fetchBugPromise(99);
        console.log("Found:", bug);
    } catch (error) {
        console.error(`❌ Caught error: ${error.message}`);
        console.log("✅ Error was handled gracefully with try/catch");
    }
}

async function main() {
    await demoCallbackApproach();
    await demoPromiseChaining();
    await demoAsyncAwait();
    await demoErrorHandling();
}

main();
