import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Action from './../../ReviewList/action';

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


class IssueItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.onClickItem = this.onClickItem.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  onClickItem() {
    this.setState({
      open: !this.state.open,
    });
  }

  onClickEdit() {
    Actions.IssueCreate({ issue: this.props.issue, issueId: this.props.i });
  }

  onClickDelete() {
    this.props.deleteIssueForNewReview(this.props.i);
  }

  render() {
    const {
      i,
      issue,
    } = this.props;
    return (
      <View>
      {this.state.open ?
        <View>
          <TouchableOpacity
            key={i}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: 8,
              marginTop: 15,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderWidth: 1,
              borderColor: 'grey',
            }}
            onPress={this.onClickItem}
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
              <Text
                style={{
                  fontSize: 16,
                }}
              >
              {`${issue.category} : ${issue.title}`}</Text>
              <Text>{issue.createdAt.substring(0, 15)}</Text>
            </View>
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 5,
                // marginRight: 10,
                flexDirection: 'row',
              }}
              onPress={this.onClickEdit}
            >
              <Text style={{ textAlign: 'center', color: '#3E50B4', fontSize: 16 }}>{'Edit'}</Text>

            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 5,
                // marginRight: 10,
                flexDirection: 'row',
              }}
              onPress={this.onClickDelete}
            >
              <Text style={{ textAlign: 'center', color: '#3E50B4', fontSize: 16 }}>{'Delete'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <View
            style={{
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              borderWidth: 1,
              borderColor: 'grey',
            }}
          >
            <Text
              style={{
                marginTop: 10,
                marginLeft: 10,
                fontSize: 16,
              }}
            >Description</Text>
            <Text
              style={{
                marginLeft: 10,
                marginBottom: 10,
                marginRight: 10,
              }}
            >
              {issue.description}
            </Text>
            <ScrollView
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}
              horizontal={true}
            >
            {issue.imageArr.map(link => {
              return (
                <Image
                  key={link}
                  style={{ width: 100, height: 100, marginLeft: 10, marginBottom: 10 }}
                  source={{ uri: link }}
                />
              );
            })}
            </ScrollView>
          </View>
        </View>
        :
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
          onPress={this.onClickItem}
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
            <Text
              style={{
                fontSize: 16,
              }}
            >{`${issue.category} : ${issue.title}`}</Text>
            <Text>{issue.createdAt.substring(0, 15)}</Text>
          </View>
          <TouchableOpacity
            style={{
              padding: 5,
              borderRadius: 5,
              //marginRight: 10,
              flexDirection: 'row',
            }}
            onPress={this.onClickEdit}
          >
            <Text style={{ textAlign: 'center', color: '#3E50B4', fontSize: 16 }}>{'Edit'}</Text>
            {/*}
            <Image
              style={{
                marginLeft: 10,
                height: 20,
                width: 20,
              }}
              resizeMode={'contain'}
              source={triangle}
            />
          */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 5,
              borderRadius: 5,
              //marginRight: 10,
              flexDirection: 'row',
            }}
            onPress={this.onClickDelete}
          >
            <Text style={{ textAlign: 'center', color: '#3E50B4', fontSize: 16 }}>{'Delete'}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      }
      </View>
    );
  }
}

IssueItem.defaultProps = {
  resolvedIssueCount: 0,
  data: [],
};

IssueItem.propTypes = {
  data: PropTypes.array,
  editable: PropTypes.bool,
  addIssue: PropTypes.func,
  i: PropTypes.number,
  issue: PropTypes.object,
  deleteIssueForNewReview: PropTypes.func,
};


function mapDispatchToProps(dispatch) {
  return {
    deleteIssueForNewReview: (index) => {
      return dispatch(Action.deleteIssueForNewReview(index));
    },
  };
}

export default connect(null, mapDispatchToProps)(IssueItem);
