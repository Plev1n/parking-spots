from re import A
from pygame import K_a


class ParkingSpot():
    def __init__(self, name):
        self.name = name
        
class ParkingHouse():
    def __init__(self, name, freeSpots, price):
        self.name = name
        self.freeSpots = freeSpots
        self.price = price    
        
class UserRequest():
    def __init__(self, latitude, longitude, parking_time, stroller, wheelchair, charger, parking_period):
        self.latitude = latitude
        self.longitude = longitude
        self.parking_time = parking_time
        self.stroller = stroller
        self.wheelchair = wheelchair
        self.charger = charger
        self.parking_period = parking_period
