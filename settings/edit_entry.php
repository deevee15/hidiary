<?
    require('bd.php');
    $login == $_COOKIE['login'];
    $text = $_POST['text'];
    $entry_id = $_POST['id'];
    if(!empty($_COOKIE['login'])){
        if(empty($text)){ echo 'err1';}
        else {
            $q = "UPDATE entries SET text = '".$text."' WHERE id = '".$entry_id."'";
            $get = $mysqli->query($q) or die(mysqli_error());
            echo'ok';
        }
    }
    else echo 'error';
?>