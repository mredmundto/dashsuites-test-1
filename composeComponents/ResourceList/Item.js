import React, { PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';

import constants from './../../constants';

const styles = StyleSheet.create({
  container: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: constants.style.buttonBorderColor,
    borderBottomWidth: 1,
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

const renderColumn = (val, key) => {
  switch (typeof val) {
    // focus action is dispatched when a new screen comes into focus
    case 'string':
      return <Text>{val}</Text>;
    default:
      return <Text>{'unknown type, cannot render'}</Text>;
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
      {_.map(data, (val, key) => {
        return (
          <TouchableOpacity
            style={styles.columnContainer}
            key={key}
            onPress={() => { props.onItemPress(data); }}
          >
            {renderColumn(val, key)}
          </TouchableOpacity>
      );
      })}
    </View>
  );
};

Item.defaultProps = {
  data: {},
  onItemPress: () => {},
};

Item.propTypes = {
  data: PropTypes.object,
  onItemPress: PropTypes.func,
};

export default Item;
