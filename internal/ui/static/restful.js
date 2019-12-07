
function fetchMakes(year=1992) {
  var request = new XMLHttpRequest();
  var url = "/make?year="+year;

  request.open('POST', url, true);
  request.onload = function(){
    var data = JSON.parse(this.response);
    data = JSON.parse(data);
    console.log(data)
    console.log(data.items)

    
    // access JSON data
    // populate drop down menue with makes and hidden IDs

  }
  request.send();
}

function fetchModels(makeid=18) {
  var request = new XMLHttpRequest();
  var url = "/model?makeid="+makeid;

  request.open('POST', url, true);
  request.onload = function(){
    var data = JSON.parse(this.response);
    console.log(JSON.parse(data));
    // access JSON data
    // populate drop down menue with makes and hidden IDs
    
  }
  request.send();
}

function fetchTrims(modelid=122, yearid=1992) {
  var request = new XMLHttpRequest();
  var url = "/trim?modelid="+modelid+"&yearid="+yearid;

  request.open('POST', url, true);
  request.onload = function(){
    var data = JSON.parse(this.response);
    console.log(JSON.parse(data));
    // access JSON data
    // populate drop down menue with makes and hidden IDs
    
  }
  request.send();
}

function fetchVehiclesByYMMT(yearid=1992, makeid=18, modelid=122, trimid=261475) {
	var request = new XMLHttpRequest();
 	var url = "/vehicle?modelid="+modelid+"&yearid="+yearid+"&makeid="+makeid+"&trimid="+trimid;

	request.open('POST', url, true);
 	request.onload = function(){
 		var data = JSON.parse(this.response);
 		console.log(JSON.parse(data));
    	// access JSON data
    	// populate drop down menue with makes and hidden IDs
  	}
  	request.send();
}

function fetchValue(vehicleid=12155) {
  var request = new XMLHttpRequest();
  var url = "/value?vehicleid="+vehicleid;

request.open('POST', url, true);
  request.onload = function(){
    var data = JSON.parse(this.response);
    console.log(JSON.parse(data));
      // access JSON data
      // populate drop down menue with makes and hidden IDs
    }
    request.send();

}