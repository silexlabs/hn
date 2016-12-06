//print

//print

function print(...parameters)
{
 const string=prompt.apply(null,parameters); 
 const lines=string.split("\n");
 
 //add

 const console_=body().console; 
 const container=console_.container;
 const scroll=container.is_bottom_scroll();

 for(let current of lines)
 {
  current=current.trimRight();
  
  container.add("pre").text(current);

  //limit
  
  if(container.length()>150)
   container.shift();
 }
 
 //show

 console_.show();
 
 //scroll
 
 if(scroll)
  container.scroll_bottom();
  
 console_.scroll();
}
