import React, { Component, PropTypes } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      callback: '',
    };
  }
  render() {
    const {
      containerStyle,
      leftStyle,
      onChangeText,
      onSubmit,
      onLeft,
      leftImage,
      style,
      ...others,
    } = this.props;

    return (
      <View
        style={[styles.container, containerStyle]}
      >
        <View
          style={[styles.inputContainer]}
        >
          {!!leftImage ?
            <TouchableOpacity
              onPress={onLeft}
              style={styles.leftContainer}
            >
              <Image
                resizeMode={'center'}
                style={[styles.leftIcon, leftStyle]}
                source={leftImage}
              />
            </TouchableOpacity>
          : null}
          <Text>{this.state.callback}</Text>
          <TextInput
            {...others}
            placeholder={'search'}
            style={[styles.input, style]}
            underlineColorAndroid={'transparent'}
            onChangeText={(value) => {
              this.setState({ value });
              onChangeText(value);
            }}
            value={this.state.value}
            onSubmitEditing={() => {
              onSubmit();
            }}
          />
        </View>
      </View>
    );
  }
}

SearchBar.defaultProps = {
  onLeft: () => {},
  onChangeText: () => {},
  onSubmit: () => {},
  constants: {},
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
  constants: PropTypes.object,
  containerStyle: PropTypes.object,
  style: PropTypes.object,
  leftStyle: PropTypes.object,
  onLeft: PropTypes.func,
  leftImage: PropTypes.number,
  onChangeText: PropTypes.func,
  disableSubmit: PropTypes.bool,
  submitText: PropTypes.string,
  showSubmit: PropTypes.bool,
  scrollViewMinimumHeight: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    height: 65,
    backgroundColor: '#3E50B4',
  },
  inputContainer: {
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 7,
    marginHorizontal: 10,
  },
  input: {
    flexGrow: 1,
    fontSize: 15,
  },
  leftContainer: {
    width: 60,
  },
  leftIcon: {
    alignSelf: 'flex-start',
    height: 40,
    width: 40,
  },
  rightContainer: {
    width: 100,
    paddingRight: 15,
  },
  rightIcon: {
    alignSelf: 'flex-end',
    height: 40,
    width: 40,
  },
});

export default SearchBar;
