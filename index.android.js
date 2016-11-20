


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
  TouchableHighlight,
  ART
} from 'react-native';

//import MapView from 'react-native-maps';

import Button from 'react-native-button';
import Voice from 'react-native-voice';
import { worker } from 'react-native-workers';



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

      const routes = [
       {title: 'Main', index: 0},
       {title: 'Data', index: 1},
     ];

    return (
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={(route, navigator) => {
              return <Scene index={route.index} />
          }}

          navigationBar={
             <Navigator.NavigationBar
               routeMapper={{
                 LeftButton: (route, navigator, index, navState) =>
                 {
                  if (route.index === 0) {
                    return null;
                  } else {
                    return (
                      <TouchableHighlight onPress={() => navigator.pop()}>
                        <Text>Back</Text>
                      </TouchableHighlight>
                    );
                  }
                },
                 RightButton: (route, navigator, index, navState) =>
                {
                  if (route.index === 0) {
                    return (
                      <TouchableHighlight onPress={() => {
                          navigator.push(routes[1]);
                      }}>
                        <Text>Data Visualization</Text>
                      </TouchableHighlight>
                    );

                  } else {
                    return null
                }
                },
                 Title: (route, navigator, index, navState) =>
                   { return (<Text>TriggerNow</Text>); },
               }}
               style={{backgroundColor: 'gray'}}
             />
          }
        />



    );
  }
}

class Scene extends Component {
    render(){
        if(this.props.index === 0){
            return(<Main/>)
        } else {
            return(<Data/>)
        }
    }
}

class Main extends Component {
    constructor(props) {
       super(props);
       this.state = {
         recognized: '',
         pitch: '',
         error: '',
         end: '',
         started: '',
         results: [],
         partialResults: [],
         interval:'',
         emotionalState:''
       };
       Voice.onSpeechStart = this.onSpeechStart.bind(this);
       Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
       Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
       Voice.onSpeechError = this.onSpeechError.bind(this);
       Voice.onSpeechResults = this.onSpeechResults.bind(this);
       //Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
       Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);
       this._startDataCollection = this._startDataCollection.bind(this);
       this._stopDataCollection = this._stopDataCollection.bind(this);
     }

  onSpeechStart(e) {
    this.setState({
      started: true,
    });
  }
  onSpeechRecognized(e) {
    this.setState({
      recognized: true,
    });
  }
  onSpeechEnd(e) {
    this.setState({
      end:true,
    });
  }
  onSpeechError(e) {
    this.setState({
      error: e.error,
    });
  }

  onSpeechResults(e) {
    this.setState({
      results: e.value,
    }, () => {
      fetch('https://trigger-now.herokuapp.com/api/words', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          words: this.state.results[0]

        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        //return responseJson.movies;
        this.setState({emotionalState: responseJson.emotionalState})
      })
      .catch((error) => {
        console.error(error);
      });
   })
  }

  onSpeechVolumeChanged(e) {
    this.setState({
      pitch: e.value,
    });
  }

  _startRecognizing(e) {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
    });
    const error = Voice.start('en');
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }
  _stopRecognizing(e) {
    const error = Voice.stop();
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }


    static get defaultProps() {
        return {
          title: 'Main'
        };
      }

     _startDataCollection(e){
         //const worker = new Worker("./workers/listener.js");
         //worker.postMessage("hello from application");

        this._startRecognizing(e);

        var interval = setInterval((e) => {
                //if(this.state.end === true)
                 this._startRecognizing(e);

         }, 10000)

         this.setState({
           interval: interval
         });
     }

     _stopDataCollection(){
         clearInterval(this.state.interval)

         this.setState({
           interval: ''
         });

        // this._stopRecognizing(null);
     }


    render() {


    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Voice!
        </Text>
        <Text style={styles.instructions}>
          Press the button and start speaking when you hear the beep.
        </Text>
        <Text
          style={styles.stat}>
          {`Started: ${this.state.started}`}
        </Text>
        <Text
          style={styles.stat}>
          {`Recognized: ${this.state.recognized}`}
        </Text>
        <Text
          style={styles.stat}>
          {`Pitch: ${this.state.pitch}`}
        </Text>
        <Text
          style={styles.stat}>
          {`Error: ${this.state.error}`}
        </Text>
        <Text
          style={styles.stat}>
          Results
        </Text>
        {this.state.results.map((result, index) => {
          return (
            <Text
              key={`result-${index}`}
              style={styles.stat}>
              {result}
            </Text>
          )
        })}
        <Text
          style={styles.stat}>
          {`End: ${this.state.end}`}
        </Text>
        <TouchableHighlight onPress={this._startDataCollection.bind(this)}>
         <Text> Start </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._stopDataCollection}>
          <Text
            style={styles.action}>
            Stop Recognizing
          </Text>
        </TouchableHighlight>


      </View>


        );
    }
}

class Data extends Component {
    render(){

        return(
            <View style={styles.container}>

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
