import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  UserInfo: {
    flex: 1,
  },
  box1: {
    paddingVertical: 28
  },
  box1_1: {
    width: 173,
    height: 173,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    position: 'relative'
  },
  button2: {
    position: 'absolute',
    width: 145,
    bottom: -18
  },
  button2Text: {
    fontSize: 10,
    color: '#fff'
  },
  title1: {
    color: '#4B4B4B'
  },
  text1: {
    color: '#4B4B4B',
    fontSize: 12
  },
  box: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
    paddingVertical: 38,
  },
  box2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18
  },
  button1: {
    width: (width - 36 - 6) / 2
  },
  box3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 9
  },
  box3_item: {
    margin: 9,
    width: (width - 5 * 18) / 4,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  text4: {
    position: 'absolute',
    color: '#461A86',
    fontSize: 8,
    top:  (width - 5 * 18) / 4 - 20,
    right: 6,
    lineHeight: 12,
  },
  text2: {
    fontSize: 8,
    color: '#4B4B4B',
    textAlign: 'center',
    lineHeight: 12,
    width: (width - 5 * 18) / 4
  },
  img1: {
    width: (width - 5 * 18) / 4,
    height: (width - 5 * 18) / 4,
  },
  box4: {
    paddingVertical: 18
  },
  box4_item: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center'
  },
  img2: {
    width: 45,
    height: 45,
    marginRight: 9
  },
  title2: {
    fontSize: 10,
    color: '#4B4B4B',
    textAlign: 'left'
  },
  titleView1: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  title3: {
    fontSize: 10,
    color: '#FEB525',
    textAlign: 'left'
  },
  text3: {
    fontSize: 8,
    color: '#909090'
  }
})

export default styles;