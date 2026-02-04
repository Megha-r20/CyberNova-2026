const http = require('http');

console.log('Testing connection to backend on port 3002...');

const req = http.request({
    hostname: 'localhost',
    port: 3002,
    path: '/api/health',
    method: 'GET',
    timeout: 2000
}, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
    console.log('\nSuccess! Backend is reachable on 3002.');
});

req.on('error', (e) => {
    console.error(`PROBLEM: ${e.message}`);
    console.error('Backend is NOT reachable on 3002.');
});

req.end();
