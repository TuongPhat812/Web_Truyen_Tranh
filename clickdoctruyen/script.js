$(document).ready(function () {

    //histories();
    getDatas();
});

function getDatas() {
    let htmtDatas = '';
    /// Get id with hash
    const hash = window.location.hash;
    const strArr = hash.split('#');

    var elm = dataset[strArr[1]];

    htmtDatas += `
            <a class="linkTruyen" href="../trangchitiet/chitiet.html#${elm.idNumber}">${elm.title.toUpperCase()}</a> - <span style="font-size: 30px;">Chapter 1</span> <span style="font-size: 18px; font-style:italic;">[Cập nhật lúc: 16:30 27/12/2020]</span>
            `;
    $('#tenTruyen').empty();
    $('#tenTruyen').append(htmtDatas);


    let htmtDatasClone = '';
    htmtDatasClone += `
            <div class="quaylaitrangchu">
                <a href="../index.html">
                    <button style="font-size:24px;cursor: pointer;"><i class="fa fa-home"
                            style="font-size: auto;color: rgb(48, 38, 189); "></i></button>
                </a>
            </div>
            <div class="quaylailist">
                <a href="../trangchitiet/chitiet.html#${elm.idNumber}">
                    <button style="font-size:24px;cursor: pointer;"><i class=" fa fa-tasks"
                            style="font-size: auto;color: rgb(48, 38, 189);"></i></button>
                </a>
            </div>
            <div class="f5">
                <a href="doctruyen.html#${elm.idNumber}">
                    <button style="font-size:24px;cursor: pointer;"> <i class="fa fa-refresh"
                            style="font-size: auto;color: rgb(48, 38, 189);"></i></button>
                </a>
            </div>
            <div class="leftchap">
                <a href="doctruyen.html#${elm.idNumber}">
                    <button style="font-size:24px;cursor: pointer;"> <i class="fa fa-caret-square-o-left"
                            style="font-size: auto;color: rgb(48, 38, 189);"></i></button>
                </a>
            </div>
            <div class="chonchapnhanh">
                <select name="" id="" class="chonchap">
                    <option value="chap1">Chap 1</option>
                    <option value="chap2">Chap 2</option>
                    <option value="chap3">Chap 3</option>
                    <option value="chap4">Chap 4</option>
                    <option value="chap5">Chap 5</option>
                    <option value="chap6">Chap 6</option>
                    <option value="chap7">Chap 7</option>
                    <option value="chap8">Chap 8</option>
                    <option value="chap9">Chap 9</option>
                    <option value="chap10">Chap 10</option>
                    <option value="chap11">Chap 11</option>
                    <option value="chap12">Chap 12</option>
                    <option value="chap13">Chap 13</option>
                    <option value="chap14">Chap 14</option>
                    <option value="chap15">Chap 15</option>
                    <option value="chap16">Chap 16</option>
                    <option value="chap17">Chap 17</option>
                    <option value="chap18">Chap 18</option>
                    <option value="chap19">Chap 19</option>
                    <option value="chap20">Chap 20</option>
                </select>
            </div>
            <div class="rightchap">
                <a href="doctruyen.html#${elm.idNumber}">
                    <button style="font-size:24px;cursor: pointer;"> <i class="fa fa-caret-square-o-right"
                            style="font-size: auto;color: rgb(48, 38, 189);"></i></button>
                </a>
            </div>
    `;
    $('.buttonchucnang').append(htmtDatasClone);

    //let htmtDatasClone = '';
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


    for (var i = 0; i < historyClone.length; i++)
        dataHistory[i] = dataset[historyClone[i]];

    dataHistory.reverse();
    let htmtDatas = '';

    dataHistory.forEach(elm => {
        htmtDatas += `
            <a href="../trangchitiet/chitiet.html#${elm.idNumber}">
                <div class="noidung1">
                    <div class="hinhanh"><img src="../${elm.image}" alt="" height="100%" width="100%"></div>
                    <div class="thongtin">
                        <a class="themchovui" href="../trangchitiet/chitiet.html#${elm.idNumber}" style="text-decoration: none;">${elm.title}</a><br>
                        <a class="themchovui" href="../clickdoctruyen/doctruyen.html#${elm.idNumber}" style="text-decoration: none;"onclick="saveHistory(${elm.idNumber})">Chap 1</a>
                    </div>
                </div>
            </a>
            `;
    });
    $('#addImg').empty();
    $('#addImg').append(htmtDatas);
}
//search title
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
                    <div class="hinhanh"><img src="../${elm.image}" alt="" height="100%" width="100%"></div>
                    <div class="thongtin">
                        <a class="themchovui" href="../trangchitiet/chitiet.html" style="text-decoration: none;">${elm.title}</a><br>
                        <a class="themchovui" href="../clickdoctruyen/doctruyen.html" style="text-decoration: none;" onclick="saveHistory(${elm.idNumber})">Chap 1</a>
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
    $('#now').click();
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