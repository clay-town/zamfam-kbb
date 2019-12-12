package main

import (
	"log"
	"net/http"
	"html/template"
	"encoding/json"
	"io/ioutil"
	"os"
	"github.com/joho/godotenv"
	"bytes"
)

func returnValue(w http.ResponseWriter, r *http.Request) {
	godotenv.Load()
	vehicleid := r.URL.Query().Get("vehicleid")
	url := "https://sandbox.api.kbb.com/idws/vehicle/values?api_key="+os.Getenv("APIKEY")

 	var jsonStr = []byte(`{"configuration": { "vehicleId": `+vehicleid+`},"zipCode": "92691"}`)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
    req.Header.Set("X-Custom-Header", "myvalue")
    req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
       	panic(err)
    }
	defer resp.Body.Close()

    if err != nil {
        log.Printf("The HTTP request failed with error %s\n", err)
    } else {
		log.Println("response Status:", resp.Status)
    	log.Println("response Headers:", resp.Header)
		body, _ := ioutil.ReadAll(resp.Body)
    	log.Println("response Body:", string(body))

		json.NewEncoder(w).Encode(string(body))
    	// data, _ := ioutil.ReadAll(response.Body)
     //    log.Println(string(data))
     //    json.NewEncoder(w).Encode(string(data))
    }
}

func returnVehicles(w http.ResponseWriter, r *http.Request) {
	godotenv.Load()
	modelid := r.URL.Query().Get("modelid")
	yearid := r.URL.Query().Get("yearid")
	makeid := r.URL.Query().Get("makeid")
	trimid := r.URL.Query().Get("trimid")

	url := "https://sandbox.api.kbb.com/idws/vehicle/vehicles?api_key="+os.Getenv("APIKEY")+"&limit=50&modelid="+modelid+"&yearid="+yearid+"&makeid="+makeid+"&trimid="+trimid;
    response, err := http.Get(url)
    if err != nil {
        log.Printf("The HTTP request failed with error %s\n", err)
    } else {
        data, _ := ioutil.ReadAll(response.Body)
        log.Println(string(data))
        json.NewEncoder(w).Encode(string(data))
    }
}

func returnTrims(w http.ResponseWriter, r *http.Request) {
	godotenv.Load()
	modelid := r.URL.Query().Get("modelid")
	yearid := r.URL.Query().Get("yearid")
	url := "https://sandbox.api.kbb.com/idws/vehicle/trims?api_key="+os.Getenv("APIKEY")+"&limit=50&vehicleClass=usedcar&ApplicationFilter=Consumer&modelid="+modelid+"&yearId="+yearid
    response, err := http.Get(url)
    if err != nil {
        log.Printf("The HTTP request failed with error %s\n", err)
    } else {
        data, _ := ioutil.ReadAll(response.Body)
        log.Println(string(data))
        json.NewEncoder(w).Encode(string(data))
    }
}

func returnModels(w http.ResponseWriter, r *http.Request) {
	godotenv.Load()
	makeid := r.URL.Query().Get("makeid")
	year := r.URL.Query().Get("year")
	url := "https://sandbox.api.kbb.com/idws/vehicle/models?api_key="+os.Getenv("APIKEY")+"&limit=50&vehicleClass=usedcar&ApplicationFilter=Consumer&makeid="+makeid+"&yearId="+year
    response, err := http.Get(url)
    if err != nil {
        log.Printf("The HTTP request failed with error %s\n", err)
    } else {
        data, _ := ioutil.ReadAll(response.Body)
        log.Println(string(data))
        json.NewEncoder(w).Encode(string(data))
    }
}

func returnMakes(w http.ResponseWriter, r *http.Request) {
	godotenv.Load()
	year := r.URL.Query().Get("year")
	url := "https://sandbox.api.kbb.com/idws/vehicle/makes?api_key="+os.Getenv("APIKEY")+"&limit=50&vehicleClass=UsedCar&ApplicationFilter=Consumer&yearId="+year
    response, err := http.Get(url)
    if err != nil {
        log.Printf("The HTTP request failed with error %s\n", err)
    } else {
        data, _ := ioutil.ReadAll(response.Body)
        log.Println(string(data))
        json.NewEncoder(w).Encode(string(data))
    }
}

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