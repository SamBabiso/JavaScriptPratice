
var myObject = (function () {
    var value = 100;
    return {
        value1: value,
        increment: function (inc) {
            value += typeof inc === 'number' ? inc : 1;
            value1 = value;
        },
        getValue: function () {
            return value;
        },
        getValue1: function () {
        return value1;
    }
    };
}());

myObject.increment(5);
document.getElementById("Enum1").innerHTML = myObject.getValue() + "<br/>";
myObject.increment(10);
document.getElementById("Enum1").innerHTML += myObject.getValue();
document.getElementById("Enum1").innerHTML += myObject.getValue1();


//// Create a maker function called quo. It makes an 
//// object with a get_status method and a private 
//// status property.
//var quo = function(status) {
//     return {
//          get_status: function() {
//               return status;
//          }
//    };
//};

//// Make an instance of quo.
//var myQuo = new quo("amazed");
//document.writeln(myQuo.get_status());
//var myQuo2 = new quo("Samuel");
//document.writeln(myQuo2.get_status());
//document.writeln(myQuo.get_status());