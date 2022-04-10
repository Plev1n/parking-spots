from flask import Flask,request
from re import I
import requests
import json
import geojson
import pandas as pd
import geopandas
from pandas.io.json import json_normalize
from directionMatrix import countTimeDistance
from flask_cors import CORS

from models import ParkingSpot, ParkingHouse, UserRequest

app = Flask(__name__)
CORS(app)
@app.route("/pay", methods=['POST'])
def pay():
     return "test"

@app.route("/get_parking_spot", methods=['POST'])
def get_parking_spot():
    from_frontend = json.loads(request.data)
    df = main(from_frontend)
    return obj_json(df)

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

#ZAPOJIT PARKOVACÍ DOMY
def get_parking_house():
    """Vrátí DF s umístěním a kapacitou parkovacích domů"""
    response_API_parkingHouse = requests.get('https://services6.arcgis.com/fUWVlHWZNxUvTUh8/arcgis/rest/services/carparks_live/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json')
    data_parkingHouse = response_API_parkingHouse.text
    parse_json = json.loads(data_parkingHouse)
    parkingHouse = parse_json['features']
    parkingHouse = pd.json_normalize(parkingHouse)

    #parkoviště
    parking_House = parkingHouse[["attributes.name", "attributes.Latitude", "attributes.Longitude", "attributes.CapacityForPublic", "attributes.spacesAllUsersVacant"]]

    return parking_House

def obj_json(df):
    lst_obj = []
    for id, val in df.iterrows():
        index, long, lat, dist_w, time_w, dist_d, time_d = val
        parkingSpot = UserRequest(lat, long, dist_d, time_d, dist_w, time_w, 0, False, False, False)
        lst_obj.append(json.dumps(parkingSpot.__dict__))
    
    return str(lst_obj)

#for future - def pro volání api
def zones(parking_places_raw, df): 
    """vrátí DataFrame se zónami, parking_places_raw musí být GeoDF
    df musí mít id plochy, Latitude, Longtitude"""
    url_Geo = 'https://opendata.arcgis.com/datasets/cfcc180c1c3642109e17cf0b11387a0a_0.geojson'
    response_API_geojsons = requests.get(url_Geo)
    data_geojson = response_API_geojsons.text
    parse_geojson = geojson.loads(data_geojson)
    parkingZones = geopandas.GeoDataFrame.from_features(parse_geojson)
    zony_raw = parkingZones

    zona_a = zony_raw[zony_raw["typzony_t"] == "zóna A"]
    zona_b = zony_raw[zony_raw["typzony_t"] == "zóna B"]

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

def nearest(df, location):
    """vrátí seznam id parkovacích míst do 1 km"""
    near_df = []
    x,y = location
    #print(df)
    for row in df.iterrows():
        id, long, lat = row[1]
        if (x > (lat - 0.01)) and (x < (lat + 0.01)): 
            if (y > (long - 0.005)) and (y > (long + 0.005)):
                near_df.append(id)
    return near_df

def filter_nearest(lst, df): 
    return df[df["index"].isin(lst)]

def count_walking(df, fin_lat, fin_lon):
    #walking
    pd.options.mode.chained_assignment = None 
    df["walking_distance_m"] = 0
    df["walking_time_s"] = 0
    counter = 0
    for row in df.iterrows():
        id, *rest = row[1]
        lst = countTimeDistance(df["Latitude"][id], df["Longitude"][id], fin_lat, fin_lon,method="walking")
        df["walking_distance_m"][id] = lst[0]
        df["walking_time_s"].loc[id] = lst[1]

        counter += 1
        if counter == 5:
            break

    return df

def count_driving(df, start_lat, start_lon): 
    pd.options.mode.chained_assignment = None 
    df["driving_distance_m"] = 0
    df["driving_time_s"] = 0
    counter = 0
    for row in df.iterrows():
        id, *rest = row[1]
        lst = countTimeDistance(start_lat, start_lon, df["Latitude"][id], df["Longitude"][id], method="driving")
        df["driving_distance_m"].loc[id] = lst[0]
        df["driving_time_s"].loc[id] = lst[1]

        counter += 1
        if counter == 5:
            break

    return df

def main(dct): 
    pp_raw, df = get_coordinates()
    #print(df.shape)
    lst_nearest = nearest(df, [dct["finishLat"], dct["finishLon"]])
    #print(len(lst_nearest))
    df_choice = filter_nearest(lst_nearest, df)
    df_choice = count_walking(df_choice, dct["finishLat"], dct["finishLon"])
    df_choice = count_driving(df_choice, dct["startLat"], dct["startLon"])
    
    return df_choice[df_choice["walking_distance_m"] > 0]


#location = (49.1985325, 16.6074342)
#koordinaty, df = get_coordinates()
#print(zones(koordinaty, df))
#abc = UserRequest()
#print(df.columns)
#print(df)

if __name__ == '__main__':
    app.run()