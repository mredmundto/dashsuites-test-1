import React, {
  Component,
  PropTypes,
} from 'react';
import Promise from 'bluebird';
import {
  TouchableOpacity,
  ImagePickerIOS,
  ActionSheetIOS,
  AlertIOS,
  ImageStore,
  CameraRoll,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

import Constants from '../../../constants';
import Theme from '../../Theme';
const {
  Image,
} = Theme;
import ImageManager from '../../../services/ImageManager';

import Permissions from 'react-native-permissions';

const styles = StyleSheet.create({
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: Constants.style.secondaryBackgroundColor,
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'stretch',

  },
  container: {
    width: 110,
    height: 92,
  },
  deleteButton: {
    position:'absolute',
    top:-9,
    right:-9,
    width: 18,
    height: 18,
    backgroundColor: 'transparent',
  },
  deleteButtonImage: {

  }
});

class PhotoUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoadingSpinner: false,
      validationResult: {
        valid: true,
      },
    }
  }

  handleImageUploadFail() {
    AlertIOS.alert(
      'Oops',
      'Unable to process image',
    );
    this.props.onImageUploadFail();
  }

  showActionSheet() {
    let options;
    let callback;
    if (!this.props.showDeleteButton && !!this.props.source) {
      options = {
        options: ['Take Picture', 'Camera Roll', 'Remove Picture', 'Cancel'],
        cancelButtonIndex: 3,
        destructiveButtonIndex: 2,
      };
      callback = (index) => {
        switch (index) {
          case 0: {
            this.takePicture();
            break;
          }
          case 1: {
            this.cameraRoll()
            break;
          }
          case 2: {
            this.props.onImageDelete()
            break;
          }
        }
      }
    } else {
      options = {
        options: ['Take Picture', 'Camera Roll', 'Cancel'],
        cancelButtonIndex: 2,
      };
      callback = (index) => {
        switch (index) {
          case 0: {
            this.takePicture();
            break;
          }
          case 1: {
            this.cameraRoll()
            break;
          }
        }
      }
    }

    ActionSheetIOS.showActionSheetWithOptions(options, callback);
  }

  uploadImage(imageUri) {
    const successCallback = (data) => {
      const uploadedImageUri = data.payload[0];
      this.setState({showLoadingSpinner: false});
      this.props.onImageUploadSuccess(uploadedImageUri);
    };

    const failureCallback = () => {
      this.setState({showLoadingSpinner: false});
      this.handleImageUploadFail();
    };
    this.setState({showLoadingSpinner: true});
    ImageManager.uploadSingleImage(imageUri, successCallback, failureCallback);
  }


  takePicture() {
    ImagePickerIOS.canUseCamera( (allow) => {
      if (allow) {
        const openCameraSuccessCallback = (imageStoreUri) => {
          this.uploadImage(imageStoreUri);
        };
        const openCameraCancelCallback = () => {};
        ImagePickerIOS.openCameraDialog(null, openCameraSuccessCallback, openCameraCancelCallback);
      } else {
        this.handleImageUploadFail();
      }
    });
  }

  cameraRoll() {
    const openSelectSuccessCallback = (assetsLibraryUri) => {
      this.uploadImage(assetsLibraryUri);
    }
    const openSelectCancelCallback = () => {};
    ImagePickerIOS.openSelectDialog({ showImages: true }, openSelectSuccessCallback, openSelectCancelCallback);
  }

  renderDeleteButton() {
    return !!this.props.source && this.props.showDeleteButton ? (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={this.props.onImageDelete} >
        <Image
          style={{backgroundColor:'transparent'}}
          source={require('../../../resources/images/deleteUploadIcon.png')} />
      </TouchableOpacity>
    ) : null;
  }

  renderContent() {
    const {
      style,
      imageStyle,
      enableUpload,
      source,
      defaultSource,
      ...others,
    } = this.props;
    return (
      <TouchableOpacity
        style={styles.contentContainer}
        disabled={!enableUpload}
        onPress={this.showActionSheet.bind(this)}
        >
        <Image
          style={[styles.image, imageStyle]}
          source={source || defaultSource}
          onLoadStart={() => { this.setState({showLoadingSpinner: true})}}
          onLoadEnd={() => { this.setState({showLoadingSpinner: false})}}
          {...others}
          />
        <View style={styles.spinnerContainer}>
          <ActivityIndicator
            animating={this.state.showLoadingSpinner}
            size={"large"}
            color={Constants.style.primaryColor}
          />
          </View>
        </TouchableOpacity>
      );
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
          {this.renderContent()}
          {this.renderDeleteButton()}
        </View>
      );
    }

  };

  PhotoUpload.defaultProps = {
    onImageUploadSuccess: () => {},
    onImageUploadFail: () => {},
    onImageUploadStart: () => {},
    onImageDelete: () => {},
    enableUpload: true,
    validate: () => { return { valid: true }; },
    validationMessageStyle: {
      color: 'red',
      fontFamily: Constants.style.primaryFontFamily,
      marginTop: 7,
    },
    showDeleteButton: false,
  };


  PhotoUpload.propTypes = {
    showDeleteButton: PropTypes.bool,
    enableUpload: PropTypes.bool,
    imageStyle: View.propTypes.style,
    style: View.propTypes.style,
    onImageUploadSuccess: PropTypes.func,
    onImageUploadFail: PropTypes.func,
    onImageUploadStart: PropTypes.func,
    onImageDelete: PropTypes.func,
  };

  export default PhotoUpload;
