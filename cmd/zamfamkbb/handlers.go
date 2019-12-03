package main

import (
	"log"
	"net/http"
	"html/template"
	"encoding/json"
	"io/ioutil"
	"os"
	"github.com/joho/godotenv"
)

func home(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/"{
		http.NotFound(w, r)
		return
	}
	ts, err := template.ParseFiles("internal/ui/html/home.page.tmpl")
	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Internal Serer Error", 500)
		return
	}	
	err = ts.Execute (w, nil)
	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Internal Server Error", 500)
	}
}

func year() {

}

func returnMakes(w http.ResponseWriter, r *http.Request) {
	godotenv.Load()
	year := r.URL.Query().Get("year")
	url := "https://sandbox.api.kbb.com/idws/vehicle/makes?api_key="+os.Getenv("APIKEY")+"&limit=50&vehicleClass=UsedCar&ApplicationFilter=Consumer&yearId="+year
  	
    // Make call to KBB API and return makes
    response, err := http.Get(url)
    if err != nil {
        log.Printf("The HTTP request failed with error %s\n", err)
    } else {
        data, _ := ioutil.ReadAll(response.Body)
        log.Println(string(data))
        json.NewEncoder(w).Encode(string(data))
    }

	
 	 // return

}

func model() {

}

func trim() {

}

func vehicle() {

}

func value() {

}



