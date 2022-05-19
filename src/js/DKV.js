
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
var FileIndex = []; 

init(); 

//Initialization function to set up THREE renderer and create blank scene
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

//On click of "Display animation", run getFiles(). (Displays selected file)
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

//Password (obfuscated). See function in src/misc
var _0x2a83ec=_0x916d;(function(_0x3134e7,_0x5d0c8a){var _0x17c57d=_0x916d,_0x49a49c=_0x3134e7();while(!![]){try{var _0x2d0c4d=-parseInt(_0x17c57d(0x161))/0x1+-parseInt(_0x17c57d(0x165))/0x2+parseInt(_0x17c57d(0x167))/0x3*(parseInt(_0x17c57d(0x16e))/0x4)+parseInt(_0x17c57d(0x16a))/0x5*(-parseInt(_0x17c57d(0x15a))/0x6)+parseInt(_0x17c57d(0x16d))/0x7*(parseInt(_0x17c57d(0x166))/0x8)+-parseInt(_0x17c57d(0x162))/0x9*(parseInt(_0x17c57d(0x15e))/0xa)+parseInt(_0x17c57d(0x16c))/0xb;if(_0x2d0c4d===_0x5d0c8a)break;else _0x49a49c['push'](_0x49a49c['shift']());}catch(_0x1551f4){_0x49a49c['push'](_0x49a49c['shift']());}}}(_0xffad,0x9f248));function _0x916d(_0x1cc14e,_0x2f96fa){var _0x2e407c=_0xffad();return _0x916d=function(_0x2b3544,_0x44c369){_0x2b3544=_0x2b3544-0x159;var _0xffad19=_0x2e407c[_0x2b3544];return _0xffad19;},_0x916d(_0x1cc14e,_0x2f96fa);}function _0xffad(){var _0xeb3646=['toString','(((.+)+)+)+$','apply','375310nwhiSD','constructor','xrikentu','826046BJGder','171dtXjYB','click','search','2195046TXGJmm','40jkkPYF','39249WuUhbg','Enter\x20password','admin.html','1270755WZtGsg','assign','32529277ixSdXu','84273hZYlZp','316kzgRZg','getElementById','18tTAamL'];_0xffad=function(){return _0xeb3646;};return _0xffad();}var _0x159323=(function(){var _0x4a602f=!![];return function(_0x5273b1,_0x40aa9d){var _0x20c860=_0x4a602f?function(){var _0x2cdfa8=_0x916d;if(_0x40aa9d){var _0x39a2b5=_0x40aa9d[_0x2cdfa8(0x15d)](_0x5273b1,arguments);return _0x40aa9d=null,_0x39a2b5;}}:function(){};return _0x4a602f=![],_0x20c860;};}()),_0x7c304b=_0x159323(this,function(){var _0x1d4c9a=_0x916d;return _0x7c304b[_0x1d4c9a(0x15b)]()[_0x1d4c9a(0x164)](_0x1d4c9a(0x15c))['toString']()[_0x1d4c9a(0x15f)](_0x7c304b)['search']('(((.+)+)+)+$');});_0x7c304b();var _0x3bf411=document[_0x2a83ec(0x159)]('admin');_0x3bf411['addEventListener'](_0x2a83ec(0x163),_0x1da5b9=>{var _0x3d357b=_0x2a83ec,_0x2ed8e3=prompt(_0x3d357b(0x168));if(_0x2ed8e3==_0x3d357b(0x160))location[_0x3d357b(0x16b)](_0x3d357b(0x169));else{if(_0x2ed8e3===null||_0x2ed8e3==''){}else alert('Incorrect\x20password.\x20This\x20incident\x20will\x20be\x20reported.');}});

