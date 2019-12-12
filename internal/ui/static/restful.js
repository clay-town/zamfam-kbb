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

function fetchMakes(year) {
  var request = new XMLHttpRequest();
  var url = "/make?year="+year;

  request.open('POST', url, true);
  request.onload = function(){
    var data = JSON.parse(this.response);
    data = JSON.parse(data);
    // access JSON data
    // populate drop down menue with makes and hidden IDs
    var makeMenu = "<select name='makedd' onchange='fetchModels("+year+", this.value)'>"+
                    "<option value=''>Make</option>";
    for (x = 0; x < data.items.length; x++){
      makeMenu = makeMenu+"<option value="+data.items[x].makeId+">"+data.items[x].makeName+"</option>";
    } 
    makeMenu = makeMenu+"</select>";
    document.getElementById("makedd").innerHTML = makeMenu
    }

  request.send();
}

function fetchModels(year, makeid) {
  var request = new XMLHttpRequest();
  var url = "/model?makeid="+makeid+"&year="+year;
  var makeid = makeid
  request.open('POST', url, true);
  request.onload = function(){
    var data = JSON.parse(JSON.parse(this.response));
    var modelMenu = "<select name='modeldd' onchange='fetchTrims("+year+", "+makeid+", this.value)'>"+
                    "<option value=''>Model</option>";
    for (x = 0; x < data.items.length; x++){
      modelMenu = modelMenu+"<option value="+data.items[x].modelId+">"+data.items[x].modelName+"</option>";
    } 
    modelMenu = modelMenu+"</select>";
    document.getElementById("modeldd").innerHTML = modelMenu
  }
  request.send();
}

function fetchTrims(year, makeid, modelid) {
  var request = new XMLHttpRequest();
  var url = "/trim?modelid="+modelid+"&yearid="+year;

  request.open('POST', url, true);
  request.onload = function(){
    var data = JSON.parse(JSON.parse(this.response));
    console.log(data)
    // access JSON data
    // populate drop down menue with makes and hidden IDs  
    var trimMenu = "<select name='trimdd' onchange='fetchVehiclesByYMMT("+year+", "+makeid+", "+modelid+", this.value)'>"+
                    "<option value=''>Trim</option>";
    for (x = 0; x < data.items.length; x++){
      trimMenu = trimMenu+"<option value="+data.items[x].trimId+">"+data.items[x].trimName+"</option>";
    } 
    trimMenu = trimMenu+"</select>";
    document.getElementById("trimdd").innerHTML = trimMenu

  }
  request.send();
}

function fetchVehiclesByYMMT(year, makeid, modelid, trimid) {
	var request = new XMLHttpRequest();
 	var url = "/vehicle?modelid="+modelid+"&yearid="+year+"&makeid="+makeid+"&trimid="+trimid;

	request.open('POST', url, true);
 	request.onload = function(){
 		var data = JSON.parse(JSON.parse(this.response));
 		console.log(data.items[0].vehicleId)

    // fetch value
    fetchValue(year, makeid, modelid, trimid, data.items[0].vehicleId)
  	}
  	request.send();
}

function fetchValue(year, makeid, modelid, trimid, vehicleid) {
  var request = new XMLHttpRequest();
  var url = "/value?vehicleid="+vehicleid;

request.open('POST', url, true);
  request.onload = function(){
    var data = JSON.parse(JSON.parse(this.response));
    console.log(data);
    var fairV = data.prices[0].rangeLow + " - "+data.prices[0].rangeHigh
    var goodV = data.prices[1].rangeLow + " - "+data.prices[1].rangeHigh
    var excellentV = data.prices[2].rangeLow+" - "+data.prices[2].rangeHigh
    var veryGoodV = data.prices[3].rangeLow+" - "+data.prices[3].rangeHigh


    valueDisplay = "<table>  <tr><td>Fair:      </td> <td>"+fairV+"</td></tr>"+
                            "<tr><td>Good:      </td> <td>"+goodV+"</td></tr>"+
                            "<tr><td>Very Good: </td> <td>"+veryGoodV+"</td></tr>"+
                            "<tr><td>Excellent: </td> <td>"+excellentV+"</td></tr> </table>";

    //document.getElementById("button").innerHTML 
    document.getElementById("value").innerHTML = valueDisplay
        // push value onto screen
        // send info back into manychat....somehow
    }
    request.send();
}

