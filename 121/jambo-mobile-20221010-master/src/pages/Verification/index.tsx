import React from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Title from "components/Title";
import { ImageBackground, TextInput } from "react-native";
import { Text, ScrollView, Center, View, Link } from "native-base";
import { app_registe, reset_passwd, send_email_code } from "src/store/api";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { setMyInfo } from "src/store/myInfo/myInfoSlice";
import { CommonActions } from "@react-navigation/native";
import { clearSkey, getSkeyAsync, selectSkey } from "src/store/skey/skeySlice";
import { onMask } from "src/store/mask/maskSlice";

/**
 * 
 * @param params 
 *  data: any
 *  type: 1|2|3   1注册 2忘记密码 3修改密码
 * 
 */
function Verification(props: IProps) {
  const inputSize = 6
  const [code, setCode] = React.useState<string>('')
  const [s, setS] = React.useState<number>(60)
  const params = props.route.params.data
  const dispatch = useAppDispatch();
  const newSkey = useAppSelector(selectSkey);

  const renderText = () => {
    let inputs = [];
    for (let i = 0; i < inputSize; i++) {
      inputs.push(
        <Text key={i} style={[styles.text, code.length === i ? styles.focusText : null]}>
          {code[i]}
        </Text>
      )
    }
    return inputs
  }

  const onPressBack = () => {
    props.navigation.goBack()
  }

  const onPressResend = () => {
    send_email_code({ email: params.email, type: props.route.params.type === 1 ? '' : 'reset_passwd' }).then(res => {
      setS(60)
    })
  }

  React.useEffect(() => {
    if (code.length === inputSize) {
      dispatch(onMask('Loading...'))
      if (props.route.params.type === 1) {
        // 注册
        dispatch(getSkeyAsync())
      } else {
        // 忘记密码  修改密码
        reset_passwd({ email: params.email, email_code: code }).then(res => {
          dispatch(onMask(''))
          props.navigation.navigate('EditPassword', { email: params.email, email_code: code, type: props.route.params.type })
        }).catch(() => {
          dispatch(onMask(''))
          setCode('')
        })
      }
    }
  }, [code, setCode])

  React.useEffect(() => {
    if (newSkey && props.route.params.type === 1) {
      app_registe({ ...params, email_code: code }).then(res => {
        dispatch(onMask(''))
        dispatch(setMyInfo({ ...res.data, accesscount: 1 }))
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomePage' }],
          }),
        );
      }).catch(() => {
        dispatch(onMask(''))
        dispatch(clearSkey())
      })
    }
  }, [newSkey])

  React.useEffect(() => {
    if (s === 60) {
      timer()
    }
  }, [s, setS])

  const timer = () => {
    const t = setInterval(() => {
      setS(s => {
        if (s <= 1) {
          clearInterval(t)
        }
        return s - 1
      })
    }, 1000)
  }

  return (
    <ImageBackground source={images.background1} style={styles.Verification}>
      <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Center>
            <Title title="Almost there" size='xl' style={styles.title} />
            <Text style={styles.tip1} size='sm'>You should receive a confirmation email from us with a one time password OTP. Please enter the OTP below to continue</Text>

            <View>
              <View style={styles.textBox}>
                {renderText()}
              </View>
              <TextInput
                style={styles.intextInputStyle}
                onChangeText={(text) => setCode(text)}
                underlineColorAndroid="transparent"
                maxLength={inputSize}
                autoFocus={true}
                keyboardType="numeric"
                selectionColor="transparent"
                value={code}
              />
            </View>

            <Link onPress={onPressBack} _text={{ fontSize: 16, color: '#4B4B4B' }} style={styles.Link1}>
              {props.route.params.type === 1 ? 'Edit previous information' : 'Cancel request'}
            </Link>

            {
              s < 1 ?
                <Link onPress={onPressResend} _text={{ fontSize: 16, color: '#4B4B4B' }} style={styles.Link2}>
                  Didn’t Recieve? Resend OTP.
                </Link> :
                <Text style={styles.stopwatch}>0{s === 60 ? '1' : '0'}:{s === 60 ? '00' : s}</Text>
            }
            {/* <Text style={{ fontSize: 9, color: '#999', textAlign: 'center' }}>You should receive a confirmation email with a one time password (OTP) shortly. Please enter the OTP you received below to complete your account setup</Text> */}

          </Center>
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  )
}

export default Verification;