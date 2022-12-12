import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  GradientButtonBox: {
    height: 48,
    paddingHorizontal: 2,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  ButtonBox: {
    flex: 1,
    overflow: 'hidden',
  },
  Pressable: {
    flex: 1,
  },
  childrenText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff'
  }
})

export default styles;