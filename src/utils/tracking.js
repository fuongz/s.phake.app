export const getSystemVersion = (userAgent) => {
  const sys = userAgent.match(/\(([^)]+)\)/)[1]
  const os = sys.split(';')[1]
  const osVersionArr = os.split(' ')
  const osVersionArrLength = osVersionArr.length
  return osVersionArr[osVersionArrLength - 1]
}
