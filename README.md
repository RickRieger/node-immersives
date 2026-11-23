# Node Immersives — A Terminal App That Builds Your Name, Initials and Email

[![Tests](https://github.com/RickRieger/node-immersives/actions/workflows/tests.yml/badge.svg)](https://github.com/RickRieger/node-immersives/actions/workflows/tests.yml)

A Node.js exercise from the **Code Immersives** web development bootcamp in New York City (February 2021): my first "terminal app". You run it with your first and last name, and it greets you, then prints your name in capitals, your initials and a `codeimmersives.com` email address. This repo is my fork of the assignment. My solution is in [`nodeimmersives.js`](nodeimmersives.js).

**Skills practiced:** reading two command-line arguments, joining strings, `.toUpperCase()` / `.toLowerCase()`, picking characters by index, and code that runs top to bottom with no functions.

**Built with:** JavaScript (Node.js). The 2026 cleanup added Jest tests; the badge above shows whether they pass on GitHub.

---

## Contents

- [Try it](#try-it)
- [My solution](#my-solution)
- [The getInput mix-up](#the-getinput-mix-up)
- [Run the tests](#run-the-tests)
- [Cleanup log (November 2026)](#cleanup-log-november-2026)
- [Original assignment (from the instructor)](#original-assignment-from-the-instructor)

---

## Try it

You need [Node.js](https://nodejs.org/).

```bash
git clone https://github.com/RickRieger/node-immersives.git
cd node-immersives
node nodeimmersives.js Colin Jaffe
```

```
Hello Colin Jaffe, how are you doing today?
Your name in all caps is: COLIN JAFFE
Your initials are as follows: C.J.
Your email address: colin.jaffe@codeimmersives.com
```

Leave off the names and it tells you what to type:

```
$ node nodeimmersives.js
Please type your first and last name after the file name, like: node nodeimmersives.js Colin Jaffe
```

## My solution

Written on **2021-02-24** (commit *"tired"*). *(Shown as it is after the 2026 cleanup; see the log below for what changed.)*

```js
const getInput = require("./get-input.js");

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
```

**Initials come from the capitalized names**, so `node nodeimmersives.js rick rieger` still prints `R.R.`. **The email uses `.toLowerCase()`**, so `RICK Rieger` still becomes `rick.rieger@codeimmersives.com`.

## The getInput mix-up

The instructor's helper, [`get-input.js`](get-input.js), is marked "DON'T TOUCH" and is unchanged:

```js
function getInput(n) {
  return process.argv[n + 2];
}
```

When you run `node nodeimmersives.js Colin Jaffe`, `process.argv` is `['…/node', '…/nodeimmersives.js', 'Colin', 'Jaffe']`, so:

| Call | Returns |
|---|---|
| `getInput(0)` | `process.argv[2]` → `'Colin'` |
| `getInput(1)` | `process.argv[3]` → `'Jaffe'` |
| `getInput(2)` | `process.argv[4]` → `undefined` |

But the assignment's instructions, and the comment inside `get-input.js`, say to use **`getInput(1)` and `getInput(2)`**. Following them would give a first name of `'Jaffe'` and a last name of `undefined`. My 2021 code used `getInput(0)` and `getInput(1)`, which is correct for how the helper actually works. The code now has a comment explaining why.

## Run the tests

```bash
npm ci
npm run test:ci   # runs all tests once and exits
npm test          # watch mode: re-runs on every save
```

Expected result: `Tests: 7 passed, 7 total`. [`nodeimmersives.test.js`](nodeimmersives.test.js) runs the app with different names, exactly as you would in a terminal, and checks each printed line. [`.github/workflows/tests.yml`](.github/workflows/tests.yml) runs the tests on GitHub after every push, and the badge at the top shows the result.

---

## Cleanup log (November 2026)

All changes below were made on **2026-11-23** on the branch `cleanup-and-tests`, checked by running the app and the tests, and merged into `master`. Each is its own commit. The instructor's `get-input.js` is unchanged.

### 1. The email address is now lowercase

**Why:** the assignment's example is `Colin Jaffe` → `colin.jaffe@codeimmersives.com`. My code used the name exactly as typed, giving `Colin.Jaffe@codeimmersives.com`.

```js
// Before
console.log ('Your email address: ' + firstName+'.'+lastName+'@codeimmersives.com');
// → Colin.Jaffe@codeimmersives.com

// After
console.log("Your email address: " + firstName.toLowerCase() + "." + lastName.toLowerCase() + "@codeimmersives.com");
// → colin.jaffe@codeimmersives.com
```

### 2. A helpful message instead of a crash when a name is missing

**Why:** running `node nodeimmersives.js` with no names printed `Hello undefined undefined how are you doing today?` and then **crashed** with `TypeError: Cannot read properties of undefined (reading 'toUpperCase')`. The app now checks both names first.

```js
// After
if (firstName === undefined || lastName === undefined) {
  console.log("Please type your first and last name after the file name, like: node nodeimmersives.js Colin Jaffe");
} else {
  // ...the four tasks
}
```

### 3. Tidied the code

**Why:**
- The code inside the new `if`/`else` needed indenting.
- `upperCase1` and `upperCase2` are now `firstUpper` and `lastUpper`.
- The initials used `upperCase1[0][0]`. The first `[0]` already gives one character, and the second `[0]` takes the first character of *that*, so it did nothing.
- The greeting was missing a comma ("Hello Colin Jaffe**,** how are you…").
- Each task now has a numbered comment, plus a comment explaining the `getInput` mix-up above.

```js
// Before
const upperCase1 = firstName.toUpperCase();
console.log ('Your initials are as follows: ' + upperCase1[0][0] + '.' + upperCase2[0][0]+'.');

// After
const firstUpper = firstName.toUpperCase();
console.log("Your initials are as follows: " + firstUpper[0] + "." + lastUpper[0] + ".");
```

### 4. Added tests and automatic test runs on GitHub

**Why:** the assignment had no tests; it jokes *"Manual testing, ladies and gentlemen! It's... great?"*. [`nodeimmersives.test.js`](nodeimmersives.test.js) runs the app as a real command with several names and checks each line, including the missing-name message. Against the original 2021 app, these tests **fail 4 of 7**: the two lowercase-email checks, the missing-name check, and the greeting, but only because of the added comma. `package.json` adds Jest 29 and three commands: `npm start`, `npm test` (watch mode) and `npm run test:ci` (run once). A GitHub Actions workflow runs the tests after every push.

### 5. Added this README section

The instructor's original instructions are below, unchanged. Note that their `getInput(1)` / `getInput(2)` advice doesn't match the helper; see [The getInput mix-up](#the-getinput-mix-up).

---

## Original assignment (from the instructor)

*The text below is the assignment README as written by the Code Immersives instructor, unchanged.*

### Node Immersives

Welcome to making your first terminal app!

### A Refresher

- You will NOT be returning anything or writing any functions. All your code will run in the global scope, from top to bottom, as soon as you run it!
- You will run your app using the command `node nodeimmersives.js`. (Or the path to that file if you're not in this directory.)
- You will take in TWO arguments from the user: their first name and their last name, separated by a space. So you'll run your app with `node nodeimmersives.js Colin Jaffe`, or whatever name you'd like to call it with.
- In your JavaScript file, you will be able to get the user's input with `getInput(1)` and `getInput(2)`. Check `get-input.js` for examples!
- It's probably a good idea to save the returns from calling `getInput` in variables.
- Then you will print out each of the solutions to the task using `console.log`, and they should appear in the terminal as soon as you run the app!
- That is (currently) the only tool we have for verifying your app works. Manual testing, ladies and gentlemen! It's... great?

### Your Tasks, in Roughly Ascending Order of Difficulty

1. Say hi to the user in whatever style you want, with their full name. Remember that you'll have to combine the two arguments to make their full name!
2. Give them their name capitalized, preferably with some kind of sentence around it telling them what you're doing. There's a built-in string method for capitalizing!
3. Print out their initials. (Again, telling them what you're doing!).
4. Give them their codeimmersives.com email address. For example, given `Colin Jaffe`, you should print out for them `colin.jaffe@codeimmersives.com`.

### Good Luck!

And may the node be with you?
