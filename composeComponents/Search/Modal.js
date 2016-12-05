import React, { Component, PropTypes } from 'react';
import {
  Modal,
  StyleSheet,
} from 'react-native';
// import SearchBar from './Bar';
import Form from '../Form';
import {
  Input,
} from '../Form/Elements';
import constants from '../../constants';
import applyHeader from '../../app/HOC/applyHeader';

const FormWithHeader = applyHeader(Form);

class SearchModal extends Component {
  render() {
    const {
      onClose,
      style,
      ...others,
    } = this.props;
    // <SearchBar
    //   autoFocus
    //   leftImage={require('../../app/resources/images/left-arrow@3x.png')}
    //   onLeft={onClose}
    // />
    return (
      <Modal
        {...others}
        style={[styles.container, style]}
      >
        <FormWithHeader
          headerProps={{
            onLeft: onClose,
            title: 'Search',
          }}
        >
          <Input
            headerText="Add title"
            placeholder="Enter here"
            multiline={false}
            numberOfLines={1}
            maxLength={120}
            onChangeText={(title) => { this.setState({ title }); }}
            constants={constants}
          />
          <Input
            headerText="Add title"
            placeholder="Enter here"
            multiline={false}
            numberOfLines={1}
            maxLength={120}
            onChangeText={(title) => { this.setState({ title }); }}
            constants={constants}
          />
          <Input
            headerText="Add title"
            placeholder="Enter here"
            multiline={false}
            numberOfLines={1}
            maxLength={120}
            onChangeText={(title) => { this.setState({ title }); }}
            constants={constants}
          />
          <Input
            headerText="Add title"
            placeholder="Enter here"
            multiline={false}
            numberOfLines={1}
            maxLength={120}
            onChangeText={(title) => { this.setState({ title }); }}
            constants={constants}
          />
        </FormWithHeader>
      </Modal>
    );
  }
}


SearchModal.defaultProps = {
  animationType: 'slide',
  onRequestClose: () => {}, // Android required field
  onClose: () => {},
  onLeft: () => {},
  onChangeText: () => {},
  onSubmit: () => {},
  constants: {},
};

SearchModal.propTypes = {
  onSubmit: PropTypes.func,
  constants: PropTypes.object,
  containerStyle: PropTypes.object,
  style: PropTypes.object,
  leftStyle: PropTypes.object,
  onClose: PropTypes.func,
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
    flex: 1,
    flexDirection: 'row',
    height: 50,
    // backgroundColor: '#3E50B4',
  },
  inputContainer: {
    paddingHorizontal: 15,
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
  },
  input: {
    alignSelf: 'stretch',
    flexGrow: 1,
    fontSize: 15,
  },
  leftContainer: {
    width: 60,
    paddingLeft: 10,
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
  rightTitle: {
    color: 'white',
    textAlign: 'right',
  },
  titleContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    textAlign: 'left',
    color: 'white',
  },
});

export default SearchModal;
