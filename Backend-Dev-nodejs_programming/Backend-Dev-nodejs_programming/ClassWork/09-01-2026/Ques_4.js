const shape={
    radius:10,
    diameter(){
        return this.radius*2;
    },
    perimeter: () => 2 * Math.PI * this.radius,
};
console.log(shape.diameter());    // 20
console.log(shape.perimeter());   // NaN