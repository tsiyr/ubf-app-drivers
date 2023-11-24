

const getTimeStamp = ()=>{

  var timestamp = changeTimezone(new Date(), 'Europe/London')
  var year = timestamp.getFullYear();
  var month = timestamp.getMonth() + 1;
  var day = timestamp.getDate();

  return year+""+ month+""+ day
}


function changeTimezone(date, d_tz) {

  // suppose the date is 12:00 UTC
  var invdate = new Date(date.toLocaleString('en-US', {
    timeZone: d_tz
  }));

  // then invdate will be 07:00 in Toronto
  // and the diff is 5 hours
  var diff = date.getTime() - invdate.getTime();

  // so 12:00 in Toronto is 17:00 UTC
  return new Date(date.getTime() - diff); // needs to substract

}

function capitalise(str){
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}


const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function datediff(first, second) {        
  return Math.abs(Math.round((second - first) / (1000 * 60 * 60 * 24)));
}

const isValidEmail = email =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
p
  
  const copyHash = (_id, txt) =>{

    navigator.clipboard.writeText(_id)
  
    alert(txt+' copied!')
  
  }


 
module.exports = {
  copyHash,
  isValidEmail,
  datediff,
  numberWithCommas,
  getTimeStamp,
  changeTimezone,
  capitalise,
}