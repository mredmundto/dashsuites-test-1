import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

class RoomDetail extends Component {
  onClick() {
    Actions.CreateReview();
  }

  render() {
    if (!this.props.activeRoom) {
      return (
        <View>
          <Text style={styles.welcome}> please select a room</Text>
        </View>
			);
    }

    return (
      <View>
        {_.map(this.props.activeRoom, (value, key) => {
          if (key === 'image') {

          return (
           <Image
             key={key}
             style={{ width: 150, height: 150 }}
             
             // react native image does not support dynamic rendering via require (require is for rendering local images)
             // for Demo purpose, we hardcode source to support demo without the internet            
             source={require('../../../../resources/images/1.jpg')}

             // we will use this for live app 
             //source={require(value)}
           />
            );
          }
          return <Text style={styles.content} key={key}> {key} : {value} </Text>;

        })}

        <TouchableOpacity onPress={() => this.onClick()}>
          <Text style={styles.content}> Submit a review </Text>
        </TouchableOpacity>

        <Text style={styles.content}>
          All reviews
        </Text>

        {this.props.reviews.map(review => {
          return (
          <Text style={styles.content} key={review.time}> 
          # {review.room}
          , Rating {review.rating}
          , Date {review.time} </Text>
          )
        })}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 25,
    margin: 5,
  },
  content: {
    fontSize: 20,
    margin: 5,
  },
});

function mapStateToProps(state) {
  return {
    rooms: state.rooms,
    activeRoom: state.activeRoom,
    reviews: state.reviews,
  };
}

export default connect(mapStateToProps)(RoomDetail);
