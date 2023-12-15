

const getTimeStamp = ()=>{

  var timestamp = changeTimezone(new Date(), 'Europe/London')
  var year = timestamp.getFullYear();
  var month = timestamp.getMonth() + 1;
  var day = timestamp.getDate();

  return year+""+ month+""+ day
}


function changeTimezone(date, d_tz) {

  var invdate = new Date(date.toLocaleString('en-US', {
    timeZone: d_tz
  }));

  var diff = date.getTime() - invdate.getTime();

  return new Date(date.getTime() - diff); 

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