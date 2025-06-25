# Slack custom emojis repository

This is a holding place for all our custom emoji, with a script to sync them to Slack.

If you'd like to have an emoji added, please submit a pull request.

# Usage
1. Run `npm install` to install dependencies.
2. Install the [Emojme: Emoji Anywhere](https://chromewebstore.google.com/detail/emojme-emoji-anywhere/nbnaglaclijdfidbinlcnfdbikpbdkog?hl=en-US&pli=1) Chrome extension.
3. Go to the custom emoji page for your Slack, eg. `https://mywslack.com/customize/emoji`
5. Open the extension and wait for it to refresh.
5. Click "Get Slack Token and Cookie".
6. Run `index.js`, using the copied JSON as the argument: `node index.js '{"token":"xoxc-redacted","domain":"myslack","cookie":"xoxd-redacted"}'`


# Guidelines to submitting emojis
- Emojis must be square and resized to 128x128px.
- Emojis should have a transparent background, unless they naturally cover the entire square.
- Images can be in JPG, PNG or GIF format. GIFs can include up to 50 frames.  
- Maximum filesize is 128 KB, but we recommend 64kb or less.
- Please refrain from submitting images containing:
  - Illegal content.
  - Nudity or pornography.
  - Hate speech or symbols of hate.
  - Profile pictures or other user content without their authorization.
  - Anything else highly offensive.

If in doubt, see [this article](https://get.slack.help/hc/en-us/articles/206870177-Add-custom-emoji) for the latest guidelines, and consider updating this README if it's out of date.

# Contribution Guidelines
- Fork this repository.
- Create a new feature branch off `master` (e.g. `git checkout -b mc-picard-facepalm`).
- You may add multiple emojis per branch, but keep it to a reasonable number, to avoid delays in review and merge.
- Submit a PR from your branch to `dylanbr/master`.
