console.log("Page opened!");
let ytNavCard = document.createElement("ytd-guide-collapsible-entry-renderer");
let promise = Extension.getTemplate("svg-icon");
let interval = setInterval(insertFeedsNav, 10);

if (window.location.href === "https://www.youtube.com/feed/subscriptions/feeds") {
    console.log("hi");
    document.getElementsByTagName("ytd-browse")[0].innerHTML = "Hi";
}

function insertFeedsNav() {
    let ytSideBar = document.getElementsByTagName("ytd-guide-section-renderer")[0].children[1];
    if (ytSideBar.children.length >= 2) {
        promise.then(html => {
            document.getElementById("items").children[2].insertAdjacentElement("afterend", ytNavCard);
            ytNavCard.getElementsByTagName("yt-icon")[0].innerHTML = html;
            ytNavCard.getElementsByTagName("yt-formatted-string")[0].innerHTML = "Feeds";
            ytNavCard.getElementsByTagName("yt-img-shadow")[0].hidden = true;
            let a = ytNavCard.getElementsByTagName("a")[0];
            a.title = "Feeds";
            a.href = "/feed/subscriptions/feeds";
        });
        clearInterval(interval);
    }
}