<?
    require('bd.php');
    $login = $_COOKIE['login'];
    $search= $_POST['search'];
    $search = mb_eregi_replace("[^a-zа-яё0-9 ]", '', $search);
    $search = trim($search);
    $entries = array();
    if(!empty($login)){
    $result = mysqli_query($mysqli,"SELECT * FROM `users` WHERE `email` = '$login' OR `phone` = '$login.' "); 
    while($row = mysqli_fetch_array($result)) {$id=$row['id'];}
        $res = mysqli_query($mysqli,"SELECT * FROM `entries` WHERE owner = '$id' AND text LIKE '%{$search}' ORDER BY id DESC");
        if(mysqli_num_rows($res) == 0) {echo'404';}
        else{
            while($row = mysqli_fetch_array($res)) { 
                $e_id=$row['id'];
                $date=$row['date'];
                $name=$row['name'];
                $text=$row['text'];
                $add=$row['additional'];
                $status=$row['status'];
                $entries[] = array(
                    'id'=>$e_id,
                    'owner'=>$id, 
                    'date'=>$date, 
                    'name'=>$name, 
                    'text'=>$text,  
                    'additional'=>$add, 
                    'status'=>$status,
                );
            }
            echo json_encode($entries);
        }
    }
?>