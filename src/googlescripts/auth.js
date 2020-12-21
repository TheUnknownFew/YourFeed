// var GoogleAuth;
// function start() {
//     gapi.client.init({
//         'clientId': '393804611395-4oj5n77mac3si9p24ogpf89r9knjsime.apps.googleusercontent.com',
//         'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
//         'scope': 'https://www.googleapis.com/auth/youtube.readonly'
//     }).then(function () {
//         GoogleAuth = gapi.auth2.getAuthInstance();
//         GoogleAuth.isSignedIn.listen(updateSigninStatus);
//         var user = GoogleAuth.currentUser.get();
//     });
// }

var btnAuthorize = document.getElementById('authorize');
var btnSignout = document.getElementById('signout');

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
       clientId: '393804611395-4oj5n77mac3si9p24ogpf89r9knjsime.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        scope: 'https://www.googleapis.com/auth/youtube.readonly'
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        btnAuthorize.style.display = 'none';
        btnSignout.style.display = 'block';
    }
    else {
        btnAuthorize.style.display = 'block';
        btnSignout.style.display = 'none';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance.signOut();
}

function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (this.readyState === 'complete') this.onload();
        }
    }
    else {
        script.onload = function () {
            this.onload=function(){};
            handleClientLoad();
            callback();
        }
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}


loadScript('https://apis.google.com/js/api.js', function () {
    alert('Script Ready');
});