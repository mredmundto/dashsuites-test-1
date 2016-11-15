import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import HeaderText from './HeaderText';
//import PickerTextInput from '../../Theme/PickerTextInput';
//import DatePickerTextInput from '../../Theme/DatePickerTextInput';
//import DateUtils from '../../../utils/DateUtils';

//import Theme from '../../Theme';

//import constants from '../../../constants';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderColor: '#DEDEDE',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Bariol',
    color: '#7B7B7B',
  }
});

class DropDown extends Component {
  static DROPDOWN_TYPE_PICKER = 'picker';
  static DROPDOWN_TYPE_DATE_PICKER = 'datePicker';
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null || this.props.defaultValue,
      validationResult: {
        valid: true,
      }
    };
  }

  validate() {
    const validationResult = this.props.validate(this.state.selectedValue);
    this.setState({
      validationResult: validationResult,
    });
    return validationResult.valid;
  }

  renderPicker() {
    const {
      options,
      onChange,
      mapOptionToLabel,
      placeholder,
      type,
    } = this.props;
    switch (type) {
      case DropDown.DROPDOWN_TYPE_PICKER: {
        return (
          <PickerTextInput
          style={styles.textInput}
          placeholder={placeholder}
          selectedPickerData={this.state.selectedValue}
          value={this.props.mapOptionToLabel(this.state.selectedValue)}
          options={options}
          mapOptionToLabel={mapOptionToLabel}
          onChangePickerSelectedOption={ (option) => {
            this.setState({
              validationResult: this.props.validate(option),
              selectedValue: option,
            });
            onChange(option);
          }}/>
        );
      }
      case DropDown.DROPDOWN_TYPE_DATE_PICKER: {
        const currentDate = new Date();
        return (
          <DatePickerTextInput
          style={styles.textInput}
          placeholder={placeholder}
          minimumDate={currentDate}
          maximumDate={this.props.maximumDate}
          date={this.state.selectedValue}
          value={ DateUtils.convertDateToDateString(this.state.selectedValue) }
          onDateChange={ (date) => {
            this.setState({
              validationResult: this.props.validate(date),
              selectedValue: date,
            });
            onChange(date);
          }}/>
        );
      }
    }
  }
  render() {
    const props = this.props;
    const {
      headerText,
      style,
    } = props;

    return (
      <View style={[styles.container, style]}>
        {
          headerText ?
            <HeaderText
              value={headerText}
              style={this.state.validationResult.valid ?
                null
                :
                this.props.validationHeaderStyle}
            /> :
            null
        }
        <View style={[styles.textInputContainer, this.state.validationResult.valid ? null : {borderColor: 'red'}]}>
          {(this.renderPicker.bind(this))()}
          <Image source={require('../../../resources/images/dropdownArrow.png')}/>
        </View>
        {
          this.state.validationResult.valid ?
            null
            :
            <Text
              style={this.props.validationMessageStyle}
            >
              {this.state.validationResult.message}
            </Text>
        }
      </View>
    );
  }
}


DropDown.defaultProps = {
  headerText: '',
  placeholder: '',
  mapOptionToLabel: (option => option),
  onChange: () => {},
  validate: () => { return { valid: true }; },
  validationMessageStyle: {
    color: 'red',
    fontFamily: 'Bariol',
    marginTop: 7,
  },
  validationHeaderStyle: { color: 'red' },
  type: DropDown.DROPDOWN_TYPE_PICKER,
};

DropDown.propTypes = {
  type: PropTypes.string,
  style: View.propTypes.style,
  containerStyle: PropTypes.object,
  headerText: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  mapOptionToLabel: PropTypes.func,
};

export default DropDown;
