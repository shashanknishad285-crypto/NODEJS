const express = require('express');
 
const fileHandler = require('./modules/fileHandler');


const app = express();
const PORT = 3000;  

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// ================= READ (Dashboard) =================
app.get('/', async (req, res) => {
    const employees = await fileHandler.readEmployees();
     
    res.render('index', { employees });
});

// ================= CREATE PAGE =================
app.get('/add', (req, res) => {
    res.render('add');
});

// ================= CREATE LOGIC =================
app.post('/add', async (req, res) => {
    const { name, department, salary, gender } = req.body;
    const salaryNumber = Number(salary);

    // Validation
    if (!name || !department || isNaN(salaryNumber) || salaryNumber < 0) {
        return res.redirect('/');
    }

    const employees = await fileHandler.readEmployees();

    const newEmployee = {
        id: Date.now(),
        name: name.trim(),
        department: department.trim(),
        salary: salaryNumber,
        gender: gender
    };

    employees.push(newEmployee);
    await fileHandler.writeEmployees(employees);

    res.redirect('/');
});

// ================= DELETE =================
app.get('/delete/:id', async (req, res) => {
    const id = Number(req.params.id);
    const employees = await fileHandler.readEmployees();

    const updatedEmployees = employees.filter(emp => emp.id !== id);

    await fileHandler.writeEmployees(updatedEmployees);
    res.redirect('/');
});

// ================= EDIT PAGE =================
app.get('/edit/:id', async (req, res) => {
    const id = Number(req.params.id);
    const employees = await fileHandler.readEmployees();

    const employee = employees.find(emp => emp.id === id);

    if (!employee) return res.redirect('/');

    res.render('edit', { employee });
});

// ================= UPDATE =================
app.post('/edit/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name, department, salary, gender } = req.body;
    const salaryNumber = Number(salary);

    if (!name || !department || isNaN(salaryNumber) || salaryNumber < 0) {
        return res.redirect('/');
    }

    const employees = await fileHandler.readEmployees();

    const updatedEmployees = employees.map(emp => {
        if (emp.id === id) {
            return {
                ...emp,
                name: name.trim(),
                department: department.trim(),
                salary: salaryNumber,
                gender: gender
            };
        }
        return emp;
    });

    await fileHandler.writeEmployees(updatedEmployees);
    res.redirect('/');
});

// Start Server
app.listen(PORT, async () => {
    const employees = await fileHandler.readEmployees();
    console.log("Server running at http://localhost:3000");
    console.log("Existing Employees:", employees);
});
