//mirror

//by selector

function by_selector(query)
{
 const result=[];
 const list=document.querySelectorAll(query);
 
 for(let current of list)
 {
  result.push(mirror(current));
 }
 
 return result;
}

//by id

function by_id(id)
{
 const node=document.getElementById(id);
 
 if(is_nothing(node))
  return null;
  
 return mirror(node);
}

//mirror

function mirror(node)
{
 //exists
 
 if(is_something(node.mirror))
  return node.mirror;

 //attach
 
 node.mirror={};
 
 const me=node.mirror;
 
 me.node=node;
 me.initial={};

 //clear

 me.clear=()=>
 {
  me.html("");
 }
 
 //add

 me.add=(element="div")=>
 {
  const result=mirror(document.createElement(element));
  
  me.node.appendChild(result.node);
  
  return result;
 }

 //insert
 
 me.insert=(element="div")=>
 {
  const result=mirror(document.createElement(element));
  
  me.node.insertBefore(result.node,me.node.firstChild);
  
  return result;
 }
 
 //shift

 me.shift=()=>
 {
  return mirror(me.node.removeChild(me.node.firstChild));
 }

 //remove

 me.remove=()=>
 {
  return mirror(me.node.parentNode.removeChild(me.node));
 }
 
 //traverse
 
 me.traverse=(callback)=>
 {
  check(is_function(callback));
  
  callback(me);
  
  const children=me.children();
  
  for(let current of children)
  {
   current.traverse(callback);
  }
 }
 
 //children

 me.children=()=>
 {
  const result=[];
  
  for(let current of me.node.childNodes)
  {
   //element
   
   if(current.nodeType==Node.ELEMENT_NODE)
    result.push(mirror(current));
  }
   
  return result;
 }
 
 //html

 me.html=(value)=>
 {
  //get

  if(is_undefined(value))
   return me.node.innerHTML;
   
  //set
  
  me.node.innerHTML=to_string(value);
  
  return me;
 }

 //normalize

 me.normalize=()=>
 {
  let html=me.html();
  
  html=replace(html,"\n"," ");
  html=replace(html,"  "," ");
  
  //update
  
  me.html(html);
  
  return me;
 }

 //text

 me.text=(value)=>
 {
  //get

  if(is_undefined(value))
  {
   const parts=[];
   
   for(let current of me.node.childNodes)
   {
    //text
    
    if(current.nodeType==Node.TEXT_NODE)
     parts.push(current.textContent);
   }
    
   return parts.join("");
  }
  
  //set
  
  me.node.textContent=to_string(value);
  
  return me;
 }

 //hide
 
 me.hide=()=>
 {
  //save initial value
  
  if(is_undefined(me.initial.display))
   me.initial.display=me.style("display");
  
  //set
  
  return me.style("display","none");
 }

 //show
 
 me.show=()=>
 {
  //not changed
  
  if(is_undefined(me.initial.display))
   return;
   
  //restore

  return me.style("display",me.initial.display);
 }

 //id

 me.id=(name)=>
 {
  return me.attribute("id",name);
 }

 //attribute

 me.attribute=(key,value)=>
 {
  check(is_string(key));
  
  //get
  
  if(is_undefined(value))
   return me.node.getAttribute(key);
  
  //unit
 
  if(is_integer(value)) 
   value=to_px(value);
   
  //set
    
  me.node.setAttribute(key,to_string(value));
  
  return me;
 }

 //font size
 
 me.font_size=(value)=>
 {
  return me.style("font-size",value);
 }

 //style
 
 me.style=(key,value)=>
 {
  check(is_string(key));
  
  //get
  
  if(is_undefined(value))
   return getComputedStyle(me.node).getPropertyValue(key);
  
  //unit
 
  if(is_integer(value)) 
   value=to_px(value);
   
  //set

  me.node.style[key]=to_string(value);
  
  return me;
 }
 
 //width
 
 me.width=(value)=>
 {
  return me.style("width",value);
 }

 //height
 
 me.height=(value)=>
 { 
  return me.style("height",value);
 }

 //length
 
 me.length=()=>
 {
  return me.node.children.length;
 }

 //scroll
 
 me.scroll=()=>
 {
  me.node.scrollIntoView();
 }

 //scroll bottom
 
 me.scroll_bottom=()=>
 {
  if(me.length()>0)
   me.node.lastChild.scrollIntoView();
 }
 
 //is bottom scroll
 
 me.is_bottom_scroll=()=>
 {
  const scroll_top=Math.trunc(me.node.scrollTop); //v8
  
  return me.node.scrollHeight-scroll_top==me.node.clientHeight;
 }
 
 //add event

 me.add_event=(event,on)=>
 {
  page().add_event(me.node,event,on);
 }

 //remove event

 me.remove_event=(event)=>
 {
  page().remove_event(me.node,event);
 }
 
 return me;
}
