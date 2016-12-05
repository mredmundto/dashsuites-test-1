// TODO Multiline
// TODO validate

import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  TextInput,
  // Text,
} from 'react-native';

import HeaderText from './HeaderText';

class Input extends Component {
  constructor(props) {
    super(props);
    // const formattedValue = props.formatValue('', props.value || props.defaultValue || '');
    this.state = {
      // value: formattedValue,
      // validationResult: {
      //   valid: true,
      // },
      value: '',
    };
  }

  render() {
    const {
      style,
      headerText,
      onChangeText,
      maxLength,
      hideMaxLength,
      value,
      ...others,
    } = this.props;

    // This is for the header
    const availableCharLen = maxLength - this.state.value.length;
    let headerTextLabel = headerText;
    if (headerTextLabel && !hideMaxLength) {
      headerTextLabel = maxLength ? `${headerText} (${availableCharLen})` : headerText;
    }
    return (
      <View style={[{ marginTop: 10, marginBottom: 10, backgroundColor: 'transparent' }, style]}>
        {headerTextLabel ?
          <HeaderText
            value={headerTextLabel}
            // style={this.state.validationResult.valid ?
            //  null
            //  :
            //  this.props.validationHeaderStyle}
          />
        : null}
        <TextInput
          {...others}
          maxLength={maxLength}
          style={[{
            // height: 40,
            color: this.props.constants ? this.props.constants.style.textColor : this.props.textColor,
            fontSize: 15,
            //fontFamily: this.props.constants.style.primaryFontFamily,
            //borderColor: this.state.validationResult.valid ? '#DEDEDE' : 'red',
            //borderWidth: 1,
            //borderRadius: 3,
            //paddingHorizontal: 10,
            //paddingVertical: 5,
          }, this.props.textInputStyle]}
          onChangeText={(value) => {
            this.setState({ value });
            // const formattedValue = this.props.formatValue(this.state.value, value);
            onChangeText(value);
            // this.setState({
            //   validationResult: this.props.validate(value),
            //   value: formattedValue,
            // });
          }}
          value={this.props.value}
        />
      {/*
        this.state.validationResult.valid ?
          null
          :
          <Text
            style={this.props.validationMessageStyle}
          >
            {this.state.validationResult.message}
          </Text>
      */}
      </View>
    );
  }
}

Input.defaultProps = {
  onChangeText: () => {},
  validate: () => { return { valid: true }; },
  validationMessageStyle: {
    color: 'red',
    fontFamily: 'Bariol',
    marginTop: 7,
  },
  headerText: '',
  validationHeaderStyle: { color: 'red' },
  formatValue: (before, value) => value,
  hideMaxLength: false,
  textColor: 'black',
};

Input.propTypes = {
  hideMaxLength: PropTypes.bool,
  maxLength: PropTypes.number,
  style: View.propTypes.style,
  textInputStyle:  View.propTypes.style,
  validationMessageStyle: PropTypes.object,
  validationHeaderStyle: PropTypes.object,
  headerText: PropTypes.string,
  validate: PropTypes.func,
  formatValue: PropTypes.func, // modifies the original value
  formatText: PropTypes.func,
  validationMessage: PropTypes.func,
  onChangeText: PropTypes.func,
};

export default Input;
