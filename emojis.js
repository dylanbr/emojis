import emojme from 'emojme';
import {globby} from 'globby';
import path from 'path';
import EmojiDelete from './emoji-delete.js';

async function getLocalEmojis() {
    const files = await globby('./emojis/**/*', {
        onlyFiles: true,
        dot: false, // skip hidden files
    });

    return files.map((file) => ({
        name: path.parse(file).name,
        file,
    }));
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
        },
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
                src: emojis.map(emoji => emoji.file), // File paths
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
