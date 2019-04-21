submit = document.getElementById("submit").addEventListener('click', scheduleEventName);

function scheduleEventName(){
    var appt = {};
    appt.name = document.getElementById("firstname").value;
    appt.eventName = document.getElementById("eventname").value;
    appt.eventDate = document.getElementById("eventdate").value;
    appt.eventTime = document.getElementById("eventtime").value;
    appt.request = 'schedule';

    var AJAXObj = new XMLHttpRequest();
    AJAXObj.onload = loadEventInfo;

    AJAXObj.onerror = function(){
        alert("AJAX response error");
    }

    //var request = {request:"eventDate"};
    AJAXObj.open("GET","http://localhost:8080/?"+queryObjectToString(appt));
    AJAXObj.send();

}


function queryObjectToString (query) {
    var properties = Object.keys(query);
    var arrOfQueryStrings = properties.map(prop => prop+"="+query[prop]);
    return(arrOfQueryStrings.join('&'));
}

function loadEventInfo() {
    if (this.status == 200) {
        var eventInfo = this.responseText;
        document.getElementById("eventDisplay").innerHTML = eventInfo;
    }
    else alert("Error loading your event information.");

}