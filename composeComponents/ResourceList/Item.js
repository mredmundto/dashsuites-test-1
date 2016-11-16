import React, { Component, PropTypes } from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import _ from 'lodash';

const renderColumn = (val, key) => {
  switch (typeof val) {
    // focus action is dispatched when a new screen comes into focus
    case 'string':
      return <Text style={styles.columnText}>{val}</Text>;
    default:
      return <Text style={styles.columnText}>{'unknown type, cannot render'}</Text>;
  }
};

const Item = (props) => {
  const {
    data,
  } = props;
  return (
    <View
      style={styles.container}
    >
      {_.map(data, (val, key) => (
        <View
          styles={styles.columnContainer}
        >
          {renderColumn(val, key)}
        </View>
      ))}
    </View>
  );
};

Item.defaultProps = {
  data: {},
};

Item.propTypes = {
  data: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    color: 'white',
  },
});

export default Item;
