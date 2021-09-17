import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Component, React } from 'react';
 
export class MapContainer extends Component {
  render() {
      const location = {lat: this.props.lon,lng: this.props.lat};
      console.log(location);
    return (
      <Map google={this.props.google} zoom={14}>
 
        <Marker center={location}
                name={'Current location'} />
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyBmKjh5I0pe3pW_M73hsvLA_8ejtkXU6s8")
})(MapContainer)