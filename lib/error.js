//error

//stop

function stop()
{
 //console.log("stop!");
 //debugger;
 
 throw new Error("stop");
}

//check

function check(value)
{
 if(!value)
  fatal("Check failed");
}

//trap

function trap(callback)
{
 const result=(...parameters)=>
 { 
  try
  {
   return callback.apply(null,parameters);
  }
  catch(exception)
  {
   //fatal
   
   fatal("Trapped error",quotes(exception.message),"from",split(callstack(exception)));
  }
 }
 
 return result;
}

//fatal

function fatal(...parameters)
{
 //callstack
 
 print(); 
 print("Callstack:");
 print(indent(callstack()));

 //format
 
 const line=[];
 
 print();
 
 for(let current of parameters)
 {
  //string
    
  if(is_string(current))
  {
   line.push(current);
   
   continue;
  }
  
  //flush
  
  if(line.length>0)
  {
   print.apply(null,line);
   
   line.clear();
  }
  
  //dump
  
  print(indent(dumpify(current)));
 }

 //flush
  
 if(line.length>0)
  print.apply(null,line);
  
 //die
 
 die();
}

//die

function die()
{
 //status
 
 //pkg.status="dead";
 
 //exit
 
 exit();
}

//callstack

function callstack(exception)
{
 if(is_nothing(exception))
  exception=new Error;
  
 //lines
  
 let lines=split(exception.stack.trim());
 
 //clean
  
 const clean=(pattern,replace)=>
 {
  const buffer=[];
  
  for(let current of lines)
  {
   current=current.trim();
   current=current.replace(pattern,replace);
   current=current.trim();

   //empty
   
   if(current.length==0)
    continue;
   
   //push
   
   buffer.push(current);
  }
  
  //update
  
  lines=buffer;
 }
 
 //v8
 
 if(is_v8())
 {
  //clean
  
  clean(/^at (.*)$/,"$1");
  clean(/^Error: (.*)$/,"");
  clean(/^Error$/,""); 
  
  //remove itself
 
  lines.shift();
 }

 return join(lines);
}
