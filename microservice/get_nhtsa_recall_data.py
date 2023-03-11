from flask import Flask, jsonify, request
import requests
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

@app.route("/api3/", methods=["GET"])

def handler():
    method = request.method
    if method != "GET":
        return jsonify({"error": f"Invalid request method. Expected GET, received {method}"}), 400

    args = {"make": None, "model": None, "year": None}
    for var in args.keys():
        args[var] = request.args.get(var)
        if not args[var]:
            return jsonify({"error": "No {var} provided".format(var = var)}), 400
    
    res = jsonify(scrape_recall_data("https://api.nhtsa.gov/recalls/recallsByVehicle?make={make}&model={model}&modelYear={year}".format(make=args["make"], model=args["model"], year=args["year"])))
    res.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    return res

def scrape_recall_data(link):
    print(link)
    req = requests.get(link)
    if req.status_code != 200:
        return {"error": "Failed to fetch data from NHTSA"}
    soup = BeautifulSoup(req.text, 'html.parser')
    return soup.get_text()

if __name__ == "__main__":
    app.run(port=3839)
