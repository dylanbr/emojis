# Slack custom emojis repository

This is a holding place for all our custom emoji, and a little script to sync.

If you'd like to have an emoji added, please create a pull request.

# Usage

1. Run `npm install` to install dependencies.
2. Install the [Emojme: Emoji Anywhere](https://chromewebstore.google.com/detail/emojme-emoji-anywhere/nbnaglaclijdfidbinlcnfdbikpbdkog?hl=en-US&pli=1) Chrome extension.
3. Go to the custom emoji page for your Slack, eg. `https://mywslack.com/customize/emoji`
5. Open the extension and wait for it to refresh.
5. Click "Get Slack Token and Cookie".
6. Run `index.js`, using the copied JSON as the argument: `node index.js '{"token":"xoxc-redacted","domain":"myslack","cookie":"xoxd-redacted"}'`


# Guidelines to submitting emojis
- emojis should be square and be able to be reduced to 128x128 px
- emojis should have a transparent background
- Images can only be GIF or PNG (https://get.slack.help/hc/en-us/articles/206870177-Add-custom-emoji)
- Maximum filesize is 128 KB, but we recommend 64kb or less
- Please refrain from submitting controversial images such as hate speech symbols (including co-opted hate symbols), unauthorized profile images, etc


# Contribution Guidelines
- Fork this repo
- Create a feature branch off `master` (e.g. `git checkout -b mc-picard-facepalm`)
- Add a single emoji per branch (see above guidelines)
- Submit a Pull Request from your branch to `dylanbr/master`
