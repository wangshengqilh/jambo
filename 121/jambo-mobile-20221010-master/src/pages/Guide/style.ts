import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  Guide: {
    flex: 1,
    position: 'relative'
  },
  img: {
    flex: 1,
    backgroundColor: '#450979'
  },
  FooterView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18
  },
  FooterViewCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  FooterViewCenterItem: {
    marginHorizontal: 4,
    height: 6,
    borderRadius: 3
  }
})

export default styles;