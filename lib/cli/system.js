//system

//shell

function shell(...parameters)
{
 //run
 
 const buffer=run.apply(null,parameters);
 
 //report
 
 print();
 print("run>",buffer.command); 
 
 for(let current of buffer.out)
 {
  print("out>",current);
 }

 for(let current of buffer.error)
 {
  print("error>",current);
 }
 
 const result=buffer.status;

 if(result!=0) 
  fatal("Command failed with status",result);
 
 return result;
}

//execute

function execute(...parameters)
{
 //run
 
 const buffer=run.apply(null,parameters);
 
 //error  
 
 if(buffer.status!=0||buffer.error.length>0)
  fatal("Command",quotes(buffer.command),"failed with",buffer);

 return buffer.out;
}

//run

function run(...parameters)
{
 const command=parameters.join(" ");
 
 //exec
 
 let status=0;
 let out="";
 let error="";

 try
 { 
  out=to_string(pkg.child_process.execSync(command,{stdio:"pipe"}));
 }
 catch(exception)
 {
  status=exception.status;
  out=to_string(exception.stdout);
  error=to_string(exception.stderr);
 }
 
 //normalize

 out=out.trimRight();
 error=error.trimRight();

 out=split(out);
 error=split(error);
 
 return {command:command,status:status,out:out,error:error};
}

//system

function system(...parameters)
{
 const command=parameters.join(" ");
 
 //exec
 
 try
 {
  pkg.child_process.execSync(command,{stdio:"inherit"});
 }
 catch(exception)
 {
  return exception.status;
 }
 
 return 0;
}

//sleep

function sleep(time)
{
 execute("sleep",time);
}

//exit

function exit()
{
 process.exit(42);
}
