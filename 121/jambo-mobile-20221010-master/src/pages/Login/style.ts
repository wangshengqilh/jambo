import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  Login: {
    flex: 1,
    flexDirection: 'column-reverse'
  },
  box: {
    height: '76%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: 'hidden',
    paddingHorizontal: 38,
    paddingVertical: 38,
  },
  boxScroll: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'left'
  },
  tip1: {
    marginBottom: 52
  },
  FormControl: {
    marginBottom: 18
  },
  box1: {
    flexDirection: 'row-reverse'
  },
  login: {
    marginTop: 32
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
})

export default styles;