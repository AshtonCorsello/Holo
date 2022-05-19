<?php

  //Write all file data to fileNames.txt and call the json handler with -p argument
  if ($_POST["Function"] == "upload") {

    $fileNames = fopen('fileNames.txt','w'); 

    fwrite($fileNames, $_POST["data"]."\n"); 

    for ($i = 0; $i < count($_FILES['File']['name']); $i++) {
      $targetDir = "../../UploadedFiles/";
      $file = $_FILES["File"]["name"][$i];
      $path = pathinfo($file);
      $filename = $path['filename'];
      $ext = $path['extension'];
      $temp_name = $_FILES["File"]["tmp_name"][$i];
      $path_filename_ext = $targetDir.$filename.".".$ext;
      move_uploaded_file($temp_name,$path_filename_ext);
      fwrite($fileNames, $file."\n");
    }
    fclose($fileNames);  

    exec("../json/./handler -p");

  }

  //Write all configuration data to configs.txt and then call the json handler with -s argument on it
  if ($_POST["Function"] == "save") {

    $writeToText = fopen("configs.txt", 'w'); 

    fwrite($writeToText, join("\n",$_POST["data"])); 

    fclose($writeToText); 

    exec("../json/./handler -s");
  }

  //Call json handler with -d and pass the name of the file as the second argument
  if ($_POST["Function"] == "delete") {

    $fileName = "\"".$_POST["File"]."\""; 

    $filePath = "../json/./handler -d ".$fileName; 

    exec($filePath); 
  }

?>