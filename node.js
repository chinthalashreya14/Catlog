const fs = require('fs');

// Function to decode values based on the base
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Lagrange interpolation function to find f(0)
function lagrangeInterpolation(points, k) {
    let f0 = 0;
    for (let j = 0; j < k; j++) {
        let lj = 1;
        for (let i = 0; i < k; i++) {
            if (i !== j) {
                lj *= -points[i].x / (points[j].x - points[i].x);
            }
        }
        f0 += points[j].y * lj;
    }
    return Math.round(f0); // Ensure integer output
}

// Function to find the constant term
function findConstantTerm(filePath) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const { n, k } = data.keys;
    const points = [];

    // Decode points
    for (let key in data) {
        if (key !== "keys") {
            const { base, value } = data[key];
            points.push({ x: parseInt(key), y: decodeValue(base, value) });
        }
    }

    // Use the first k points for interpolation
    return lagrangeInterpolation(points.slice(0, k), k);
}

// Test case 1
console.log("Test Case 1 Secret:", findConstantTerm("testcase1.json"));

// Test case 2
console.log("Test Case 2 Secret:", findConstantTerm("testcase2.json"));
