import DeviceInfo from 'react-native-device-info';
import RNLocalize from "react-native-localize";
import { user_equipment } from 'src/store/api';

export interface IParams {
  brand: string
  carrier: string
  manufacturer: string
  freeDiskStorage: number
  totalMemory: number
  userAgent: string
  isEmulator: boolean
  isTablet: boolean
  timeZone: string
  country: string
}

export default async function deviceInformation() {
  // 手机品牌
  const brand = DeviceInfo.getBrand()
  // 运营商名称
  const carrier = await DeviceInfo.getCarrier()
  // 设备制造商
  const manufacturer = await DeviceInfo.getManufacturer()
  // 剩余存储容里（字节）
  const freeDiskStorage = await DeviceInfo.getFreeDiskStorage()
  // 设备总内存(字节)
  const totalMemory = await DeviceInfo.getTotalMemory()
  // 设备用户代理
  const userAgent = await DeviceInfo.getUserAgent()
  // 程序是否允许在模拟器中
  const isEmulator = await DeviceInfo.isEmulator()
  // 是否是平板电脑
  const isTablet = DeviceInfo.isTablet()
  // 获取所在国家
  const country = RNLocalize.getCountry()
  // 获取时区
  const timeZone = RNLocalize.getTimeZone()
  const params: IParams = {
    brand,
    carrier,
    manufacturer,
    freeDiskStorage,
    totalMemory,
    userAgent,
    isEmulator,
    isTablet,
    timeZone,
    country
  }
  user_equipment(params)
}