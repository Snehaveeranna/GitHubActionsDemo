const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const artifactsDirectory = path.join(process.env.GITHUB_WORKSPACE, 'apidog-reports');
const files = fs.readdirSync(artifactsDirectory);
const reportFile = files.find(file => file.startsWith('apidog-report-'));
if (reportFile) {
    // Construct the path to the HTML file
    const reportPath = path.join(artifactsDirectory, reportFile);
    const htmlReport = fs.readFileSync('testArtifacts/apidog_report.html', 'utf-8');
    const msg = {
      to: 'snehav@anthology.com', // Change this to the recipient's email address
      from: 'ivpnotifications@products.anthology.com', // Change this to your verified sender email in SendGrid
      subject: 'APIdog Test Report',
      text: 'APIdog test report is attached.',
      attachments: [
        {
        content: htmlReport,
        filename: 'apidog_report.html',
        type: 'text/html',
        disposition: 'attachment',
        },
      ],
    };
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent successfully');
  })
  .catch((error) => {
    console.error('Error occurred while sending email:', error);
  });
} else {
    console.error('No report file found.');
}
