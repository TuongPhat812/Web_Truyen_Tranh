function DomID(id){
    return document.getElementById(id)
}

let redirect = false

if (localStorage.getItem('thanhVien')){
    
    window.location.href = "/index.html";
    
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

DomID('btn-DangKy').addEventListener('click', () => {
    var object = {
        fullName: DomID('inputName').value,
        email: DomID('inputEmailDangKy').value,
        password: DomID('inputPasswordDangKy').value
    }

    if (object.fullName === ''){
        DomID('modal').setAttribute('style', 'opacity: 1; visibility: visible;')
        DomID('kiemTraLoiName').innerHTML = "Tên Không Được Để Trống!"
        return;
    }else{
        DomID('kiemTraLoiName').innerHTML = ""
        DomID('kiemTraLoiPassDangKy').innerHTML = ""
        if (object.email === ''){
            DomID('modal').setAttribute('style', 'opacity: 1; visibility: visible;')
            DomID('kiemTraLoiEmailDangKy').innerHTML = "Email Không Được Để Trống!"
            return;
        }else{
            if (validateEmail(object.email)){
                DomID('kiemTraLoiEmailDangKy').innerHTML = ""
                if (object.password === ''){
                    DomID('modal').setAttribute('style', 'opacity: 1; visibility: visible;')
                    DomID('kiemTraLoiPassDangKy').innerHTML = "Password Không Được Để Trống!"
                    return;
                }
            }else{
                DomID('modal').setAttribute('style', 'opacity: 1; visibility: visible;')
                DomID('kiemTraLoiEmailDangKy').innerHTML = "Định Dạng Email Không Chính Xác!"
                return;
            }

        }
    }


    DomID('inputName').value = ''
    DomID('inputEmailDangKy').value = ''
    DomID('inputPasswordDangKy').value = ''

    DomID('modalDangKyThanhCong').setAttribute('style', 'opacity: 1; visibility: visible;')

    localStorage.setItem('Account', JSON.stringify(object))

    DomID('kiemTraLoiName').innerHTML = ''
    DomID('kiemTraLoiEmailDangKy').innerHTML = ''
    DomID('kiemTraLoiPassDangKy').innerHTML = ''

    redirect = true

})

var modal = document.getElementsByClassName('modal')

function clickModal(n){
    for (var i = n - 1; i < n; i++){
        modal[i].setAttribute('style', 'opacity: 0; visibility: hidden;')

        if(redirect){
            window.location.href = "/signin/signin.html";
        }
    }
}