import React, { PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import _ from 'lodash';

import constants from './../../constants';

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: constants.style.buttonBorderColor,
    elevation: 2,
  },
  columnContainer: {
    width: 100,
    paddingLeft: 10,
    flexGrow: 1,
  },
  columnIcon: {
    alignSelf: 'flex-start',
    height: 40,
    width: 40,
  },
  columnText: {
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

const renderColumn = (key) => {
  const toProperCase = (originalText) => {
    return originalText.replace(/\w\S*/g, (text) => {
      return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    });
  };
  return <Text style={styles.columnText}>{toProperCase(key)}</Text>;
};


const Header = (props) => {
  const {
    displayedInList,
  } = props;
  return (
    <View
      style={styles.container}
    >
    {_.map(displayedInList, (val, key) => {
      return (
        <View style={styles.columnContainer} key={key}>
          {renderColumn(val)}
        </View>
      );
    })}
    </View>
  );
};

Header.defaultProps = {
  displayedInList: [],
};

Header.propTypes = {
  displayedInList: PropTypes.array,
};

export default Header;
