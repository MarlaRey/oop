//når man arbejder med objekter, bruger man classes til at definere alt det et object kan
//der gælder disse regler: 
//1: definer hvor dit object lever i dit js dokument og hvad det hedder
//2: en funktion der hedder en constructer. Det er funktioner inde i vores object
//3: man skal binde dette til en variabel, eller lægges i et array eller sådan noget. classen er mest bare idéen, nu skal den bruges



// class testObject{
// //METHODS:
// constructor(msg){
// // console.log("heloooo from object "+ msg);
// //msg referer til det du har skrvet nede i variablernes paranteser og det er en properties
// this.message=msg;
// console.log(this.message);
// }


// }

// const myObject1 = new testObject("her er en særlig besked fra object 1");
// const myObject2 = new testObject("object 2 fortæller julehistorier");

// //du kan nu tage fat i denne propertie udenfor scopet ved at tage fat i den variabel du har givet denne class
// console.log(myObject2.message,myObject1.message);

class car {
 constructor(make, model, year, condition){
this.make = make;
this.model = model;
this.year = year;
this.condition = condition;

}
//nu kommer der en metode og den fungerer ligesom en funktion, som kun fungerer inde i denne class
getInfo() {
    return`jeg er en ${this.make}, model: ${this.model}, fra ${this.year} jeg er i ${this.condition} stand` ;
}
getSummary(){
    return `jeg er en ${this.make}`
}

}

const myCar = new car ('volvo', 'v40', 2001, 'god');
const myCar2 = new car ('fiat', '500', 2008, 'super');

console.log(myCar);
console.log(myCar.getInfo());
console.log(myCar.getSummary());

//eller gør det sådan: put alle dine biler ind i et tomt array og tilgå dem ved at kalde deres indexnummer

const myCars = [];

myCars.push(new car('volvo', 'v40', 2001, 'god'));
myCars.push(new car('fiat', '500', 2008, 'super'));



console.log(myCars[1].getInfo());