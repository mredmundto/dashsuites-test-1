import React, { PropTypes } from 'react';
import {
  Text,
} from 'react-native';
//import constants from '../../../constants';

const HeaderText = (props) => {
  const {
    style,
  } = props;
  return (
    <Text 
      style={
        Object.assign({
          paddingBottom: 8,
          // color: constants.style.primaryColor,
          // fontFamily: constants.style.primaryFontFamily,
          fontWeight: 'bold',
          fontSize: 17,
        }, style)}
    >
      {props.value}
    </Text>
  );
};
HeaderText.propTypes = {
  style: PropTypes.object,
  value: PropTypes.string,
};
export default HeaderText;
