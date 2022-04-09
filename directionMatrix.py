import googlemaps
import pandas as pd
import geopandas

API_key = 'AIzaSyDy_tsEgUnqT0Pca81QJqzYVf_39Ox9IH4'#enter Google Maps API key
gmaps = googlemaps.Client(key=API_key)

def countTimeDistance (originLat, originLon, destinationLat, destinationLon ,method):
    list = [0]

    origins = (originLat,originLon)

    destination = (destinationLat,destinationLon)

    list = gmaps.distance_matrix(origins, destination, mode=method)
      
    return list