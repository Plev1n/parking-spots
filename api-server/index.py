from flask import Flask,request
from re import I
import requests
import json
import geojson
import pandas as pd
import geopandas
from directionMatrix import countTimeDistance

from models import ParkingSpot, ParkingHouse, UserRequest

# app = Flask(__name__)

# @app.route("/pay", methods=['POST'])
# def pay():
#     return "test"

# @app.route("/get_parking_spot", methods=['POST'])
# def get_parking_spot():
#     abc = request
#     return "test"

# if __name__ == '__main__':
#     app.run()
    



response_API_parkingHouse = requests.get('https://services6.arcgis.com/fUWVlHWZNxUvTUh8/arcgis/rest/services/carparks_live/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json')
data_parkingHouse = response_API_parkingHouse.text
parse_json = json.loads(data_parkingHouse)
parkingHouse = parse_json['features']
parkingHouse = pd.json_normalize(parkingHouse)


urls_Geo = ['https://opendata.arcgis.com/datasets/9a2eda1b0c604886b0dd1eb548fb351b_0.geojson','https://opendata.arcgis.com/datasets/cfcc180c1c3642109e17cf0b11387a0a_0.geojson']

l = 2
response_API_geojsons = ['','']
data_geojson = ['','']
parse_geojson = ['','']
for i in range (0,l):
    response_API_geojsons[i] = requests.get(urls_Geo[i])
    data_geojson[i] = response_API_geojsons[i].text
    parse_geojson[i] = geojson.loads(data_geojson[i])
parkingPaid = geopandas.GeoDataFrame.from_features(parse_geojson[0])
parkingZones = geopandas.GeoDataFrame.from_features(parse_geojson[1])


list = []
list = countTimeDistance(55.93, -3.118, 50.087, 14.421, 'walking')
print(list)
