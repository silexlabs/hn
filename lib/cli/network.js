//network

//public ip

function public_ip()
{
 return front(execute("curl -s ipecho.net/plain"));
}

//local ips

function local_ips()
{
 const result=[];
 const interfaces=pkg.os.networkInterfaces();
 
 for(let name in interfaces)
 {
  const current=interfaces[name];
  
  for(let card of current)
  {
   if(card.internal)
    continue;
    
   const data=
   {
    name:name,
    address:card.address,
    family:to_lower(card.family)
   };
   
   result.push(data);
  }
 }
 
 return result;
}
