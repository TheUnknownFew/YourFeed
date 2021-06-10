const REDIRECT_URL = browser.identity.getRedirectURL();
const CLIENT_ID = "393804611395-4oj5n77mac3si9p24ogpf89r9knjsime.apps.googleusercontent.com";
const SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"];
const AUTH_URL = `https://accounts.google.com/o/oauth2/auth\
?client_id=${CLIENT_ID}\
&response_type=token\
&redirect_uri=${encodeURIComponent(REDIRECT_URL)}\
&scope=${encodeURIComponent(SCOPES.join(' '))}`;
const VALIDATION_BASE_URL="https://www.googleapis.com/oauth2/v3/tokeninfo";

function extractAccessToken(redirectUri) {
    let uri = redirectUri.match(/[#?](.*)/);
    if (!uri || uri.length < 1) {
        return null;
    }
    // let params = new URLSearchParams(uri[1].split("#")[0]);
    return new URLSearchParams(uri[1].split("#")[0]).get("access_token");
}

function validate(redirectURL) {
    const accessToken = extractAccessToken(redirectURL);
    if (!accessToken) {
        throw "Authorization failure";
    }
    // const validationURL = `${VALIDATION_BASE_URL}?access_token=${accessToken}`;
    // const validationRequest = new Request(`${VALIDATION_BASE_URL}?access_token=${accessToken}`, {
    //     method: "GET"
    // });

    function checkResponse(response) {
        return new Promise((resolve, reject) => {
            if (response.status !== 200) {
                reject("Token validation error");
            }
            response.json().then((json) => {
                if (json.aud && (json.aud === CLIENT_ID)) {
                    resolve(accessToken);
                } else {
                    reject("Token validation error");
                }
            });
        });
    }

    return fetch(new Request(`${VALIDATION_BASE_URL}?access_token=${accessToken}`, {
        method: "GET"
    })).then(checkResponse);
}

function authorize() {
    return browser.identity.launchWebAuthFlow({
        interactive: true,
        url: AUTH_URL
    });
}

function getAccessToken() {
    return authorize().then(validate);
}