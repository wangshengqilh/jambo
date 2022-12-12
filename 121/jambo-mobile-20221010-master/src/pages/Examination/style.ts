import { Dimensions, StatusBar, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  Examination: {
    flex: 1
  },
  itemChild: {
    height: height - ((StatusBar.currentHeight || 0) + 8 + 8 + 44 + 8),
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 28,
    paddingBottom: 18,
  },
  text1: {
    fontSize: 12,
    color: '#fff'
  },
  text2: {
    fontSize: 24,
    color: '#fff',
    lineHeight: 36
  },
  GradientRadioView: {
    borderWidth: 1,
    borderColor: '#fff',
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 6,
    backgroundColor: '#fff'
  },
  RadioView: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  RadioText: {
    marginLeft: 8,
    width: width - 106
  },
  drawer: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    flexDirection: 'row'
  },
  box0: {
    width: '50%',
    height: '100%',
  },
  box1: {
    width: '50%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 32
  },
  box1_title: {
    fontSize: 20,
    textAlign: 'left',
    color: '#4B4B4B',
  },
  box1_1: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  box1_2: {
    flex: 1
  },
  button: {
    width: (width / 2 - 8) / 2 - 8,
    height: (width / 2 - 8) / 2 - 8,
    margin: 4
  }
})

export default styles;