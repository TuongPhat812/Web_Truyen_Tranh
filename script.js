var firstImg = 0;
var lastImg = 5;
$(document).ready(function () {
    // APIS -> Restful API(GET(all, id), POST, PUT(id), DELETE(id))

    /* const getTodos = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
            console.log(response.data);
            response.data.forEach(x => console.log(x.title))
        } catch (error) {
            console.log(error);
        }
    } */

    //getTodos();

    // axios.get('https://jsonplaceholder.typicode.com/todos')
    //     .then(function (response) {
    //         // handle success
    //         console.log(response.data);
    //         response.data.forEach(x => console.log(x.title))
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })
    //     .then(function () {
    //         // always executed
    //     });

    // fetch('https://jsonplaceholder.typicode.com/todos')
    // .then(response => response.json())
    // .then(json => json.forEach(x => console.log(x.title)))

    
    addPaginate();
    getDatas();

    var endImg = $("img.slider:last").attr("idx");
    $("#next").click(function () {
        lastImg++;
        firstImg++;
        if (lastImg > endImg) {
            lastImg = 5;
            firstImg = 0;
            moveRight(endImg - 5);
        } else {
            moveLeft(1);
        }
    });
    $("#prev").click(function () {
        firstImg--;
        lastImg--;
        if (firstImg < 0) {
            lastImg = endImg;
            firstImg = endImg - 5;
            moveLeft(endImg - 5);
        } else {
            moveRight(1);
        }
    });
    var interval;
    var timer = function () {
        interval = setInterval(function () {
            $("#next").click();
        }, 5000);
    };
    timer();
    openCity(event, 'Top tháng');
});

function moveLeft(times) {

    for (var i = 1; i <= times; i++)
        $('img.slider').animate({
            left: '-=210px'
        }, 1200 / (times * 2));

    clearInterval(interval);
    //timer();
}

function moveRight(times) {

    for (var i = 1; i <= times; i++)
        $('img.slider').animate({
            left: '+=210px'
        }, 1200 / (times * 2));
    clearInterval(interval);
    timer();
}

function addPaginate() {
    var pageLength = dataset.length / 20;
    if (dataset.length % 20 !== 0)
        pageLength++;

    let htmtDatas = '';


    for (var i = 0; i < pageLength; i++) {
        htmtDatas += `<input class="button2 click${i}" type="button" value="${i+1}" onclick="getPagination(${i})">`
    }
    $('.button1').append(htmtDatas);

}

function getPagination(valuePage) {
    var dataMini = dataset.slice(Number(valuePage) * 20, Number(valuePage) * 20 + 20);
    let htmtDatas = '';

    dataMini.forEach(elm => {
        htmtDatas += `
            <a href="trangchitiet/chitiet.html#${elm.idNumber}">
                <div class="noidung1">
                    <div class="hinhanh"><img src="${elm.image}" alt="" height="100%" width="100%"></div>
                    <div class="thongtin">
                        <a class="themchovui" href="trangchitiet/chitiet.html#${elm.idNumber}" style="text-decoration: none;">${elm.title}</a><br>
                        <a class="themchovui" href="clickdoctruyen/doctruyen.html#${elm.idNumber}" style="text-decoration: none;" onclick="saveHistory(${elm.idNumber})">Chap 1</a>
                    </div>
                </div>
            </a>
            `;

    });
    $('#addImg').empty();

    $('#addImg').append(htmtDatas);

}

function getDatas() {
    var dataMini = dataset.slice(0, 20);
    let htmtDatas = '';

    dataMini.forEach(elm => {
        htmtDatas += `
            <a href="trangchitiet/chitiet.html#${elm.idNumber}">
                <div class="noidung1">
                    <div class="hinhanh"><img src="${elm.image}" alt="" height="100%" width="100%"></div>
                    <div class="thongtin">
                        <a class="themchovui" href="trangchitiet/chitiet.html#${elm.idNumber}" style="text-decoration: none;">${elm.title}</a><br>
                        <a class="themchovui" href="clickdoctruyen/doctruyen.html#${elm.idNumber}" style="text-decoration: none;"onclick="saveHistory(${elm.idNumber})">Chap 1</a>
                    </div>
                </div>
            </a>
            `;
    });
    $('#addImg').empty();
    $('#addImg').append(htmtDatas);
}
function removeItemOnce(arr, index) {
    var index = arr.indexOf(index);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
var historyClone = localStorage.getItem('idNumber') !== null ? JSON.parse(localStorage.getItem('idNumber')) : [];

function saveHistory(idNumber) {

    var getidNumber = Number(idNumber);

    removeItemOnce(historyClone, idNumber);
    historyClone.push(getidNumber);

    console.log(historyClone);

    localStorage.setItem('idNumber', JSON.stringify(historyClone));
}

function histories() {

    var dataHistory = new Array();
    for(var i = 0; i < historyClone.length; i++)
        dataHistory[i] = dataset[historyClone[i]];  
    
    let htmtDatas = '';

    dataHistory.forEach(elm => {
        htmtDatas += `
            <a href="trangchitiet/chitiet.html#${elm.idNumber}">
                <div class="noidung1">
                    <div class="hinhanh"><img src="${elm.image}" alt="" height="100%" width="100%"></div>
                    <div class="thongtin">
                        <a class="themchovui" href="trangchitiet/chitiet.html#${elm.idNumber}" style="text-decoration: none;">${elm.title}</a><br>
                        <a class="themchovui" href="clickdoctruyen/doctruyen.html#${elm.idNumber}" style="text-decoration: none;"onclick="saveHistory(${elm.idNumber})">Chap 1</a>
                    </div>
                </div>
            </a>
            `;
    });
    $('#addImg').empty();
    $('#addImg').append(htmtDatas);
}

function search() {
    var keyword = document.getElementById('input').value.toLowerCase();

    if (keyword != '') {
        var datas = dataset.filter(elm => {
            return elm.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });

        var htmtDatas = '';

        console.log(datas);
        datas.forEach(elm => {
            htmtDatas += `
                <a href="trangchitiet/chitiet.html#${elm.idNumber}">
                <div class="noidung1">
                    <div class="hinhanh"><img src="${elm.image}" alt="" height="100%" width="100%"></div>
                    <div class="thongtin">
                        <a class="themchovui" href="trangchitiet/chitiet.html" style="text-decoration: none;">${elm.title}</a><br>
                        <a class="themchovui" href="clickdoctruyen/doctruyen.html" style="text-decoration: none;" onclick="saveHistory(${elm.idNumber})">Chap 1</a>
                    </div>
                </div>
            </a>
            `;
        });
        $('#addImg').empty();
        $('#addImg').append(htmtDatas);
    } else {
        getDatas();
    }
}

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

const btnMoveTop = document.querySelector(".move-top");
window.addEventListener("scroll", (e) => {
    if (window.pageYOffset > 150) {
        btnMoveTop.classList.add("show");
    } else {
        btnMoveTop.classList.remove("show");
    }
});