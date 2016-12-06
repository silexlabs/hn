//http

//user agent

function user_agent()
{
 const result={misc:[]};
 
 //simplify
 
 const discards=["(",")",";",","];
 const agent=replace(to_lower(navigator.userAgent),discards," ");
 
 //parse

 const words=filter_empty(split(agent," "));
 
 for(let current of words)
 {
  //property
  
  const parts=current.split(/:|\//);
  
  if(parts.length==2)
  {
   const key=front(parts);
   let value=back(parts);
   
   //numeric
   
   if(is_numeric(value))
    value=to_number(value);
   
   result[key]=value;
   
   continue;
  }  
  
  //misc
   
  result.misc.push(current);
 }
 
 return result;
}

//query args

function query_args()
{
 const result={};
 const parameters=split(location.search.slice(1),"&");
 
 //decode

 for(let current of parameters)
 {
  const parts=split(current,"=",2);
  
  const key=front(parts);
  const value=decodeURIComponent(back(parts));
  
  result[key]=value;  
 }
 
 return result;
}
