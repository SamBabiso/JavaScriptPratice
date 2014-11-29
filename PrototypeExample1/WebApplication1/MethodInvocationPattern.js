// Method invocation pattern
var myObject = {
    value: 0,
    increment: function(inc) {
        this.value += typeof (inc) === 'number' ? inc : 1;
    },
    add: function(a, b) {
        return a + b;
    }
   
};
myObject.increment();
document.writeln(myObject.value + ' one.'); // 1
myObject.increment(2);
document.writeln(myObject.value + ' three.'); // 3

//Function Invocation Pattern
myObject.double = function() {
    var that = this;
    var helper = function() {
        that.value = that.add(that.value, that.value);
    };
    helper();
};
// Invoke double as a method
myObject.double();
document.writeln(myObject.value + ' value from double.');