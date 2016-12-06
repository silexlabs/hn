//osm

//osm static map
   
function osm_static_map(node)
{
 //is coordinates
 
 const is_coordinates=(data)=>
 {
  return is_defined(data.longitude)&&is_defined(data.latitude);
 }
 
 //on traverse
 
 const on_traverse=(node)=>
 {
  const text=node.text();
  
  //json
  
  if(!is_json(text))
   return;
   
  const data=JSON.parse(text);
  
  //coordinates
  
  if(!is_coordinates(data))
   return;

  const longitude=data.longitude;
  const latitude=data.latitude;
  const zoom=optional(data.zoom,10);
   
  //size
  
  const width=node.attribute("width");
  const height=node.attribute("height");
   
  //urls
  
  let image_url="";
  
  image_url+="http://staticmap.openstreetmap.de/staticmap.php";
  image_url+="?center="+latitude+","+longitude;
  image_url+="&zoom="+zoom;
  image_url+="&size="+width+"x"+height;
  
  let osm_url="";
  
  osm_url+="http://www.openstreetmap.org/#map";
  osm_url+="="+zoom;
  osm_url+="/"+latitude;
  osm_url+="/"+longitude;
  
  //html
  
  node.html("<a href="+quotes(osm_url)+"><img src="+quotes(image_url)+" /></a>");
 }
 
 //traverse
 
 node.traverse(on_traverse); 
}
