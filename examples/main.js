/* 
    The stuff outside of {} is the default and can be 
    brought in with any name.

    inside is non default stuff and can be broght in with other names

*/
import U, {someFunc as sf} from './modules/user.js'



console.log('in the module')

const x = new U('Richard', 50)

x.printName()
x.printAge()

sf()
