const http = require('http');

// Function to send offer request
async function sendOfferRequest(offerBody) {


    const options = {
        hostname: 'localhost',
        port: 9001,
        path: '/api/v1/offer',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    body: data
                });
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(JSON.stringify(offerBody));
        req.end();
    });
}

module.exports = {
    sendOfferRequest
};
