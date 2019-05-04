import React, { Component } from 'react';
import { View,  } from 'react-native';
import { Text, Button } from 'native-base';
import GenerateForm from 'react-native-form-builder';

const fields = [
    {
      type: 'text',
      name: 'user_name',
      required: true,
      icon: 'ios-person',
      label: 'Username',
    },
    {
      type: 'password',
      name: 'password',
      icon: 'ios-lock',
      required: true,
      label: 'Password',
    },
    {
      type: 'picker',
      name: 'country',
      mode: 'dialog',
      label: 'Select Country',
      defaultValue: 'INDIA',
      options: ['US', 'INDIA', 'UK', 'CHINA', 'FRANCE'],
    },
  ];

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  login() {
    const formValues = this.formGenerator.getValues();
    
  }

  render() {
    return (
      <View>
        <View>
          <GenerateForm
            ref={(c) => {
              this.formGenerator = c;
            }}
            fields={fields}
          />
        </View>
        <View style={styles.submitButton}>
          <Button block onPress={() => this.login()}>
            <Text>Login</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
    wrapper: {
      flex: 1,
      marginTop: 150,
    },
    submitButton: {
      paddingHorizontal: 10,
      paddingTop: 20,
    },
  };