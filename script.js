async function CityId  (target){
    let id=0;
    let arr=target.split(",")
    console.log(arr);
    let pre_list= await fetch("./city.list.json");
    let list= await pre_list.json();
    list.forEach(el => {
        if (el.name==arr[0] && el.country==arr[1]){
            id=el.id;
        }
    });
    if (id==0){
        console.log("City not found");
    }
    return id;
}    
    
const key="APPID="+"744128119f1ba4097bd9904b7f56efeb";
document.getElementById("run").addEventListener("click", async function (){
    var target=document.getElementById("target").value;
    console.log(target);
   /* var id= await CityId(target);
    console.log("City id: "+ id);*/

    let url="https://api.openweathermap.org/data/2.5/forecast?q="+target+"&"+key;
    var pre_res= await fetch(url)
    var res=await pre_res.json();
    console.log(pre_res);
    console.table(res.list);

})



