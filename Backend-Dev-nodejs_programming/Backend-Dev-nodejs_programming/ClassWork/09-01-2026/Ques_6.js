var x = 10;
if (true) {
  var x = 20;
  console.log(x);   // 20
}
console.log(x);     // 20



let y = 10;
if (true) {
  let y = 20;
  console.log(y);    // 20
}
console.log(y);     // 10




const z = 10;
if (true) {
  const z = 20;
  console.log(z);    // 20
}
console.log(z);     // 10




const w = 10;
if (true) {
  w = 20;
  console.log(w);    // 
}
console.log(w); 