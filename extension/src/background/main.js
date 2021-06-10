browser.runtime.onInstalled.addListener(doInstall);
browser.runtime.onStartup.addListener(doStartup);

function doInstall() {
    browser.runtime.openOptionsPage().then(() => {});
    doStartup();
}

function doStartup() {
    getAccessToken().then(setToken);
    browser.runtime.onMessage.addListener(handleMessage);
}

function setToken(token) {
    console.log("Auth token has been set: ", token);
    browser.storage.local.set({token: token}).then(() => {});
    testGetSubscriptions(token);
}

function testGetSubscriptions(token) {
    // GET your.channelid
    // https://www.googleapis.com/youtube/v3/channels?key={YOUR_API_KEY}&forUsername={USER_NAME}&part=id
    const header = new Headers();
    header.append('Authorization', `Bearer ${token}`)
    fetch(new Request(`https://www.googleapis.com/youtube/v3/channels?mine=true`,
        {method: 'GET', headers: header})).then(function (response) {
        console.log(response.json().then(data => { return data.items[0].id }));
    });
    // GET subscriptions
    // https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&channelId=UCjaS5qh5bMtk1X_wLzhts_g&maxResults=100&key=[YOUR_API_KEY]
}

async function handleMessage(request, sender, response) {
    switch (request.requestType) {
        case 0: // Case: Get Auth Token
            return browser.storage.local.get("token").then((token) => {return token.token});
        case 1: // Case: Get template from background html
            return Promise.resolve(document.getElementById(request.params.id).innerHTML);
        default:
            console.log("Message of unknown type received!");
    }
}