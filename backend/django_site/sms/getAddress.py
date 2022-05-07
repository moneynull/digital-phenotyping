import googlemaps   
        
class GetAddress():     

    def getAddressAndType(lat_list, lon_list):
        gmaps = googlemaps.Client(key='Your-API-Key')
        address_list = []
        type_list = []
        for i in range(len(lat_list)):
            point = (lat_list[i], lon_list[i] )
            place = gmaps.reverse_geocode(point)[0]

            address = place['formatted_address']
            itstype = place['types'][0]
            
            address_list.append(address)
            type_list.append(itstype)
        
        return address_list, type_list