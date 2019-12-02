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
      let app = new JobApplication(window);
      app.fillFields();
    }
  });
}

main();