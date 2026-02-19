function test() {
    console.log(a);
    console.log(b);
   
    var a = 10;
    let b = 20;
}
test();    // undefined
          // ReferenceError: Cannot access 'b' before initialization
