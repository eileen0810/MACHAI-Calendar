// button handler to start requests to server
submit = document.getElementById("submit").addEventListener('click', scheduleRequest);

/////////////////////////////////////////////// HANDLES SUBMISSION 
function scheduleRequest(){
    // create appointment object
    console.log("Client schedule event requested")
    appt = getInfoFromForm();
    
    // set up ajax request and send appt obj to server
    var AJAXObj = new XMLHttpRequest();
    AJAXObj.onload = onloadScheduleRequest;
    AJAXObj.onerror = function(){
        alert("AJAX response error");
    }
    msg = objectToString(appt);
    AJAXObj.open("GET","http://localhost:8080/?"+msg);
    AJAXObj.setRequestHeader("Content-type", "application/json"); 
    AJAXObj.send();
}

// handles event request response from the server
function onloadScheduleRequest() {
    console.log("Client received server schedule response")
    appt = getInfoFromForm();
    if (this.status == 200) {
        //clearInputForm(); 
        var availability = JSON.parse(this.responseText);
        if ( availability == "available") {
            document.getElementById("eventDisplay").innerHTML = "Great " + appt.name + "! " + 
                                                                "Your Machai tea appointment has been reserved for " + appt.eventDate +
                                                                " at " + appt.eventTime + " for " + appt.guestCount + " people." +
                                                                " We will be contacting you at " + appt.eventEmail +
                                                                ". We're delighted to be part of your " + appt.eventName + ". See you there!"
        } else if ( availability == "unavailable"){
            document.getElementById("eventDisplay").innerHTML = "Sorry, this time is not available.";
        } else if ( availability == "notvalid"){
            document.getElementById("eventDisplay").innerHTML = "Sorry, this is not a valid time.";
        }  
        
    } else { 
        alert("Error with server schedule request response.");
    }
}

//////////////////////////////////////// HANDLES CALENDAR CLICK
cells = document.getElementsByTagName("td");
for (td of cells) {
    td.addEventListener("click", clickDateRequest);
}

function clickDateRequest(){
    day = this.innerHTML;
    monthandyear = document.getElementById("top").innerHTML;
    checkFor = {};
    checkFor.date = formatDate(day, monthandyear);;
    checkFor.request = "clickDate";
    var AJAXObj = new XMLHttpRequest();
    AJAXObj.onload = onloadClickDateRequest;
    AJAXObj.onerror = function(){
        alert("AJAX response error");
    }
    AJAXObj.open("GET","http://localhost:8080/?"+checkFor);
    AJAXObj.setRequestHeader("Content-type", "application/json"); 
    AJAXObj.send();
    console.log("Client click date requested")
}



function onloadClickDateRequest(){
    console.log("Client received click date server response")
    if (this.status == 200) {
         appts = this.responseText;
         console.log(appts);
    } else {
        alert("Error with click date server response.");
    }
}

////////////////////////////////////////////////////////// HELPER FUNCTIONS
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

function getMonthFromString(mon){
    return new Date(Date.parse(mon+"1,2012")).getMonth()+1;
}

function getInfoFromForm() {
    var appt = {};
    appt.name = document.getElementById("name").value; 
    appt.eventEmail = document.getElementById("eventemail").value;
    appt.eventName = document.getElementById("eventname").value;
    appt.guestCount = document.getElementById("guest").value;
    appt.eventDate = document.getElementById("eventdate").value;
    appt.eventPlace = document.getElementById("eventplace").value;
    appt.eventTime = document.getElementById("eventtime").value;
    appt.request = "schedule";

    return appt;
}

function clearInputForm() {
    document.getElementById("name").value = ""; 
    document.getElementById("eventemail").value = "";
    document.getElementById("eventname").value = "";
    document.getElementById("guest").value = "";
    document.getElementById("eventdate").value = "";
    document.getElementById("eventplace").value = "";
    document.getElementById("eventtime").value = "";
}

function formatDate(day, monthandyear){
    var splitted = monthandyear.split(" ");
    month = splitted[0];
    month = getMonthFromString(month);
    day = formatDay(day);
    newDate = splitted[1] +"-"+ month +"-" + day; 
    console.log(newDate);
}

function formatDay(day){
    if (day.length < 2 ) {
        newDay = "0" + day;
    }
    return newDay;
}