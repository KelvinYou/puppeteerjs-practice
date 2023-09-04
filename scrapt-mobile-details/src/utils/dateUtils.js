const todayDateTime = () => {
  const currentDate = new Date(); 
  const formattedDateTime = currentDate.getDate().toString().padStart(2, '0') + "-"
                            + (currentDate.getMonth()+1).toString().padStart(2, '0')  + "-" 
                            + currentDate.getFullYear() + " "  
                            + currentDate.getHours().toString().padStart(2, '0') + ":"  
                            + currentDate.getMinutes().toString().padStart(2, '0') + ":" 
                            + currentDate.getSeconds().toString().padStart(2, '0');

  return formattedDateTime;
}

module.exports = {
  todayDateTime
}