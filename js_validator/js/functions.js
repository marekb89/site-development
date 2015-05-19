/* Main functions */

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