import {GLTFExporter} from "/src/node_modules/three/examples/jsm/exporters/GLTFExporter.js"


//X axis slider stuff
var XaxisSlider = document.getElementById("XaxisSlider");
var XaxisSliderOutput = document.getElementById("XaxisSliderOutput");
XaxisSliderOutput.innerHTML = XaxisSlider.value;
XaxisSlider.oninput = function() {
XaxisSliderOutput.innerHTML = this.value;
}

//Y axis slider stuff
var YaxisSlider = document.getElementById("YaxisSlider");
var YaxisSliderOutput = document.getElementById("YaxisSliderOutput");
YaxisSliderOutput.innerHTML = YaxisSlider.value;
YaxisSlider.oninput = function() {
YaxisSliderOutput.innerHTML = this.value;
}

//Z axis slider stuff
var ZaxisSlider = document.getElementById("ZaxisSlider");
var ZaxisSliderOutput = document.getElementById("ZaxisSliderOutput");
ZaxisSliderOutput.innerHTML = ZaxisSlider.value;
ZaxisSlider.oninput = function() {
ZaxisSliderOutput.innerHTML = this.value;
}

//Scalar slider stuff
var scalarSlider = document.getElementById("scalarSliderr"); 
var scalarSliderOutput = document.getElementById("scalarSliderOutput"); 
scalarSliderOutput.innerHTML = scalarSlider.value / 1000;  
scalarSlider.oninput = function() {
    scalarSliderOutput.innerHTML = this.value / 1000; 
}

//X pos slider
var xposSlider = document.getElementById("xPosSliderr"); 
var xPosSliderOutput = document.getElementById("xPosSliderOutput"); 
xPosSliderOutput.innerHTML = xposSlider.value;   
xposSlider.oninput = function() {
    xPosSliderOutput.innerHTML = this.value; 
}

//Y pos slider
var yposSlider = document.getElementById("yPosSliderr"); 
var yPosSliderOutput = document.getElementById("yPosSliderOutput"); 
yPosSliderOutput.innerHTML = yposSlider.value;   
yposSlider.oninput = function() {
    yPosSliderOutput.innerHTML = this.value; 
}

//Z pos slider
var zposSlider = document.getElementById("zPosSliderr"); 
var zPosSliderOutput = document.getElementById("zPosSliderOutput"); 
zPosSliderOutput.innerHTML = zposSlider.value;   
zposSlider.oninput = function() {
    zPosSliderOutput.innerHTML = this.value; 
}



//Three.js variables
var renderer,
scene,
camera,
controls;

//DepthKit character
var character,
xpos,
ypos,
zpos,
xrot,
yrot,
zrot,
scalar,
CamPosX,
CamPosY,
CamPosZ;

//PHP variables
var xaxisval,
yaxisval,
zaxisval,
scalarval,
xposval,
yposval,
zposval,
camx,
camy,
camz;

//User uploaded files and file URLS
var fileURL = []; 
var FileIndex = []; 

init(); 



function init() {

    var select = document.getElementById("DropdownSelect"); 
    fetch("/src/json/configMain.json")
        .then(Response => Response.json())
        .then (data => { 
            for (var i = 0; i < Object.keys(data.Files).length; i++) {
                let name = data.Files[i].name;
                if (name != null) {
                    let option = document.createElement('option'); 
                    option.value = name; 
                    option.innerHTML = name; 
                    select.appendChild(option); 
                }
            } 
        })

    
    var container = document.getElementById("canvas"); 
    document.body.appendChild( container ); 
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( container.clientWidth, container.clientHeight);
    renderer.xr.enabled = true; 
    container.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    //Create perspective camera and set position
    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 3, 5 );

    //Init orbit controls to move camera
    controls = new THREE.OrbitControls( camera, renderer.domElement);


    //Floor grid -- Might remove later
    var gridHelper = new THREE.GridHelper( 10, 10 );
    scene.add(gridHelper);

    render(); 

}

