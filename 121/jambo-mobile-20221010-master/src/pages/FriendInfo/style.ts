import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  FriendInfo: {
    flex: 1,
  },
  title: {
    color: '#fff'
  },
  box: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
  },
  box1: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  text3: {
    marginLeft: 6,
    width: width - 108,
  },
  text1: {
    fontSize: 14,
    color: '#4B4B4B',
  },
  text2: {
    fontSize: 14,
    color: '#EB1D36'
  }
})

export default styles;