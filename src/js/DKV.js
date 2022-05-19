
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
    

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true; 
    document.body.appendChild( renderer.domElement );

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
    camera.position.set(CamPosX,CamPosY,CamPosZ); 

    //DepthKit(mesh/wire/points rendering, path to txt, path to video)
    character = new DepthKit('mesh',FileIndex[0],FileIndex[1],FileIndex[2]); 
    
    //Position and rotation adjustment
    character.scale.set( scalar, scalar, scalar ); 
    character.position.set( xpos, ypos, zpos );
    character.rotation.x = xrot * Math.PI / 180; 
    character.rotation.y = yrot * Math.PI / 180; 
    character.rotation.z = zrot * Math.PI / 180; 

    //Video set to continuously loop
    character.depthkit.setLoop( true );

    //Automatically play
    character.depthkit.play(); 

    scene.add(character);

    //Resize viewer with window size change
    window.addEventListener( 'resize', onWindowResize, false );

    render();
}


function render() {

    requestAnimationFrame( render );

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


    var selectedFile = document.getElementById("DropdownSelect"); 
    //Get character info from config.json
    let complete = false; 
    fetch("/src/json/configMain.json")
        .then(Response => Response.json())
        .then (data => { 
            if (selectedFile.value == "None"){
                alert("Please select a file"); 
            }else {
                for (var i = 0; i < Object.keys(data.Files).length; i++) {
                    if (data.Files[i].name == selectedFile.value) {
                        xpos = data.Files[i].pos_x;
                        ypos = data.Files[i].pos_y;
                        zpos = data.Files[i].pos_z;
                        xrot = data.Files[i].rot_x; 
                        yrot = data.Files[i].rot_y; 
                        zrot = data.Files[i].rot_z; 
                        scalar = data.Files[i].scalar
                        CamPosX = data.Files[i].camPos_x; 
                        CamPosY = data.Files[i].camPos_y; 
                        CamPosZ = data.Files[i].camPos_z; 
                        FileIndex[0] = data.Files[i].txt;
                        FileIndex[1] = data.Files[i].mp4;
                        FileIndex[2] = data.Files[i].png;
                        complete = true; 
                        break; 
                    }
                }
                if (complete = false) {
                    console.log("Cannot find file"); 
                }

                //Add character to scene
                addCharacter(); 
            }
        
    });

}

var admin = document.getElementById("admin"); 
admin.addEventListener("click", pagejump => {

    var passwd = prompt("Enter password"); 
    if (passwd == "xrikentu") {
        location.assign("admin.html")
    }
    else if (passwd === null || passwd == "") {
        
    }
    else {
        alert("Incorrect password. This incident will be reported.")
    }


})