function addCharacter() {

    //Remove character + camera from scene if there is currently one
    scene.remove(character); 
    camera.remove(camera); 

    //Create new camera
    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 1000 );
    controls = new THREE.OrbitControls( camera, renderer.domElement);
    camera.position.set(0,3,5); 

    //DepthKit(mesh/wire/points rendering, path to txt, path to video)
    character = new DepthKit('mesh',FileIndex[0],FileIndex[1],FileIndex[2]); 
    
    //Position and rotation adjustment
    character.scale.set( .001, .001, .001 ); 
    character.position.set( 0, 0, 0 );
    character.rotation.x = 180 * Math.PI / 180; 
    character.rotation.y = 180 * Math.PI / 180; 
    character.rotation.z = 180 * Math.PI / 180; 

    //Video set to continuously loop
    character.depthkit.setLoop( true );

    //Automatically play
    character.depthkit.play(); 

    scene.add(character);

    //Resize viewer with window size change
    window.addEventListener( 'resize', onWindowResize, false );

    render();
}

//Sliders to rotate charcter
function rotateCharacter() {
    character.rotation.x = XaxisSlider.value * Math.PI / 180;
    character.rotation.y = YaxisSlider.value * Math.PI / 180;
    character.rotation.z = ZaxisSlider.value * Math.PI / 180; 
}

//Slider to scale character
function scaleCharacter() {
    character.scale.set(scalarSlider.value / 1000, scalarSlider.value / 1000, scalarSlider.value / 1000); 
}

function moveCharacter() {
    character.position.set(xposSlider.value / 10, yposSlider.value / 10, zposSlider.value/10);
}


function render() {

    requestAnimationFrame( render );

    //Development functions to be used for config purposes only. 
    
    if (character != null) { 
       rotateCharacter();
       scaleCharacter();  
       moveCharacter(); 
    }

     xaxisval = XaxisSlider.value; 
     yaxisval = YaxisSlider.value; 
     zaxisval = ZaxisSlider.value; 
     scalarval = scalarSlider.value / 1000; 
     xposval = xposSlider.value / 10; 
     yposval = yposSlider.value / 10; 
     zposval = zposSlider.value / 10; 
     camx = camera.position.x; 
     camy = camera.position.y; 
     camz = camera.position.z; 

    
    

    renderer.render( scene, camera );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

const x = document.getElementById("startBtn");
x.addEventListener('click', getFiles);

function getFiles() {


    //Get character info from config.json 
    fetch("/src/json/configTmp.json")
        .then(Response => Response.json())
        .then (data => { 
            var index = 0; 
            for(var i = 0; i < Object.keys(data.Files).length - 1; i++) {
                if (data.Files[i].name === null) {
                    index--; 
                    break;
                }
                index++; 
            }
            FileIndex[0] = data.Files[index].txt;
            FileIndex[1] = data.Files[index].mp4;
            FileIndex[2] = data.Files[index].png;
 
            //Add character to scene
            addCharacter(); 
        
    });

}


$('#save').on('click', function(Save_New) {
    Save_New.preventDefault(); 
    $(this).ajaxSubmit({
        type: "POST",
        dataType: "text",
        data: {Function : "save", data : {xaxis : xaxisval, yaxis: yaxisval, zaxis : zaxisval, 
               scalar : scalarval, xpos : xposval, ypos : yposval, 
               zpos : zposval, camx : camx, camy : camy, camz : camz}},
        url: "src/srv/handlerCaller.php",
        success: response => {
            location.reload(); 
        }

    })
})

$('#Delete').on('click', function(Delete_File) {
    var selectedFileForDeletion = document.getElementById("DropdownSelect"); 
    Delete_File.preventDefault();
    if (selectedFileForDeletion.value != "None") { 
        var secureDelete = prompt("Are you sure you want to delete "+selectedFileForDeletion.value+"? Enter '"+selectedFileForDeletion.value+"' below to confirm \nNote: THIS ACTION CANNOT BE UNDONE");
        if (secureDelete == selectedFileForDeletion.value) {
            $(this).ajaxSubmit({
                type: "POST",   
                dataType: "text",
                data: {Function : "delete", File : selectedFileForDeletion.value},
                url: "src/srv/handlerCaller.php",
                success: response => {
                    location.reload(); 
                }

            })
        }
        else {
            alert("File not deleted"); 
        }
    }
})

$('#filesub').on('submit', function(Up_To_Server) {
    Up_To_Server.preventDefault(); // prevent native submit
        var name = prompt("Enter name for file"); 
        $(this).ajaxSubmit({
            type: "POST",
            dataType: "text",
            data: {Function : "upload", data : name},
            url: "src/srv/handlerCaller.php",
            success: response => {
                console.log(response); 
            }
        })
    }
);
