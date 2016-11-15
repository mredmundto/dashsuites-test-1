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
    height: 30,
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
    textAlign: 'left',
    color: 'black',
  },
});

const renderColumn = (key) => {
  return <Text>{key}</Text>;
};


const Header = (props) => {
  const {
    data,
  } = props;
  return (
    <View
      style={styles.container}
    >
    {_.map(data, (val, key) => {
      return (
        <View style={styles.columnContainer} key={key}>
          {renderColumn(key)}
        </View>
      );
    })}
    </View>
  );
};

Header.defaultProps = {
  data: {},
  onItemPress: () => {},
};

Header.propTypes = {
  data: PropTypes.object,
  onItemPress: PropTypes.func,
};

export default Header;
