from flask import Flask
from models import ParkingSpot, ParkingHouse, UserRequest

app = Flask(__name__)

@app.route("/pay", methods=['POST'])
def pay():
    return "test"

@app.route("/get_parking_spot", methods=['POST'])
def get_parking_spot():
    return "test"

if __name__ == '__main__':
    app.run()
    