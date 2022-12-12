import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: (StatusBar.currentHeight || 0) + 8,
    paddingBottom: 8
  },
  leftBox: {
    minWidth: 44,
    minHeight: 44
  }
})

export default styles;