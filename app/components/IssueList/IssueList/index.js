import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import IssueItem from './IssueItem.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  columnIcon: {
    flexGrow: 1,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 15,
  },
  columnIconText: {
    fontSize: 10,
    marginLeft: 5,
  },
  icon: {
    height: 18,
    width: 18,
  },
});

const checkboxIcon = require('../../../../app/resources/images/checkbox@3x.png');
const checkboxFullIcon = require('../../../../app/resources/images/checkboxfull@3x.png');
const triangle = require('../../../../app/resources/images/triangle.png');

const renderIssueIcon = (currPoint, fullPoint) => {
  const source = (currPoint === fullPoint) ? checkboxFullIcon : checkboxIcon;
  return (
    <View style={styles.columnIcon}>
      <Image
        style={styles.icon}
        resizeMode={'contain'}
        source={source}
      />
      <Text style={styles.columnIconText}>
        {`${currPoint}/${fullPoint}`}
      </Text>
    </View>
  );
};


class IssueList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };
  }

  render() {
    const {
      data,
      editable,
      addIssue,
      ...others,
    } = this.props;

    const resolvedCount = data.filter(i => !i.flagged).length;
    const totalCount = data.length;

    return (
      <View
        {...others}
        style={{
          alignSelf: 'stretch',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'stretch',
          paddingBottom: 100, // TODO hack to solve scroll bottom being clipped
        }}
      >
        <View
          style={styles.container}
        >
          <Text
            style={{ fontSize: 20, fontWeight: 'bold' }}
          >
            {'Issue'}
          </Text>
          {renderIssueIcon(resolvedCount, totalCount)}
          {editable ?
            <TouchableOpacity
              style={{ padding: 5, borderRadius: 5, backgroundColor: '#009688' }}
              onPress={addIssue}
            >
              <Text style={{ textAlign: 'center', color: 'white', fontSize: 14 }}>{'       + Add Issue       '}</Text>
            </TouchableOpacity>

          : null}
        </View>
        <View>
          {data.map((issue, i) => {
            return (
                <IssueItem
                  key={i}
                  i={i}
                  issue={issue}
                />
            );
          })}
        </View>
      </View>
    );
  }
}

IssueList.defaultProps = {
  resolvedIssueCount: 0,
  data: [],
};

IssueList.propTypes = {
  data: PropTypes.array,
  editable: PropTypes.bool,
  addIssue: PropTypes.func,
};


const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawer: (open) => {
      return dispatch({
        type: 'TOGGLE_DRAWER',
        open,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(IssueList);
