/*async function CityId  (target){
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
}    */
/* var id= await CityId(target);
 console.log("City id: "+ id);*/

const wrapWithTag = (content, tagname) => `<${tagname}>${content}</${tagname}>`;

const key = "APPID=" + "744128119f1ba4097bd9904b7f56efeb";
document.getElementById("run").addEventListener("click", async function () {
    var target = document.getElementById("target").value;
    console.log(target);

    let url = "https://api.openweathermap.org/data/2.5/forecast?q=" + target + "&units=metric" + "&" + key;
    var pre_res = await fetch(url)
    var res = await pre_res.json();
    var list = res.list;
    var str = "";
    console.log(list[1].rain);
    str += wrapWithTag("Date & Time", "td");
    str += wrapWithTag("Temperature", "td");
    str += wrapWithTag("Humidity", "td");
    str += wrapWithTag("Description", "td");
    str += wrapWithTag("Clouds", "td");
    str += wrapWithTag("Wind Speed", "td");
    str += wrapWithTag("Rain?", "td");

    str = wrapWithTag(str, "tr");

    list.forEach(el => {
        str += wrapWithTag(el.dt_txt, "td");
        str += wrapWithTag(el.main.temp, "td");
        str += wrapWithTag(el.main.humidity, "td");
        str += wrapWithTag(el.weather[0].description, "td");
        str += wrapWithTag(el.clouds.all, "td");
        str += wrapWithTag(el.wind.speed, "td");

        if (el.rain == undefined) {
            str += wrapWithTag("no rain", "td");
        } else {
            str += wrapWithTag(el.rain["3h"], "td");
        }

        str = wrapWithTag(str, "tr");

    });

    str = wrapWithTag(str, "table");

    document.getElementById("output").innerHTML = str;
})