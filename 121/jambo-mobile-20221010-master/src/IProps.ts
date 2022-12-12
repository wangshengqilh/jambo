import { Urls } from "./router/type";

// 组件默认props
export default interface IProps {
  navigation: INavigation;
  route: {
    key: string;
    name: string;
    params: any;
    path: string;
  };
};
export interface INavigation {
  addListener: (
    type: 'focus' | 'blur' | 'beforeRemove' | 'state',
    callback: (e: any) => void,
  ) => any;
  canGoBack: () => boolean;
  dispatch: any;
  getParent: () => INavigation | undefined;
  getState: () => {
    history: Array<{
      key: string;
      type: string;
    }>;
    index: number;
    key: string;
    routeNames: string[];
    routes: Array<{
      key: string;
      name: string;
      params: any;
    }>;
    stale: boolean;
    type: string;
  };
  goBack: () => void;
  isFocused: () => boolean;
  navigate: (name: Urls, params?: object) => void;
  pop: (index: number) => void;
  popToTop: () => void;
  push: (name: string, params: object) => void;
  removeListener: any;
  replace: (name: string, params: object) => void;
  reset: (state: object) => void;
  setOptions: (params: object) => void;
  setParams: (params: object) => void;
}
