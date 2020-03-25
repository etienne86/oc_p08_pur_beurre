// Code from jQuery UI Autocomplete
// The purpose is helping the user to find a product in the database

$( function() {
  var allProducts = JSON.parse(
    document.getElementById('pythonProducts').textContent
  );
  // autocomplete search field in navbar
  $( "#autocompletion-0" ).autocomplete({
    source: allProducts
  });
  // autocomplete search field in welcome page (masthead section)
  $( "#autocompletion-1" ).autocomplete({
    source: allProducts
  });
} );


// Block with AJAX POST:
// - to send the product selected by the user to the Python view
// - to deal with the feedback from Python

var formElts = document.getElementsByClassName('productSubmitForm');
var formEltsCounter = formElts.length; // expect 2 (welcome page) or 1
// iterate on each search form
for (let i = 0; i < formEltsCounter; i++) {
  var formEltI = document.getElementsByClassName('productSubmitForm')[i];
  // listen if a search form is submitted
  formEltI.addEventListener("submit", function (e) {
    e.preventDefault();
    // get the input text
    var productString = document.getElementById(`autocompletion-${i}`).value;
    // if there is an input
    if (productString != "") {
      // execute AJAX POST request
      $.ajax({
        type: 'POST',
        url: formEltI.getAttribute('ajax-find-product-url'),
        data: {
          'product_string': productString,
          csrfmiddlewaretoken:$( 'input[name=csrfmiddlewaretoken]' ).val()
        },
        dataType: 'json',
        success: function (data) {
          var action = formEltI.getAttribute("action");
          var newAction = action.replace("0", `${data.product_id}`);
          formEltI.setAttribute("action", newAction);
          formEltI.submit();
        }
      });
    };
  });
}