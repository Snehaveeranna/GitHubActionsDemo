const fs = require('fs');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const jsonReport = fs.readFileSync('path/to/json/report.json', 'utf-8');
const msg = {
  to: 'snehav@anthology.com', // Change this to the recipient's email address
  from: 'ivpnotifications@products.anthology.com', // Change this to your verified sender email in SendGrid
  subject: 'APIdog Test Report',
  text: 'APIdog test report is attached.',
  attachments: [
    {
      content: jsonReport,
      filename: 'apidog_report.json',
      type: 'application/json',
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
