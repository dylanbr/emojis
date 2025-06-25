const dotenv = require('dotenv');
const fs = require('fs');
const emojme = require('emojme');
const minimist = require('minimist');


// Load `.env` into `process.env`.
dotenv.config();

// Load command line arguments.
const argv = minimist(process.argv.slice(2));

let configJson = null;

if (argv.auth) {
    // If `--auth` is set, try and use that.
    try {
        configJson = JSON.parse(argv.auth);
    } catch (error) {
        console.error('Invalid JSON for `--auth`');
        process.exit(1);
    }
} else {
    // Otherwise try the environment.
    try {
        configJson = JSON.parse(process.env.EMOJME_AUTH);
    } catch (error) {
        console.error('Invalid JSON for `EMOJME_AUTH`');
        process.exit(1);
    }
}

// Sanity checks on JSON.
if (!configJson) {
    console.error('Missing `--auth` or `EMOJME_AUTH`');
    process.exit(1);
}

if (!configJson.token) {
    console.error('Missing token in JSON `--auth` or `EMOJME_AUTH`');
    process.exit(1);
}
if (!configJson.domain) {
    console.error('Missing domain in JSON `--auth` or `EMOJME_AUTH`');
    process.exit(1);
}
if (!configJson.cookie) {
    console.error('Missing cookie in JSON `--auth` or `EMOJME_AUTH`');
    process.exit(1);
}

const domain = configJson.domain;
const token = configJson.token;
const cookie = configJson.cookie;

const downloadOptions = {
    save: false,
    bustCache: true,
    output: false,
};

emojme.download(domain, token, cookie, downloadOptions).then((res) => {
    const remoteEmojis = res[domain].emojiList.map(e => e.name);

    const localEmojis = fs.readdirSync('./emojis/')
        // Remove hidden files and directory markers.
        .filter((fn) => {
            return fn.substr(0, 1) !== '.';
        })
        .map((file) => {
            return {
                name: removeExt(file),
                file,
            };
        });

    const missing = localEmojis.filter((emoji) => {
        return remoteEmojis.indexOf(emoji.name) === -1;
    });

    const addOptions = {
        src: missing.map(emoji => './emojis/' + emoji.file), // File paths
        name: missing.map(emoji => emoji.name), // Emoji names
        bustCache: false,
        avoidCollisions: false,
        output: false,
    };

    emojme.add(domain, token, cookie, addOptions).then((res) => {
        console.log('Added Emoji:', res[domain].emojiList);
    }).catch(error => {
        console.error('Failed to Add', addOptions, error);
    });

    // Show name of emoji which are missing locally. Disabled for now.
    /*
    const extra = remoteEmojis.filter((emojiName) => {
        return localEmojis.every(e => e.name !== emojiName);
    });
    console.log('Extra Emoji:', [...extra]);
    */
});

function removeExt(string) {
    return string.substr(0, string.indexOf('.'));
}
