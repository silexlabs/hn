//body

//body

function body()
{
 //exists
 
 if(is_something(document.body.mirror))
  return document.body.mirror;
  
 //create dynamic

 const create_dynamic=(container)=>
 { 
  const me=container.insert("style");
    
  me.rules={};
  
  return me;
 }

 //create console

 const create_console=(container)=>
 { 
  const me=container.insert();
  const spacer1=css_var("spacer1");
  const border1=css_var("border1");

  me.hide(); //start hidden
  me.id("console");
   
  me.heading=me.add().html("<b>Console</b>");
  me.container=me.add();
   
  //css
  
  me.heading.style("padding-bottom",spacer1);

  me.container.style("max-height","40vh");
  me.container.style("overflow","auto"); //scrollbars

  css("#console","margin-bottom",spacer1);
  css("#console","padding",spacer1); 
  css("#console","border",border1+" solid lightgray"); 
  
  css("#console pre","padding",0); 
  css("#console pre","margin",0); 
  css("#console pre","border-top",border1+" dashed whitesmoke");
  
  return me;
 }
  
 //create

 const me=mirror(document.body);
 
 me.dynamic=create_dynamic(me);
 me.console=create_console(me);
 
 return me;
}

