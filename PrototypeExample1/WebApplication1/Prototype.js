
function Employee(name,jobtitle,born)
{
    this.name=name;
    this.jobtitle=jobtitle;
    this.born=born;
}

var fred=new Employee("Fred Flintstone","Caveman",1970);
Employee.prototype.salary = 2000;
//fred.salary = 20000;
document.getElementById("demo5").innerHTML = fred.hasOwnProperty(fred.salary) ? "True" : "False";

