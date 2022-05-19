<?php

  if ($_POST["Function"] == "upload") {

    $testfile = fopen('fileNames.txt','w'); 

    fwrite($testfile, $_POST["data"]."\n"); 

    for ($i = 0; $i < count($_FILES['File']['name']); $i++) {
      $targetDir = "../../UploadedFiles/";
      $file = $_FILES["File"]["name"][$i];
      $path = pathinfo($file);
      $filename = $path['filename'];
      $ext = $path['extension'];
      $temp_name = $_FILES["File"]["tmp_name"][$i];
      $path_filename_ext = $targetDir.$filename.".".$ext;
      move_uploaded_file($temp_name,$path_filename_ext);
      fwrite($testfile, $file."\n");
    }
    fclose($testfile);  

    exec("../json/./testhandler -p");

  }

  if ($_POST["Function"] == "save") {

    $writeToText = fopen("configs.txt", 'w'); 

    fwrite($writeToText, join("\n",$_POST["data"])); 

    fclose($writeToText); 

    exec("../json/./testhandler -s");
  }

  if ($_POST["Function"] == "delete") {

    $fileName = "\"".$_POST["File"]."\""; 

    $filePath = "../json/./testhandler -d ".$fileName; 

    exec($filePath); 
  }



  
  


?>