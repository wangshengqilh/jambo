import { Dimensions, StatusBar, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Chat: {
    flex: 1,
    position: 'relative'
  },
  content: {
    padding: 6,
    backgroundColor: '#46097B',
    borderRadius: 8,
    position: 'absolute',
    top: 50 + 12 + (StatusBar.currentHeight || 0) + 8 + 12,
    left: 16,
    right: 16,
    zIndex: 9999
  },
  contentText: {
    color: '#fff',
    fontSize: 10,
  },
  header: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: (StatusBar.currentHeight || 0) + 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 8,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  header_box: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    maxWidth: width - 124
  },
  avatarView: {
    width: 50,
    height: 50,
    overflow: 'hidden'
  },
  title: {
    marginLeft: 8,
    maxWidth: width - 182
  },
  inputView: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
    elevation: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  funView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  funItem: {
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    // borderColor: theme.colors.primary,
    marginRight: 8
  },
  funItemText: {
    // color: theme.colors.primary,
    fontSize: 12,
    // fontWeight: 'bold',
    lineHeight: 14
  },
  inputSendView: {
    paddingHorizontal: 12,
    marginBottom: 12
  },
  inputSend: {
    flexDirection: 'row',
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#D7D7D7',
    marginTop: 12,
    overflow: 'hidden'
  },
  send: {
    width: 84,
    borderRadius: 19,
    backgroundColor: '#3DCDD7'
  },
  emotion: {
    backgroundColor: '#fff',
    height: 142,
    flexDirection: 'row'
  },
  emotionItem: {
    width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  emotionIconButton: {
    margin: 7
  },
  emotionIcon: {
    width: 28,
    height: 28,
  },
  rightAction: {
    elevation: 10,
    backgroundColor: '#fff',
    shadowColor: '#333'
  },
  // content: {
  //   backgroundColor: '#8DFFE9',
  //   paddingHorizontal: 18,
  //   paddingVertical: 16,
  //   flexDirection: 'column',
  //   // position: 'absolute',
  //   // top: 0,
  //   // left: 0,
  //   // right: 0
  // },
  text1: {
    color: '#4F009E',
    fontSize: 12,
  },
  text2: {
    color: '#4F009E',
    fontSize: 12
  }
})

export default styles;