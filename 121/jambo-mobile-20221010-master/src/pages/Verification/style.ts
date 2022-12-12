import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  Verification: {
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
  },
  title: {
    marginTop: 38
  },
  tip1: {
    marginBottom: 52,
    textAlign: 'center'
  },
  textBox: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  text: {
    height: 40,
    width: 40,
    lineHeight: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#b9b9b9',
    fontSize: 25,
    marginLeft: 8,
    textAlign: 'center'
  },
  intextInputStyle: {
    width: 400,
    height: 40,
    fontSize: 25,
    color: 'transparent',
  },
  focusText: {
    borderColor: 'white',
  },
  Link1: {
    marginTop: 52
  },
  Link2: {
    marginVertical: 12
  },
  stopwatch: {
    color: '#B1B1B1',
    marginVertical: 12
  }
})

export default styles;