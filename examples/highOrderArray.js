/* 

    TThe following are covered:

        filter
        map 
        find
        foreach
        some
        every
        reduce
        includes

*/
const p = data => console.log(data);


const items = [
    { name: 'Bike',       price: 100  },
    { name: 'TV',         price: 200  },
    { name: 'Album',      price: 10   },
    { name: 'Book',       price: 5    },
    { name: 'Phone',      price: 500  },
    { name: 'Computer',   price: 1000 },
    { name: 'Keyboard',   price: 25   },
];

p(items);


// Filter
const filter = items.filter( o => {
    return o.price > 100;
})
p(filter);

// Map
const map = items.map ( o => {
    return o.name
});
p(map);

// Find - will only find one (1)
const find = items.find ( o => {
    return o.name === 'TV'
});
p(find);

// Like a for loop but neater
items.forEach((item) => {
    console.log(item.name)
})

// Checks array if anything is true
const hasIndexpensiveItems = items.some((item) => {
    return item.price <= 100;
})
p(hasIndexpensiveItems)

// Checks array if anything is true
const allExpensive = items.every((item) => {
    return item.price >  0;
})
p(allExpensive)

// Reduce basicially iterate over and sum or reduce based on some code
const reduce = items.reduce((mem, item) => {
    if (item.name === 'TV') return item.price + mem
},1000000000);
p(reduce);


// Includes 
const a = [ 1,2,3,4,5,7];
console.log(a.includes(2));  // true
console.log(a.includes(12)); // false

