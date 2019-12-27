package main 

import (
	"log"
	"net/http"
	"os"
	"github.com/joho/godotenv"
)

func main() {
	fs := http.FileServer(http.Dir("./internal/ui/static/"))
	mux := http.NewServeMux()

	mux.Handle("/static/", http.StripPrefix("/static", fs))
	mux.HandleFunc("/", home)
	mux.HandleFunc("/make", returnMakes)
	mux.HandleFunc("/model", returnModels)
	mux.HandleFunc("/trim", returnTrims)
	mux.HandleFunc("/vehicle", returnVehicles)
	mux.HandleFunc("/value", returnValue)

	godotenv.Load()
	log.Println("Starting server on :"+os.Getenv("PORT"))
	err := http.ListenAndServe(":"+os.Getenv("PORT"), mux)
	log.Fatal(err)

}