export type TimeOutPromise = (time: number) => Promise<number>

export const timeOutPromise: TimeOutPromise = (time: number) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(time);
      }, time)
    } catch (error) {
      reject();
    }
  })
}