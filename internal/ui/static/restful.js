
function fetchMakes(year=1992) {
	alert("Fetching makes")
  var request = new XMLHttpRequest();
  var url = "/make?year="+year;

  request.open('POST', url, true);
  request.onload = function(){
    var data = JSON.parse(this.response);
    console.log(JSON.parse(data));
    // access JSON data
    // populate drop down menue with makes and hidden IDs
    
  }
  request.send();
}