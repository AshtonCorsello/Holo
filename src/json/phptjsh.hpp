#ifndef PHP_T_J
#define PHP_T_J

#include <iostream>
#include <fstream>
#include <string>
#include <vector>
//Using nlohmann's 'JSON for Modern C++'
//https://github.com/nlohmann/json
#include "../../nlohmann/json.hpp" 
using json = nlohmann::json; 

class File {
public:
    File(); 
    int Add_To_Temp_Config() const; 
    int Save_To_Main_Config() const;
    bool Fail() const { return fail; }
    
private:
    std::string name,
                txt,
                png,
                mp4;   
    bool fail; 
};


int Delete_From_Main_Config(std::string FILE_TO_DELETE);
int Print_To_Main_Config(json object); 
int Print_To_Temp_Config(json object); 
void ERROR(int errNum = 0, std::string fileLoc = "null",  std::string fileName = "null", int line = 0); 

#endif



