<?
    require('bd.php');
    if(empty($_COOKIE['login'])){
        $email = $_POST['email'];
        $password = $_POST['password'];
        $username = $_POST['username'];
        $phone = $_POST['phone'];
        $q = "SELECT * FROM users WHERE email ='$email' OR phone = '$phone'";
        $get = $mysqli->query($q) or die(mysqli_error());
        if(mysqli_num_rows($get)==0){
            $date = date('d.m.Y/H:m');
            $req = "INSERT INTO users (email, phone, username, password, regdate) VALUES('$email', '$phone', '$username', '$password', '$date')";
            $res = $mysqli->query($req) or die(mysqli_error());
            if(!empty($email)) setcookie('login', $email, time()+7517515, '/');
            else setcookie('login', $phone, time()+7517515, '/');
            echo 'ok';
        }
        else{echo'002';}
    }
?>