<?
    require('bd.php');
    $login = $_POST['login'];
    $password = $_POST['password'];
    if(!empty($login) and !empty($password)){
        $q = "SELECT * FROM users WHERE (email='".$login."' AND password='".$password."') OR (phone='".$login."' AND password='".$password."')";
        $get = $mysqli->query($q) or die(mysqli_error());
        if(mysqli_num_rows($get) != 0){
            setcookie('login', $login, time()+7517515, '/');
            echo'ok';
        }
        else {echo'404';}
    }
    else {echo '001';}
?>