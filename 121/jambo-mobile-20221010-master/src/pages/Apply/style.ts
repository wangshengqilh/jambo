import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Apply: {
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
    position: 'relative'
  },
  itemchildren: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  msgItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  nameView: {
    marginLeft: 8,
    marginRight: 8,
    flex: 1
  },
  nameText: {
    textAlign: 'left',
  },
  text1: {
    fontSize: 12,
    color: '#999'
  },
  text2: {
    fontSize: 12,
    color: 'rgb(255, 125, 125)'
  },
})

export default styles;