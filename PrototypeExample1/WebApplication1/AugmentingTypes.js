Function.prototype.method = function(name, func) {
    if (!this.prototype[name]) {
         this.prototype[name] = func;
    }
};
Number.method('integer', function () {
     return Math[this < 0 ? 'ceil' : 'floor'](this);
});
document.writeln((-10 / 3).integer());  // -3
document.writeln((-11 / 4).integer());  // -2

String.method('trim', function() {
     return this.replace(/^\s+|\s+$/g, '');
});
document.writeln('"' + "   neat   ".trim() + '"');

//Number.method('numb', function () {
//    return (arguments.x + arguments.y);
//});
//document.writeln(Number.apply('str',[9,4]).numb());