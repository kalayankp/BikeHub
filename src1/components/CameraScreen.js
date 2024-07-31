import React, { useState } from 'react';
import { View, Button, StyleSheet, Image, Video } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraScreen = ({ navigation }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedVideo, setCapturedVideo] = useState(null);

  const takePicture = async (camera) => {
    try {
      const data = await camera.takePictureAsync();
      setCapturedImage(data.uri);
    } catch (error) {
      console.error(error);
    }
  };

  const recordVideo = async (camera) => {
    try {
      const data = await camera.recordAsync();
      setCapturedVideo(data.uri);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        captureAudio={true}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {
          if (status !== 'READY') return <View />;
          return (
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <Button onPress={() => takePicture(camera)} title="Capture" />
              <Button onPress={() => recordVideo(camera)} title="Record" />
            </View>
          );
        }}
      </RNCamera>
      {capturedImage && <Image source={{ uri: capturedImage }} style={styles.media} />}
      {capturedVideo && <Video source={{ uri: capturedVideo }} style={styles.media} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    height: 300,
  },
});

export default CameraScreen;
