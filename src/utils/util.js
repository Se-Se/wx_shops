
export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

export function getDbCloudInfo(name){
  if (!wx.cloud) {
    console.log('wx.cloud error');
    return;
  }
  return new Promise((reslove)=>{
    wx.cloud.init({
      traceUser: true,
    });
    const db = wx.cloud.database();
    db.collection(name).get().then(res=>{
      reslove(res)
    })
  })

}


export function addDbCloudInfo(name,info){
  if (!wx.cloud) {
    console.log('wx.cloud error');
    return;
  }
  // return new Promise((reslove)=>{
    wx.cloud.init({
      traceUser: true,
    });
    const db = wx.cloud.database();
 return  db.collection(name).add({data:info})
// })
}

export function removeDbCloudInfo(name,info){
  if (!wx.cloud) {
    console.log('wx.cloud error');
    return;
  }
  // return new Promise((reslove)=>{
    wx.cloud.init({
      traceUser: true,
    });
    const db = wx.cloud.database();
 return  db.collection(name).where(info).remove()
// })
}