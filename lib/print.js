//print

//prompt

function prompt(...parameters)
{
 const lines=parameters.map(to_string).join(" ").split("\n");
 
 for(let key in lines)
 {
  //prepend time and escape the line
  
  lines[key]=now().toFixed(2)+"> "+escape_(lines[key]);
 }

 return join(lines);
}

//tree

function tree(value)
{
 print(treeify(value));
}

//dump

function dump(value)
{
 print(dumpify(value));
}
