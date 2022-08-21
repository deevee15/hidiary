<?
    if(!empty($_COOKIE['login'])) header('Location: /entries.php');
?>
<head>
    <title>hidiary! - type your secret things</title>
    <link rel="stylesheet" href="css/index.css">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet">
    <link href="http://fonts.cdnfonts.com/css/gothic-a1" rel="stylesheet">
    <link rel="stylesheet" href="https://use.typekit.net/aij1fiz.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
</head>
<body>
    <div class="left">
        <div class="left__title">
            <div>
                <p>Welcome to</p>
                <object data="icons/hidiary.svg" type=""></object>
            </div>
            <div>Type your login info below.</div>
        </div>
        <div class="left__form">
            <div class="left__form-info">
                <p>The password you typed is incorrect. Please, try again.</p>
            </div>
            <div class="login-form">
                <input type="text" placeholder="E-mail or phone number" class="form__login">
                <div class="left__password-form" onselectstart="return false">
                    <div><object data="icons/eye.svg" type=""></object></div>
                    <input type="password" placeholder="Password" class="form__password">
                </div>
                <button class="left__form-singin">Sing in</button>
                <button class="left__form-create">Create an account</button>
            </div>
            <div class="singup-form">
                <input type="text" placeholder="E-mail" class="form__login">
                <input type="text" placeholder="Phone number" class="form__phone-login">
                <input type="text" placeholder="Your username" class="form__username">
                <div class="left__password-form firstPass" onselectstart="return false">
                    <div><object data="icons/eye.svg" type=""></object></div>
                    <input type="password" placeholder="Password" class="form__password">
                </div>
                <div class="left__password-form secondPass" onselectstart="return false">
                    <div><object data="icons/eye.svg" type=""></object></div>
                    <input type="password" placeholder="Repeat the password" class="form__password repassword">
                </div>
                <button class="left__form-singup">Sing up</button>
                <button class="left__back-to-login">Back to login</button>
            </div>
        </div>
    </div>
    <div class="right">
        <div class="right__circle-lines">
            <object data="img/lines.svg" type=""></object>
        </div>
        <div class="right__line">
            <svg width="94" height="930" viewBox="0 0 94 930" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0.999985" y1="4.37114e-08" x2="0.999944" y2="930" stroke="black" stroke-width="2"/>
                <line x1="1.99998" y1="476" x2="94" y2="476" stroke="black" stroke-width="2"/>
            </svg>
        </div>
        <div class="right__big-text"><p>type your DAILY ROUTINE here.</p></div>
        <div class="right__text"><p>nothing might be hidden</p></div>
    </div>
    <script defer type="module" src="/js/index.js"></script>
</body>