//include

//is browser

function is_browser()
{
 return !is_cli();
}

//is cli

function is_cli()
{
 return typeof window=="undefined";
}

//init browser

function init_browser()
{
 const pkg=
 {
  stop:stop,  //save window.stop
 }
 
 //include

 const include=(path)=>
 {
  const script=document.createElement("script");

  script.setAttribute("src",path);

  document.body.appendChild(script);
 }

 //global
 
 window.pkg=pkg;
 window.include=include;
}

//init cli

function init_cli()
{
 const pkg=
 {
  child_process:require("child_process"),
  fs:require("fs"),
  http:require("http"),
  https:require("https"),
  os:require("os"),
  net:require("net"),
  path:require("path"),
  util:require("util"),
  vm:require("vm"),
 }

 //load

 const load=(path)=>
 {
  try
  {
   return pkg.fs.readFileSync(path).toString();
  }
  catch(exception)
  {
   fatal("Can't load",quotes(path),exception);
  }
 }

 //include

 const include=(path)=>
 {
  const file=pkg.path.join(__dirname,path);
  
  pkg.vm.runInThisContext(load(file),{filename:file});
 }

 //global

 global.pkg=pkg; 
 global.include=include;
 global.load=load;
 global.is_cli=is_cli;
 global.is_browser=is_browser;
}

//startup browser

function startup_browser(internal)
{
 //on main
  
 const on_main=()=>
 {
  //remove load event
   
  removeEventListener("load",on_main);
   
  //on
  
  const on=()=>
  {
   //internal
   
   internal();
   
   //quirks mode
   
   if(document.compatMode!="CSS1Compat")
    print("CSS quirks mode detected",parens(document.compatMode));

   //main
   
   main();
  }
  
  //trap
  
  trap(on).apply(null);
 }
 
 //add load event
  
 addEventListener("load",on_main);
}

//startup cli

function startup_cli(internal)
{
 //on main
  
 const on_main=()=>
 {
  //internal
  
  internal();
  
  //parameters
  
  const parameters=process.argv.slice(1);
  
  //make self relative
  
  parameters[0]=relative_path(parameters[0]);
  
  //main

  main.apply(null,parameters);
 }
 
 //enable further loading

 setImmediate(trap(on_main));
}

//init

function init()
{
 //init
 
 if(is_browser())
  init_browser();
 else
  init_cli();
  
 //lib
 
 const lib=(path)=>
 {
  if(is_browser())
  {
   //no __dirname defined
   
   path="lib/"+path;
  }
  
  //include
  
  include(path);
 }
  
 //common

 lib("container.js");
 lib("control.js");
 lib("decycle.js");
 lib("dump.js");
 lib("error.js");
 lib("function.js");
 lib("is.js");
 lib("print.js");
 lib("prototype.js");
 lib("string.js");
 lib("time.js");
 lib("to.js");
 lib("transform.js");

 //includes

 if(is_browser())
 {
  lib("browser/body.js");
  lib("browser/css.js");
  lib("browser/dump.js");
  lib("browser/http.js");
  lib("browser/mirror.js");
  lib("browser/page.js");
  lib("browser/print.js");
  lib("browser/system.js");
  lib("browser/to.js");
  lib("browser/xhr.js");
 }
 else
 {
  lib("cli/dump.js");
  lib("cli/fs.js");
  lib("cli/network.js");
  lib("cli/path.js");
  lib("cli/print.js");
  lib("cli/system.js");
 }
 
 //on internal
 
 const on_internal=()=>
 {  
  //pkg.status="initialized";
  pkg.start_time=micro_time();
 }
  
 //startup
 
 if(is_browser())
  startup_browser(on_internal);
 else
  startup_cli(on_internal);
}

//entry point

init();
