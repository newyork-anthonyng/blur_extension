let isBlurred = false;
const id = `overlay-${Math.random() * 1000}`;

function updateIcon() {
  chrome.browserAction.setIcon({
    path: `${isBlurred ? 1 : 2}.png`,
  });
}

function blurPage() {
  chrome.tabs.executeScript({
    code: `
      document.body.style.filter='blur(10px)';

      var overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.left = '0';
      overlay.style.right = '0';
      overlay.style.top = '0';
      overlay.style.bottom = '0';
      overlay.setAttribute('id', "${id}");
      overlay.addEventListener(function(e) {
        e.preventDefault();
      }, true);

      document.body.appendChild(overlay);
    `,
  });
}

function showPage() {
  chrome.tabs.executeScript({
    code: `
      document.body.style.filter='';

      var overlay = document.getElementById("${id}");
      overlay.parentNode.removeChild(overlay);
    `,
  });
}

chrome.browserAction.onClicked.addListener(function() {
  if (isBlurred) {
    showPage();
  } else {
    blurPage();
  }

  updateIcon();
  isBlurred = !isBlurred;
});
