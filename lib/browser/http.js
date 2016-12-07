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

//make url

function make_url(value,query={})
{
 value=to_string(value);
 
 const uri=parse_url(value).uri;
 
 //encode
 
 const parts=[];
 
 for(let key in query)
 {
  parts.push(key+"="+encodeURIComponent(query[key]));
 }
 
 //empty
 
 if(parts.length==0)
  return uri;
 
 return uri+"?"+parts.join("&");
}

//parse url

function parse_url(value)
{
 value=to_string(value);
 
 //a

 const a=document.createElement("a");
  
 a.href=value;
 
 //query
 
 const query={};
 const parameters=split(a.search.slice(1),"&");
 
 //decode

 for(let current of parameters)
 {
  const parts=split(current,"=",2);
  
  const key=front(parts);
  const value=decodeURIComponent(back(parts));
  
  query[key]=value;  
 }
 
 //uri
 
 const protocol=a.protocol;
 const host=a.hostname;
 const path=a.pathname;
 
 let port=a.port; 
 let uri=protocol+"//"+host;
 
 if(is_numeric(port))
 {
  port=to_integer(port);
  uri+=":"+port;
 }
 
 uri+=path;
  
 //result

 const result=
 {
  uri:uri,
  protocol:protocol,
  host:host,
  port:port,
  path:path,
  search:a.search,
  hash:a.hash,
  query:query,
 };
 
 return result;
}
