//når man arbejder med objekter, bruger man classes til at definere alt det et object kan
//der gælder disse regler: 
//1: definer hvor dit object lever i dit js dokument og hvad det hedder
//2: en funktion der hedder en constructer. Det er funktioner inde i vores object
//3: man skal binde dette til en variabel, eller lægges i et array eller sådan noget. classen er mest bare idéen, nu skal den bruges



class testObject{
//METHODS:
constructor(msg){
// console.log("heloooo from object "+ msg);
//msg referer til det du har skrvet nede i variablernes paranteser og det er en properties
this.message=msg;
console.log(this.message);
}


}

const myObject = new testObject("object 1");
const myObject2 = new testObject("object 2");

//du kan nu tage fat i denne propertie udenfor scopet ved at tage fat i den variabel du har givet denne class
console.log(myObject2.message);