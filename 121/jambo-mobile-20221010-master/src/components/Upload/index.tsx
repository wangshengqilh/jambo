import React from 'react'
import styles from './styles';
import RNFS from 'react-native-fs';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { Modal, Pressable, View } from 'react-native'
import { Text, useToast } from 'native-base';
import { uploadFile } from 'src/store/api';
import { useAppDispatch } from 'src/store/hooks';
import { onMask } from 'src/store/mask/maskSlice';

interface IProps {
  visible: boolean | undefined
  mediaType: 'video' | 'photo' | 'any'
  callback: (data: Array<string>) => void
  closeModal: () => void
}

function Upload(props: IProps) {
  const { visible, mediaType, callback, closeModal } = props
  const toast = useToast()
  const dispatch = useAppDispatch();

  const chooseFile = (type: number) => {
    switch (type) {
      case 1:
        // 相机
        ImagePicker.openCamera({ mediaType: mediaType }).then((files) => {
          uploadFun(files)
        }).catch((err) => {
          closeModal()
          toast.show({ description: 'Image upload cancelled' })
        })
        break
      case 2:
        // 文件
        ImagePicker.openPicker({ mediaType: mediaType }).then((files) => {
          uploadFun(files)
        }).catch((err) => {
          closeModal()
          toast.show({ description: 'Image upload cancelled' })
        })
        break
      default: break
    }
  }

  const uploadFun = (files: ImageOrVideo) => {
    dispatch(onMask('Convert base64 format'))
    RNFS.readFile(files.path, 'base64').then((content) => {
      const arr = files.path.split('/')
      const name = arr[arr.length - 1]
      const arr1 = name.split('.')
      const param = {
        base64_code: content,
        file_ext: arr1[arr1.length - 1]
      }
      httpPost(param)
    }).catch(() => {
      dispatch(onMask(''))
      toast.show({ description: 'Base64 conversion failed.' })
    })

    closeModal()
  }

  const httpPost = (param: { base64_code: string, file_ext: string }) => {
    dispatch(onMask('Uploading file...'))
    uploadFile(param).then(res => {
      callback(res.data)
      dispatch(onMask(''))
    }).catch((e) => {
      closeModal()
      dispatch(onMask(''))
    })
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => closeModal()}
    >
      <View style={styles.UploadBox} >
        <View
          onStartShouldSetResponder={() => true}
          onResponderGrant={() => closeModal()}
          style={styles.mask}
        />
        <View style={styles.contentBox}>
          <View style={styles.topbutton}>
            <Text style={styles.titlebox}>
              {mediaType === 'video' ? 'Please select a video source' : 'Please select a picture source'}
            </Text>
            <Pressable
              onPress={() => chooseFile(1)}
              style={styles.button1}
              android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
            >
              <Text style={styles.text}>{mediaType === 'video' ? 'VCR' : 'Camera'}</Text>
            </Pressable>
            <Pressable
              onPress={() => chooseFile(2)}
              style={styles.button2}
              android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
            >
              <Text style={styles.text}>{mediaType === 'video' ? 'Video' : 'Photo album'}</Text>
            </Pressable>
          </View>
          <View style={styles.cancelbox}>
            <Pressable
              style={styles.cancelbutton}
              onPress={() => closeModal()}
              android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
            >
              <Text style={styles.text}>cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default Upload;