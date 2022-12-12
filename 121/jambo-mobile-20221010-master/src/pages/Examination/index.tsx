import React from "react";
import IProps from "src/IProps";
import LinearGradient from "react-native-linear-gradient";
import Header from "components/Header";
import styles from "./style";
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FeatherIcon from 'react-native-vector-icons/Feather';
import GradientButton from "components/GradientButton";
import storage from "src/store/storage";
import { Icon, IconButton, Pressable, Progress, Text, View } from "native-base";
import { answerApi, get_one_question } from "src/store/api";
import { AnswerRecord } from "src/assets/static";
import { CommonActions } from "@react-navigation/native";
import { store } from "src/store";

interface IQuestion {
  createdate: string
  id: string
  modifydate: string
  mtype: string
  rank: string
  score: string
  sid: string
  state: string
  title: string
  answer: number
  choice: {
    option: string
    title: string
  }[]
}
/**
 * 
 * @param props sid
 * 
 */
const Examination = (props: IProps) => {
  const [data, setData] = React.useState<IQuestion[]>([])
  const [answer, setAnswer] = React.useState<{ qid: string, answer: string }[]>([])
  const [current, setCurrent] = React.useState<number>(0)
  const sid = props.route.params?.sid

  React.useEffect(() => {
    storage.load({ key: AnswerRecord + store.getState().myInfo.value.uid, id: sid }).then((ret: { qid: string, answer: string }[]) => {
      for (let i = 0; i < ret.length; i++) {
        if (!ret[i].answer) {
          setCurrent(i)
          break
        }
      }
      setAnswer(ret)
      getQuestion()
    }).catch(() => {
      getQuestion(true)
    })
  }, [])

  React.useEffect(() => {
    if (answer.length) {
      storage.save({ key: AnswerRecord + store.getState().myInfo.value.uid, id: sid, data: answer })
    }
  }, [answer, setAnswer])

  const onPressClose = () => {
    props.navigation.goBack()
  }

  const getQuestion = (b?: boolean) => {
    get_one_question({ sid }).then(res => {
      const arr = Array.isArray(res.data) ? res.data : []
      if (b) {
        const arr1 = []
        for (const item of arr) {
          arr1.push({ qid: item.id, answer: '' })
        }
        setAnswer(arr1)
      }
      setData(arr)
    })
  }

  const onChangeRadio = (value: string) => {
    setAnswer(d => {
      d[current].answer = value
      return [...d]
    })
  }

  const onPressNext = () => {
    if (current + 1 === data.length) {
      answerApi({ sid, answer_arr: answer }).then(res => {
        storage.remove({ key: AnswerRecord + store.getState().myInfo.value.uid, id: sid })
        props.navigation.dispatch((state: any) => {
          const routes = [...state.routes.slice(0, -1), { name: 'Score', params: { score: res.data.scores, sid } }]
          return CommonActions.reset({
            ...state,
            routes,
            index: routes.length - 1,
          });
        })
      })
    } else {
      setCurrent(i => i + 1)
    }
  }

  return (
    <LinearGradient
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      colors={['#009DCE', '#342E8F', '#45097A']}
      style={styles.Examination}
    >
      <Header
        leftNode={<IconButton
          icon={<Icon as={<FeatherIcon name='x' />} />}
          borderRadius="full"
          _icon={{
            color: "#FFD27B",
            size: 'lg'
          }}
          onPress={onPressClose}
        />}
      />
      <Progress value={(current + 1) * 10} mx="4" _filledTrack={{ bg: "#FFA800" }} />

      {
        data.length ?
          <View style={styles.itemChild}>
            <View>
              <Text style={styles.text1}>{current + 1} OF {data.length}</Text>
              <Text style={styles.text2}>{data[current].title}</Text>
            </View>

            <View>
              {
                data[current].choice.map((item, index) =>
                  <LinearGradient
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    colors={answer[current].answer === item.option ? ['#1E0966', '#6244CB'] : ['#fff', '#fff']}
                    style={styles.GradientRadioView}
                    key={index}
                  >
                    <Pressable style={styles.RadioView} onPress={() => onChangeRadio(item.option)}>
                      <FontistoIcon
                        size={18}
                        color={answer[current].answer === item.option ? '#FFA800' : '#AAAAAA'}
                        name={answer[current].answer === item.option ? 'radio-btn-active' : 'radio-btn-passive'}
                      />
                      <Text style={[styles.RadioText, { color: answer[current].answer === item.option ? '#fff' : '#4B4B4B' }]}>{item.title}</Text>
                    </Pressable>
                  </LinearGradient>
                )
              }
            </View>

            <GradientButton disabled={!answer[current].answer} onPress={onPressNext}>{current + 1 === data.length ? 'Finish' : 'Next Question'}</GradientButton>
          </View> :
          null
      }
    </LinearGradient>
  )
}

export default Examination;