//main list

//main list

function main_list()
{
 //on load markdown
 
 const on_load_markdown=(response)=>
 {
  by_id("content").add("div").html(response);
 }

 //on load list

 const on_load_list=(response)=>
 {
  xhr("https://api.github.com/markdown",on_load_markdown,"post",{text:response});
 }
 
 //group list

 xhr("https://raw.githubusercontent.com/antontarasenko/hacker-news-groups/master/readme.md",on_load_list);
}
