$(document).ready(function(){
    //histories();
    
    getDatas();
    getDatasChapter();
    openCity(event, 'Top tháng');

    $('#huytheodoi').click(function(){
        $(this).replaceWith(`<div id="TheoDoi" class="theodoi">
        <i class="fa fa-heart" style="font-size:auto;color:red;"></i>
        <b>Theo dõi</b>
    </div>`);
    });
    $('#TheoDoi').click(function(){
        $(this).replaceWith(`<div id="huytheodoi" class="theodoi">
        <i class="fa fa-heart" style="font-size:auto;color:red; background-color: rgb(95, 150, 14);"></i>
        <b>Hủy theo dõi</b>
    </div>`);
    });
    
    
});
    



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
function getDatas() {
    
    let htmtDatas = '';
    /// Get id with hash
    const hash = window.location.hash;
    const strArr = hash.split('#');
    
    var elm = dataset[strArr[1]];

    let htmtDatasClone = '';
    htmtDatasClone += `${elm.tags[0]}`;

    for(var elmClone = 1; elmClone < elm.tags.length; elmClone++)
        htmtDatasClone += `  -  ${elm.tags[elmClone]}`;
    
    htmtDatas += `
            <div>
                <h1 class="tentruyen">${elm.title}</h1>
            </div>
            <div class="block-details">
                <div class="anhtruyen">
                    <img src="../${elm.image}" alt="" style="width:100%;height:100%">
                </div>
                <div class="gioithieu">
                    <div class="gt">
                        <div class="item-gt">
                            <div class="mini-item-gt"><label>Tác giả</label></div>
                            <div class="mini-item-gt" style="word-wrap: break-word;"><label>${elm.author}</label></div>
                        </div>
                        <div class="item-gt">
                            <div class="mini-item-gt"><label>Tình trạng</label></div>
                            <div class="mini-item-gt"><label>${elm.status}</label></div>
                        </div>
                        <div class="item-gt">
                            <div class="mini-item-gt"><label>Thể loại</label></div>
                            <div class="mini-item-gt"><a href="" style="text-decoration: none; color: blue; text-transform: uppercase;">${htmtDatasClone}</a></div>
                        </div>
                        <div class="item-gt">
                            <div class="mini-item-gt"><label>Lượt xem</label></div>
                            <div class="mini-item-gt"><label>1231231231</label></div>
                        </div>
                    </div>
                    
                    <div class="gt1">
                    </div>
                    
                    <div class="cacnutlenh">
                        <a href="chitiet.html#${elm.idNumber}">
                            <div id="TheoDoi" class="theodoi">
                                <i class="fa fa-heart" style="font-size:auto;color:red; background-color: rgb(95, 150, 14);"></i>
                                <b>Theo dõi</b>
                            </div>
                        </a>
                        <a href="../clickdoctruyen/doctruyen.html#${elm.idNumber}" onclick="saveHistory(${elm.idNumber})">
                            <div class="doctudau">
                            <b>Đọc từ đầu</b>
                            </div>
                        </a>
                        <a href="../clickdoctruyen/doctruyen.html#${elm.idNumber}" onclick="saveHistory(${elm.idNumber})">
                            <div class="docmoinhat">
                            <b>Đọc mới nhất</b>
                            </div>
                        </a>
                            
                    </div>
    
                </div>
            </div>
            `;
        
    
    $('.noidungtruyen').before(htmtDatas);

    $(".clickChiTiet").click(function () {
        var link = $(this).attr('href');
        window.location.replace(link);
        location.reload();
    });
}
function getDatasChapter() {
    
    let htmtDatas = '';
    let htmtDatasClone = '';
    /// Get id with hash
    const hash = window.location.hash;
    const strArr = hash.split('#');
    
    var elm = dataset[strArr[1]];

    for(var i = 20; i > 10; i--){
        htmtDatas += `
            <a class="chapter" href="../clickdoctruyen/doctruyen.html#${elm.idNumber}" onclick="saveHistory(${elm.idNumber})" style="text-decoration: none;">
                <li>Chương ${i}</li>   
            </a>
            <hr>
        `;
    }
    htmtDatasClone += `<div id="addButtonXemThem" style="text-align: center;"><a class="buttonXemThem" href="#${elm.idNumber}"><span>+</span> Xem thêm</a></div>`;

    $('#addDanhSach').empty();
    $('#addDanhSach').append(htmtDatas);
    $('.danhsachchuongthatsu').append(htmtDatasClone);

    $('.buttonXemThem').click(function (){
        for(var i = 10; i > 0; i--){
            htmtDatas += `
                <a class="chapter" href="../clickdoctruyen/doctruyen.html#${elm.idNumber}" onclick="saveHistory(${elm.idNumber})" style="text-decoration: none;">
                    <li>Chương ${i}</li>   
                </a>
                <hr>
            `;
        }
        $('#addButtonXemThem').remove();
        $('#addDanhSach').empty();
        $('#addDanhSach').append(htmtDatas);
    });
    
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

const btnMoveTop = document.querySelector(".move-top");
window.addEventListener("scroll", (e) => {
  if (window.pageYOffset > 150) {
    btnMoveTop.classList.add("show");
  } else {
    btnMoveTop.classList.remove("show");
  }
});