async function CityId  (target){
    let arr=target.split(",")
    console.log(arr);
    let pre_list= await fetch("./city.list.json");
    let list= await pre_list.json();
    console.log(list.length);
    /*list.forEach(el => {
        if (el.name==arr[0] && el.country==arr[1]){
            return (el.id);
        }
    });*/
    console.log("City not found");
    return 0;


}
(function (){
    var id=0;
    const key="APPID"+"403247d59c49d3321fc77e793af27b59";
    document.getElementById("run").addEventListener("click", async function (){
        var target=document.getElementById("target").value;
        console.log(target);
        var id= await CityId(target);
        console.log(id);
    
       /* let url="api.openweathermap.org/data/2.5/forecast?q="+target+"&"+key;
        var x=fetch(url)
            .then(()=>{
                console.log(url);
                let list=x.json();
                console.log(list);
            })
              
            .catch(console.log("Damn!"))*/
      
        
    })

})



