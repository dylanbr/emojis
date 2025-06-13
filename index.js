// 1. Install the Emojeme extension: https://chromewebstore.google.com/detail/emojme-emoji-anywhere/nbnaglaclijdfidbinlcnfdbikpbdkog?hl=en-US&pli=1
// 2. Go to the custom emoji page for the Slack: https://mywslack.com/customize/emoji
// 3. Open the extension and wait for it to refresh.
// 4. Click "Get Slack Token and Cookie".
// 5. Run this script, using the copied JSON as the argument.

// Example JSON:
// {"token":"xoxc-0000000000000-1111111111111-2222222222222-33333333444444445555555566666666777777778888888899999999aaaaaaaa","domain":"myslack","cookie":"xoxd-cookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiecookiexx"}

if (process.argv.length === 2) {
    console.error('Pass the Emojeme JSON as argument 1');
    process.exit(1);
}

const json = JSON.parse(process.argv[2]);

// Sanity check on JSON.
if (!json.token) {
    console.error('Missing token');
    process.exit(1);
}
if (!json.domain) {
    console.error('Missing domain');
    process.exit(1);
}
if (!json.cookie) {
    console.error('Missing cookie');
    process.exit(1);
}

const fs = require('fs');
const emojme = require('emojme');

const domain = json.domain;
const token = json.token;
const cookie = json.cookie;

const downloadOptions = {
    save: false,
    bustCache: true,
    output: false,
};

emojme.download(domain, token, cookie, downloadOptions).then((res) => {
    const remoteEmojis = res[domain].emojiList.map(e => e.name);

    const localEmojis = fs.readdirSync('./emojis/');
    const missing = localEmojis.filter((fn) => {
        return fn.substr(0, 1) !== '.';
    }).filter((fn) => {
        const emojiName = removeExt(fn);
        return remoteEmojis.indexOf(emojiName) === -1;
    });

    const addOptions = {
        src: missing.map(e => './emojis/' + e), // File paths
        name: missing.map(e => removeExt(e)), // Emoji names
        bustCache: false,
        avoidCollisions: false,
        output: false,
    };

    emojme.add(domain, token, cookie, addOptions).then((res) => {
        console.log('Added Emoji:', res[domain].emojiList);
    }).catch(error => {
        console.error('Failed to Add', addOptions, error);
    });
});

function removeExt(string) {
    return string.substr(0, string.indexOf('.'));
}
