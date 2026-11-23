// Tests added during the 2026 cleanup. The assignment had no tests ("Manual
// testing, ladies and gentlemen! It's... great?"). Each test runs the app the
// way you would in a terminal and checks the printed lines.
const { execFileSync } = require('child_process');
const path = require('path');

const run = (...args) =>
  execFileSync(process.execPath, [path.join(__dirname, 'nodeimmersives.js'), ...args], { encoding: 'utf8' })
    .trim()
    .split(/\r?\n/);

describe('node nodeimmersives.js Colin Jaffe', () => {
  const lines = run('Colin', 'Jaffe');

  it('says hi with the full name', () => {
    expect(lines[0]).toBe('Hello Colin Jaffe, how are you doing today?');
  });

  it('prints the name in capitals', () => {
    expect(lines[1]).toBe('Your name in all caps is: COLIN JAFFE');
  });

  it('prints the initials', () => {
    expect(lines[2]).toBe('Your initials are as follows: C.J.');
  });

  it('prints the lowercase codeimmersives.com email, as in the assignment example', () => {
    expect(lines[3]).toBe('Your email address: colin.jaffe@codeimmersives.com');
  });
});

describe('other names', () => {
  it('capitalizes initials even when the name is typed in lowercase', () => {
    expect(run('rick', 'rieger')[2]).toBe('Your initials are as follows: R.R.');
  });

  it('lowercases the email even when the name is typed in capitals', () => {
    expect(run('RICK', 'Rieger')[3]).toBe('Your email address: rick.rieger@codeimmersives.com');
  });
});

describe('missing names', () => {
  it('explains what to type instead of crashing', () => {
    expect(run()[0]).toMatch(/Please type your first and last name/);
    expect(run('Colin')[0]).toMatch(/Please type your first and last name/);
  });
});
