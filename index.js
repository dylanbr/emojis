import dotenv from 'dotenv';
import emojme from 'emojme';
import minimist from 'minimist';
import { getAuth } from './auth.js';
import {
    getLocalEmojis,
    getRemoteEmojis,
    addEmojis,
} from './emojis.js';

// Load `.env` into `process.env`.
dotenv.config();

// Load command line arguments.
const argv = minimist(process.argv.slice(2));

// Find the authorization data in either `--auth` or `EMOJME_AUTH`.
let auth;
try {
    auth = getAuth(argv, process.env);
} catch (error) {
    console.error(error);
    process.exit(1);
}

const remoteEmojis = await getRemoteEmojis(auth);
const localEmojis = await getLocalEmojis();

const emojisMissingFromRemote = localEmojis.filter((emoji) => {
    return remoteEmojis.indexOf(emoji.name) === -1;
});
await addEmojis(auth, emojisMissingFromRemote);

// Show name of emoji which are missing locally. Disabled for now.
/*
const emojisMissingFromLocal = remoteEmojis.filter((emojiName) => {
    return localEmojis.every(e => e.name !== emojiName);
});
console.log(
    'Emojis missing from local repository:',
    // Convert to formatted JSON prevent the output from being truncated.
    JSON.stringify(emojisMissingFromLocal, null, 2),
);
*/
