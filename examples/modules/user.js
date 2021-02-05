export default class User {
    constructor(name,age) {
        this.name = name
        this.age = age
    }
    
    printName(){
        console.log(`Users name is: ${this.name}`)
    }
    
    printAge(){
        console.log(`Users age is: ${this.age}`)
    }
}


export function someFunc() {
    console.log(`this sure is some fuction`)
}