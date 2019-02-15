let counter = 0;
let users = [];
let getCounter = function() {
    return counter;
};

let resetCounter = function() {
    counter = 0;
};
let incrementCounter = function() {
    counter++;
};
let decrementCounter = function() {
    counter--;
};
let deleteOfflineUser = function(value) {

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == value) {
            users.splice(i, 1);
            break;
        }
    }
};
module.exports = {
    getCounter: getCounter,
    resetCounter: resetCounter,
    incrementCounter: incrementCounter,
    decrementCounter: decrementCounter,
    users: users,
    deleteOfflineUser: deleteOfflineUser,
};