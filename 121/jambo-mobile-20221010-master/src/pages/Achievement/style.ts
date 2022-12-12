import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Achievement: {
    flex: 1,
    position: 'relative'
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 32,
  },
  headerView: {
    paddingHorizontal: 18,
    paddingVertical: 62,
    position: 'relative'
  },
  title1: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'left'
  },
  title2: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'left'
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img1: {
    width: 30,
    height: 30
  },
  text1: {
    color: '#fff',
    fontSize: 14
  },
  meiri: {
    position: 'absolute',
    width: width - 12,
    height: 75,
    borderBottomLeftRadius: 35,
    borderTopLeftRadius: 10,
    right: 0,
    bottom: -37,
    elevation: 10,
    overflow: 'hidden',
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 9
  },
  title3: {
    color: '#4B4B4B',
    fontSize: 20,
    textAlign: 'left'
  },
  text2: {
    fontSize: 12,
    color: '#4B4B4B'
  },
  text3: {
    fontSize: 14,
    color: '#4B4B4B',
    textAlign: 'left'
  },
  text4: {
    color: '#4B4B4B',
    fontSize: 12,
    fontFamily: 'Audiowide-Regular',
    paddingHorizontal: 8
  },
  checkin: {
    height: 30,
  },
  text5: {
    fontSize: 8,
    color: '#999'
  },
  img2: {
    width: width / 2,
    height: width / 2
  },
  box2: {
    width,
    height: height - 62,
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 10,
    backgroundColor: '#fff',
    zIndex: 10,
    overflow: 'hidden'
  },
  handle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12
  },
  line: {
    height: 1,
    backgroundColor: '#AAAAAA',
    width: 20,
    marginBottom: 4
  },
  title4: {
    fontSize: 15,
    color: '#4B4B4B',
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 9,
    paddingLeft: 18
  },
  button: {
    width: (width - (18 * 4)) / 3,
    marginRight: 18
  },
  searchtitle: {
    fontSize: 12
  },
  itemchild: {
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative'
  },
  text6: {
    fontSize: 8,
    textAlign: 'center',
    lineHeight: 12,
    marginTop: 2,
    height: 24
  },
  img3: {
    width: width / 4 - 22.5,
    height: width / 4 - 22.5,
    borderRadius: 8,
  },
  mask: {
    position: 'absolute',
    width: width / 4 - 22.5,
    height: width / 4 - 22.5 - 1,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#D9D9D9',
    zIndex: -2,
    borderRadius: 8,
  },
  mask1: {
    position: 'absolute',
    width: width / 4 - 22.5,
    left: 0,
    right: 0,
    bottom: 26 + (width / 4 - 22.5) / 6 - 1,
    backgroundColor: '#461A86',
    zIndex: -1
  },
  taskdesc: {
    width: width - 36,
    marginLeft: 18,
    height: (width - 36) * 0.457,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    position: 'relative',
  },
  mask2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 1,
    bottom: 1,
    backgroundColor: '#D9D9D9',
    zIndex: -2,
    borderRadius: 8,
  },
  mask3: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: (width - 36) * 0.457 / 6 - 2,
    zIndex: -1
  },
  rightview: {
    width: '55%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title5: {
    fontSize: 12,
    color: '#4B4B4B'
  },
  title6: {
    fontSize: 24,
    color: '#4B4B4B'
  },
  title7: {
    fontSize: 14,
    color: '#461A86'
  },
  // congratulations: {
  //   zIndex: 9999,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // img4: {
  //   width: 68,
  //   height: 68
  // },
  // text7: {
  //   fontSize: 48,
  //   color: '#fff'
  // },
  // box11: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#450979',
  //   paddingHorizontal: 72,
  //   borderRadius: 36
  // },
})

export default styles;