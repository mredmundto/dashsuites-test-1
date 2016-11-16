import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import _ from 'lodash';
import SearchBar from '../../../composeComponents/Search/Bar';

const Header = (props) => {
  const {
    title,
    constants,
    leftImage,
    leftTitle,
    rightTitle,
    rightImage,
    onLeft,
    onRight,
  } = props;

  const leftType = (leftTitle !== undefined && leftTitle.length > 0) ? 'text' : 'icon';
  const rightType = (rightTitle !== undefined && rightTitle.length > 0) ? 'text' : 'icon';

  const styles = StyleSheet.create({
    container: {
      top: 0,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: _.get(constants, 'style.primaryColor', '#3E50B4'),
    },
    leftContainer: {
      width: 100,
      paddingLeft: 10,
    },
    leftIcon: {
      alignSelf: 'flex-start',
      height: 40,
      width: 40,
    },
    leftTitle: {
      textAlign: 'left',
      color: 'white',
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
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        top: 0,
        right: 0,
        left: 0,
        minHeight: 50,
        elevation: 5,
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onLeft}
          style={styles.leftContainer}
        >
          {leftType === 'icon' ?
            <Image
              resizeMode={'center'}
              style={styles.leftIcon}
              source={leftImage}
            />
            :
            <Text
              style={styles.leftTitle}
            >
              {leftTitle.toUpperCase()}
            </Text>
          }
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text
            style={styles.title}
          >
            {_.capitalize(title)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onRight}
          style={styles.rightContainer}
        >
          {rightType === 'icon' ?
            <Image
              resizeMode={'center'}
              style={styles.rightIcon}
              source={rightImage}
            />
          :
            <Text
              style={styles.rightTitle}
            >
              {rightTitle.toUpperCase()}
            </Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
};

Header.defaultProps = {
  constants: {},
  navigationState: {},
  leftTitle: '',
  leftImage: require('../../resources/images/path@3x.png'),
  rightTitle: '',
  rightImage: require('../../resources/images/search@3x.png'),
  onLeft: () => {},
  onRight: () => {},
};

Header.propTypes = {
  onLeft: PropTypes.func,
  onRight: PropTypes.func,
  title: PropTypes.string,
  leftTitle: PropTypes.string,
  leftImage: PropTypes.number,
  rightTitle: PropTypes.string,
  rightImage: PropTypes.number,
  constants: PropTypes.object,
  navigationState: PropTypes.object,
};


export default Header;
