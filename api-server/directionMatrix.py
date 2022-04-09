import googlemaps

API_key = 'AIzaSyDy_tsEgUnqT0Pca81QJqzYVf_39Ox9IH4'#enter Google Maps API key
gmaps = googlemaps.Client(key=API_key)

def countTimeDistance (originLat, originLon, destinationLat, destinationLon,method):
    list = [0,0]
    jsonv = [0]

    origins = (originLat,originLon)

    destination = (destinationLat,destinationLon)

    jsonv = gmaps.distance_matrix(origins, destination, mode=method)
    list[0] = jsonv.get('rows')[0].get('elements')[0].get('distance').get('value')  #distance
    list[1] = jsonv.get('rows')[0].get('elements')[0].get('duration').get('value')  #time
      
    return list