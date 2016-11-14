import React, { Component } from 'react';
import {
  BackAndroid,
} from 'react-native';


const preventPressBack = ComposedComponent => {
  return class ExtendedComponent extends Component {
    componentDidMount() {
      BackAndroid.addEventListener('hardwareBackPress', this.original.backButtonHandler);
    }
    componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.original.backButtonHandler);
    }
    render() {
      return (
        <ComposedComponent
          {...this.props}
          ref={original => { this.original = original; }}
        />
      );
    }
  };
};

export default preventPressBack;
