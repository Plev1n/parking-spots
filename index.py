from flask import Flask
from models import ParkingSpot

app = Flask(__name__)

@app.route("/test", methods=['GET'])
def test():
    return "test"

if __name__ == '__main__':
    app.run()
    