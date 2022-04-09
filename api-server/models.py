
class ParkingSpot():
    def __init__(self, name):
        self.name = name
        
class ParkingHouse():
    def __init__(self, name, freeSpots, price):
        self.name = name
        self.freeSpots = freeSpots
        self.price = price    
        
class UserRequest():
    def __init__(self, latitude, longitude, distanceParking, durationParking,distanceTarget, durationTarget, price, stroller, wheelchair, charger, parking_period):
        self.latitude = latitude
        self.longitude = longitude
        self.distanceParking = distanceParking
        self.durationParking = durationParking
        self.distanceTarget = distanceTarget
        self.durationTarget = durationTarget
        self.price = price
        self.stroller = stroller
        self.wheelchair = wheelchair
        self.charger = charger
        self.parking_period = parking_period
