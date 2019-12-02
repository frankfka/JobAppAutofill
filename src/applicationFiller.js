function getApplicationFiller(jobApplication) {
  switch (jobApplication.type) {
    case APP_TYPE_GREENHOUSE:
      return new GreenhouseApplicationFiller(jobApplication.appWindow);
    case APP_TYPE_LEVER:
      return new LeverApplicationFiller(jobApplication.appWindow);
    case APP_TYPE_NONE:
      console.log("none")
      break;
  }
}

class AppFillerUtil {
  static fillFirstElementByName(appWindow, elementName, fillData) {
    let elements = appWindow.document.getElementsByName(elementName);
    if (elements && fillData) {
      elements[0].value = fillData;
    }
  }
  static fillElementWithValue(element, value) {
    // TODO: need to check if undefined
    if (element && value) {
      element.value = value
    }
  }
}

class LeverApplicationFiller {
  constructor(appWindow) {
    this.appWindow = appWindow;
  }

  fill(data) {
    let fullNameField;
    let emailField;
    let phoneField;
    let currentCompanyField;
    let linkedInField;
    let twitterField;
    let githubField;
    let portfolioField;

    let fields = this.appWindow.document.getElementsByClassName("application-field");
    Array.prototype.forEach.call(fields, (field) => {
      let inputField = field.querySelector("input");
      if (inputField) {
        switch (inputField.name) {
          case "name":
            fullNameField = inputField;
            break;
          case "email":
            emailField = inputField;
            break;
          case "phone":
            phoneField = inputField;
            break;
          case "org":
            currentCompanyField = inputField;
            break;
          case "urls[LinkedIn]":
            linkedInField = inputField;
            break;
          case "urls[Twitter]":
            twitterField = inputField;
            break;
          case "urls[GitHub]":
            githubField = inputField;
            break;
          case "urls[Portfolio]":
            portfolioField = inputField;
            break;
        }
      }
    });

    // TODO make this more robust
    AppFillerUtil.fillElementWithValue(fullNameField, data[DATA_FIRST_NAME] + ' ' + data[DATA_LAST_NAME])
  }

}

class GreenhouseApplicationFiller {

  constructor(appWindow) {
    this.appWindow = appWindow;
  }

  fill(data) {
    this.fillMainFields(data);
    this.fillCustomFields(data);
  }

  fillMainFields(data) {
    // First Name
    AppFillerUtil.fillFirstElementByName(
      this.appWindow,
      "job_application[first_name]",
      data[DATA_FIRST_NAME]
    );
    // Last Name
    AppFillerUtil.fillFirstElementByName(
      this.appWindow,
      "job_application[last_name]",
      data[DATA_LAST_NAME]
    );
    // Email
    AppFillerUtil.fillFirstElementByName(
      this.appWindow,
      "job_application[email]",
      data[DATA_EMAIL]
    );
    // Phone
    AppFillerUtil.fillFirstElementByName(
      this.appWindow,
      "job_application[phone]",
      data[DATA_PN]
    );
  }

  fillCustomFields(data) {
    let linkedInField;
    let websiteField;
    // let unitedStatesLegalRightField;
    // let unitedStatesSponsorshipField;
    // Find supported custom fields
    let customFields = this.appWindow.document.getElementById("custom_fields").getElementsByClassName(
      "field");
    Array.prototype.forEach.call(customFields, (element) => {
      let innerLabel = element.querySelector('label');
      if (innerLabel && innerLabel.textContent) {
        let matchText = innerLabel.textContent.toLowerCase();
        let textInput = element.querySelector('input[type=text]');
        let selectInput = element.querySelector('select');
        if (matchText.includes("linkedin") && textInput) {
          linkedInField = textInput;
          console.log(linkedInField)
        } else if (matchText.includes("website") && textInput) {
          websiteField = textInput;
          console.log(websiteField)
        }
        // else if (matchText.includes("legal right to work") && selectInput) {
        //   unitedStatesLegalRightField = selectInput;
        //   console.log(unitedStatesLegalRightField)
        // } else if (matchText.includes("immigration case") && selectInput) {
        //   unitedStatesSponsorshipField = selectInput;
        //   console.log(unitedStatesSponsorshipField)
        // }
      }
    });
    // Fill in fields from data
    AppFillerUtil.fillElementWithValue(linkedInField, data[DATA_LINKEDIN]);
    AppFillerUtil.fillElementWithValue(websiteField, data[DATA_WEBSITE]);
    // AppFillerUtil.fillElementWithValue(unitedStatesLegalRightField, data[DATA_US_RIGHT_TO_WORK] ? "1" : "0");
    // AppFillerUtil.fillElementWithValue(unitedStatesSponsorshipField, data[DATA_US_SPONSOR] ? "1" : "0");
  }

}
