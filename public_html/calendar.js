// button handler to start requests to server
//submit = document.getElementById("submit").addEventListener('click', scheduleRequest);
scheduleRequest()

// handles submission to schedule an event
function scheduleRequest(){
    // create appointment object
    console.log("Schedule event requested:")
    var appt = {};
    appt.name = "Mayeline Pena"           //document.getElementById("name").value; 
    appt.eventEmail = "mpena@smith.edu"   //document.getElementById("eventemail").value;
    appt.eventName = "90 Day Watch Party" //document.getElementById("eventname").value;
    appt.guestCount = "10"                //document.getElementById("guest").value;
    appt.eventDate = "2019-01-02"         //document.getElementById("eventdate").value;
    appt.eventPlace = "Capen 2019"        //document.getElementById("eventplace").value;
    appt.eventTime =  "20:00"             //document.getElementById("eventtime").value;
    appt.request = "schedule";
    
    // set up ajax request and send appt obj to server
    var AJAXObj = new XMLHttpRequest();
    AJAXObj.onload = onloadScheduleRequest;
    AJAXObj.onerror = function(){
        alert("AJAX response error");
    }
    msg = objectToString(appt);
    console.log(msg);
    AJAXObj.open("GET","http://localhost:8080/?"+msg);
    AJAXObj.setRequestHeader("Content-type", "application/json"); 
    AJAXObj.send();
}

// handles event request response from the server
function onloadScheduleRequest() {
    console.log("Client received server response")
    if (this.status == 200) {
        console.log("status", this.responseText);
        var availability = JSON.parse(this.responseText);
        console.log("availability", availability);
        if ( availability == "available") {
            document.getElementById("eventDisplay").innerHTML = "Yay, this time was available.";
        } else if ( availability == "unavailable"){
            document.getElementById("eventDisplay").innerHTML = "Sorry, this time is not available.";
        } else if ( availability == "notvalid"){
            document.getElementById("eventDisplay").innerHTML = "Sorry, this is not a valid time.";
        }  
    } else { 
        alert("Error with server EventRequest response.");
    }
}

///////////////////////// HELPER FUNCTIONS
// helper function that turns an object into JSON format
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

