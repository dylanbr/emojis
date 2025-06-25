function getAuth(argv, env) {
    let auth;

    if (argv.auth) {
        // If `--auth` is set, try and use that.
        try {
            auth = JSON.parse(argv.auth);
        } catch (error) {
            throw 'Invalid JSON for `--auth`';
        }
    } else {
        // Otherwise try the environment.
        try {
            auth = JSON.parse(env.EMOJME_AUTH);
        } catch (error) {
            throw 'Invalid JSON for `EMOJME_AUTH`';
        }
    }

    // Sanity checks on authentication data.
    if (!auth) {
        throw 'Missing `--auth` or `EMOJME_AUTH`';
    }

    if (!auth.token) {
        throw 'Missing token in JSON `--auth` or `EMOJME_AUTH`';
    }
    if (!auth.domain) {
        throw 'Missing domain in JSON `--auth` or `EMOJME_AUTH`';
    }
    if (!auth.cookie) {
        throw 'Missing cookie in JSON `--auth` or `EMOJME_AUTH`';
    }

    return auth;
}

export {
    getAuth,
};
