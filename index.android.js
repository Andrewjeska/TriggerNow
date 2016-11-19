


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ART
} from 'react-native';

//import MapView from 'react-native-maps';

import Button from 'react-native-button';
const MapView = require('react-native-maps');


export default class Landing extends Component {
  render() {
      /*<View style={styles.container}>
        <Text style={styles.welcome}>
          TriggerNow
        </Text>
        <Text style={styles.instructions}>
          Promoting mindfullness through Data
        </Text>
      </View> */

    return (
        <Navigator
          initialRoute={{ title: 'Main', index: 0 }}
          renderScene={(route, navigator) => {
            return <Main

                onForward={ () => {
                 const nextIndex = route.index + 1;
                 navigator.push({
                   title: 'Scene ' + nextIndex,
                   index: nextIndex,
                 });
               }}

               // Function to call to go back to the previous scene
               onBack={() => {
                 if (route.index > 0) {
                   navigator.pop();
                 }
               }}

            ></Main>
          }}
        />



    );
  }
}

class Main extends Component {
    static get defaultProps() {
        return {
          title: 'Main'
        };
      }

    connectToPebble(){
        //launch some kind of bluetooth thing
    }

    startDataCollection(){
        //start some background process
    }

    render() {

        return(
            <View style={styles.container}>

                <Text style={styles.welcome}> TriggerNow </Text>
                <Text style={{textAlign: 'left'}}> Pebble Status:  </Text>

                <Button
                    style={{fontSize: 20, color: 'green'}}
                    styleDisabled={{color: 'red'}}
                    onPress={() => this.connectToPebble()}>
                    Connect to Pebble
                </Button>


                <Button
                    style={{fontSize: 40, color: 'black'}}
                    styleDisabled={{color: 'red'}}
                    onPress={() => this.startDataCollection()}>
                    Start
                </Button>

                <Button
                    style={{fontSize: 20, color: 'blue'}}
                    styleDisabled={{color: 'red'}}
                    onPress={() => this.props.onForward}>
                    Data Visualization
                </Button>

            </View>
        );
    }
}

class UserMap extends Component {
    constructor(){
        super();
        this.state = {
            region: {
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
        }
    }

    onRegionChange(region) {
      this.setState({ region });
    }

    render() {
      return (
        <MapView
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
      );
    }

}

const stylesMap = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },


});

AppRegistry.registerComponent('Triggernow', () => Landing);
