chrome.webNavigation.onCompleted.addListener(function() {
    chrome.tabs.executeScript({
        code: `
        function GetSeeStylesheet()
        {
          let stylesheet = document.querySelector('.see-style');
          if(!stylesheet) {
            const elm = document.createElement('style');
            elm.classList.add('see-style');
            document.body.appendChild(elm);
            return elm;
          }
          return stylesheet;
        }
        function LoadSeeStyle()
        {
          const origin = window.location.origin;
          chrome.storage.sync.get([origin], function(result) {
            if(typeof result[origin] !== "undefined") {
                const extraStyle = result[origin];
                if(extraStyle) {
                  const stylesheet = GetSeeStylesheet();
                  stylesheet.innerHTML = extraStyle;
                }
            }
          });
        }
        LoadSeeStyle();
        // GetSeeStylesheet().insertRule("body { background: red !important; }");
        // function SyncDomSpeed() {
        //    chrome.runtime.sendMessage({speed: GetDomPlayerRate()});
        // }
        // setInterval(SyncDomSpeed, 5000);
        `
      });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {           
      chrome.tabs.executeScript({
        code: `
        (typeof LoadSeeStyle === 'function') && LoadSeeStyle();
        `
      });
      sendResponse();
  });