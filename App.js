/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import Icon from 'react-native-vector-icons/FontAwesome';


let context = null;


export default class App extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      token: "",
      profile: ""
    }

    context = this;
  }

  render() {

    const { token, profile } = this.state;
    return (
      <View style={styles.container}>

        <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={() => this.onPressLoginFaceBook()}>
          <Text style={styles.buttonText}>{`Login with Facebook`}</Text>
        </Icon.Button>

        <View style={[styles.content]}>
          <Text>{`Token:  ${token}`}</Text>
        </View>

        <View style={[styles.content]}>
          <Text>{`Profile: ${profile}`}</Text>
        </View>
      </View>
    );
  }

  onPressLoginFaceBook() {

    try {
      FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web); // defaults to Native

      FBLoginManager.loginWithPermissions(["email", "user_friends", "public_profile"], function (error, data) {
        if (!error) {
          context.setState({ token: data.credentials.token, profile: data.profile })
          console.log("Login data: ", data);

          // Get user profile 
          fetch('https://graph.facebook.com/v2.5/me?fields=email,name,first_name,last_name,friends&access_token=' + data.credentials.token)
            .then((response) => {

              response.json().then(result => {
                console.log("Login result: ", result);
              })
              return response.json()
            })
            .then((json) => {
            })
            .catch(() => {
              reject('ERROR')
            })

        } else {
          console.log("Error: ", error);
        }
      })
    } catch (error) {
      console.log("Error: ", error);
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Arial',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  content: {
    margin: 10
  }

});