// Method invocation pattern
var myObject = {
    value: 0,
    increment: function (inc) {
        this.value += typeof (inc) === 'number' ? inc : 1;
    },
    add: function (a, b) {
        return a + b;
    }
};
myObject.increment();
document.writeln(myObject.value + ' one.'); // 1
myObject.increment(2);
document.writeln(myObject.value + ' three.'); // 3

//Function Invocation Pattern
myObject.double = function () {
    var that = this;
    var helper = function () {
        that.value = that.add(that.value, that.value);
    };
    helper();
};
// Invoke double as a method
myObject.double();
document.writeln(myObject.value + ' value from double.');

// Constructor Invocation Pattern
var Quo = function (string) {
    this.status = string;
};
// Give all instances f Quo a public method
// called get_status
//var myQuo = new Quo("confused");
//myQuo.get_status = function () {
//    return this.status;
//};
Quo.prototype.get_status = function () {
    return this.status;
};
// Make an instance of Quo
var myQuo = new Quo("confused");
document.writeln(myQuo.get_status()); // confused

var myQuo1 = new Quo("not confused");
document.writeln(myQuo1.get_status()); // confused

// Apply Invocation Pattern 
// make an array of two numbers and add them
var array = [3, 4];
var sum = myObject.add.apply(null, array); // sum is 7
document.writeln(sum + ' the sum');
// make an object with a status member
var statusObject = {
    status: 'A-OK'
};
// StatusObject does not inherit from Quo.prototype,
// but we can invoke the get_status method on 
// statusObject even though statusObject does not have 
// a get_status method.
var status = Quo.prototype.get_status.apply(statusObject);
document.writeln(status + ' the status');
// status is 'A-Ok'