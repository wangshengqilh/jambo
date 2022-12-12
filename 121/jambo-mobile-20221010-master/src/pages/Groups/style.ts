import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Groups: {
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
  },
  item: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarView: {
    width: 50,
    height: 50,
    overflow: 'hidden'
  },
  name: {
    textAlign: 'left',
    marginLeft: 8,
    maxWidth: width - 132
  }
})

export default styles;