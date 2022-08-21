<?
    require('bd.php');
    $login == $_COOKIE['login'];
    $status = $_POST['status'];
    $entry_id = $_POST['id'];
    if(!empty($_COOKIE['login'])){
        if(empty($status)){echo 'err1';}
        else{
            $q = "UPDATE entries SET status = '".$status."' WHERE id = '".$entry_id."'";
            $get = $mysqli->query($q) or die(mysqli_error());
            echo'ok';
        }
    }
    else echo 'error';
?>