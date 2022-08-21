<?
    require('bd.php');
    $login = $_COOKIE['login'];
    $type = $_GET['type'];
    if(empty($type)) $type = 0;
    $entries = array();
    if(!empty($login)){
        $result = mysqli_query($mysqli,"SELECT * FROM users WHERE email ='$login' OR phone = '$login'"); 
        while($row = mysqli_fetch_array($result)) {$id=$row['id'];}
        $res = mysqli_query($mysqli,"SELECT * FROM `entries` WHERE owner = '".$id."' AND status = '".$type."' ORDER BY id DESC");
        if(mysqli_num_rows($res) == 0) {echo$id;}
        else{
            while($row = mysqli_fetch_array($res)) { 
                $e_id=$row['id'];
                $date=$row['date'];
                $name=$row['name'];
                $text=$row['text'];
                $add=$row['additional'];
                $entries[] = array(
                    'id'=>$e_id,
                    'owner'=>$id, 
                    'date'=>$date, 
                    'name'=>$name, 
                    'text'=>$text,  
                    'additional'=>$add, 
                );
            }
            echo json_encode($entries);
        }
    }
?>