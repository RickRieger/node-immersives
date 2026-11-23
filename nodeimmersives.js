// Check the get-input.js code as well as the README for the lowdown on the beefing up we've done!
const getInput = require("./get-input.js");

// getInput(n) returns process.argv[n + 2], so for `node nodeimmersives.js Colin Jaffe`
// the first name is getInput(0) and the last name is getInput(1).
// (The instructions say getInput(1) and getInput(2), but that would skip the first name.)
const firstName = getInput(0);
const lastName = getInput(1);

if (firstName === undefined || lastName === undefined) {
  console.log("Please type your first and last name after the file name, like: node nodeimmersives.js Colin Jaffe");
} else {
  // 1. Say hi with their full name
  console.log("Hello " + firstName + " " + lastName + ", how are you doing today?");

  // 2. Their name in capitals
  const firstUpper = firstName.toUpperCase();
  const lastUpper = lastName.toUpperCase();
  console.log("Your name in all caps is: " + firstUpper + " " + lastUpper);

  // 3. Their initials
  console.log("Your initials are as follows: " + firstUpper[0] + "." + lastUpper[0] + ".");

  // 4. Their codeimmersives.com email address (all lowercase)
  console.log("Your email address: " + firstName.toLowerCase() + "." + lastName.toLowerCase() + "@codeimmersives.com");
}
