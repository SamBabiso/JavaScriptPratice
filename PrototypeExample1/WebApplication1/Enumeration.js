var myapp = {};
 myapp.stoogie = {
    "first-name": "Jerome",
    "last-name": "Howard",
    depature: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    another_stoogie : function () {
        var x = 0;
        x = x + 1;
        document.writeln(x);
    },
    yet_another_stoogie: function test(x) {
        x = x + 1;
        document.writeln(x);
        var y = x + 1;
        document.writeln(y);
    }
};
var name;
for (name in myapp.stoogie) {
    if ((typeof (myapp.stoogie[name]) !== 'function') && (typeof (myapp.stoogie[name]) !== 'object'))
    //if ((typeof (stoogie[name]) !== 'object'))
        document.writeln(name + ': ' + myapp.stoogie[name]);
}
document.writeln(typeof (myapp.stoogie.another_stoogie) + ': another stoogie');
var math = function (a, b) {
    
    var result = 10;
    var sub = function () {
        return result + (a - b);
    };
    var add = function() {
        return result + (a + b);
    };
    return { sub1:sub, add1:add };
};
document.writeln(math(6,5).add1() + ' the sum');
document.writeln(math(6, 5).sub1() + ' the diff');