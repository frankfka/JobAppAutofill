class JobApplication {

  /**
   * Finds the type of job application
   */
  static getType(window) {
    let isGreenhouse = (w) => {
      return w.location.href.toLowerCase().includes("greenhouse.io")
    };
    let isLever = (w) => {
      return w.location.href.toLowerCase().includes("lever.co")
    };

    if (isGreenhouse(window)) {
      return APP_TYPE_GREENHOUSE
    } else if (isLever(window)) {
      return APP_TYPE_LEVER
    } else {
      return APP_TYPE_NONE
    }
  }

  constructor(appWindow) {
    this.appWindow = appWindow;
    this.type = JobApplication.getType(appWindow)
  }

  fillFields(data) {
    if (this.type) {
      let appFiller = getApplicationFiller(this);
      if (appFiller) {
        appFiller.fill(data);
      }
    } else {
      console.warn("No application type is set")
    }
  }

}
