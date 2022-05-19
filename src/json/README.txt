This 'json' folder holds all files necessary for reading and writing to the configMain and configTemp json files. 

ConfigMain.json -> This file contains all of the attributes necessary for displaying a DepthKit character in the browser, after it has been properly configured 
                   and placed. This file should not be edited by anything other than the Handler. These components are vital to the proper display of the character, 
                   and minor changes can have drastic effects. This json file is read directly by the getFiles() function in DKV.js. 

ConfigTmp.json -> This file contains solely the name and filepaths for the character. This is used prior to the configuration and placement of the character on the Admin 
                  page. This file is read directly by the getFiles() function in admin.js

Handler.cpp -> This is the main function for handling calls from php (srv/handlerCaller.php). This program takes 1-2 command line arguments to determine what function
               to call. 
               ARGUMENTS: 
                         -s --This argument is used to save all character attributes and positioning into configMain.json. This is only to be used during the configuration 
                              stage on the Admin page. This is the 'save' button on the Admin page, and will allow for proper viewing on the home page. 

                         -p --This argument is used to save the name and filepaths of the file you are uploading into configTmp.json. This is the 'upload' button on the 
                              Admin page. 

                         -d "fileName" --The -d argument takes a second argument, which is the file name of the file you are deleting. This will find fileName in 
                                         in configMain.json and remove it.

phptjsh.cpp -> (PHP-To-JSON-Handler) Contains all functions declared in phptjsh.hpp, necessary for Handler.cpp
                  