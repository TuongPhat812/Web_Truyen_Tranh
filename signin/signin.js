

    function DomID(id){
        return document.getElementById(id)
    }
    
    let redirect = false
    
    var arrTaiKhoan = [
        {
            fullName: "Tường Phát",
            email: "tuongphat208",
            password: "123"
        },
        {
            fullName: "Ninh Hấn",
            email: "ninhhan",
            password: "123"
        },
        {
            fullName: "Hoàng Lộc",
            email: "hoangloc",
            password: "123"
        },
        {
            fullName: "Xuân Hoài",
            email: "xuanhoai",
            password: "123"
        },
        {
            fullName: "Hiếu Lương",
            email: "hieuluong",
            password: "123"
        },
    ]
    
    if (localStorage.getItem('Account')){
        arrTaiKhoan.push(JSON.parse(localStorage.getItem('Account')))
    
        console.log(arrTaiKhoan)
    }
    
    if (localStorage.getItem('thanhVien')){
        localStorage.clear()
    }
    
    DomID('btn-DangNhap').addEventListener('click', () => {
    
        var emailDangNhap = DomID('inputEmail').value
        var passDangNhap = DomID('inputPassword').value
        
        var accountCheck = arrTaiKhoan.find(({email}) => email === emailDangNhap)
    
        if (accountCheck === undefined){
            DomID('modal').setAttribute('style', 'opacity: 1; visibility: visible;')
            DomID('kiemTraLoiEmailDangNhap').innerHTML = "Email Không Hợp Lệ!"
            DomID('inputEmail').value = ''
            DomID('inputPassword').value = ''
            return
        }else{
            DomID('kiemTraLoiEmailDangNhap').innerHTML = ''
            if (passDangNhap !== accountCheck.password){
                DomID('modal').setAttribute('style', 'opacity: 1; visibility: visible;')
                DomID('kiemTraLoiPassDangNhap').innerHTML = "Password Không Hợp Lệ!"
                DomID('inputPassword').value = ''
                return
            }
        }
    
        localStorage.setItem('thanhVien', JSON.stringify(accountCheck))
    
        DomID('inputEmail').value = ''
        DomID('inputPassword').value = ''
    
        DomID('modalDangNhapThanhCong').setAttribute('style', 'opacity: 1; visibility: visible;')
    
        DomID('kiemTraLoiEmailDangNhap').innerHTML = ''
        DomID('kiemTraLoiPassDangNhap').innerHTML = ''
    
        redirect = true
    
    })
    
        
    var modal = document.getElementsByClassName('modal')
    
    function clickModal(n){
        for (var i = n - 1; i < n; i++){
            modal[i].setAttribute('style', 'opacity: 0; visibility: hidden;')
    
            if (redirect){
                window.location.href = "/index.html";
            }
        }
    }
    
