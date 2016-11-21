import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  StyleSheet,
  Picker,
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
    marginBottom: 10,
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
  },
});

class DropDownAndroid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null || this.props.defaultValue,
    };
  }

  render() {
    const props = this.props;
    const {
      headerText,
      style,
      options,
      onValueChange,
      ...others,
    } = props;

    return (
      <View style={[styles.container, style]}>
        {
          headerText ?
            <HeaderText
              value={headerText}
            /> :
            null
        }

        <Picker
          {...others}
          selectedValue={this.state.selectedValue}
          onValueChange={(selectedValue) => {
            this.setState({ selectedValue });
            onValueChange(selectedValue);
          }}
          value={this.state.selectedValue}
        >
          {options.map((option, i) => {
            return <Picker.Item key={i} label={option.label} value={option.value} />;
          })}
        </Picker>

          {/*
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
          */}
        </View>
      );
  }

  //static DROPDOWN_TYPE_PICKER = 'picker';
  //static DROPDOWN_TYPE_DATE_PICKER = 'datePicker';

  // validate() {
  //   const validationResult = this.props.validate(this.state.selectedValue);
  //   this.setState({
  //     validationResult: validationResult,
  //   });
  //   return validationResult.valid;
  // }

  // renderPicker() {
  //   const {
  //     options,
  //     onChange,
  //     mapOptionToLabel,
  //     placeholder,
  //     type,
  //   } = this.props;
  //   switch (type) {
  //     case DropDown.DROPDOWN_TYPE_PICKER: {
  //       return (
  //         <PickerTextInput
  //         style={styles.textInput}
  //         placeholder={placeholder}
  //         selectedPickerData={this.state.selectedValue}
  //         value={this.props.mapOptionToLabel(this.state.selectedValue)}
  //         options={options}
  //         mapOptionToLabel={mapOptionToLabel}
  //         onChangePickerSelectedOption={ (option) => {
  //           this.setState({
  //             validationResult: this.props.validate(option),
  //             selectedValue: option,
  //           });
  //           onChange(option);
  //         }}/>
  //       );
  //     }
  //     case DropDown.DROPDOWN_TYPE_DATE_PICKER: {
  //       const currentDate = new Date();
  //       return (
  //         <DatePickerTextInput
  //         style={styles.textInput}
  //         placeholder={placeholder}
  //         minimumDate={currentDate}
  //         maximumDate={this.props.maximumDate}
  //         date={this.state.selectedValue}
  //         value={ DateUtils.convertDateToDateString(this.state.selectedValue) }
  //         onDateChange={ (date) => {
  //           this.setState({
  //             validationResult: this.props.validate(date),
  //             selectedValue: date,
  //           });
  //           onChange(date);
  //         }}/>
  //       );
  //     }
  //   }
  // }
  // render() {
  //   const props = this.props;
  //   const {
  //     headerText,
  //     style,
  //   } = props;

  //   return (
  //     <View style={[styles.container, style]}>
  //       {
  //         headerText ?
  //           <HeaderText
  //             value={headerText}
  //             style={this.state.validationResult.valid ?
  //               null
  //               :
  //               this.props.validationHeaderStyle}
  //           /> :
  //           null
  //       }
  //       <View style={[styles.textInputContainer, this.state.validationResult.valid ? null : {borderColor: 'red'}]}>
  //         {(this.renderPicker.bind(this))()}
  //         <Image source={require('../../../resources/images/dropdownArrow.png')}/>
  //       </View>
  //       {
  //         this.state.validationResult.valid ?
  //           null
  //           :
  //           <Text
  //             style={this.props.validationMessageStyle}
  //           >
  //             {this.state.validationResult.message}
  //           </Text>
  //       }
  //     </View>
  //   );
  // }
}


DropDownAndroid.defaultProps = {
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
  //type: DropDown.DROPDOWN_TYPE_PICKER,
  options: [
    { label: 'example option 1', value: 'value' },
    { label: 'example option 2', value: 'value' },
  ],
};

DropDownAndroid.propTypes = {
  type: PropTypes.string,
  style: View.propTypes.style,
  containerStyle: PropTypes.object,
  headerText: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  mapOptionToLabel: PropTypes.func,
  options: PropTypes.array,
};

export default DropDownAndroid;
