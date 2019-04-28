submit = document.getElementById("submit").addEventListener("click",cancelRequest);


function cancelRequest(){
     // create cancel object
     console.log("Client cancel event requested")
     apptCancel = getInfoFromCancelForm();
     
     // set up ajax request and send apptCancel obj to server
     var AJAXObj = new XMLHttpRequest();
     AJAXObj.onload = onloadCancelRequest;
     AJAXObj.onerror = function(){
         alert("AJAX response error");
     }
     msg = objectToString(apptCancel);
     AJAXObj.open("GET","http://localhost:8080/?"+msg);
     AJAXObj.setRequestHeader("Content-type", "application/json"); 
     AJAXObj.send();
 }

 function onloadCancelRequest() {
    console.log("Client received cancel server response")
    apptCancel = getInfoFromCancelForm();
    
    if (this.status == 200) {
        var apptStatus = JSON.parse(this.responseText);
        if ( apptStatus == "success") {
            document.getElementById("eventDisplay").innerHTML = "Okay " + apptCancel.name + "! " + 
                                                                "Your Machai tea appointment has been cancelled " + apptCancel.eventDate +
                                                                " at " + apptCancel.eventTime;
        } else if ( apptStatus == "unsuccessful"){
            document.getElementById("eventDisplay").innerHTML = "Sorry, this time was never scheduled.";
        } else if ( apptStatus == "notvalid"){
            document.getElementById("eventDisplay").innerHTML = "Sorry, this is not a valid time.";
        }  
        clearInputForm();
        
    } else { 
        alert("Error with server EventRequest response.");
    }
}
///////////////////////// HELPER FUNCTIONS
function getInfoFromCancelForm() {
    var apptCancel = {};
    apptCancel.name = document.getElementById("name").value; 
    apptCancel.eventName = document.getElementById("eventname").value;
    apptCancel.eventDate = document.getElementById("eventdate").value;
    apptCancel.eventTime = document.getElementById("eventtime").value;
    apptCancel.request = "cancel";

    return apptCancel;
}

function objectToString(query){
    var properties = Object.keys(query);
    var arrOfQuesryStrings = properties.map(prop => prop+"="+handleSpaces(query[prop].toString()));
    return(arrOfQuesryStrings.join('&'));
 }

 function handleSpaces(str) {
    var newStr = "";
    for (k = 0; k < str.length; k++) {    
        
        if (str[k] == " ")
            newStr += "+";
        else
            newStr += str[k];    
    }
    return newStr;
}

function clearInputForm() {
    apptCancel.name = document.getElementById("name").value = ""; 
    apptCancel.eventName = document.getElementById("eventname").value = "";
    apptCancel.eventDate = document.getElementById("eventdate").value = "";
    apptCancel.eventTime = document.getElementById("eventtime").value = "";
}
