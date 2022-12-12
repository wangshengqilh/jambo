import React from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Title from "components/Title";
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Dimensions, ImageBackground } from "react-native";
import { Text, Input, FormControl, View, Pressable, ScrollView, Icon, Button, IconButton } from "native-base";
import { regEmail, regNumber, regPassword } from "src/assets/static";
import { send_email_code } from "src/store/api";

const { width } = Dimensions.get('screen')

export interface ISignUp {
  status: boolean
  username: string
  birthday: number
  email: string
  phoneCode: string
  phone: string
  country_name: string
  country_id: string
  password: string
  passwordAgin: string
}

function Sign(props: IProps) {
  const [steps, setSteps] = React.useState<number>(1)
  const [show, setShow] = React.useState<boolean>(false)
  const [show1, setShow1] = React.useState<boolean>(false)
  const [isCheck, setIsCheck] = React.useState<boolean>(false)
  const [params, setParams] = React.useState<ISignUp>({
    username: '',
    status: false,
    birthday: new Date().getTime(),
    email: '',
    phoneCode: '',
    phone: '',
    country_name: '',
    country_id: '',
    password: '',
    passwordAgin: ''
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [refScroll, setRefScroll] = React.useState<any>()

  React.useEffect(() => {
    setTimeout(() => {
      refScroll?.scrollToEnd()
    }, 500);
  }, [steps, setSteps])

  React.useEffect(() => {
    if (isLoading) {
      if (
        params.username &&
        regEmail.test(params.email) &&
        params.phoneCode &&
        params.phone &&
        params.country_name &&
        regPassword.test(params.password) &&
        (params.password === params.passwordAgin) &&
        params.status
      ) {
        send_email_code({ email: params.email }).then(res => {
          props.navigation.navigate('Verification', { data: params, type: 1 })
          setIsLoading(false)
        }).catch((err) => {
          setIsLoading(false)
        })
      } else {
        setIsCheck(true)
        setIsLoading(false)
      }
    }
  }, [isLoading, setIsLoading])

  const onChangeTextUserName = (text: string) => {
    setParams(p => ({ ...p, username: text }))
  }

  const onSubmitEditingUsername = () => {
    if (params.username) {
      setSteps(n => {
        if (n < 2) {
          return 2
        }
        return n
      })
    }
  }

  const onPressChangeDate = () => {
    DateTimePickerAndroid.open({
      value: new Date(params.birthday),
      mode: 'date',
      maximumDate: new Date(),
      display: 'spinner',
      onChange: (event: DateTimePickerEvent, date: Date | undefined) => {
        if (date) {
          setParams(p => ({ ...p, birthday: date.getTime() }))
          setSteps(n => {
            if (n < 3) {
              return 3
            }
            return n
          })
        }
      }
    })
  }

  const onSubmitEditingEmail = () => {
    if (params.email) {
      setSteps(n => {
        if (n < 4) {
          return 4
        }
        return n
      })
    }
  }

  const onSubmitEditingPhoneCode = () => {
    if (params.phone && params.phoneCode) {
      setSteps(n => {
        if (n < 6) {
          return 6
        }
        return n
      })
    }
  }

  const callbackCountry = (data: { country_id: string, country_name: string, phonecode: string }) => {
    setParams(p => ({ ...p, country_name: data.country_name, country_id: data.country_id, phoneCode: data.phonecode }))
    setSteps(n => {
      if (n < 5) {
        return 5
      }
      return n
    })
  }

  const onSubmitEditingPassword = () => {
    setSteps(n => {
      if (n < 7) {
        return 7
      }
      return n
    })
  }
  const onSubmitEditingPasswordAgin = () => {
    setSteps(n => {
      if (n < 8) {
        return 8
      }
      return n
    })
  }

  const onChangeCheck = () => {
    if (params.status) {
      setSteps(8)
    } else {
      setSteps(9)
    }
    setParams(p => ({ ...p, status: !params.status }))
  }

  const onChangeTextEmail = (text: string) => {
    setParams(p => ({ ...p, email: text }))
  }

  const onChangeTextPhoneCode = (text: string) => {
    if (text) {
      if (regNumber.test(text)) {
        setParams(p => ({ ...p, phoneCode: text }))
      }
    } else {
      setParams(p => ({ ...p, phoneCode: '' }))
    }
  }

  const onChangeTextPhone = (text: string) => {
    if (text) {
      if (regNumber.test(text)) {
        setParams(p => ({ ...p, phone: text }))
      }
    } else {
      setParams(p => ({ ...p, phone: '' }))
    }
  }

  const onPressChangeCountry = () => {
    props.navigation.navigate('AreaCode', { callback: callbackCountry })
  }

  const onChangeTextPasswd = (text: string) => {
    setParams(p => ({ ...p, password: text }))
  }

  const onChangeTextPasswdAgin = (text: string) => {
    setParams(p => ({ ...p, passwordAgin: text }))
  }

  const onPressNext = () => {
    setIsLoading(true)
  }

  const onPressPolicyAgreement = (title: string) => {
    props.navigation.navigate('PolicyAgreement', { title })
  }

  return (
    <ImageBackground source={images.background1} style={styles.Sign}>
      <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.box1} ref={setRefScroll}>
          <Title title="Welcome to Jambo!" size='xl' style={styles.title} />
          <Text style={styles.tip1} size='sm'>Enter information to continue</Text>

          <FormControl isInvalid={isCheck ? !params.username : false} style={styles.FormControl} isRequired>
            <FormControl.Label>Name</FormControl.Label>
            <Input returnKeyType='next' onSubmitEditing={onSubmitEditingUsername} placeholder="Name" value={params.username} onChangeText={onChangeTextUserName} />
            <FormControl.ErrorMessage>
              Invalid Name!
            </FormControl.ErrorMessage>
          </FormControl>

          {
            steps >= 2 ?
              <FormControl isInvalid={false} style={styles.FormControl} isRequired>
                <FormControl.Label>Date of Birth</FormControl.Label>
                <Pressable style={styles.dateView} onPress={onPressChangeDate}>
                  <Input editable={false} w={60} style={styles.dateinput} value={new Date(params.birthday).getDate().toString()} />
                  <View style={styles.interval} />
                  <Input editable={false} w={60} style={styles.dateinput} value={(new Date(params.birthday).getMonth() + 1).toString()} />
                  <View style={styles.interval} />
                  <Input editable={false} w={76} style={styles.dateinput} value={new Date(params.birthday).getFullYear().toString()} />
                </Pressable>
              </FormControl> :
              null
          }

          {
            steps >= 3 ?
              <FormControl isInvalid={isCheck ? !regEmail.test(params.email) : false} style={styles.FormControl} isRequired>
                <FormControl.Label>Email</FormControl.Label>
                <Input keyboardType='email-address' returnKeyType='next' onSubmitEditing={onSubmitEditingEmail} placeholder="Email" value={params.email} onChangeText={onChangeTextEmail} />
                <FormControl.ErrorMessage>
                  Invalid Email!
                </FormControl.ErrorMessage>
              </FormControl> :
              null
          }

          {
            steps >= 4 ?
              <FormControl isInvalid={isCheck ? !params.country_name : false} style={styles.FormControl} isRequired>
                <FormControl.Label>Country/Region</FormControl.Label>
                <Pressable onPress={onPressChangeCountry}>
                  <Input editable={false} placeholder="Location" value={params.country_name} />
                </Pressable>
                <FormControl.ErrorMessage>
                  Invalid Region!
                </FormControl.ErrorMessage>
              </FormControl> :
              null
          }

          {
            steps >= 5 ?
              <FormControl isInvalid={isCheck ? !(params.phoneCode && params.phone) : false} style={styles.FormControl} isRequired>
                <FormControl.Label>Contact Number</FormControl.Label>
                <View style={styles.dateView}>
                  <Input
                    InputLeftElement={<Icon as={<FeatherIcon name="plus" />} ml="2" size={4} color="muted.400" />}
                    w={79}
                    value={params.phoneCode}
                    onChangeText={onChangeTextPhoneCode}
                    onSubmitEditing={onSubmitEditingPhoneCode}
                    keyboardType='numeric'
                    style={{ paddingLeft: 0, textAlign: 'center' }}
                  />
                  <View style={styles.interval} />
                  <Input
                    returnKeyType='next'
                    w={160}
                    value={params.phone}
                    onChangeText={onChangeTextPhone}
                    onSubmitEditing={onSubmitEditingPhoneCode}
                    keyboardType='phone-pad'
                  />
                </View>
                <FormControl.ErrorMessage>
                  Invalid Phone!
                </FormControl.ErrorMessage>
              </FormControl> :
              null
          }

          {
            steps >= 6 ?
              <FormControl isInvalid={isCheck ? !regPassword.test(params.password) : false} style={styles.FormControl} isRequired>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  returnKeyType='next'
                  onSubmitEditing={onSubmitEditingPassword}
                  onChangeText={onChangeTextPasswd}
                  value={params.password}
                  placeholder="Password"
                  type={show ? "text" : "password"}
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon as={<FeatherIcon name={show ? "eye-off" : "eye"} />} size={5} mr="2" color="muted.400" />
                    </Pressable>
                  }
                />
                <FormControl.ErrorMessage style={{ width: width - 90 }}>
                  Password should contain 8 or more characters with a mix of letters and numbers
                </FormControl.ErrorMessage>
              </FormControl> :
              null
          }

          {
            steps >= 7 ?
              <FormControl isInvalid={isCheck ? !(params.password === params.passwordAgin) : false} style={styles.FormControl} isRequired>
                <FormControl.Label>Confirm Password</FormControl.Label>
                <Input
                  returnKeyType='next'
                  onSubmitEditing={onSubmitEditingPasswordAgin}
                  onChangeText={onChangeTextPasswdAgin}
                  value={params.passwordAgin}
                  placeholder="Confirm Password"
                  type={show1 ? "text" : "password"}
                  InputRightElement={
                    <Pressable onPress={() => setShow1(!show1)}>
                      <Icon as={<FeatherIcon name={show1 ? "eye-off" : "eye"} />} size={5} mr="2" color="muted.400" />
                    </Pressable>
                  }
                />
                <FormControl.ErrorMessage>
                  Those passwords didn’t match. Try again.
                </FormControl.ErrorMessage>
              </FormControl> :
              null
          }

          {
            steps >= 8 ?
              <View style={styles.checkbox}>
                <IconButton
                  icon={
                    <FontistoIcon name={params.status ? "radio-btn-active" : 'radio-btn-passive'} size={20} color={params.status ? '#461A86' : '#999'} />
                  }
                  borderRadius="full"
                  onPress={onChangeCheck}
                />
                <Text style={styles.text1}>
                  By checking this box I certify that i have read and accepted the <Text onPress={() => onPressPolicyAgreement('Terms of Use')} style={styles.tip3}>Terms of Use Agreement</Text> and the <Text onPress={() => onPressPolicyAgreement('Privacy Policy')} style={styles.tip3}>Privacy Policy</Text> of Jambo.
                </Text>
              </View> :
              null
          }

          {
            steps >= 9 ?
              <Button style={styles.next} onPress={onPressNext} isLoading={isLoading} spinnerPlacement="start">Next</Button> :
              null
          }
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  )
}

export default Sign;