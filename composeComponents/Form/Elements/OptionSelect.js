import React, {
  PropTypes,
  Component,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import HeaderText from './HeaderText';
import Constants from '../../../constants';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  contentContainer: {
    borderRadius: 3,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
  optionContainer: {
    borderColor: '#DEDEDE',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  optionIcon: {

  },
  selectedOption: {
    backgroundColor: '#E5F3F5',
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: 'transparent',
    fontFamily: Constants.style.primaryFontFamily,
    fontSize: 17,
    color: Constants.style.textColor,
  },
  invalidOption: {
    borderColor: 'red',
  },
});

class OptionSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      validationResult: {
        valid: true,
      }
    }
  }

  renderHeaderText() {
    return this.props.headerText ? (
      <HeaderText
        value={this.props.headerText}
        style={this.state.validationResult.valid ?
          null
          :
          this.props.validationHeaderStyle}
      />) : null
  }

  onOptionPress(option) {
    var selectedOption;
    if (this.state.selectedOption === option) {
      selectedOption = null;
    } else {
      selectedOption = option;
    }
    const validationResult = this.props.validate(selectedOption);
    this.setState({validationResult, selectedOption})
    this.props.onSelectOption(selectedOption);
  }

  validate() {
    const validationResult = this.props.validate(this.state.selectedOption);
    this.setState({ validationResult });
    return validationResult.valid;
  }

  renderOptionIcon(option) {
    let imageSource = require('../../../resources/images/optionSelectInactive.png');
    if (option === this.state.selectedOption) {
      imageSource = require('../../../resources/images/optionSelectActive.png');
    }
    return (
      <Image style={styles.optionIcon} source={imageSource} />
    );
  }
  render() {
    const {
      options,
      mapOptionToLabel,
    } = this.props;

    return (
      <View style={styles.container}>
      {this.renderHeaderText()}
        <View style={[styles.contentContainer, this.state.validationResult.valid ? null : styles.invalidOption]} >
          {options.map((option, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={[styles.optionContainer,
                        option === this.state.selectedOption ? styles.selectedOption : null,
                        this.state.validationResult.valid ? null : styles.invalidOption]}
                onPress={() => { this.onOptionPress(option); }}
              >
                {this.renderOptionIcon(option)}
                <Text style={styles.optionText} multiline>
                    {mapOptionToLabel(option)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {
          this.state.validationResult.valid ?
            null
            :
            <Text style={[{ marginTop: 7, marginHorizontal: 20 }, this.props.validationMessageStyle]}>
              {this.state.validationResult.message}
            </Text>
        }
      </View>
    );
  }
}

OptionSelect.defaultProps = {
  onSelectOption: () => {},
  options: [],
  mapOptionToLabel: (option) => { return option; },
  validate: () => { return { valid: true }; },
  validationMessageStyle: {
    color: 'red',
    fontFamily: Constants.style.primaryFontFamily,
    marginTop: 7,
  },
  validationHeaderStyle: { color: 'red' },
};

OptionSelect.propTypes = {
  style: View.propTypes.style,
  headerText: PropTypes.string,
  onSelectOption: PropTypes.func,
  options: PropTypes.array,
  mapOptionToLabel: PropTypes.func,
};

export default OptionSelect;
