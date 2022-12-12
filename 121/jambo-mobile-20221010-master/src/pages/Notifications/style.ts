import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  Notifications: {
    flex: 1,
  },
  titleStyle: {
    color: '#fff'
  },
  box: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
    paddingTop: 28
  },
  NotificationItem: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6522F4',
    borderRadius: 8,
    marginHorizontal: 18,
  },
  NotificationItemText: {
    fontSize: 14
  },
  NotificationItemDeleteView: {
    marginHorizontal: 18,
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
    backgroundColor: 'red',
  },
  ActivityIndicator: {
    marginVertical: 8
  },
  tipText: {
    textAlign: 'center',
    color: '#eee',
    marginVertical: 8
  }
})

export default styles;