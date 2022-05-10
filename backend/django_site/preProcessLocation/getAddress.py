import googlemaps   
          
def getAddressAndType(locations_arr):
    gmaps = googlemaps.Client(key='AIzaSyCF-I4LgabjEwFFjMqHSuMNdX1_MTa6P6A')

    locations = locations_arr

    for latLng in locations:
        point = (latLng[0], latLng[1])

        print(gmaps.reverse_geocode(point))

        place = gmaps.reverse_geocode(point)[0]

        address = place['formatted_address']
        itstype = place['types']

        latLng.append(address)
        latLng.append(itstype)

    return locations