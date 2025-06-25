import emojme from 'emojme';
import fs from 'fs';
import EmojiDelete from './emoji-delete.js';

function getLocalEmojis() {
    return fs.readdirSync('./emojis/')
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
}

function removeExt(string) {
    return string.substr(0, string.indexOf('.'));
}

async function getRemoteEmojis(auth) {
    const response = await emojme.download(
        auth.domain,
        auth.token,
        auth.cookie,
        {
            save: false,
            bustCache: true,
            output: false,
        }
    );

    return response[auth.domain].emojiList.map(e => e.name);
}

async function addEmojis(auth, emojis) {
    try {
        const response = await emojme.add(
            auth.domain,
            auth.token,
            auth.cookie,
            {
                src: emojis.map(emoji => './emojis/' + emoji.file), // File paths
                name: emojis.map(emoji => emoji.name), // Emoji names
                bustCache: false,
                avoidCollisions: false,
                output: false,
            },
        );
        console.log('Added Emoji:', response[auth.domain].emojiList);
    } catch (error) {
        console.error('Failed to Add', emojis, error);
    }
}

async function deleteEmojis(auth, emojiNames) {
    const emojiDelete = new EmojiDelete(
        auth.domain,
        auth.token,
        auth.cookie,
    );

    const response = await emojiDelete.delete(emojiNames);
    console.log(response);
}

export {
    getLocalEmojis,
    getRemoteEmojis,
    addEmojis,
    deleteEmojis,
};
