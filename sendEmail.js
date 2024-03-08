const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Construct the path to the directory where artifacts are stored
const artifactsDirectory = path.join(process.env.GITHUB_WORKSPACE, 'apidog-reports');

// Read the contents of the directory
const files = fs.readdirSync(artifactsDirectory);

// Find the file with the name starting with "apidog-report-"
const reportFile = files.find(file => file.startsWith('apidog-report-'));

if (reportFile) {
    // Construct the path to the HTML report file
    const htmlReportPath = path.join(artifactsDirectory, reportFile);

    // Read the HTML report
    const htmlReport = fs.readFileSync(htmlReportPath, 'utf-8');

    // Construct the email message
    const msg = {
        to: 'snehav@anthology.com', // Change this to the recipient's email address
        from: 'ivpnotifications@products.anthology.com', // Change this to your verified sender email in SendGrid
        subject: 'APIdog Test Report',
        text: 'APIdog test report is attached.',
        attachments: [
            {
                content: htmlReport, // Use raw HTML content
                filename: 'apidog_report.html',
                type: 'text/html',
                disposition: 'attachment',
            },
        ],
    };

    // Send email
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent successfully');
        })
        .catch((error) => {
            console.error('Error occurred while sending email:', error.response?.body || error.message);
        });
} else {
    console.error('No report file found.');
}
