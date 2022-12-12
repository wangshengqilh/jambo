import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Feedback: {
    flex: 1,
  },
  title: {
    color: '#fff'
  },
  box: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    marginTop: 18
  },
  text1: {
    fontSize: 16,
  },
  box2: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  box3: {
    width: 98,
    height: 98,
    borderRadius: 14,
    backgroundColor: '#EFF2F4',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 6,
    position: 'relative'
  },
  img: {
    width: '100%',
    height: '100%'
  },
  icon: {
    fontSize: 24,
    color: '#B5B7CA'
  },
  bask: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: '60%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 8
  },
  icon1: {
    fontSize: 18,
    color: '#EFF2F4'
  },
  submit: {
    marginTop: 18
  }
})

export default styles;