from flask import Flask,request
from re import I
import requests
import json
import geojson
import pandas as pd
import geopandas
from pandas.io.json import json_normalize
from directionMatrix import countTimeDistance


from models import ParkingSpot, ParkingHouse, UserRequest

app = Flask(__name__)

@app.route("/pay", methods=['POST'])
def pay():
     return "test"

@app.route("/get_parking_spot", methods=['POST'])
def get_parking_spot():
    abc = request
    return "test"

if __name__ == '__main__':
    app.run() 

def get_coordinates(): 
    #Peťa - načítání API

    urls_Geo = "https://opendata.arcgis.com/datasets/9a2eda1b0c604886b0dd1eb548fb351b_0.geojson"


    response_API_geojsons = requests.get(urls_Geo)
    data_geojson = response_API_geojsons.text
    parse_geojson = geojson.loads(data_geojson)
    parkingPaid = geopandas.GeoDataFrame.from_features(parse_geojson)

    #Petra - načítání 
    parking_places_raw = parkingPaid

    #vyházení koordinátů z polygonů, výstup json_coordinates[id,x,y]
    #verze pro API
    parking_json = parking_places_raw.copy()
    #parking_json1 = parking_json["geometry"]
    json_coordinates = pd.DataFrame({"id": [], "Longitude": [], "Latitude": []}).set_index("id")
    for num, place in parking_json.iterrows():
        coordinates = place[0][0].exterior.coords[:-1][1]
        json_coordinates.loc[num] = [coordinates[0], coordinates[1]]

    coordinates = json_coordinates#.reset_index()

    #df_merge = coordinates.merge(zones, on="id").set_index("id")

    #parkoviště
    parking_house = get_parking_house()[["attributes.Latitude", "attributes.Longitude"]]
    parking_house = parking_house.rename(columns={"attributes.Latitude": "Latitude", "attributes.Longitude": "Longitude"})
    df_merge = pd.concat([coordinates, parking_house], ignore_index=True)

    return parking_places_raw, df_merge.reset_index()

def get_parking_house():
    response_API_parkingHouse = requests.get('https://services6.arcgis.com/fUWVlHWZNxUvTUh8/arcgis/rest/services/carparks_live/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json')
    data_parkingHouse = response_API_parkingHouse.text
    parse_json = json.loads(data_parkingHouse)
    parkingHouse = parse_json['features']
    parkingHouse = pd.json_normalize(parkingHouse)

    #parkoviště
    parking_House = parkingHouse[["attributes.name", "attributes.Latitude", "attributes.Longitude", "attributes.CapacityForPublic", "attributes.spacesAllUsersVacant"]]

    return parking_House

def objects(df): 
    pass

#for future - def pro volání api
def zones(parking_places_raw, df): 
    """df musí mít id plochy, Latitude, Longtitude"""
    url_Geo = 'https://opendata.arcgis.com/datasets/cfcc180c1c3642109e17cf0b11387a0a_0.geojson'
    response_API_geojsons = requests.get(url_Geo)
    data_geojson = response_API_geojsons.text
    parse_geojson = geojson.loads(data_geojson)
    parkingZones = geopandas.GeoDataFrame.from_features(parse_geojson)
    zony_raw = parkingZones

    zona_a = zony_raw[zony_raw["typzony_t"] == "zóna A"]
    zona_b = zony_raw[zony_raw["typzony_t"] == "zóna B"]
    zona_c = zony_raw[zony_raw["typzony_t"] == "zóna C"]

    #přepočet na zóny - výstup parking_zones[id,zona]
    #pro verzi s API
    parking_zones = pd.DataFrame({"id": [], "zona": []}).set_index("id")
    for num, place in parking_places_raw.iterrows(): 
        for zona in zona_b.iterrows(): 
            if zona[1][0].contains(place[0]): 
                parking_zones.loc[num] = "B"
                break
        else: 
            for zona in zona_a.iterrows():
                if zona[1][0].contains(place[0]): 
                    parking_zones.loc[num] = "A"
                    break
            else: 
                parking_zones.loc[num] = "C"

    zones = parking_zones.reset_index()
    df = df.rename(columns={"index": "id"})


    merge_zones = df.merge(zones, on="id")

    return merge_zones

koordinaty, df = get_coordinates()
print(zones(koordinaty, df))
#print(df.columns)
#print(df)
=======
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
