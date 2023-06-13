import { getRecorderManager } from "@tarojs/taro";
import useDeviceAuth from '../useDeviceAuth'

export interface RecordManagerOption {
  onStart: (res: TaroGeneral.CallbackResult) => void,
  onPause: (res: TaroGeneral.CallbackResult) => void,
  onStop: OnStopCallback,
  onError: OnErrorCallback,
  /** 是否去录音状态，false则授权完成不去录音，true授权完成直接开始录音 */
  recorderStatus: () => boolean
}

interface OnErrorCallbackResult extends TaroGeneral.CallbackResult {
  /** 错误信息 */
  errMsg: string
}
 /** 录音错误事件的回调函数 */
 type OnErrorCallback = (
  result: OnErrorCallbackResult,
 ) => void

/** 录音结束事件的回调函数 */
type OnStopCallback = (result: OnStopCallbackResult) => void
interface OnStopCallbackResult {
  /** 录音总时长，单位：ms */
  duration: number
  /** 录音文件大小，单位：Byte */
  fileSize: number
  /** 录音文件的临时路径 */
  tempFilePath: string
}


interface StartOption {
  /** 指定录音的音频输入源，可通过 [Taro.getAvailableAudioSources()](/docs/apis/media/audio/getAvailableAudioSources) 获取当前可用的音频源 */
  audioSource?: keyof AudioSource
  /** 录音的时长，单位 ms，最大值 600000（10 分钟） */
  duration?: number
  /** 编码码率，有效值见下表格 */
  encodeBitRate?: number
  /** 音频格式 */
  format?: keyof Format
  /** 指定帧大小，单位 KB。传入 frameSize 后，每录制指定帧大小的内容后，会回调录制的文件内容，不指定则不会回调。暂仅支持 mp3 格式。 */
  frameSize?: number
  /** 录音通道数 */
  numberOfChannels?: keyof NumberOfChannels
  /** 采样率 */
  sampleRate?: keyof SampleRate
}
/** 指定录音的音频输入源 */
interface AudioSource {
  /** 自动设置，默认使用手机麦克风，插上耳麦后自动切换使用耳机麦克风，所有平台适用 */
  'auto'
  /** 手机麦克风，仅限 iOS */
  'buildInMic'
  /** 耳机麦克风，仅限 iOS */
  'headsetMic'
  /** 麦克风（没插耳麦时是手机麦克风，插耳麦时是耳机麦克风），仅限 Android */
  'mic'
  /** 同 mic，适用于录制音视频内容，仅限 Android */
  'camcorder'
  /** 同 mic，适用于实时沟通，仅限 Android */
  'voice_communication'
  /** 同 mic，适用于语音识别，仅限 Android */
  'voice_recognition'
}
/** 音频格式 */
interface Format {
  /** mp3 格式 */
  mp3
  /** aac 格式 */
  aac
  /** wav 格式 */
  wav
  /** pcm 格式 */
  PCM
}
/** 录音通道数 */
interface NumberOfChannels {
  /** 1 个通道 */
  1
  /** 2 个通道 */
  2
}
/** 采样率 */
interface SampleRate {
  /** 8000 采样率
   * @codeRate 16000 ~ 48000
   */
  8000
  /** 11025 采样率
   * @codeRate 16000 ~ 48000
   */
  11025
  /** 12000 采样率
   * @codeRate 24000 ~ 64000
   */
  12000
  /** 16000 采样率
   * @codeRate 24000 ~ 96000
   */
  16000
  /** 22050 采样率
   * @codeRate 32000 ~ 128000
   */
  22050
  /** 24000 采样率
   * @codeRate 32000 ~ 128000
   */
  24000
  /** 32000 采样率
   * @codeRate 48000 ~ 192000
   */
  32000
  /** 44100 采样率
   * @codeRate 64000 ~ 320000
   */
  44100
  /** 48000 采样率
   * @codeRate 64000 ~ 320000
   */
  48000
}
export default function useRecorderManager(option: RecordManagerOption) {
  const recorderManager = getRecorderManager();
  const [requestDeviceAuth] = useDeviceAuth();
  if (!option) {
    throw new Error("please set option property");
  }

  const { onStart, onPause, onStop, onError, recorderStatus} = option;

  const startRecorder = (options: StartOption) => {
    requestDeviceAuth({
      scope: 'scope.record',
    }).then(() => {
      recorderStatus() && recorderManager.start(options)
    })
  }

  recorderManager.onStart(onStart);

  recorderManager.onPause(onPause);

  recorderManager.onStop(onStop);

  recorderManager.onError(onError);

  return [recorderManager, {startRecorder, stopRecorder: recorderManager.stop, pauseRecorder: recorderManager.pause}];
}
