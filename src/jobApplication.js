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

  fillFields() {
    if (this.type) {

      let data = {};
      data[DATA_FIRST_NAME] = "Frank";
      data[DATA_LAST_NAME] = "Jia";
      data[DATA_EMAIL] = "jiafrank98@gmail.com";
      data[DATA_PN] = "7783849871";
      data[DATA_WEBSITE] = "http://jiafrank.com/";
      data[DATA_LINKEDIN] = "https://www.linkedin.com/in/jiafrank/";
      data[DATA_US_RIGHT_TO_WORK] = true;
      data[DATA_US_SPONSOR] = true;

      let appFiller = getApplicationFiller(this);
      appFiller.fill(data);
    } else {
      console.warn("No application type is set")
    }
  }

}
