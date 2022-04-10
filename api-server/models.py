
class ParkingSpot():
    def __init__(self, name):
        self.name = name
        
class ParkingHouse():
    def __init__(self, name, freeSpots, maxCapacity, price, parkingSpotLatitude, parkingSpotLongitude, distanceParking, durationParking,distanceTarget, durationTarget):
        self.name = name
        self.freeSpots = freeSpots
        self.maxCapacity = maxCapacity
        self.price = price    
        self.parkingSpotLatitude = parkingSpotLatitude
        self.parkingSpotLongitude = parkingSpotLongitude
        self.distanceParking = distanceParking
        self.durationParking = durationParking
        self.distanceTarget = distanceTarget
        self.durationTarget = durationTarget

class UserRequest():
    def __init__(self, parkingSpotLatitude, parkingSpotLongitude, distanceParking, durationParking,distanceTarget, durationTarget, price, stroller, wheelchair, charger):
        self.parkingSpotLatitude = parkingSpotLatitude
        self.parkingSpotLongitude = parkingSpotLongitude
        self.distanceParking = distanceParking
        self.durationParking = durationParking
        self.distanceTarget = distanceTarget
        self.durationTarget = durationTarget
        self.price = price
        self.stroller = stroller
        self.wheelchair = wheelchair
        self.charger = charger
