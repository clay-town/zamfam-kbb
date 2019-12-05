
function fetchMakes(year=1992) {
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