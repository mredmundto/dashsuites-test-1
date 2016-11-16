import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Upload photo',
  cancelButtonTitle: null,
  quality: 0.3,
  noData: true, // this is to enhance the speed of upload
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 15,
    color: '#333333',
    marginBottom: 5,
  },
});

class PhotoUploadAndroid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageArr: [],
    };
  }

  renderPicture() {
    return (
      this.state.imageArr.map(link => {
        return (
          <Image
            key={link}
            style={{ width: 100, height: 100, margin: 10 }}
            source={{ uri: link }}
          />
        );
      })
    );
  }

  renderMenu() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.props.successCallback(response.uri);
        this.setState({ image: response.uri });
        this.setState({ imageArr: [...this.state.imageArr, response.uri] });
      }
    });
  }

  render() {
    return (
      <View>
        <Text>{this.props.headerText}</Text>
        <ScrollView style={styles.container} horizontal={true}>
          <TouchableOpacity onPress={() => this.renderMenu()}>
            <Image
              style={{ width: 100, height: 100, margin: 10 }}
              source={require('./../../../app/resources/images/upload-photo.png')}
            />
          </TouchableOpacity>
        {this.renderPicture()}
        </ScrollView>
      </View>
    );
  }
}

export default PhotoUploadAndroid;
