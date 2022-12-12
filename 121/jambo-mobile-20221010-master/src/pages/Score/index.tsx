import React from "react";
import IProps from "src/IProps";
import styles from "./style";
import images from "src/assets/images";
import { ImageBackground, StatusBar } from "react-native";
import { Button, Center, Text } from "native-base";
import Title from "components/Title";
import Header from "components/Header";
import { CommonActions } from "@react-navigation/native";

const Score = (props: IProps) => {
  const score = Number(props.route.params.score)
  const sid = props.route.params.sid

  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content')
  }, [])

  const onPressNext = () => {
    if (score < 9) {
      props.navigation.dispatch((state: any) => {
        const routes = [...state.routes.slice(0, -1), { name: 'Examination', params: { sid } }]
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      })
    } else {
      props.navigation.goBack()
    }
  }

  return (
    <ImageBackground source={score < 9 ? images.Verification1 : images.Verification2} style={styles.Score}>
      <Header />
      <Center style={styles.ScoreBox}>
        <Text style={styles.text1}>Score:</Text>
        <Title style={styles.text2} title={`${score}/10`} />
        <Text style={styles.text3}>{score < 9 ? 'Oops!:' : 'Congratulations!'}</Text>
        <Text style={styles.text4}>
          {score < 9 ? 'Your score is not high enough! Please review the lesson and try the quiz again after 24 hours.' : 'You have successfully completed this weeks class. Best of luck on next week’s class!'}
        </Text>
        <Button style={styles.button} onPress={onPressNext}>{score < 9 ? 'Revise Again' : 'Continue'}</Button>
      </Center>
    </ImageBackground>
  )
}

export default Score;