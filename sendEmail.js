const fs = require('fs');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//const htmlReport = fs.readFileSync('${{ github.workspace }}/apidog-reports/', 'utf-8');
const now = new Date();
const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}-${now.getMilliseconds().toString().padStart(3, '0')}`;

// Construct the dynamic file name
const fileName = `apidog-report-${timestamp}-0.html`; // Assuming sequence is always 0, change it accordingly if needed

// Construct the path to the HTML file using github.workspace
const reportPath = path.join(process.env.GITHUB_WORKSPACE, 'apidog-reports', fileName);

// Read the HTML file
const htmlReport = fs.readFileSync(reportPath, 'utf-8');
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
