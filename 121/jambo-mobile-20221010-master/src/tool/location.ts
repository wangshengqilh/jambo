import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { post } from 'src/store/request';

export default function uploadLocation() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        post('/user_location.php', { lon: position.coords.longitude, lat: position.coords.latitude }).then((res) => {
          resolve(true)
        }).catch(() => {
          reject(false)
        })
      },
      (error) => {
        if (error.code === 1) {
          requestLocationPermission()
        }
        reject(error)
      },
      { timeout: 20000, maximumAge: 1000 }
    );
  })
}

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Enable location services",
        message: "Turn on location services to discover other Jambo users near you.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      uploadLocation()
    }
  } catch (err) {

  }
};