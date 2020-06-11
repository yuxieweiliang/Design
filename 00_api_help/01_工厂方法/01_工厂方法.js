const Ren = new Interface('Ren', ['shuo', 'ting', 'zou', 'pao', 'tiao', 'sex']);

console.log(Ren);


const makePeople = new Factory();
const whitePeople = makePeople.peopleType('white');
console.log(whitePeople);
whitePeople.shuo();
whitePeople.ting();
whitePeople.zou();
