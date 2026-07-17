async function sendWelcomeEmail(email, name) {
  console.log("--------------------------------");
  console.log(`Sending Welcome Email to ${name}`);
  console.log(`Email: ${email}`);
  console.log("Welcome Email Sent Successfully");
  console.log("--------------------------------");
}

module.exports = { sendWelcomeEmail };