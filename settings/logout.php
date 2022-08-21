<?
    if(isset($_COOKIE['login'])){
        setcookie('login', '', -857157515, '/');
        echo 'ok';
    }
?>