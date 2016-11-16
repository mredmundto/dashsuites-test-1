import React, { PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
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
    backgroundColor: 'white',
  },
  columnContainer: {
    width: 100,
    paddingLeft: 10,
    flexGrow: 1,
  },
  columnText: {
    textAlign: 'left',
    color: 'black',
  },
  columnIcon: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  columnIconText: {
    fontSize: 10,
  },
  icon: {
    height: 15,
    width: 15,
  },
});

const checkboxIcon = require('../../app/resources/images/checkbox@3x.png');
const checkboxFullIcon = require('../../app/resources/images/checkboxfull@3x.png');

const renderColumn = (val, key) => {
  const renderIssueColumn = (currPoint, fullPoint) => {
    const source = (currPoint === fullPoint) ? checkboxFullIcon : checkboxIcon;
    return (
      <View style={styles.columnIcon}>
        <Image
          style={styles.icon}
          resizeMode={'center'}
          source={source}
        />
        <Text style={styles.columnIconText}>
          {`${currPoint}/${fullPoint}`}
        </Text>
      </View>
    );
  };

  // TODO: Better assignment
  switch (key) {
    case 'issues': {
      const valArray = val.split('/');
      return renderIssueColumn(valArray[0], valArray[1]);
    }
    default:
      return <Text>{val}</Text>;
  }
  // switch (typeof val) {
  //   // focus action is dispatched when a new screen comes into focus
  //   case 'string':
  //     return <Text>{val}</Text>;
  //   default:
  //     return <Text>{'unknown type, cannot render'}</Text>;
  // }
};


const Item = (props) => {
  const {
    data,
    displayedInList,
  } = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => { props.onItemPress(data); }}
    >
      {_.map(displayedInList, (val, key) => {
        return (
          <View
            style={styles.columnContainer}
            key={key}
          >
            {renderColumn(data[val], val)}
          </View>
        );
      })}
    </TouchableOpacity>
  );
};

Item.defaultProps = {
  data: {},
  onItemPress: () => {},
  displayedInList: [],
};

Item.propTypes = {
  data: PropTypes.object,
  onItemPress: PropTypes.func,
  displayedInList: PropTypes.array,
};

export default Item;
