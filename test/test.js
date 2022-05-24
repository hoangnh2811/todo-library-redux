function Animal(name, weight) {
  this.name = name;
  this.weight = weight;
}

function Chicken(name, weight, legs) {
  Animal.call(this, name, weight);
  this.name = name + ' 123';
  this.legs = legs;
}

const ga = new Chicken('gaCon', 4, 2);
console.log(ga);