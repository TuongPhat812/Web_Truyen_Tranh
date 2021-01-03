function DomID(id){
    return document.getElementById(id)
}

var thanhVien = []

if (localStorage.getItem('thanhVien')){
    
    thanhVien = JSON.parse(localStorage.getItem('thanhVien'))

    console.log(thanhVien.email)

    DomID('txtThanhVien').innerHTML = thanhVien.fullName
    DomID('txtLogout').innerHTML = '( Logout )'
    DomID('hideLogin').setAttribute('style', 'display: none;')
    DomID('hideDangKy').setAttribute('style', 'display: none;')
    DomID('hide').setAttribute('style', 'display: none;')
    
}