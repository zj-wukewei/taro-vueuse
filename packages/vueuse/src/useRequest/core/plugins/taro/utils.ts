import { getEnv, ENV_TYPE } from "@tarojs/taro";

export const isWeapp = getEnv() == ENV_TYPE.WEAPP;

export const isWeb = getEnv() == ENV_TYPE.WEB;