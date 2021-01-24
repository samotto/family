//--------------------------------------------------------------------------------------------
export function formatDate(dt) {
   var str = '';
   if (dt)
      str = (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
   return str;
}

export function test() {
   console.log("Yes we are in Test!!!!!!!")
}
