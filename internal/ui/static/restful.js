document.addEventListener("DOMContentLoaded", function() {
  populateDropDowns();
});

function populateDropDowns(){
  var yearMenu = "<select name='yeardd' onchange='fetchMakes(this.value)'>"+
                    "<option value=''>Year</option>";
  for (year=1992; year < 2021; year++){
    yearMenu = yearMenu+"<option value="+year+">"+year+"</option>";
  }
  yearMenu = yearMenu+"</select>";
  document.getElementById("yeardd").innerHTML = yearMenu
}

function fetchMakes(year=1992) {
  var request = new XMLHttpRequest();
  var url = "/make?year="+year;

  request.open('POST', url, true);
  request.onload = function(){
    var data = JSON.parse(this.response);
    data = JSON.parse(data);
    // access JSON data
    // populate drop down menue with makes and hidden IDs
    var makeMenu = "<select name='makedd' onchange='fetchModels(this.value)'>"+
                    "<option value=''>Make</option>";
    for (x = 0; x < data.items.length; x++){
      makeMenu = makeMenu+"<option value="+data.items[x].makeId+">"+data.items[x].makeName+"</option>";
    } 
    makeMenu = makeMenu+"</select>";
    document.getElementById("makedd").innerHTML = makeMenu
    }

  request.send();
}

function fetchModels(makeid=18) {
  var request = new XMLHttpRequest();
  var url = "/model?makeid="+makeid;

  request.open('POST', url, true);
  request.onload = function(){
    var data = JSON.parse(JSON.parse(this.response));
    
    console.log(data.items)
    //console.log("Make Id:  ",data.items[0].makeId)
    //console.log("Make Name:  ",data.items[0].makeName)
    //console.log(data.items.length)
    // access JSON data
    // populate drop down menue with makes and hidden IDs  
    var modelMenu = "<select name='modeldd' onchange='fetchTrims(this.value)'>"+
                    "<option value=''>Model</option>";
    for (x = 0; x < data.items.length; x++){
      modelMenu = modelMenu+"<option value="+data.items[x].modelId+">"+data.items[x].modelName+"</option>";
    } 
    modelMenu = modelMenu+"</select>";
    document.getElementById("modeldd").innerHTML = modelMenu
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