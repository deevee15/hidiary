document.querySelector('.left__form-info').style.display = 'none';
function showPassword(e){
    let currentSrc = e.target.querySelector('object').data;
    if(currentSrc.includes('icons/eye.svg')){ 
        this.querySelector('object').data = 'icons/eye-closed.svg';
        document.querySelector('.form__password').type = 'text';
    } else {
        this.querySelector('object').data = 'icons/eye.svg';
        document.querySelector('.form__password').type = 'password';
    }
}
document.querySelector('.login-form .left__password-form > div').addEventListener('click', showPassword);
document.querySelector('.firstPass > div').addEventListener('click', showPassword);
document.querySelector('.secondPass > div').addEventListener('click', showPassword);
function errorAlert(text){
    document.querySelector('.left__form-info').style.display = 'block';
    document.querySelector('.left__form-info p').textContent = text;
    setTimeout( ()=>{
        document.querySelector('.left__form-info').style.display = 'none';
    }, 3000);
}
document.querySelector('.left__form-singin').addEventListener('click', () =>{
    let inputLogin = document.querySelector('.form__login').value, inputPassword = document.querySelector('.form__password').value;
    login(inputLogin, inputPassword);
    async function login(login, password){
        let req = await fetch('/settings/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            },
            body: 'login='+login+'&password='+password,
        });
        if(req.ok){
            let data = await req.text();
            if(data == '404'){errorAlert('Login or password is wrong. Please, try again.')}
            else if(data == '001'){errorAlert('Please, fill both input zones and try again.')}
            else{window.location = '/entries.php';}
        }
    }
});
document.querySelector('.left__form-create').addEventListener('click', function(){
    const regForm = document.querySelector('.singup-form');
    document.querySelector('.login-form').style.display = 'none';
    regForm.style.display = 'block';
    document.querySelector('.left__title div:last-child').textContent = 'Creating a new account in hidiary!';
    document.querySelector('.left__form-singup').addEventListener('click', async function(){
        const login = regForm.querySelector('.form__login').value,
        password = regForm.querySelector('.form__password').value, 
        username = regForm.querySelector('.form__username').value,
        phoneLogin = regForm.querySelector('.form__phone-login').value;
        if(!phoneLogin && !login){errorAlert('Please, type your email or phone number!');}
        else if(!password && !document.querySelector('.repassword').value){errorAlert('You did not type password. Please, do it.');}
        else if(password != document.querySelector('.repassword').value){errorAlert('You typed different passwords. Please, match them.');}
        else if(!username){errorAlert('Please, type your username!');}
        else{
            let req = await fetch('/settings/singup.php', {
                method: "POST",
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                body: 'email='+login+'&phone='+phoneLogin+'&password='+password+'&username='+username,
            });
            if(req.ok){
                let ans = await req.text();
                if(ans == '002'){errorAlert('User with login you typed already exists.');}
                else if(ans == 'ok'){window.location = '/entries.php';}
            }
        }
    });
});
document.querySelector('.left__back-to-login').addEventListener('click', function(){ 
    document.querySelector('.login-form').style.display = 'block';
    document.querySelector('.singup-form').style.display = 'none';
    document.querySelector('.left__title div:last-child').textContent = 'Type your login info below.';
});