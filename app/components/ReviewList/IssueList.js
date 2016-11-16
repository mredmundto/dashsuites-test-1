import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ResourceList from '../../../composeComponents/ResourceList';

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

const checkboxIcon = require('../../../app/resources/images/checkbox@3x.png');
const checkboxFullIcon = require('../../../app/resources/images/checkboxfull@3x.png');
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

  // addIssue() {
  //   Actions.IssueCreate();
  // }

  render() {
    const {
      data,
      editable,
      source,
      roomList,
      addIssue,
      resolvedIssueCount,
      ...others,
    } = this.props;

    // const roomIndex = data.split(' ')[0];
    // const room = roomList.get(roomIndex).toJS();
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
              style={{ padding: 5, borderRadius: 5, borderWidth: 1, borderColor: '#078B75' }}
              onPress={addIssue}
            >
              <Text style={{ textAlign: 'center', color: '#078B75', fontSize: 12 }}>{'+ Add Issue'}</Text>
            </TouchableOpacity>

          : null}
        </View>
        <View>
          {data.map((issue, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  padding: 8,
                  marginTop: 15,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: 'grey',
                }}
              >
                <Image
                  style={{
                    marginLeft: 5,
                    height: 20,
                    width: 20,
                  }}
                  resizeMode={'contain'}
                  source={issue.flagged ? checkboxIcon : checkboxFullIcon}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    flexGrow: 1,
                    marginLeft: 25,
                  }}
                >
                  <Text>{issue.title}</Text>
                  <Text>{issue.createdAt}</Text>
                </View>
              </TouchableOpacity>
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
};

const mapStateToProps = (store) => {
  const roomList = store.list.get('data');
  const reviewList = roomList
    .map(room => {
      return room.get('reviewList')
        .map(review => review.set('room', room.get('name')));
    })
    .flatten(1);

  return {
    roomList,
    reviewList,
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(IssueList);
