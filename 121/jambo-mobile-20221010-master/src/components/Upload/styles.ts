import { Dimensions, StyleSheet } from "react-native";

const height = Dimensions.get('screen').height

const styles = StyleSheet.create({
  UploadBox: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  mask: {
    height: height - 226,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  contentBox: {
    paddingHorizontal: 12,
    paddingBottom: 8
  },
  topbutton: {
    borderRadius: 12,
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
  titlebox: {
    lineHeight: 46,
    color: '#999',
    textAlign: 'center'
  },
  button1: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 46
  },
  button2: {
    height: 46
  },
  cancelbox: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden'
  },
  cancelbutton: {
    borderRadius: 8,
    height: 46
  },
  text: {
    lineHeight: 46,
    textAlign: 'center'
  }
})

export default styles;