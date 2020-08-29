const {Storage} = require('@google-cloud/storage');
const path = require('path')
const serviceKey = path.join(__dirname, "../materialusm-69673261fe2a.json")

// Google Cloud storage
const storage = new Storage({
    keyFilename: serviceKey,
    projectId: 'materialusm'
});

module.exports = storage
