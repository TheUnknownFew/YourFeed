let Extension = {
    getToken: function () { // Get Google's Youtube Auth Access Token.
        return browser.runtime.sendMessage({
            requestType: 0,
            params: {}
        }).then(message => {return message;});
    },
    getTemplate: function (templateId) {
        return browser.runtime.sendMessage({
            requestType: 1,
            params: {id: templateId}
        }).then(message => {return message;});
    }
};

let YoutubeRequest = {

};