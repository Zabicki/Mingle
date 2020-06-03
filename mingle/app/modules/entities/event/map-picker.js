import React from 'react'
import {StyleSheet, View, TouchableOpacity, Text, Linking} from 'react-native'
import MapView from 'react-native-maps-osmdroid'
import {Marker, UrlTile} from 'react-native-maps-osmdroid'
import Dialog from 'react-native-dialog';
import {Navigation} from 'react-native-navigation'
import Geocoder from 'react-native-geocoder'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions'
import Geolocation from '@react-native-community/geolocation';

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  button: {
    bottom: 0,
  }
});

class MapPicker extends React.PureComponent {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)

    this.state = {
      showDialog: false,
      geoArray: null,
      input: '',
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      urlTemplate: "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
    }
    this.handlePermissions()
  }

  getLocation = () =>{
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        });
      },
      (error) => {alert(error.message)},
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 3600000 }
    );
  }

  handlePermissions = () =>{
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
      (result) => {
        if (result == RESULTS.GRANTED){
          this.getLocation();
        } else if(result == RESULTS.DENIED){
          request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
           (res) =>{
            if (res == RESULTS.GRANTED){
               this.getLocation()
            }
           });
        }
      }
    );
  }

  navigationButtonPressed({buttonId}){
    if(buttonId == "search"){
      this.setState({showDialog: true, input: ''})
    }
  }

  handleCancel = () => {
     this.setState({showDialog: false, input: ''})
  }

  handleSearch = () => {
    this.setState({showDialog: false}, ()=> this.getCoordinates())
  }

  handleConfirm = () => {
    const loc = {lat: this.state.region.latitude, lng: this.state.region.longitude}
    Geocoder.geocodePosition(loc).then(result => {
      this.props.data.onSave(result[0])
    }).catch(err=> alert(err))

    Navigation.pop(this.props.componentId)
  }



  getCoordinates = () => {
    Geocoder.geocodeAddress(this.state.input).then( result => {
      const res = result[0]
      this.setState({
        geoArray: res,
        region: {
          latitude: res.position.lat,
          longitude: res.position.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
         },
      })
    }).catch(err=> alert(err))
  }

  onRegionChange = (region) => {
    this.setState({region});
  }

  render() {
    return (
    <View style = {styles.map}>
      <Dialog.Container visible={this.state.showDialog}>
         <Dialog.Title>Find by address</Dialog.Title>
         <Dialog.Input  placeholder="Enter address..." onChangeText={(city) => this.setState({input: city})}></Dialog.Input>
         <Dialog.Button label="Cancel" onPress={this.handleCancel} />
         <Dialog.Button label="Ok" onPress={this.handleSearch} />
      </Dialog.Container>
      <MapView
        style = {styles.map}
        region = {this.state.region}
        onRegionChange={this.onRegionChange}
      >
        <UrlTile
          urlTemplate={this.state.urlTemplate}
          maximumZ={19}
        />
        <Marker draggable
          ref = { marker => {this.marker = marker}}
          coordinate= {{
            "latitude": this.state.region.latitude,
            "longitude": this.state.region.longitude,
          }}
          title = {"Selected location"}
        />
      </MapView>
      <TouchableOpacity style = {styles.overlay} onPress={()=> Linking.openURL('https://www.openstreetmap.org/copyright')}>
        <Text>© OpenStreetMap contributors</Text>
      </TouchableOpacity>
      <RoundedButton style= {styles.button} text="confirm" onPress={this.handleConfirm} />
     </View>
    )
  }
}

export default MapPicker
