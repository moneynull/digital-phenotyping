import googlemaps   
          
def getAddressAndType(locations_arr):
    gmaps = googlemaps.Client(key='Your-API-Key')
    address_list = []
    type_list = []

    locations = locations_arr

    for latLng in locations:
        point = (latLng[0], latLng[1])

        print(gmaps.reverse_geocode(point))

        place = gmaps.reverse_geocode(point)[0]

        address = place['formatted_address']
        itstype = place['types']
        
        address_list.append(address)
        type_list.append(itstype)

    return address_list, type_list