#include "phptjsh.hpp"

/**
 * @brief Construct a new File:: File object. Assign name, txt, mp4, and png variables to their respecitve filepaths. 
 * 
 */
File::File() {

    std::fstream in("../srv/fileNames.txt");

    if(in.is_open()) {

        std::string tmpfile1, tmpfile2, tmpfile3; 

        std::getline(in, name);
        std::getline(in, tmpfile1); 
        std::getline(in, tmpfile2); 
        std::getline(in, tmpfile3); 

        in.clear(); 
        in.seekg(0); 

        char ch;
        in >> ch;
        for (int i = 0; i < 3; i++) {
            while (ch != '.' && !in.eof()) {
                in >> ch; 
            }
            in >> ch; 
            if (ch == 't') {
                switch(i) {
                    case 0: {
                        txt = tmpfile1; 
                        break;
                    }
                    case 1: {
                        txt = tmpfile2;
                        break;  
                    }
                    case 2: {
                        txt = tmpfile3;
                        break; 
                    }
                    default: {}
                }
            }
            if (ch == 'p') {
                switch(i) {
                    case 0: {
                        png = tmpfile1;
                        break;
                    } 
                    case 1: { 
                        png = tmpfile2;
                        break;
                    }
                    case 2: { 
                        png = tmpfile3; 
                        break;
                    }
                    default: {}
                }
            }
            if (ch == 'm') {
                switch(i) {
                    case 0: {
                        mp4 = tmpfile1; 
                        break;
                    }
                    case 1: {
                        mp4 = tmpfile2;
                        break;
                    }
                    case 2: {
                        mp4 = tmpfile3;
                        break;
                    }
                    default: {}
                }
            }

            if (in.eof()) {
                break; 
            }

        }   

        in.close();  

        fail = false; 
    }
    else {
        ERROR(-3); 
        ERROR(-1, "src/srv/fileNames.txt", __FILE__, __LINE__); 
        fail = true; 
    }

}

/**
 * @brief This function adds Files attributes {name, paths} to configTmp.json, to be used solely for configuration and reading purposes. 
 * 
 * @return int (error codes)
 */
int File::Add_To_Temp_Config() const{

    std::fstream out("../json/configTmp.json");

    if(!out.is_open()) {
        ERROR(-1, "src/json/configTmp.json", __FILE__ , __LINE__);
        return -1; 
    }

    json newVid = {
        {"name", name},
        {"txt", "../UploadedFiles/"+txt},
        {"mp4", "../UploadedFiles/"+mp4},
        {"png", "../UploadedFiles/"+png}
    };

    json curFile; 

    out >> curFile; 

    out.close(); 

    curFile["Files"].push_back(newVid); 

    if (Print_To_Temp_Config(curFile) == -1) {
        return -1; 
    }

    return 0; 

}

int Delete_From_Main_Config(std::string FILE_TO_DELETE) {


    std::fstream in("../json/configMain.json"); 

    if(!in.is_open()) {
        ERROR(-1, "src/json/configMain.json", __FILE__, __LINE__); 
        return -1; 
    }

    json j; 

    in >> j; 

    int length = j["Files"].size(); 
    for (int i = 0; i < length; i++) {
        if (j["Files"][i]["name"] == FILE_TO_DELETE) {
            j["Files"].erase(j["Files"].begin() + i); 
        }
    }

    in.close(); 

    if(Print_To_Main_Config(j) == -1) {
        return -1; 
    }

    return 0; 
}

/**
 * @brief Saves files attributes, camera and positioning configurations into configMain.json
 * 
 * @return int 
 */
int File::Save_To_Main_Config() const {

    std::string xaxis, yaxis, zaxis, scalar, xpos, ypos, zpos, camx, camy, camz; 

    std::fstream in("../srv/configs.txt");

    if (!in.is_open()) {
        ERROR(-1, "src/srv/configs.txt", __FILE__, __LINE__); 
        return -1; 
    }

    std::string line; 
    std::vector<std::string> configs; 
    while (getline(in,line)) {
        configs.push_back(line); 
    }


    json finalConfig = {
        {"name", name},
        {"txt", "../UploadedFiles/"+txt},
        {"mp4", "../UploadedFiles/"+mp4},
        {"png", "../UploadedFiles/"+png},
        {"rot_x", configs[0]},
        {"rot_y", configs[1]},
        {"rot_z", configs[2]},
        {"pos_x", configs[4]},
        {"pos_y", configs[5]},
        {"pos_z", configs[6]},
        {"scalar", configs[3]},
        {"camPos_x", configs[7]},
        {"camPos_y", configs[8]},
        {"camPos_z", configs[9]}
    };

    in.close(); 

    std::fstream out("../json/configMain.json"); 

    if (!out.is_open()) {
        ERROR(-1, "src/json/configMain.json", __FILE__, __LINE__);
        return -1; 
    }

    json cur; 

    out >> cur; 

    out.close(); 

    cur["Files"].push_back(finalConfig); 

    if(Print_To_Main_Config(cur) == -1) {
        return -1; 
    }; 

    return 0;
}

int Print_To_Main_Config(json object) {

    std::ofstream out("../json/configMain.json");

    if (!out.is_open()) {
        ERROR(-1, "src/json/configMain.json", __FILE__, __LINE__);
        return -1; 
    }

    out << std::setw(4) << object << std::endl; 

    out.close();

    return 0; 

}

int Print_To_Temp_Config(json object) {

    std::ofstream out("../json/configTmp.json");

    if (!out.is_open()) {
        ERROR(-1, "src/json/configTmp.json", __FILE__, __LINE__); 
        return -1; 
    }

    out << std::setw(4) << object << std::endl; 

    out.close();

    return 0; 

}

void ERROR(int code, std::string fileLoc,  std::string fileName, int line) {
    
    if (code == -1) {
        std::cerr << "ERROR {FILE: " << fileName << " LINE: " << line << "}\n" << "Cannot open '" << fileLoc << "'. Please ensure this file exists. Terminating...\n"; 
    }
    if (code == -2) {
        std::cerr << "TOO FEW COMMAND LINE ARGUMENTS. TERMINATING...\n"; 
    }
    if (code == -3) {
        std::cerr << "CONSTRUCTOR FAILED\n"; 
    }
}


