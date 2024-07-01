import mongoose from 'mongoose';
import express from 'express';
import  Employee  from './models/employee.js'
//import { localsName } from 'ejs';

const app = express();
const port = 3000;
app.set('view engine','ejs')

const conn = await mongoose.connect('mongodb://127.0.0.1:27017/company');
console.log('MongoDB connected.');


function RandomName() {
    const words = [
        'Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 
        'Juliet', 'Kilo', 'Lima', 'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 
        'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'X-ray', 'Yankee', 'Zulu', 
        'Nash', 'Orion', 'Phoenix', 'Zephyr'
    ];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function RandomSalary() {
    return Math.floor(Math.random() * (2000000 - 10000 + 1)) + 10000;
}

function RandomLanguage() {
    const languages = [
        'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Swift', 'Go', 'Kotlin', 
        'PHP', 'Rust', 'TypeScript', 'Perl', 'Scala', 'Haskell', 'Lua', 'Elixir', 
        'R', 'Objective-C', 'Clojure', 'Dart', 'MATLAB', 'Groovy', 'Shell', 'F#', 
        'Erlang', 'Julia', 'VBA', 'COBOL', 'Fortran'
    ];
    const randomIndex = Math.floor(Math.random() * languages.length);
    return languages[randomIndex];
}

function RandomCity() {
    const cities = [
        'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 
        'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 
        'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 
        'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville', 
        'Detroit', 'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis', 
        'Louisville', 'Baltimore'
    ];
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
}

function TrueOrFalse() {
    return Math.random() < 0.5;
}

app.get('/',(req,res)=>{
    res.render('index')
})



app.get('/generate',async(req,res)=>{
//clear previous data
await Employee.deleteMany({})
//add new entries
try {
    let employees = [];
    for (let index = 0; index < 10; index++) {
        let emp = await Employee.create({
            name: RandomName(),
            salary: RandomSalary(),
            language: RandomLanguage(),
            city: RandomCity(),
            isManager: TrueOrFalse()
        });
        employees.push(emp);
    }
    res.json(employees);
} catch (error) {
    res.status(500).json({ error: error.message });
}
})


app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})