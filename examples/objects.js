

const p = data => console.log(data);
const myObject = new Object;

myObject.name = "Rich Davis";
myObject.address = "13 Lovalee Lane";
myObject.tags = [
    1,
    2,
    3,
]
myObject.doSometing = () => p('Gotta do some stuff.');
myObject.doSometing2 = () => p('that was a long time.');
myObject.data = 

p(myObject);

setTimeout(myObject.doSometing, 1000);
setTimeout(myObject.doSometing2, 10000);
setTimeout(myObject.doSometing, 5000);

const p1 =new Promise((resolve, reject) => {
  let condition = false;
  if(condition) {
    resolve('data')
  } else {
    reject('error')
}
})