
console.log("Hola mundo JS desde el servidor!!");

/* medir el tiempo de un proceso */

console.time("miProceso") 

for(let i = 0; i < 1000000; i++){ }

console.timeEnd("miProceso");

/* Objetos tipo tabla */

let usuarios = [
    {nombre: "Jesus", edad: 25},
    {nombre: "Maria", edad: 30},
];

console.table(usuarios)
