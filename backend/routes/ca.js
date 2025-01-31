const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();

// Directory to store CA files
const caDir = path.join(__dirname, '..', 'ca');
const archiveDir = path.join(caDir, 'archive');

if (!fs.existsSync(caDir)) {
    fs.mkdirSync(caDir);
}

if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir);
}

// Helper function to execute a command and log the results
const executeCommand = (cmd) => {
    return new Promise((resolve, reject) => {
        console.log(`Executing: ${cmd}`);
        exec(cmd, { cwd: caDir }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${stderr}`);
                reject(`Error: ${stderr}`);
            } else {
                console.log(`Output: ${stdout}`);
                resolve(stdout);
            }
        });
    });
};

// Function to archive CA files under the archive directory with common name and timestamp
const archiveCAFiles = async (commonName) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    // Create a directory with commonName under archive if it doesn't exist
    const archiveCommonDir = path.join(archiveDir, commonName);
    if (!fs.existsSync(archiveCommonDir)) {
        fs.mkdirSync(archiveCommonDir);
    }

    // Archive CA files under commonName directory with timestamp and file name format
    const filesToArchive = ['ca.crt', 'ca.key', 'ca.srl'];
    filesToArchive.forEach((file) => {
        const filePath = path.join(caDir, file);
        if (fs.existsSync(filePath)) {
            fs.renameSync(filePath, path.join(archiveCommonDir, `${timestamp}_${file}`));
            console.log(`Archived ${file} for ${commonName} with timestamp ${timestamp}`);
        }
    });
};

// Step 1: Generate the Root Certificate and Private Key
const generateRootCertificate = (commonName) => {
    const cmd = `openssl req -x509 -newkey rsa:2048 -nodes -keyout ${path.join(caDir, 'ca.key')} -out ${path.join(caDir, 'ca.crt')} -days 3650 -subj "/C=US/ST=State/L=Locality/O=Organization/CN=${commonName}"`;
    return executeCommand(cmd);
};

// Step 2: Create a Certificate Signing Request (CSR)
const createCSR = () => {
    const cmd = `openssl req -new -key ${path.join(caDir, 'ca.key')} -out ${path.join(caDir, 'ca.csr')} -subj "/C=US/ST=State/L=Locality/O=Organization/CN=Root CA"`;
    return executeCommand(cmd);
};

// Step 3: Sign the Certificate Signing Request (CSR)
const signCSR = () => {
    const cmd = `openssl x509 -req -in ${path.join(caDir, 'ca.csr')} -CA ${path.join(caDir, 'ca.crt')} -CAkey ${path.join(caDir, 'ca.key')} -CAcreateserial -out ${path.join(caDir, 'ca.crt')}`;
    return executeCommand(cmd);
};

// Step 4: Create a Certificate Revocation List (CRL)
const createCRL = () => {
    return new Promise((resolve, reject) => {
        const cmd = `openssl ca -gencrl -keyfile ${path.join(caDir, 'ca.key')} -cert ${path.join(caDir, 'ca.crt')} -out ${path.join(caDir, 'crl.pem')} -config ${path.join(__dirname, 'openssl.cnf')}`;
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error creating CRL: ${stderr}`);
                reject(`Error creating CRL: ${stderr}`);
            } else {
                resolve(stdout);
            }
        });
    });
};

// API endpoint to create a new Certificate Authority
router.post('/add', async (req, res) => {
    const { commonName } = req.body;
    try {
        console.log('Generating root certificate and private key...');
        await generateRootCertificate(commonName);
        console.log('Root certificate and private key generated.');

        console.log('Creating CSR...');
        await createCSR();
        console.log('CSR created.');

        console.log('Signing CSR...');
        await signCSR();
        console.log('CSR signed.');

        console.log('Creating CRL...');
        await createCRL();
        console.log('CRL created.');

        // Archive CA files under the archive directory with common name and timestamp
        await archiveCAFiles(commonName);

        console.log('CA setup completed successfully.');
        res.status(200).send('Certificate Authority created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating Certificate Authority');
    }
});

// Serve the CA files for download
router.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(caDir, filename);
    console.log(`Requested file: ${filepath}`);
    if (fs.existsSync(filepath)) {
        console.log(`File found: ${filepath}`);
        res.download(filepath);
    } else {
        console.log(`File not found: ${filepath}`);
        res.status(404).send('File not found');
    }
});

module.exports = router;
