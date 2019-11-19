const wrapWithTag = (content, tagname) => `<${tagname}>${content}</${tagname}>`;

const key = "APPID=" + "744128119f1ba4097bd9904b7f56efeb";

var pos = 0;
var globalList = [];
var e = document.getElementById("output");
e.onwheel = function (eve) {
    if (eve.deltaY < 0 && pos > 0) {
        pos--;
    } else if (eve.deltaY > 0 && pos < globalList.length - 1) {
        pos++;
    };
    tdWrap(globalList, pos);
}

function wrapTagNFont(cont, font, tag) {
    return `<${tag} style="font-size: ${font}px;">${cont}</${tag}>`;
}

function tdWrap(list, pos) {
    var str = "";
    var ind = 0;
    var fontSize = 30;
    str += wrapWithTag("Date & Time", "td");
    str += wrapWithTag("Temperature", "td");
    str += wrapWithTag("Humidity", "td");
    str += wrapWithTag("Description", "td");
    str += wrapWithTag("Clouds", "td");
    str += wrapWithTag("Wind Speed", "td");
    str += wrapWithTag("Rain?", "td");

    str = wrapWithTag(str, "tr");

    list.forEach(el => {
        if (ind == pos) {
            str += wrapTagNFont(el.dt_txt, fontSize, "td");
            str += wrapTagNFont(el.main.temp, fontSize, "td");
            str += wrapTagNFont(el.main.humidity, fontSize, "td");
            str += wrapTagNFont(el.weather[0].description, fontSize, "td");
            str += wrapTagNFont(el.clouds.all, fontSize, "td");
            str += wrapTagNFont(el.wind.speed, fontSize, "td");

            if (el.rain == undefined) {
                str += wrapTagNFont("no rain", fontSize, "td");
            } else {
                str += wrapTagNFont(el.rain["3h"], fontSize, "td");
            }
        } else {

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
        }
        ind++;

        str = wrapWithTag(str, "tr");

        if (el.dt_txt[11] == "2") {
            str += "<tr><td> --------------- </td></tr>";
        }
    });

    str = wrapWithTag(str, "table");

    document.getElementById("output").innerHTML = str;
}


document.getElementById("run").addEventListener("click", async function () {
    var target = document.getElementById("target").value;
    console.log(target);

    let url = "https://api.openweathermap.org/data/2.5/forecast?q=" + target + "&units=metric" + "&" + key;
    var pre_res = await fetch(url)
    var res = await pre_res.json();
    globalList = res.list;

    tdWrap(globalList, pos);
})