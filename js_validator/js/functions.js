/* Main functions */

var formInputs = {};
var allInputs = document.getElementById('firstForm');

/*
for (i = 0; i < allInputs.elements.length; i++) {
  var currentInputValue = allInputs[i].value;
  if (allInputs[i].type == "radio" || allInputs[i].type == "checkbox") {
    currentInputValue = allInputs[i].checked;
  }
  formInputs[allInputs[i].name] = {"type": allInputs[i].type, "value": currentInputValue};
}
*/

document.getElementById('firstForm').addEventListener('change', function(event){
  var element = event.target;

  var currentInputValue = element.value;
  if (element.type == "radio" || element.type == "checkbox") {
    currentInputValue = element.checked;
  }
  formInputs[element.name] = {"type": element.type, "value": currentInputValue};
  
  console.log(formInputs);
  
  //formInputs[element.name].value = element.value;
});

console.log(formInputs);



/*
div class
has-error
has-success
*/

/*
                                                    // input / change
document.getElementById('firstForm').addEventListener('input', function(event){
  var element = event.target;
    //console.log(element.name);
    //console.log(element.tagName);
    //console.log(element.type);
    //console.log(element.id);



  switch(element.type) {
    case "text":
      notBlank(element.value, element.id);
      break;
    case "password":
      notBlank(element.value, element.id);
      break;
    case "email":
      notBlank(element.value, element.id);
      break;
    case "number":
      isNumber(element.value, element.id);
      console.log(element.value);
      break; 
    case "radio":
      alert("radio");
      break;
    case "checkbox":
      alert("checkbox");
      break;
    }
    
  function notBlank(inputValue, inputId) {
    if (inputValue == null || inputValue == "") {
      var errorNumber = 0;
      showError(inputId, errorNumber);
    } else {
      hideError(inputId);
    }
  }
  
  //nefunguje zatial
  function isNumber(inputValue, inputId) {
    if ((isNaN(inputValue) && !isFinite(inputValue)) || inputValue == null || inputValue == "") {
      var errorNumber = 1;
      showError(inputId, errorNumber);
    } else {
      hideError(inputId);
    }  
  }
  
  function showError(inputId, errorNumber) {
    var errors = ["Toto pole musí byť vyplnené.", "Musíte zadať číslo"];
    var currentInput = document.getElementById(inputId);
    var errorSpan = document.createElement("span");
    var errorText = document.createTextNode(errors[errorNumber]);
    errorSpan.appendChild(errorText);
    currentInput.parentElement.appendChild(errorSpan);
  }
  
  function hideError(inputId) {
    var currentInput = document.getElementById(inputId);
    var currentInputParent = currentInput.parentElement;
    var errorSpans = currentInputParent.getElementsByTagName("span");
    for (i = 0; i < errorSpans.length; i++) {
      currentInputParent.removeChild(errorSpans[i]);
    }    
  }
       
});



/*

var vstup = document.getElementById("firstName");

var vstupy = document.getElementsByTagName("input");



var nieco = vstupy[1];
 
//nieco.onchange = function() {myFunction(this)};
//vstup.onchange = function() {myFunction(this)};


  vstupy.onchange = function() {myFunction(this)};


vstupy.onchange = function() {myFunction(this)};

function myFunction(x) {
    x.value = x.value.toUpperCase();
    console.log(x);
}


window.onload = function () {

}



function validator(data) { 
  var inputType = data.type;
  var inputValue = data.value;
  
  var inputParent = data.parentElement;
  
  var valid = false;

  if (inputValue != null || inputValue != "") {
    inputParent.className  = "form-group has-success";
    valid = true; 
  } 
  if (inputValue == null || inputValue == "") {
    inputParent.className  = "form-group has-error";
    valid = false;
  }
  
  console.log(inputType + " - " + data.value + " - " + valid + " parent: " + inputParent);
}

*/