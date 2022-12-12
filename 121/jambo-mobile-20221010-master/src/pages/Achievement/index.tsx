import React from "react";
import images from "src/assets/images";
import styles from "./style";
import Title from "components/Title";
import GradientButton from "components/GradientButton";
import FlatListVertical from "components/FlatListVertical";
import { Animated, Dimensions, ImageBackground, PanResponder } from "react-native";
import { Button, Image, Pressable, Text, View } from "native-base";
import { get_score, task_list } from "src/store/api";
import { start } from "src/router/MyNavigation";
import { useAppDispatch } from "src/store/hooks";
import { setCelebrate } from "src/store/celebrate/celebrateSlice";

const { width } = Dimensions.get('screen')
interface ITask {
  assign: string
  author: string
  createtime: string
  email: string
  enddate: string
  frequency: string
  how_long: string
  id: string
  img1: string
  img2: string
  img3: string
  img4: string
  img5: string
  img6: string
  is_complete: string
  is_receive: string
  mtype: string
  score: string
  sp_id: string
  startdate: string
  state: string
  task_num: string
  title: string
  u_task_num: string
  finish_date: number
}
interface IData { special: ITask[], weekly: ITask[], monthly: ITask[], everyday: ITask[] }
const startTop = 328 + width / 2
const endTop = 62
// 成就
function Achievement() {
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<IData>()
  const [nextTask, setNextTask] = React.useState<ITask>()
  const [everyday, setEveryday] = React.useState<ITask>()
  const [finish, setFinish] = React.useState<ITask>()
  const topAnim = React.useRef(new Animated.Value(startTop)).current;
  const typesHeader = [{ name: 'Special ' }, { name: 'Weekly ' }, { name: 'Monthly' }]
  const [type, setType] = React.useState<0 | 1 | 2 | number>(-1)
  const [isScroll, setIsScroll] = React.useState<boolean>(false)
  const [task, setTask] = React.useState<ITask[]>([])
  const [desc, setDesc] = React.useState<ITask>()
  const [imgFinish, setImgFinish] = React.useState<boolean>(false)
  const [indexs, setIndexs] = React.useState<number[]>([])

  React.useEffect(() => {
    getTaskData()
  }, [])

  React.useEffect(() => {
    const arr = type === 0 ?
      (data?.special || []) :
      type === 1 ?
        (data?.weekly || []) :
        type === 2 ?
          (data?.monthly || []) :
          [...(data?.everyday || []), ...(data?.weekly || []), ...(data?.monthly || []), ...(data?.special || [])]
    setTask(arr)
  }, [type, setType, data, setData])

  const getTaskData = () => {
    task_list().then(res => {
      const arr: ITask[] = Array.isArray(res.data) ? res.data : []
      const data1: IData = { special: [], weekly: [], monthly: [], everyday: [] }
      let data2: ITask | undefined = undefined
      let data3: ITask | undefined = undefined
      for (const item of arr) {
        switch (item.frequency) {
          case '0':
            // 特殊
            data1.special.push(item)
            break
          case '1':
            // 每日任务
            data1.everyday.push(item)
            if (item.id === '535') {
              setEveryday(item)
            }
            break
          case '2':
            // 每周
            data1.weekly.push(item)
            break
          case '3':
            // 每月
            data1.monthly.push(item)
            break
        }

        if ((item.is_complete === '0' || (item.id === '535' && item.is_receive === '0')) && data2 === undefined) {
          data2 = item
        }
        if (item.is_receive === '1') {
          if (data3 && Number(data3.finish_date) <= Number(item.finish_date)) {
            data3 = item
          } else if (data3 === undefined) {
            data3 = item
          }
        }
      }
      setData(data1)
      setNextTask(data2)
      setFinish(data3)
    })
  }

  const onPressReceive = (id?: string) => {
    if (id) {
      get_score(id).then((res) => {
        if (desc) {
          setImgFinish(false)
          setDesc({ ...desc, is_receive: '1' })
          dispatch(setCelebrate(Number(desc.score)))
        } else {
          dispatch(setCelebrate(1))
        }
        getTaskData()
      })
    }
  }

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (evt, gs) => {
      if (gs.dy > 8) {
        Animated.timing(topAnim, {
          toValue: startTop,
          duration: 300,
          useNativeDriver: false
        }).start(() => {
          setImgFinish(false)
          setDesc(undefined)
          setIsScroll(false)
        });
      } else if (gs.dy < -8) {
        Animated.timing(topAnim, {
          toValue: endTop,
          duration: 300,
          useNativeDriver: false
        }).start(() => {
          setIsScroll(true)
        });
      }
    }
  })

  const childrenComponent = (item: ITask, index: number) => {
    if (item.is_receive === '0') {
      const p = Number(item.task_num) ? Number(item.u_task_num || 0) / Number(item.task_num) : 0
      return (
        <Pressable style={styles.itemchild} onPress={() => onPressItemChild(item, index)} disabled={!isScroll}>
          <Image source={{ uri: item.img5 }} style={styles.img3} onLoad={() => {
            setIndexs(i => [...i, index])
          }} />
          <Text numberOfLines={2} style={[styles.text6, { color: item.id === desc?.id ? '#461A86' : '#333' }]}>
            {item.title}{item.id === '553' ? ` ${item.u_task_num}/${item.task_num}` : ''}
          </Text>
          <View style={styles.mask} />
          {
            indexs.includes(index) ?
              <View style={[styles.mask1, { height: (width / 4 - 22.5) / 6 * 4 * p }]} /> :
              null
          }
        </Pressable>
      )
    }
    return (
      <Pressable style={styles.itemchild} onPress={() => onPressItemChild(item, index)}>
        <Image source={{ uri: item.img1 }} style={styles.img3} />
        <Text numberOfLines={2} style={[styles.text6, { color: item.id === desc?.id ? '#461A86' : '#333' }]}>
          {item.title}{item.id === '553' ? ` ${item.u_task_num}/${item.task_num}` : ''}
        </Text>
      </Pressable>
    )
  }

  const onPressItemChild = (item: ITask, index: number) => {
    setImgFinish(false)
    setDesc(item)
  }

  return (
    <ImageBackground source={images.background1} style={styles.Achievement}>
      <View style={styles.headerView}>
        <Title title='What’s your next mission?' style={styles.title1} />
        <Title title={nextTask?.title} style={styles.title2} />
        <View style={styles.box1}>
          <Image source={images.diamond} style={styles.img1} />
          <Text style={styles.text1}>{nextTask?.score}</Text>
        </View>

        <ImageBackground style={styles.meiri} source={images.Frame23}>
          <View>
            <Title title='Daily Check In' style={styles.title3} />
            <View style={styles.box1}>
              <Text style={styles.text2}>Complete this mission to earn</Text>
              <View style={styles.box1}>
                <Image source={images.diamond} style={styles.img1} />
                <Title title={everyday?.score} style={styles.text3} />
              </View>
            </View>
          </View>
          {
            everyday?.is_receive === '1' ?
              <Text style={styles.text5}>Completed</Text> :
              <GradientButton containerStyle={styles.checkin} textStyle={styles.text4} onPress={() => onPressReceive(everyday?.id)}>Check In</GradientButton>
          }
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <Image source={{ uri: finish?.img2 }} style={styles.img2} />
        <Title title={finish?.id === '553' ? `${finish?.title} ${finish.u_task_num}/${finish.task_num}` : finish?.title} />
      </View>

      <Animated.View style={[styles.box2, { top: topAnim }]} {...(isScroll ? {} : _panResponder.panHandlers)}>
        <View style={styles.handle} {..._panResponder.panHandlers}>
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
        <Title title='Complete missions to earn badges' style={styles.title4} />
        <View style={styles.headerItem}>
          {
            typesHeader.map((item, index) =>
              <Button
                disabled={!isScroll}
                key={index}
                bgColor={type === index ? '#FFA800' : '#FFD27B'}
                style={styles.button}
                onPress={() => {
                  if (type === index) {
                    setType(-1)
                  } else {
                    setType(index)
                  }
                }}
              >
                <Title style={styles.searchtitle} title={item.name} />
              </Button>
            )
          }
        </View>

        {
          desc ?
            <ImageBackground source={{ uri: desc.is_receive === '0' ? desc.img6 : desc.img3 }} style={styles.taskdesc} onLoad={() => {
              const tiemr = setTimeout(() => {
                setImgFinish(true)
                clearTimeout(tiemr)
              }, 100);
            }}>
              <View style={styles.rightview}>
                <Title title={desc.title} style={styles.title5} numberOfLines={3} />
                <View style={styles.box1}>
                  <Image source={images.diamond} style={styles.img1} />
                  <Title title={desc.score} style={styles.title6} />
                </View>
                {
                  desc.is_receive === '1' ?
                    null :
                    <Title
                      title={desc.task_num === desc.u_task_num ? 'Click to Claim' : `${desc.u_task_num}/${desc.task_num}`}
                      style={styles.title7}
                      onPress={() => {
                        if (desc.task_num === desc.u_task_num)
                          onPressReceive(desc.id)
                      }}
                    />
                }
              </View>

              <View style={styles.mask2} />
              <View style={[
                styles.mask3,
                {
                  height: (width - 36) * 0.457 / 6 * 4 * (Number(desc.task_num) ? Number(desc.u_task_num || 0) / Number(desc.task_num) : 0),
                  backgroundColor: imgFinish ? (desc.is_receive === '0' ? '#461A86' : '#D9D9D9') : '#D9D9D9'
                }
              ]} />
            </ImageBackground> :
            null
        }

        <FlatListVertical
          scrollEnabled={isScroll}
          data={task}
          childrenComponent={childrenComponent}
          numColumns={4}
          spacing={18}
          paddingBottom={start + 2}
        />
      </Animated.View>
    </ImageBackground>
  )
}

export default Achievement;