
const fs = require('fs');
const path = require('path');

// Read the reasons directory
const reasonsDir = path.join(__dirname, '../reasons');

// Get all files in the directory
const files = fs.readdirSync(reasonsDir);

// Initialize result object
const result = {};

// Process each file
files.forEach(file => {
    // Skip combined.json
    if (file === 'combined.json') {
        return;
    }

    // Get file name without extension
    const lang = path.parse(file).name;

    // Read and parse the file
    const content = fs.readFileSync(path.join(reasonsDir, file), 'utf8');
    result[lang] = JSON.parse(content);
});

// Write the combined result
fs.writeFileSync(
    path.join(reasonsDir, 'combined.json'),
    JSON.stringify(result, null, 2)
);
