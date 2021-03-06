/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight
} from 'react-native';

import { ViroARSceneNavigator } from 'react-viro';

import * as firebase from 'firebase';


/*
 TODO: Insert your API key below
 */
const sharedProps = {
  apiKey: 'API_KEY_HERE'
};

// Sets the default scene you want for AR and VR
const InitialARScene = require('./js/MainARScene');

const UNSET = 'UNSET';
const AR_NAVIGATOR_TYPE = 'AR';
const PROFILE_TYPE = 'PROFILE';
const LOGOUT_TYPE = 'LOGOUT';
const defaultNavigatorType = UNSET;


import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';


export default class ViroSample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      email: this.props.email,
      name:''
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._goToProfileScreen = this._goToProfileScreen.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    );
    this._logOut = this._logOut.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == PROFILE_TYPE) {
      return this._goToProfileScreen();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    } else if (this.state.navigatorType == LOGOUT_TYPE) {
      return this._logOut();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>Spark Up Your Life</Text>
          <Text style={localStyles.titleText}>
            Hi {this.props.email}!
          </Text>
          <Text style={localStyles.titleText}>
            Choose your desired experience:
          </Text>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>The AR Experience</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(PROFILE_TYPE)}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>Your Profile</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(LOGOUT_TYPE)}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>Log Out</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
      />
    );
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _goToProfileScreen() {
    return <ProfileScreen email={this.state.email}/>;
  }

  _logOut() {
    // firebase.auth().signOut();

    return <LoginScreen />;
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      });
    };
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 70,
    width: 200,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  }
});

module.exports = ViroSample;
