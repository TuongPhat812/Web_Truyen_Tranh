$(document).ready(function () {
    histories();
    addPaginate();
    //getDatas();
    openCity(event, 'Top tháng');
});
$('.tab').click(function(){
    $('.defaultTab').removeClass("defaultTab");
})
function addPaginate() {
    var pageLength = dataset.length / 20;
    if (dataset.length % 20 !== 0)
        pageLength++;

    let htmtDatas = '';


    for (var i = 0; i < pageLength; i++) {
        htmtDatas += `<input class="button2" type="button" value="${i+1}" onclick="getPagination(${i})">`
    }
    $('.button1').append(htmtDatas);

}

function getPagination(valuePage) {
    var dataMini = dataset.slice(Number(valuePage) * 20, Number(valuePage) * 20 + 20);
    let htmtDatas = '';

    dataMini.forEach(elm => {
        htmtDatas += `
            <a href="../trangchitiet/chitiet.html#${elm.idNumber}">
                <div class="noidung1">
                    <div class="hinhanh"><img src="../${elm.image}" alt="" height="100%" width="100%"></div>
                    <div class="thongtin">
                        <a class="themchovui" href="../trangchitiet/chitiet.html#${elm.idNumber}" style="text-decoration: none;">${elm.title}</a><br>
                        <a class="themchovui" href="../clickdoctruyen/doctruyen.html#${elm.idNumber}" style="text-decoration: none;" onclick="saveHistory(${elm.idNumber})">Chap 1</a>
                    </div>
                </div>
            </a>
            `;
    });
    $('#addImg').empty();
    $('#addImg').append(htmtDatas);

}
var tags = new Array();
tags['chuyen-sinh'] = "chuyển sinh";
tags['hanh-dong'] = "hành động";
tags['truyen-mau'] = "truyện màu";
tags['ngon-tinh'] = "ngôn tình";
tags['hai-huoc'] = "hài hước";
tags['drama'] = "drama";
tags['xuyen-khong'] = "xuyên không";
tags['kinh-di'] = "kinh dị";
tags['shounen'] = "shounen";
tags['thieu-nhi'] = "thiếu nhi";
tags['phieu-luu'] = "phiêu lưu";
tags['hoc-duong'] = "học đường";
tags['gia-tuong'] = "giả tưởng";

function getDatas() {
    var dataMini = dataset.slice(0, 20);
    let htmtDatas = '';

    const hash = window.location.hash;
    const strArr = hash.split('#');


    var tag = tags[strArr[1]];

    var keyword = tag;
    console.log(keyword);
    if (keyword === undefined) {
        dataMini.forEach(elm => {
            htmtDatas += `
                <a href="../trangchitiet/chitiet.html#${elm.idNumber}">
                    <div class="noidung1">
                        <div class="hinhanh"><img src="../${elm.image}" alt="" height="100%" width="100%"></div>
                        <div class="thongtin">
                            <a class="themchovui" href="../trangchitiet/chitiet.html#${elm.idNumber}" style="text-decoration: none;">${elm.title}</a><br>
                            <a class="themchovui" href="../clickdoctruyen/doctruyen.html#${elm.idNumber}" style="text-decoration: none;" onclick="saveHistory(${elm.idNumber})">Chap 1</a>
                        </div>
                    </div>
                </a>
                `;

        });
        $('#addImg').empty();

        $('#addImg').append(htmtDatas);
    } else if (keyword !== '') {
        var datas = dataset.filter(elm => {
            return elm.tags.indexOf(keyword) !== -1;
        });

        console.log(datas);
        datas.forEach(elm => {
            htmtDatas += `
                 <a href="../trangchitiet/chitiet.html#${elm.idNumber}">
                 <div class="noidung1">
                     <div class="hinhanh"><img src="../${elm.image}" alt="" height="100%" width="100%"></div>
                     <div class="thongtin">
                         <a class="themchovui" href="../trangchitiet/chitiet.html#${elm.idNumber}" style="text-decoration: none;">${elm.title}</a><br>
                         <a class="themchovui" href="../clickdoctruyen/doctruyen.html#${elm.idNumber}" style="text-decoration: none;" onclick="saveHistory(${elm.idNumber})">Chap 1</a>
                     </div>
                 </div>
             </a>
             `;

        });
        $('#addImg').empty();
        $('#addImg').append(htmtDatas);

        tag = tag.toUpperCase();
        var titleTag = '';
        titleTag += `THỂ LOẠI TRUYỆN >> ${tag}`
        $('#addTitleTag').empty();
        $('#addTitleTag').append(titleTag);
    }

    $(".clickTheLoai").click(function () {
        var tagClone = $(this).attr('id');
        var link = 'TheLoai.html';
        link += `#${tagClone}`;
        window.location.replace(link);
        location.reload();
    });

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
                        <a class="themchovui" href="../clickdoctruyen/doctruyen.html#${elm.idNumber}" style="text-decoration: none;" onclick="saveHistory(${elm.idNumber})">Chap 1</a>
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