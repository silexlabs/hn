//css

//css var

function css_var(name)
{
 const root=front(by_selector(":root"));
 
 return root.style("--"+name);
}

//css

function css(rule,key,value)
{
 //unit
 
 if(is_integer(value)) 
  value=to_px(value);
  
 check(is_string(rule));
 check(is_string(key));
 check(is_string(value));
 
 //rule

 const dynamic=body().dynamic;
 const rules=dynamic.rules;
 
 rules[rule]=optional(rules[rule],{});
  
 //property
 
 const properties=rules[rule];

 if(key in properties)
 {
  //no change
  
  if(properties[key]==value)
   return;
 }
 
 properties[key]=value;
 
 //generate
 
 const lines=[];
 
 for(let rule in rules)
 {
  const current=rules[rule];
  const strings=[];
  
  for(let key in current)
  {
   strings.push(key+":"+current[key]+";");
  }
  
  lines.push(rule+" "+braces(strings.join(" ")));
 }
 
 //update
 
 dynamic.text(join(lines));
}
