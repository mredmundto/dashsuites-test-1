import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import Constants from '../../constants';
import ConfirmButton from '../Theme/ConfirmButton';
import KeyboardAwareScrollView from '../Theme/KeyboardAwareScrollView';
import KeyboardSpacer from '../Theme/KeyboardSpacer';
import NavigationBar from '../Theme/NavigationBar';

const Form = (props) => {
  const {
    style,
    disableSubmit,
    children,
    showSubmit,
    onSubmit,
    submitText,
    scrollViewMinimumHeight,
    ...others,
  } = props;
  const extraHeight = showSubmit ? ConfirmButton.DEFAULT_HEIGHT : 0;
  const minHeight = scrollViewMinimumHeight - extraHeight;
  return (
    <View style={{ flex: 1, backgroundColor: Constants.style.secondaryBackgroundColor }}>
      <KeyboardAwareScrollView
        style={{ flex:1 }}
        contentContainerStyle={{ minHeight }}
        extraHeight={extraHeight}
        {...others}
      >
        <View style={[{flex:1, backgroundColor: Constants.style.primaryBackgroundColor}, style]} >
          {children}
        </View>
      </KeyboardAwareScrollView>
      {showSubmit ?
        <ConfirmButton
          disable={disableSubmit}
          title={submitText}
          onPress={onSubmit}
        />
        :
         null
      }
      <KeyboardSpacer />
    </View>
  );
};
Form.defaultProps = {
  submitText: 'Submit',
  disableSubmit: false,
  showSubmit: true,
  onSubmit: () => {},
  scrollViewMinimumHeight: Dimensions.get('window').height - NavigationBar.DEFAULT_STATUS_BAR_HEIGHT,
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  disableSubmit: PropTypes.bool,
  submitText: PropTypes.string,
  onSubmit: PropTypes.func,
  showSubmit: PropTypes.bool,
  scrollViewMinimumHeight: PropTypes.number,
};

export default Form;
