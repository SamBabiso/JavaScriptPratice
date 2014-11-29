var Quo = function(string) {
    this.status = string;
};
// Give all instances f Quo a public method
// called get_status
//var myQuo = new Quo("confused");
//myQuo.get_status = function () {
//    return this.status;
//};
Quo.prototype.get_status = function() {
    return this.status;
};
// Make an instance of Quo
var myQuo = new Quo("confused");
document.writeln(myQuo.get_status()); // confused

var myQuo1 = new Quo("not confused");
document.writeln(myQuo1.get_status()); // confused