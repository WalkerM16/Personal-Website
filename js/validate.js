window.onload = function() {
    var form = document.getElementById('mainForm');
    
    //Get all the required input fields from the form
    var email = document.getElementById("email");
    var parentClass;
    var requiredInputs = document.querySelectorAll(".required")
    console.log(requiredInputs);
    
    form.onsubmit = function(event) {
        
        //Look at each required field, if blank stop form
        for (var i = 0; i < requiredInputs.length; i++) {
            if (isBlank(requiredInputs[i])) {
                //Prevent action
                event.preventDefault();
                
                //set parentClass to original class and error
                parentClass = requiredInputs[i].parentElement.getAttribute("class");
                parentClass += " error";
                requiredInputs[i].parentElement.setAttribute("class", parentClass)
                
                console.log("Form stopped at input " + i + "!");
            }
        }
        //if the field needs an email address, do the same
        //blocking when the email is not a valid address.
        if (!isValidEmail()) {
            event.preventDefault();
            parentClass = email.parentElement.getAttribute("class");
            parentClass += " error";
            email.parentElement.setAttribute("class", parentClass)
        }
    }
    
    for (var i = 0; i < requiredInputs.length; i++) {
        requiredInputs[i].onfocus = function() {
            parentClass = this.parentElement.getAttribute("class");
            parentClass = parentClass.replace("error","");
            this.parentElement.setAttribute("class",parentClass);
        }
    }
    
    var isBlank = function(inputObj) {
        if(inputObj.value == "") {
            return true;
        } else {
            return false;
        }
    }
    
    var isValidEmail = function() {
        var atPosition = email.value.indexOf('@');
        if(atPosition > 0 && atPosition < email.value.length-1) {
            return true;
        } 
        else {
            return false;
        }
    }
}