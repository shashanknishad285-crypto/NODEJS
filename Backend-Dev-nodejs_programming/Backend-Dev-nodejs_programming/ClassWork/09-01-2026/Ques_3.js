const user={
    name:"B2 Bhaiya",
    age:18
};
const admin={
    admin:true,
    ...user
};
console.log(admin);    // { admin: true, name: 'B2 Bhaiya', age: 18 }
 