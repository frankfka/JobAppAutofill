function main() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === COMMAND_AUTOFILL) {
      getLocalStorageData()
      .then((data) => {
        let app = new JobApplication(window);
        app.fillFields(data);
      });
    }
  });
}

async function getLocalStorageData() {
  let parsedData = {};
  let data = await browser.storage.local.get("jobApplicationAutofill");
  let autofillData = data["jobApplicationAutofill"];
  if (autofillData) {
    // TODO: Should just be a mapping to iterate over
    parsedData[DATA_FIRST_NAME] = autofillData["firstName"];
    parsedData[DATA_LAST_NAME] = autofillData["lastName"];
    parsedData[DATA_EMAIL] = autofillData["email"];
    parsedData[DATA_PN] = autofillData["phone"];
    parsedData[DATA_CURR_COMPANY] = autofillData["currentCompany"];
    parsedData[DATA_LINKEDIN] = autofillData["linkedIn"];
    parsedData[DATA_WEBSITE] = autofillData["website"];
    parsedData[DATA_TWITTER] = autofillData["twitter"];
    parsedData[DATA_GITHUB] = autofillData["github"];
  }
  return parsedData
}

main();