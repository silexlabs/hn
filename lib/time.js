//time

//relative time string

function relative_time_string(value)
{
 const seconds=Math.abs(micro_time()-micro_time(value));
 
 let count=0;
 let unit="";
 
 if(seconds<60)
 {
  count=seconds;
  unit="seconds";
 }
 else if(seconds<2*60*60)
 {
  count=seconds/60;
  unit="minutes";
 }
 else if(seconds<2*60*60*24)
 {
  count=seconds/60/60;
  unit="hours";
 }
 else
 {
  count=seconds/60/60/24;
  unit="days";
 }
 
 count=Math.trunc(count);
  
 return count+" "+unit;
}

//date string

function date_string(value=micro_time())
{
 //in second
 
 if(is_number(value))
  value=value*1000;
  
 const date=new Date(value);
  
 //format
 
 let result="";

 result+=date.getDate();
 result+="/"+(date.getMonth()+1);
 result+="/"+date.getFullYear();
 result+=" "+date.getHours();
 result+=":"+pad_left(date.getMinutes(),2,"0");
 
 return result;
}

//micro time

function micro_time(value=Date.now())
{
 if(is_string(value))
  value=Date.parse(value);
  
 check(is_number(value));
  
 return value/1000;
}

//now

function now()
{
 return micro_time()-pkg.start_time;
}
