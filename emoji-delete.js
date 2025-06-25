import logger from 'emojme/lib/logger.js';
import SlackClient from 'emojme/lib/slack-client.js';

const ENDPOINT = '/emoji.remove';

class EmojiDelete {
    constructor(subdomain, token, cookie) {
        this.subdomain = subdomain;
        this.token = token;
        this.cookie = cookie;
        this.slack = new SlackClient(this.subdomain, this.cookie, SlackClient.rateLimitTier(2));
        this.endpoint = ENDPOINT;
    }

    async deleteSingle(emojiName) {
        const parts = await this.constructor.createMultipart(this.token, emojiName);
        try {
            const body = await this.slack.request(this.endpoint, parts);
            if (!body.ok) {
                throw new Error(body.error);
            }
        } catch (err) {
            logger.warning(`[${this.subdomain}] error on ${emojiName}: ${err.message || err}`);
            return Object.assign({}, emojiName, { error: err.message || err });
        }
        logger.debug(`[${this.subdomain}] ${emojiName} deleted successfully`);

        return false; // no error
    }

    async delete(emojis) {
        const results = await Promise.all(
            emojis.map(emoji => this.deleteSingle(emoji)),
        );

        const errors = results.filter(result => result);
        const totalCount = results.length;
        const errorsCount = errors.length;
        const successCount = totalCount - errorsCount;
        logger.info(`\n[${this.subdomain}] Batch delete complete.\n  total requests: ${totalCount} \n  successes: ${successCount} \n  errors: ${errorsCount}`);
        return { subdomain: this.subdomain, emojiList: emojis, errorList: errors };
    }

    static async createMultipart(token, name) {
        return {
            token,
            name,
        };
    }
}

export default EmojiDelete;
