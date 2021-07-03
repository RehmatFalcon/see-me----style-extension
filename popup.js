const siteUrlElm = document.querySelector("#site-url");
const siteCssElm = document.querySelector("#site-css");
const setBtnElm = document.querySelector("#set-style");
const loadBtnElm = document.querySelector("#load-style");
const setForm = document.querySelector("#set-form");

document.addEventListener("DOMContentLoaded", () => {
    loadBtnElm.addEventListener('click', e => {
        e.preventDefault();
        let key = siteUrlElm.value;
        if(!key) return;
        key = new URL(key).origin;
        chrome.storage.sync.get([key], function(result) {
            if(typeof result[key] !== "undefined") {
                siteCssElm.value = result[key];
            }
        });
    });
    setForm.addEventListener('submit', e => {
        e.preventDefault();
        const siteUrl = new URL(siteUrlElm.value).origin;
        const siteCss = siteCssElm.value;
        chrome.storage.sync.set({ [siteUrl]: siteCss }, function() {
            alert("Styles updated");
            chrome.runtime.sendMessage({styleUpdate: true});
        });
    });
});