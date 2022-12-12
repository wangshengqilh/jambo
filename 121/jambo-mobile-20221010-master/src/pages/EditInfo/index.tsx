import React from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Header from "components/Header";
import FeatherIcon from 'react-native-vector-icons/Feather';
import Upload from "components/Upload";
import { Alert, BackHandler, ImageBackground, ScrollViewProps } from "react-native";
import { Avatar, Button, Center, FormControl, Icon, Input, Pressable, ScrollView, useToast, View, WarningOutlineIcon } from "native-base";
import { info, user_info_update } from "src/store/api";
import { useAppDispatch } from "src/store/hooks";
import { setMyInfo } from "src/store/myInfo/myInfoSlice";
import { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { regNumber } from "src/assets/static";

export interface IEditInfo {
  username: string
  birthday: number
  phoneCode: string
  phone: string
  country_name: string
  country_id: string
  avatar: string
}

function EditInfo(props: IProps) {
  const [refScrollView, setRefScrollView] = React.useState<any>()
  const toast = useToast()
  const dispatch = useAppDispatch();
  const [isCheck, setIsCheck] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [visibleUpload, setVisibleUpload] = React.useState<boolean>(false)
  const [i, setI] = React.useState<number>(0)
  const [params, setParams] = React.useState<IEditInfo>({
    username: '',
    birthday: 0,
    phoneCode: '',
    phone: '',
    country_name: '',
    country_id: '',
    avatar: ''
  })
  let unsubscribe

  React.useEffect(() => {
    getUserInfo()
  }, [])

  React.useEffect(() => {
    unsubscribe = props.navigation.addListener('beforeRemove', onBackPress)
    return unsubscribe
  }, [i, setI])

  const onBackPress = (e: any) => {
    if (i === 0) {
      return;
    }
    e.preventDefault();
    Alert.alert(
      'Reminder',
      'You have unsaved changes. Are you sure to discard them and leave the screen?',
      [
        { text: "Save", style: 'cancel', onPress: () => refScrollView?.scrollToEnd() },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => props.navigation.dispatch(e.data.action)
        }
      ]
    )
  }

  const getUserInfo = () => {
    info().then(res => {
      dispatch(setMyInfo(res.data))
      const p = {
        username: res.data.username,
        birthday: new Date(Number(res.data.birthday)).getTime(),
        phoneCode: res.data.phonecode,
        phone: res.data.phone,
        country_name: res.data.country_name,
        country_id: res.data.country_id,
        avatar: res.data.avatar
      }
      setParams(p)
    })
  }

  const onChangeTextUserName = (text: string) => {
    setParams(p => ({ ...p, username: text }))
    setI(n => n + 1)
  }

  const onPressChangeDate = () => {
    DateTimePickerAndroid.open({
      value: new Date(params.birthday),
      mode: 'date',
      maximumDate: new Date(),
      display: 'spinner',
      onChange: (_event: DateTimePickerEvent, date: Date | undefined) => {
        if (date) {
          setParams(p => ({ ...p, birthday: date.getTime() }))
          setI(n => n + 1)
        }
      }
    })
  }

  const onChangeTextPhoneCode = (text: string) => {
    if (text) {
      if (regNumber.test(text)) {
        setParams(p => ({ ...p, phoneCode: text }))
        setI(n => n + 1)
      }
    } else {
      setParams(p => ({ ...p, phoneCode: '' }))
      setI(n => n + 1)
    }
  }

  const onChangeTextPhone = (text: string) => {
    if (text) {
      if (regNumber.test(text)) {
        setParams(p => ({ ...p, phone: text }))
        setI(n => n + 1)
      }
    } else {
      setParams(p => ({ ...p, phone: '' }))
      setI(n => n + 1)
    }
  }

  const onPressChangeCountry = () => {
    props.navigation.navigate('AreaCode', { callback: callbackCountry })
  }

  const callbackCountry = (data: { country_id: string, country_name: string, phonecode: string }) => {
    setParams(p => ({ ...p, country_name: data.country_name, country_id: data.country_id, phoneCode: p.phoneCode || data.phonecode }))
    setI(n => n + 1)
  }

  const onPressFinish = () => {
    setIsCheck(true)
    setIsLoading(true)
  }

  const callbackUpload = (data: string[]) => {
    if (data.length) {
      setParams(p => ({ ...p, avatar: data[0] }))
      setI(n => n + 1)
    }
  }

  const closeModalUpload = () => {
    setVisibleUpload(false)
  }

  React.useEffect(() => {
    if (isLoading) {
      if (
        params.username &&
        params.phoneCode &&
        params.phone &&
        params.country_name
      ) {
        user_info_update(params).then(res => {
          setI(0)
          setIsLoading(false)
          dispatch(setMyInfo({ ...res.data, accesscount: 2 }))
          toast.show({ description: res.msg })
          const timer = setTimeout(() => {
            props.navigation.goBack()
            clearTimeout(timer)
          }, 500);
        }).catch((e) => {
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    }
  }, [isLoading, setIsLoading])

  return (
    <ImageBackground source={images.background1} style={styles.EditInfo}>
      <Header title="Edit Profile" titleStyle={styles.title2} />
      <Center style={styles.box1}>
        <Center style={styles.box1_1}>
          <Avatar source={{ uri: params.avatar }} size={143}>{params.username}</Avatar>
          <Button bgColor='#FFA800' onPress={() => setVisibleUpload(true)}>Change Profile Image</Button>
        </Center>
      </Center>
      <View style={styles.box}>
        <ScrollView style={styles.boxScroll} showsVerticalScrollIndicator={false} ref={ref => setRefScrollView(ref)}>
          <FormControl isInvalid={isCheck ? !params.username : false} style={styles.FormControl}>
            <FormControl.Label>Name</FormControl.Label>
            <Input placeholder="Name" value={params.username} onChangeText={onChangeTextUserName} />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Invalid Name!
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={false} style={styles.FormControl}>
            <FormControl.Label>Date of Birth</FormControl.Label>
            <Pressable style={styles.dateView} onPress={onPressChangeDate}>
              <Input editable={false} w={60} style={styles.dateinput} value={new Date(params.birthday).getDate().toString()} />
              <View style={styles.interval} />
              <Input editable={false} w={60} style={styles.dateinput} value={(new Date(params.birthday).getMonth() + 1).toString()} />
              <View style={styles.interval} />
              <Input editable={false} w={76} style={styles.dateinput} value={new Date(params.birthday).getFullYear().toString()} />
            </Pressable>
          </FormControl>

          <FormControl isInvalid={isCheck ? !params.country_name : false} style={styles.FormControl}>
            <FormControl.Label>Country/Region</FormControl.Label>
            <Pressable onPress={onPressChangeCountry}>
              <Input editable={false} placeholder="Location" value={params.country_name} />
            </Pressable>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Invalid Region!
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={isCheck ? !(params.phoneCode && params.phone) : false} style={styles.FormControl}>
            <FormControl.Label>Contact Number</FormControl.Label>
            <View style={styles.dateView}>
              <Input
                InputLeftElement={<Icon as={<FeatherIcon name="plus" />} ml="2" size={4} color="muted.400" />}
                w={79}
                value={params.phoneCode}
                onChangeText={onChangeTextPhoneCode}
                keyboardType='numeric'
                style={{ paddingLeft: 0, textAlign: 'center' }}
              />
              <View style={styles.interval} />
              <Input
                w={160}
                value={params.phone}
                onChangeText={onChangeTextPhone}
                keyboardType='phone-pad'
              />
            </View>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Invalid Phone!
            </FormControl.ErrorMessage>
          </FormControl>

          <Button style={styles.Finish} onPress={onPressFinish} isLoading={isLoading}>Save</Button>
        </ScrollView>
      </View>

      <Upload
        visible={visibleUpload}
        mediaType='photo'
        callback={callbackUpload}
        closeModal={closeModalUpload}
      />
    </ImageBackground>
  )
}

export default EditInfo;