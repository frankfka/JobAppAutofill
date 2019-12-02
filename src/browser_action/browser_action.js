function browserActionBtnClickedListener(e) {

  // TODO error handling
  function executeAutofill(tabs) {
    browser.tabs.sendMessage(
      tabs[0].id,
      { command: "autofill" }
    );
  }

  if (e.target.classList.contains("autofill_btn")) {
    browser.tabs.query({ active: true, currentWindow: true })
    .then(executeAutofill)
    .catch((error) => {
      console.error(`Failed to execute content script: ${error.message}`);
    });
  } else if (e.target.classList.contains("configure_btn")) {
    browser.tabs.create({
      url: "/src/configure_tab/configure_tab.html"
    })
    .catch((error) => {
      console.error(`Failed to execute content script: ${error.message}`);
    });
  }
}

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => browserActionBtnClickedListener(e));
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "../const.js"});
browser.tabs.executeScript({file: "../applicationFiller.js"});
browser.tabs.executeScript({file: "../jobApplication.js"});
browser.tabs.executeScript({ file: "../main.js" })
.then(listenForClicks)
.catch((error) => {
  console.error(`Failed to execute content script: ${error.message}`);
});
