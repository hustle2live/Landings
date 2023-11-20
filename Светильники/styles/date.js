function dateToYMD(date) {
   let d = date.getDate();
   let m = date.getMonth() + 1; //Month from 0 to 11
   return '' + (d <= 9 ? '0' + d : d) + '.' + (m <= 9 ? '0' + m : m);
}

function setDateInClass(className, date) {
   let elements = document.getElementsByClassName(className);
   date = dateToYMD(date);
   for (let i = 0; i < elements.length; i++) {
      elements[i].innerText = date; // Change the content
   }
}

let dateFrom = new Date();
let dateTo = new Date();

dateFrom.setDate(new Date().getDate() - 5);
dateTo.setDate(new Date().getDate() + 2);

setDateInClass('date-from', dateFrom);
setDateInClass('date-to', dateTo);
