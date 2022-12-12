import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Ranking: {
    flex: 1,
  },
  title2: {
    color: '#fff'
  },
  Box: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
  },
  item: {
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nameView: {
    marginLeft: 8,
  },
  title1: {
    fontSize: 14,
    color: '#4B4B4B',
    textAlign: 'left',
    width: width - 56 - 48 - 8 - 8 - 31
  },
  title4: {
    fontSize: 14,
    color: '#4B4B4B',
    textAlign: 'left',
  },
  location: {
    fontSize: 12,
    color: '#4B4B4B'
  }
})

export default styles;