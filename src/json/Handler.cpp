/**
 * @file phpTojsonHandler.cpp
 * @author Ashton Corsello (ashton.corsello@gmail.com)
 * @brief Handler to link files recieved through PHP to JSON formatting
 * @version 0.1
 * @date 2022-05-18
 * 
 * @copyright Copyright (c) 2022
 * 
 */

#include "phptjsh.hpp"

/**
 * @brief Calls function based on parameters passed
 * 
 * @param argc -a, -d + filename, -p
 * @param argv 
 * @return int 
 */

int main(int argc, char *argv[]) {

    File myFile; 

    if (myFile.Fail()) {
        return -1; 
    }

    //Paramater booleans/strings
    bool SAVE = false; 
    bool DELETE = false; 
    std::string FILE_TO_DELETE; 
    bool PARSE = false; 

    std::vector<std::string> arguments; 
    if (argc > 1) {
        arguments.assign(argv+1, argv + argc); 
    }
    else {
        ERROR(-2);
        return -1; 
    }

    for (int i = 0; i < arguments.size(); i++) {
        if (arguments[i] == "-s") {
            SAVE = true; 
        }
        if (arguments[i] == "-d") {
            DELETE = true; 
            FILE_TO_DELETE = arguments[i + 1]; 
        }
        if (arguments[i] == "-p") {
            PARSE = true; 
        }
    }

    if (PARSE) {
        /**
         * @brief Add file attributes to temporary JSON configuration file
         * 
         */
        if(myFile.Add_To_Temp_Config() == -1) {
            return -1; 
        }; 
    }
    else if(DELETE) {
        /**
         * @brief Delete file from main JSON configuration file
         * 
         */
        if(Delete_From_Main_Config(FILE_TO_DELETE) == -1) {
            return -1; 
        }
    }
    else if(SAVE) {
        /**
         * @brief Save file attributes & positioning data to main JSON configuration file
         * 
         */
        if(myFile.Save_To_Main_Config() == -1) { 
            return -1; 
        }
    }

    return 0; 
    

}

