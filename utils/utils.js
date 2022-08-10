export const formatDate = function(time){
    var date = new Date(time);
 
    var year = date.getFullYear(),
        month = date.getMonth()+1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var newTime = year + '-' +
                (month < 10? '0' + month : month) + '-' +
                (day < 10? '0' + day : day) + ' ' +
                (hour < 10? '0' + hour : hour) + ':' +
                (min < 10? '0' + min : min) + ':' +
                (sec < 10? '0' + sec : sec);
 
    return newTime;         
}
// 给数字前面补位
export const paddingNumber = (n, length, tag='0')=>{
    let arr = []
    while(n>0){
        arr.push(n%10)
        n = Math.floor(n/10);
    }
    while(arr.length < length){
        arr.push(tag)
    }
    return arr.reverse().join('')
}
// 生成[min, max)区间的随机数
export const randomNumber = (min=0, max=1)=>{
    let {floor, random} = Math
    return floor(random()*(max-min)+min)
}
export const randomColor = ()=>{
    return `rgb(${randomNumber(0,256)}, ${randomNumber(0,256)}, ${randomNumber(0,256)})`
}

// 判断时间是否在某个区间
// export const judgeTime = (date, startDate, endDate)=>{
//     startDate && startDate = new Date().getTime()
//     if(!(date instanceof Date)) date = new Date(date)
//     if(date.getTime() >= startDate.getTime() && date.getTime() < endDate.getTime()){
//         return true
//     }
//     return false
// }
// 判断时间是否在某个区间
// export const judgeTime = (date, startDate, endDate)=>{
//     startDate && startDate = new Date().getTime()
//     if(!(date instanceof Date)) date = new Date(date)
//     if(date.getTime() >= startDate.getTime() && date.getTime() < endDate.getTime()){
//         return true
//     }
//     return false
// }next