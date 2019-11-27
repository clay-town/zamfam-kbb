package main 

import (
		"log"
		"net/http"
		"os"
		"github.com/joho/godotenv"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", home)
	godotenv.Load()
	log.Println("Starting server on :4000")
	err := http.ListenAndServe(":"+os.Getenv("PORT"), mux)
	log.Fatal(err)
}