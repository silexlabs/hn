//to

//to hsl

function to_hsl(value)
{
 const rgb=to_rgb(value);

 //compute
 
 const r=rgb.r/255;
 const g=rgb.g/255;
 const b=rgb.b/255;
 
 const max=Math.max(r,g,b);
 const min=Math.min(r,g,b);

 let h=0;
 let s=0;
 let l=(max+min)/2;

 if(max!=min)
 {
  const delta=max-min;
  
  if(l>0.5)
   s=delta/(2-max-min)
  else
   s=delta/(max+min);
   
  if(max==r)
  {
   h=(g-b)/delta;
   
   if(g<b)
    h+=6;
  }
  else if(max==g)
   h=(b-r)/delta+2;
  else if(max==b)
   h=(r-g)/delta+4;
   
  h/=6;
 }
 
 //scale
 
 h*=360;
 s*=100;
 l*=100;
 
 //truncate
 
 h=Math.trunc(h);
 s=Math.trunc(s);
 l=Math.trunc(l);
 
 //result
 
 const result={h:h,s:s,l:l};
 
 //hsl to string
 
 const hsl_to_string=()=>
 {
  const fields=[result.h,result.s+"%",result.l+"%"];
  
  return "hsl"+parens(fields.join(","));
 }
 
 //method
 
 define_method(result,"toString",hsl_to_string);

 return result;
}

//to rgb

function to_rgb(value)
{
 value=to_string(value);
 
 const div=body().add();
 
 //use css to get an rgb()
 
 div.style("color",value);
 
 const string=div.style("color");
 
 div.remove();
 
 //simplify
 
 const discards=["rgb","(",")",","];
 const parts=filter_empty(replace(string,discards," ").split(" "));
 
 check(parts.length==3);
 
 //make
 
 const result= 
 {
  r:to_integer(parts[0]),
  g:to_integer(parts[1]),
  b:to_integer(parts[2])
 };

 //rgb to string
 
 const rgb_to_string=()=>
 {
  const fields=[result.r,result.g,result.b];
  
  return "rgb"+parens(fields.join(","));
 }
 
 //method
 
 define_method(result,"toString",rgb_to_string);
 
 return result;
}

//to px

function to_px(value)
{
 //integer
 
 if(is_integer(value))
  return to_string(value)+"px";
  
 //any
  
 return to_string(value);
}
