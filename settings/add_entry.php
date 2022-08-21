<?
    require('bd.php');
    $login = $_COOKIE['login'];
    $result = mysqli_query($mysqli,"SELECT * FROM `users` WHERE `email` = '".$login."' OR `phone` = '".$login."'");
    if(mysqli_num_rows($result)==0){echo 'error';}
    else{
        while($row = mysqli_fetch_array($result)) {$id=$row['id'];}
        // if (!empty($_FILES['files']['tmp_name'])){
        //     for($key=0;$key<count($_FILES['files']['tmp_name']);$key++){
        //         $upload_path = __DIR__ . "/upload/";
        //         $user_filename = $_FILES['files']['name'][$key];
        //         $userfile_basename = pathinfo($user_filename,PATHINFO_FILENAME );
        //         $userfile_extension = pathinfo($user_filename, PATHINFO_EXTENSION);
        //         $server_filename = $userfile_basename . "." . $userfile_extension;
        //         $server_filepath = $upload_path . $server_filename;
        //         $i = 0;
        //         while(file_exists($server_filepath)){
        //             $i++;
        //             $server_filepath = $upload_path .  $userfile_basename . "($i)." . $userfile_extension;
        //         }
        //         if (copy($_FILES['files']['tmp_name'][$key], $server_filepath)){
        //             $response['files'][] =  $server_filepath;
        //             $response['status'] = 'ok';
        //         }
        //     }
        // }
        $e_name = $_POST['name'];
        $e_text = $_POST['text'];
        $e_additional = $filePath;
        $date = date('d.m.Y/H:m');
        $q = "INSERT INTO entries (owner, date, name, text, additional) VALUES('$id', '$date', '$e_name', '$e_text', '$additional')";
        $get = $mysqli->query($q) or die(mysqli_error());
        echo 'ok'.$_FILES['attach']['name'];
    }
    // $path = 'uploads/'.basename($_FILES['files']['name']);
    // move_uploaded_file($_FILES['files']['tmp_name'], $path);
?>