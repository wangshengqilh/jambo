import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  LiveRoomItemBox: {
    overflow: 'hidden',
    borderRadius: 8,
    // elevation: 4,
    // shadowColor: '#000',
  },
  emptyView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200
  },
  ActivityIndicator: {
    marginVertical: 12
  },
  tipText: {
    textAlign: 'center',
    color: '#eee',
    marginVertical: 12
  }
})

export default styles;