import { baseUrl, ResponseState } from "src/assets/static";
import { store } from ".";
import { setToast } from "./toast/toastSlice";
import { logOut } from "src/router/customNavigation";

type IResolve = (res: { msg: string; state: number; data: any; skey: string }) => void;

export function post(url: string, params?: any) {
  return new Promise((resolve: IResolve, reject) => {
    fetch(`${baseUrl}/jambo/newjambo${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-jambo-skey': store.getState().skey.value
      },
      body: JSON.stringify({ ...params, login_from: 1 })
    }).then((response) => response.json()).then((res) => {
      if (Number(res.state) === ResponseState.NotLoggedIn) {
        if (url !== '/msg_list.php' && url !== '/user_enddate.php' && url !== '/user_usetime.php') {
          logOut()
          // store.dispatch(setToast(res.msg))
        }
      } else if (Number(res.state) === ResponseState.success) {
        resolve(res)
      } else {
        if (url !== '/send_msg.php') {
          store.dispatch(setToast(res.msg))
        }
        reject(res)
      }
    }).catch((error) => {
      if (url !== '/msg_list.php') {
        store.dispatch(setToast('Unstable network connection'))
      }
      reject(error)
    });
  });
}
