/* 

    Callbacks and promises.
    1. Promises help with callback hell.
    2. async and await help with Promise hell.
    3. All of this is kind of crap. LOL

*/
const f1 = name => console.log(`Hello, ${name}`);

function f2(name){
    console.log(`You have a new name, ${name}`);
}

const timer = (name,time) => {
    setTimeout( () => {   // notice the scoping here name is passed through. 
        f1(name);
    },time)
}

timer('richard2',5000)
timer('richard2',2000)
timer('richard1',1000)