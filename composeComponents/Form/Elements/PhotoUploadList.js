import React, { Component, PropTypes } from 'react';
import PhotoUpload from './PhotoUpload';
import Constants from '../../../constants';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import _ from 'lodash';

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    paddingVertical: 10,
  },
  uploadedPhoto: {
    marginLeft: 20,
  },
  invalidPhotoUpload: {
    borderWidth: 1,
    borderColor: 'red',
  },
  invalidMessage: {
    fontFamily: Constants.style.primaryFontFamily,
    fontSize: 14,
    color: 'red',
    width: 110,
    alignSelf: 'center',
    margin: 12,
  },
});

class PhotoUploadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedImageUrlList: this.props.uploadedImageUrlList,
      validationResult: {
        valid: true,
      },
    };
  }

  onImageUploadSuccess(index, uploadedImageUrl) {
    const uploadedImageUrlList = this.state.uploadedImageUrlList;
    uploadedImageUrlList[index] = uploadedImageUrl;
    const validationResult = this.props.validate(uploadedImageUrlList);
    this.setState({ validationResult, uploadedImageUrlList} );
    this.props.onUploadedImageUrlListUpdated(uploadedImageUrlList);
  }

  onImageDelete(index) {
    const uploadedImageUrlList = this.state.uploadedImageUrlList;
    uploadedImageUrlList.splice(index,1);
    const validationResult = this.props.validate(uploadedImageUrlList);
    this.setState({ validationResult, uploadedImageUrlList} );
    this.props.onUploadedImageUrlListUpdated(uploadedImageUrlList);
  }

  validate() {
    const validationResult = this.props.validate(this.state.uploadedImageUrlList);
    this.setState({ validationResult });
    return validationResult.valid;
  }

  renderUploadedPhotos() {
    const uploadedPhotos = [];
    _.eachRight(this.state.uploadedImageUrlList, (photo, i) => {
      const uploadedPhoto = (
        <PhotoUpload
          key={i}
          style={styles.uploadedPhoto}
          source={{ uri: photo }}
          defaultSource={require('../../../resources/images/requestAddPicture.png')}
          enableUpload={false}
          showDeleteButton
          onImageUploadSuccess={(uploadedImageUrl) => {
            (this.onImageUploadSuccess.bind(this))(i, uploadedImageUrl);
          }}
          onImageDelete={() => {
            (this.onImageDelete.bind(this))(i);
          }}
        />
      );
      uploadedPhotos.push(uploadedPhoto);
    });
    return uploadedPhotos;
  }

  renderInvalidMessage() {
    if (this.state.validationResult.valid) {
      return null;
    } else {
      return  (
         <Text style={styles.invalidMessage}>
          {this.state.validationResult.message}
        </Text>
      )
    }
  }

  render() {
    return (
      <View style={this.props.style}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
        >
          <PhotoUpload
            defaultSource={require('../../../resources/images/requestAddPicture.png')}
            onImageUploadSuccess={(uploadedImageUrl) => {
              const index = this.state.uploadedImageUrlList.length;
              this.onImageUploadSuccess(index, uploadedImageUrl);
            }}
          />
          {this.renderUploadedPhotos()}
          {this.renderInvalidMessage()}
        </ScrollView>
      </View>
    );
  }

}

PhotoUploadList.defaultProps = {
  uploadedImageUrlList: [],
  validate: () => { return { valid: true }; },
  onUploadedImageUrlListUpdated: () => {},
  validationMessageStyle: {
    color: 'red',
    fontFamily: Constants.style.primaryFontFamily,
    marginTop: 7,
  },
}

PhotoUploadList.propTypes = {
  uploadedImageUrlList: PropTypes.array,
  onUploadedImageUrlListUpdated: PropTypes.func,
}

export default PhotoUploadList;
