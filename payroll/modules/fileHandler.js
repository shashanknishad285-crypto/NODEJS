const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../employees.json');

async function readEmployees() {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(data);
}

async function writeEmployees(data) {
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
    readEmployees,
    writeEmployees
};
