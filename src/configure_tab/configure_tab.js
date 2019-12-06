$(document).ready(function() {

  // On load listener - pre-populate the form
  browser.storage.local.get("jobApplicationAutofill")
  .then((data) => {
    let savedData = data["jobApplicationAutofill"];
    if (savedData) {
      $("input").each(function(index, element) {
        if (savedData[element.name]) {
          let elem = $( element );
          elem.val(savedData[element.name])
        }
      })
    }
  });

  // On submit listener
  $("form").submit(function(e) {
    e.preventDefault();
    let autofillData = {};
    $(this).serializeArray().forEach((obj) => {
      autofillData[obj.name] = obj.value
    });
    browser.storage.local.set({
      "jobApplicationAutofill": autofillData
    }).then(function() {
      $('.save-success-alert').show();
    })
  });

  // Alert dismiss listener
  $('.save-success-alert').click(function(e) {
    e.preventDefault();
    $(this).hide();
  });
});
