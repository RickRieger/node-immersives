// Check the get-input.js code as well as the README for the lowdown on the beefing up we've done!
const getInput = require("./get-input.js");
const firstName = getInput(0);
const lastName = getInput(1);

if (firstName === undefined || lastName === undefined) {
  console.log("Please type your first and last name after the file name, like: node nodeimmersives.js Colin Jaffe");
} else {

console.log("Hello " +firstName+ " " + lastName + " how are you doing today?");

const upperCase1 = firstName.toUpperCase();
const upperCase2 = lastName.toUpperCase();

console.log ("Your name in all caps is: " +upperCase1 + " " + upperCase2);


console.log ('Your initials are as follows: ' + upperCase1[0][0] + '.' + upperCase2[0][0]+'.');

console.log ('Your email address: ' + firstName.toLowerCase()+'.'+lastName.toLowerCase()+'@codeimmersives.com');
}
