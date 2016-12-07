//dejson

//dejson
   
function dejson(node)
{
 //is title

 const is_title=(data)=>
 {
  return is_defined(data.title);
 }
 
 //is coordinates
 
 const is_coordinates=(data)=>
 {
  return is_defined(data.longitude)&&is_defined(data.latitude);
 }

 //on title
 
 const on_title=(node,data)=>
 {
  //update
  
  document.title=data.title+" - "+document.title;
  
  //remove
  
  node.remove();
 }

 //on osm
 
 const on_osm=(node,data)=>
 {
  const longitude=data.longitude;
  const latitude=data.latitude;
  const zoom=optional(data.zoom,10);
   
  //size
  
  const width=node.attribute("width");
  const height=node.attribute("height");
  
  //osm
  
  const osm_image_url="http://staticmap.openstreetmap.de/staticmap.php";
  const osm_url="http://www.openstreetmap.org/";
  
  //urls
  
  const image_query=
  {
   center:latitude+","+longitude,
   zoom:zoom,
   size:width+"x"+height
  };
   
  const image_url=make_url(osm_image_url,image_query);
  //const link_url=osm_url+"#map="+encodeURIComponent(zoom+"/"+latitude+"/"+longitude);
  const link_url=osm_url+"#map="+zoom+"/"+latitude+"/"+longitude;
  
  //clear
  
  node.clear();
  
  //html
  
  const a=node.add("a");
  const img=a.add("img");
  
  a.attribute("href",link_url);
  img.attribute("src",image_url);
 }
 
 //on traverse
 
 const on_traverse=(node)=>
 {
  const text=node.text();
  
  //json
  
  if(!is_json(text))
   return;
   
  const data=JSON.parse(text);
  
  //title

  if(is_title(data))
  {
   on_title(node,data);
   
   return;
  }
  
  //coordinates
  
  if(is_coordinates(data))
  {
   on_osm(node,data);
   
   return;
  }
 }
 
 //traverse
 
 node.traverse(on_traverse); 
}
