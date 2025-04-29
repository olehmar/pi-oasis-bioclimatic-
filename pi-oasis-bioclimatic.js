/* eslint-disable no-global-assign */
// eslint-disable-next-line no-unused-vars
/* global delegate_viewerReady, delegate_textureChanged, delegate_beforeChange, delegate_afterChange, delegate_optionsAllowed, delegate_endChanges, delegate_renderAfter */
/* global setIsLoaderActive, SetBlockTexturePath, beforeFilterAction, afterFilterAction */
/* global THREE, jQuery, scene, camera, renderer, canvas, theModel, floor, controls, dirLight, cameraSize, UpdateSceneEnvironmentMapURL, pointLight, pointLight2 */
/* global pdfMake */

//#region Hello

//Script version v1.1.1 [beta]
//Created by Marevo (Pavlo Voronin, based on Oleksandr's Trofymchuk script)
//Welcome to our custom script!
//REMEMBER:
//Theft is wrong not because some ancient text says, 'Thou shalt not steal.' It's always bad, robber :)
/*                                                                                                

          _____                    _____                    _____                    _____                    _____                   _______         
         /\    \                  /\    \                  /\    \                  /\    \                  /\    \                 /::\    \        
        /::\____\                /::\    \                /::\    \                /::\    \                /::\____\               /::::\    \       
       /::::|   |               /::::\    \              /::::\    \              /::::\    \              /:::/    /              /::::::\    \      
      /:::::|   |              /::::::\    \            /::::::\    \            /::::::\    \            /:::/    /              /::::::::\    \     
     /::::::|   |             /:::/\:::\    \          /:::/\:::\    \          /:::/\:::\    \          /:::/    /              /:::/~~\:::\    \    
    /:::/|::|   |            /:::/__\:::\    \        /:::/__\:::\    \        /:::/__\:::\    \        /:::/____/              /:::/    \:::\    \   
   /:::/ |::|   |           /::::\   \:::\    \      /::::\   \:::\    \      /::::\   \:::\    \       |::|    |              /:::/    / \:::\    \  
  /:::/  |::|___|______    /::::::\   \:::\    \    /::::::\   \:::\    \    /::::::\   \:::\    \      |::|    |     _____   /:::/____/   \:::\____\ 
 /:::/   |::::::::\    \  /:::/\:::\   \:::\    \  /:::/\:::\   \:::\____\  /:::/\:::\   \:::\    \     |::|    |    /\    \ |:::|    |     |:::|    |
/:::/    |:::::::::\____\/:::/  \:::\   \:::\____\/:::/  \:::\   \:::|    |/:::/__\:::\   \:::\____\    |::|    |   /::\____\|:::|____|     |:::|    |
\::/    / ~~~~~/:::/    /\::/    \:::\  /:::/    /\::/   |::::\  /:::|____|\:::\   \:::\   \::/    /    |::|    |  /:::/    / \:::\    \   /:::/    / 
 \/____/      /:::/    /  \/____/ \:::\/:::/    /  \/____|:::::\/:::/    /  \:::\   \:::\   \/____/     |::|    | /:::/    /   \:::\    \ /:::/    /  
             /:::/    /            \::::::/    /         |:::::::::/    /    \:::\   \:::\    \         |::|____|/:::/    /     \:::\    /:::/    /   
            /:::/    /              \::::/    /          |::|\::::/    /      \:::\   \:::\____\        |:::::::::::/    /       \:::\__/:::/    /    
           /:::/    /               /:::/    /           |::| \::/____/        \:::\   \::/    /        \::::::::::/____/         \::::::::/    /     
          /:::/    /               /:::/    /            |::|  ~|               \:::\   \/____/          ~~~~~~~~~~                \::::::/    /      
         /:::/    /               /:::/    /             |::|   |                \:::\    \                                         \::::/    /       
        /:::/    /               /:::/    /              \::|   |                 \:::\____\                                         \::/____/        
        \::/    /                \::/    /                \:|   |                  \::/    /                                          ~~              
         \/____/                  \/____/                  \|___|                   \/____/                                                           
                                                                                                                                                      
*/
//- Calling the "viewerReady" event (all elements are prepared for interaction with the custom script)
//- Entry point in the viewerReadyDelegate();
//------------------------------------------------------

// FAST FUNCTIONS (HELP FOR DEVELOPERS)

// jQuery(document).ready(function ($) { });
// document.addEventListener('click', function(){ });
// theModel.traverse((o) => { });

//------------------------------------------------------

//#endregion

//#region PUBLIC VALUES

// import $ from 'jquery';

let testVar = null;
let testVarX = 0;
let testVarY = 0;
let testVarZ = 0;
let testVarW = 0;
let testVarD = 0;
let testCubes = [];
let TEST_MODE = false;
let TEST_3D_MODE = false;

let offsetYforAR = 0;

// PDF
let threejs_font_helvetiker_regular;

const pdf_logo_url =
  "https://pipergola.com/wp-content/uploads/2025/01/pdf_logo.png";
const pdf_icon_web_url =
  "https://pipergola.com/wp-content/uploads/2025/01/pdf_www.png";
const pdf_icon_phone_url =
  "https://pipergola.com/wp-content/uploads/2025/01/pdf_phone.png";
const pdf_icon_email_url =
  "https://pipergola.com/wp-content/uploads/2025/01/pdf_email.png";

const pdfmake_customfont =
  "https://pipergola.com/wp-content/uploads/2024/12/vfs_fonts.js";

let productTitle = "";

let modelViewer;
let qrcode;
let loaded = false;
let paramsLoaded = false;
const parametersKey = "config";
let subsystemsStringFromURL = "";
let qrScaned = 0;

let blockURLWriter = true;
let delayForWriteURL = false;
let isArActive = false;

this.louversCLones = [];

// SHADER & MORPHS
let isWorldposVertexShaderEnabled = true;
let morphs = [];
let globalMorphs = [];
let blockTexture = [];

let pergola;
let sceneTime = "Day";

// var formElement;

//! SOURCES URLs
const hotspots = [];
const labelObjects = {
  addObject: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/AddObject.svg",
    obj: null,
  },
  addObjectHover: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/AddObjectHover.svg",
    obj: null,
  },
  plusSideBack: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideBack.svg",
    obj: null,
  },
  plusSideBackHover: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideBackHover.svg",
    obj: null,
  },
  plusSideLeft: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideLeft.svg",
    obj: null,
  },
  plusSideLeftHover: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideLeftHover.svg",
    obj: null,
  },
  plusSideRight: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideRight.svg",
    obj: null,
  },
  plusSideRightHover: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/PlusSideRightHover.svg",
    obj: null,
  },
  subsysSettings: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/SubsysSettings.svg",
    obj: null,
  },
  subsysSettingsHover: {
    url: "https://pipergola.com/wp-content/uploads/2024/12/SubsysSettingsHover.svg",
    obj: null,
  },
};

//! UI CONSTANTS
//* CORRECT THE VALUES FOR YOUR CURRENT PROJECT
const prices_group = "group-20";

const footerMenu_group = "group-0";
const rangeWidth_group = "group-1";
const rangeDepth_group = "group-2";
const rangeHeight_group = "group-3";
const sideOptions_group = "group-5";
const structureColor_group = "group-6";
const standardColors_group = "group-7";
const woodEffectFinishColors_group = "group-14";
const canopyColors_group = "group-15";
const subSystems_group = "group-4";

const subSystems_options = {
  BifoldDoor: {
    option: "option_4-0",
    group: "group-8",
    limitHeightInch: 120,
    limitWidthInch: null,
    elementMaxWidthMM: 1063,
    overlapMM: null, // mm
    shapekeys_straight: {
      frame: {
        height: {
          key: "height_bifold_doors",
          min: 1520,
          max: 3050,
        },
        width: {
          key: "length_bifold_doors",
          min: 2184,
          max: 4064,
        },
      },
      element: {
        height: {
          key: "height_bifold_doors_door",
          min: 1420,
          max: 2950,
        },
        width: {
          key: "length_bifold_doors_door",
          min: 593,
          max: 1060,
        },
        thickness: 0.0241,
      },
    },
    shapekeys_perpendicular: {
      frame: {
        height: {
          key: "height_bifold_doors_side",
          min: 1520,
          max: 3050,
        },
        depth: {
          key: "length_bifold_doors_side",
          min: 1948,
          max: 5961,
        },
      },
      element: {
        height: {
          key: "height_bifold_doors_door",
          min: 1420,
          max: 2950,
        },
        width: {
          key: "length_bifold_doors_door_side",
          min: 593,
          max: 1060,
        },
        thickness: 0.0241,
      },
    },
  },
  GuillotineGlass: {
    option: "option_4-1",
    group: "group-19",
    limitHeightInch: null,
    limitWidthInch: null,
    elementMaxWidthMM: null,
    overlapMM: 50, // mm
    shapekeys_straight: {
      frame: {
        height: {
          key: "height_Guillotine",
          min: 1520,
          max: 3660,
        },
        width: {
          key: "length_Guillotine",
          min: 2184,
          max: 4064,
        },
      },
      element: {
        height: {
          key: "height_Guillotine_win",
          min: 508,
          max: 1220,
        },
        width: {
          key: "length_Guillotine_win",
          min: 2184,
          max: 4064,
        },
        thickness: 0.0241,
      },
    },
    shapekeys_perpendicular: {
      frame: {
        height: {
          key: "height_Guillotine_side",
          min: 1520,
          max: 3480,
        },
        depth: {
          key: "length_Guillotine_side",
          min: 1948,
          max: 5961,
        },
      },
      element: {
        height: {
          key: "height_Guillotine_win",
          min: 508,
          max: 1220,
        },
        width: {
          key: "length_Guillotine_win_side",
          min: 1948,
          max: 5961,
        },
        thickness: 0.0241,
      },
    },
  },
  SlidingGlassDoor: {
    option: "option_4-2",
    group: "group-10",
    limitHeightInch: 120,
    limitWidthInch: null,
    elementMaxWidthMM: 900,
    overlapMM: 20, // mm
    shapekeys_straight: {
      frame: {
        height: {
          key: "height_sliding_glass",
          min: 1520,
          max: 3050,
        },
        width: {
          key: "length_sliding_glass",
          min: 2184,
          max: 4064,
        },
      },
      element: {
        height: {
          key: "height_sliding_glass_win",
          min: 1420,
          max: 2950,
        },
        width: {
          key: "length_sliding_glass_win",
          min: 593,
          max: 1100,
        },
        thickness: 0.013, // 0.0241,
      },
    },
    shapekeys_perpendicular: {
      frame: {
        height: {
          key: "height_sliding_glass_side",
          min: 1520,
          max: 3050,
        },
        depth: {
          key: "length_sliding_glass_side",
          min: 1948,
          max: 5961,
        },
      },
      element: {
        height: {
          key: "height_sliding_glass_win",
          min: 1420,
          max: 2950,
        },
        width: {
          key: "length_sliding_glass_win_side",
          min: 593,
          max: 1060,
        },
        thickness: 0.013, // 0.0241,
      },
    },
  },
  LiftSlideDoor: {
    option: "option_4-3",
    group: "group-11",
    limitHeightInch: 120,
    limitWidthInch: null,
    elementMaxWidthMM: 950,
    overlapMM: 70, // mm
    shapekeys_straight: {
      frame: {
        height: {
          key: "height_sliding_doors",
          min: 1520,
          max: 3050,
        },
        width: {
          key: "length_sliding_doors",
          min: 2184,
          max: 4064,
        },
      },
      element: {
        height: {
          key: "height_sliding_doors_door",
          min: 1420,
          max: 2950,
        },
        width: {
          key: "length_sliding_doors_door",
          min: 593,
          max: 1060,
        },
        thickness: 0.02, // 0.0241,
      },
    },
    shapekeys_perpendicular: {
      frame: {
        height: {
          key: "height_sliding_doors_side",
          min: 1520,
          max: 3050,
        },
        depth: {
          key: "length_sliding_doors_side",
          min: 1948,
          max: 5961,
        },
      },
      element: {
        height: {
          key: "height_sliding_doors_door",
          min: 1420,
          max: 2950,
        },
        width: {
          key: "length_sliding_doors_door_side",
          min: 593,
          max: 1060,
        },
        thickness: 0.02, // 0.0241,
      },
    },
  },
  BlindShade: {
    option: "option_4-4",
    group: "group-12",
    limitHeightInch: null,
    limitWidthInch: null,
    elementMaxWidthMM: null,
    overlapMM: null, // mm
    shapekeys_straight: {
      frame: {
        height: {
          key: "height_shades",
          min: 1524,
          max: 3657,
        },
        width: {
          key: "length_shades",
          min: 2184,
          max: 4064,
        },
      },
      element: {
        closing: {
          key: "close_shades",
          min: 1520,
          max: 3660,
        },
      },
    },
    shapekeys_perpendicular: {
      frame: {
        height: {
          key: "height_shades_side",
          min: 1524,
          max: 3657,
        },
        depth: {
          key: "length_shades_side",
          min: 1948,
          max: 5961,
        },
      },
      element: {
        closing: {
          key: "close_shades",
          min: 1520,
          max: 2790,
        },
      },
    },
  },
  Window: {
    front: {
      height: {
        key: "height_win_up",
        min: 152,
        max: 609,
      },
      width: {
        key: "length_win_up",
        min: 2184,
        max: 4064,
      },
    },
    back: {
      height: {
        key: "height_win_up_back",
        min: 203,
        max: 2030,
      },
      width: {
        key: "length_win_up",
        min: 1880,
        max: 4270,
      },
    },
    leftRight: {
      heightDelta: {
        key: "height_win_up",
        min: 0,
        max: 910,
      },
      heightPos: {
        //! it used in pergola.changeDimensions();
        key: "height_win_up_side.001",
        minInch: 157, // Ñ†Ðµ Ð²Ð¸ÑÐ¾Ñ‚Ð° Ð¿ÐµÑ€Ð³Ð¾Ð»Ð¸ Ñƒ Ñ„ÑƒÑ‚Ð°Ñ…
        maxInch: 240, // Ñ†Ðµ Ð²Ð¸ÑÐ¾Ñ‚Ð° Ð¿ÐµÑ€Ð³Ð¾Ð»Ð¸ Ñƒ Ñ„ÑƒÑ‚Ð°Ñ…
      },
      width: {
        //! it used in pergola.changeDimensions();
        key: "length_win_up_side",
        min: 1948,
        max: 5961,
        minInch: 96,
        maxInch: 360,
      },
    },
  },
  Led: {
    option: "option_4-5",
    group: "group-13",
  },
};

const subSystemMenuGroups = {
  "group-8": {},
  "group-19": {},
  "group-10": {},
  "group-11": {},
  "group-12": {},
  "group-13": {},
};

const structureColorTypeStandard_option = "option_6-0";
const structureColorTypeWood_option = "option_6-1";

const colorOptionPrefixes = {
  structureColorStandard: "option_7-",
  structureColorWood: "option_14-",
  canopyColor: "option_15-",
  subBifoldDoorColor: "option_8-",
  subGuillotineGlassColor: "option_9-",
  subSlidingGlassDoorColor: "option_10-",
  subLiftSlideDoorColor: "option_11-",
  subBlindShadeColor: "option_12-",
  subLedColor: "option_13-",
};

const sideOptionHeater_option = "option_5-0";
const sideOptionFan_option = "option_5-1";

const dataGroupTypes = {
  Dimensions: 0,
  "Texture & Color": 1,
  "Sub Systems": 2,
  "Side options": 3,
};

const glassColor = "#e3e3e3";
const spanColor = "#a5380d";
const spanOpacity = 0.15;
const spanAvatarThickness = 0.1;
//#endregion

//#region ENCODE/DECODE
const NEED_TO_ENCODE = true; //!TODO - set to true before release

String.prototype.SEncode = function () {
  if (this == undefined) {
    return "";
  }
  return NEED_TO_ENCODE ? btoa(unescape(encodeURIComponent(this))) : this;
};

String.prototype.SDecode = function () {
  if (this == undefined) {
    return "";
  }
  return NEED_TO_ENCODE ? decodeURIComponent(escape(atob(this))) : this;
};

//#endregion

//#region DELEGATES

delegate_viewerReady = viewerReadyDelegate();
delegate_textureChanged = textureChangedDelegate();
delegate_beforeChange = beforeChangeDelegate;
delegate_afterChange = afterChangeDelegate;
delegate_optionsAllowed = optionsAllowedDelegate();
delegate_endChanges = endChangesDelegate();

// delegate_renderAfter = delegate_renderAfter();

function viewerReadyDelegate() {
  TEST_MODE && console.log("ðŸš€ðŸš€ðŸš€ viewerReadyDelegate ðŸš€ðŸš€ðŸš€");
  blockTexture = [];
  SetBlockTexturePath(blockTexture);
  if (scene) {
    scene.visible = false;
  }
  // if (camera != null) {
  //   camera.position.set(-1.2, 0.551, 0.71); //! START CAMERA POSITION
  // }

  promiseDelayTheModel(750, () => start());
}

function textureChangedDelegate() {
  TEST_MODE && console.log("ðŸš€ðŸš€ðŸš€ textureChangedDelegate ðŸš€ðŸš€ðŸš€");
  //You can do something here...
}

function beforeChangeDelegate() {
  TEST_MODE && console.log("ðŸš€ðŸš€ðŸš€ beforeChangeDelegate ðŸš€ðŸš€ðŸš€");
  //You can do something here...
}

function afterChangeDelegate() {
  TEST_MODE && console.log("ðŸš€ðŸš€ðŸš€ afterChangeDelegate ðŸš€ðŸš€ðŸš€");
  if (paramsLoaded) {
    writeUrlParams();
  }
}

function optionsAllowedDelegate() {
  TEST_MODE && console.log("ðŸš€ðŸš€ðŸš€ optionsAllowedDelegate ðŸš€ðŸš€ðŸš€");
  //You can do something here...
}

function endChangesDelegate() {
  TEST_MODE && console.log("ðŸš€ðŸš€ðŸš€ endChangesDelegate ðŸš€ðŸš€ðŸš€");
  //You can do something here...
}

// eslint-disable-next-line no-unused-vars
function delegate_renderBefore() {
  TEST_MODE && console.log("ðŸš€ðŸš€ðŸš€ delegate_renderBefore ðŸš€ðŸš€ðŸš€");

  camera.updateMatrixWorld();
  hotspots.forEach(({ targetObject }) => {
    if (targetObject) {
      targetObject.updateMatrixWorld();
    }
  });
  updateHotspots(hotspots);
}

// eslint-disable-next-line no-unused-vars
function delegate_renderAfter() {
  //You can do something here..
}

//#endregion

//#region ADDITIONAL FUNCTIONS
function promiseDelayTheModel(time = 2000, callback = () => {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
      if (theModel == null) {
        promiseDelayTheModel(time, callback);
      } else {
        callback();
      }
    }, time);
  });
}

function promiseDelay(time = 2000, callback = () => {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
      callback();
    }, time);
  });
}

function waitFor(conditionFunction) {
  const poll = (resolve) => {
    if (conditionFunction()) resolve();
    // eslint-disable-next-line no-unused-vars
    else setTimeout((_) => poll(resolve), 400);
  };

  return new Promise(poll);
}

function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/Macintosh/i.test(userAgent)) {
    if (/VisionOS|VisionPro/i.test(userAgent)) {
      return "VisionPro";
    }

    if (navigator.maxTouchPoints === 5) {
      return "VisionPro";
    }

    if (navigator.xr) {
      navigator.xr.isSessionSupported("immersive-vr").then((supported) => {
        if (supported) {
          return "VisionPro";
        }
      });
    }

    return "Macintosh";
  }

  if (/Windows/i.test(userAgent) || /Win/i.test(userAgent)) {
    return "Windows";
  }

  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  if (/VisionOS|VisionPro/i.test(userAgent)) {
    return "VisionPro";
  }

  return "unknown";
}

//! Interpolation of values
function interpolateValue(inputval, rangeMin, rangeMax, kMin = 0, kMax = 1) {
  return kMin + ((inputval - rangeMin) * (kMax - kMin)) / (rangeMax - rangeMin);
}

function interpolateValueInverse(
  outputVal,
  srcStart,
  srcEnd,
  destStart = 0,
  destEnd = 1
) {
  return (
    srcStart +
    ((outputVal - destStart) * (srcEnd - srcStart)) / (destEnd - destStart)
  );
}

//#endregion

//#region 3D FUNCTIONS
function settings3d() {
  controls.maxPolarAngle = Math.PI / 2;
  controls.minDistance = 2;
  controls.maxDistance = 20;
  controls.enablePan = true;
  camera.position.set(-3, 0.5, 5); //! START CAMERA POSITION
  theModel.position.y = -1.0;
  // theModel.position.z = 1.5;
  floor.position.y = -1.0;
  // RemoveAllDefaultTextures(theModel);
  // UpdateSceneEnvironmentMapURL('https://s3.eu-central-1.amazonaws.com/marevo.vision/RelevantProjects/webAR/WP+AR+WooCommerce+plugin/src/environment/brown_photostudio_02_1k.hdr');
  // pointLight.intensity = 0.15;
  // pointLight2.intensity = 0.15;
  // scene.add(pointLight, pointLight2);

  const shadowCameraSize = 8;
  dirLight.shadow.camera.left = -shadowCameraSize;
  dirLight.shadow.camera.right = shadowCameraSize;
  dirLight.shadow.camera.top = shadowCameraSize;
  dirLight.shadow.camera.bottom = -shadowCameraSize;
  dirLight.shadow.bias = -0.00075;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 120;
  dirLight.shadow.radius = 10;
  dirLight.shadow.blurSamples = 20;
  dirLight.shadow.camera.updateProjectionMatrix();

  const glassMat = getMaterialFromScene("glass");
  if (glassMat) {
    glassMat.color.set(glassColor);
    glassMat.opacity = 0.2;
    glassMat.needsUpdate = true;
  }

  if (TEST_3D_MODE) {
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    const cubeGeometry = new THREE.BoxGeometry(0.05, 0.1, 0.05);
    const cubeMaterials = [
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.5,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.5,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        transparent: true,
        opacity: 0.5,
      }),
    ];

    for (let i = 0; i < 9; i++) {
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterials[i % 3]);
      cube.position.set(0, 0, 0);
      cube.visible = false;
      theModel.add(cube);
      testCubes.push(cube);
    }
  }
}

function setAllModelObjectsVisibility(visible, model = theModel) {
  model.traverse((o) => {
    o.visible = visible;
  });
}

function getMeshDimensions(mesh) {
  const boundingBox = new THREE.Box3();
  boundingBox.setFromObject(mesh);
  const size = new THREE.Vector3();
  boundingBox.getSize(size);
  const width = size.x;
  const height = size.y;
  const depth = size.z;
  return { width: width, height: height, depth: depth };
}

function getMaterialFromScene(name) {
  var material = null;
  scene.traverse((o) => {
    if (o.material) {
      if (name == o.material.name) {
        material = o.material;
      }
    }
  });

  return material;
}
function setMaterialColor(materialName, color) {
  const materialObject = getMaterialFromScene(materialName);
  if (materialObject == null) {
    return;
  }
  materialObject.color.set(color);
  materialObject.needsUpdate = true;
}

function ChangeMaterialTilling(materialName, x, y) {
  let materialObject = getMaterialFromScene(materialName);

  if (materialObject == null) {
    return;
  }

  if (materialObject.map != null) {
    materialObject.map.repeat.set(x, y);
  }

  if (materialObject.normalMap != null) {
    materialObject.normalMap.repeat.set(x, y);
  }

  if (materialObject.roughnessMap != null) {
    materialObject.roughnessMap.repeat.set(x, y);
  }

  if (materialObject.metalnessMap != null) {
    materialObject.metalnessMap.repeat.set(x, y);
  }

  if (materialObject.aoMap != null) {
    materialObject.aoMap.repeat.set(x, y);
  }
}

function ChangeMaterialOffset(materialName, x, y) {
  let materialObject = getMaterialFromScene(materialName);

  if (materialObject == null) {
    return;
  }

  if (materialObject.map != null) {
    materialObject.map.offset.set(x, y);
  }

  if (materialObject.normalMap != null) {
    materialObject.normalMap.offset.set(x, y);
  }

  if (materialObject.roughnessMap != null) {
    materialObject.roughnessMap.offset.set(x, y);
  }

  if (materialObject.metalnessMap != null) {
    materialObject.metalnessMap.offset.set(x, y);
  }

  if (materialObject.aoMap != null) {
    materialObject.aoMap.offset.set(x, y);
  }
}

function RotateMaterialTexture(materialName, angle = Math.PI / 2) {
  let materialObject = getMaterialFromScene(materialName);

  if (materialObject == null) {
    return;
  }

  let rotationAngle = angle;

  if (materialObject.map != null) {
    materialObject.map.rotation = rotationAngle;
  }

  if (materialObject.normalMap != null) {
    materialObject.normalMap.rotation = rotationAngle;
  }

  if (materialObject.roughnessMap != null) {
    materialObject.roughnessMap.rotation = rotationAngle;
  }

  if (materialObject.metalnessMap != null) {
    materialObject.metalnessMap.rotation = rotationAngle;
  }

  if (materialObject.aoMap != null) {
    materialObject.aoMap.rotation = rotationAngle;
  }
}

function mirrorObject(object, value = true) {
  if (object) object.scale.x = value ? -1 : 1;
}

function removeAllDefaultTextures(targetObject) {
  if (targetObject == null) {
    return;
  }

  targetObject.traverse((o) => {
    if (o.isMesh) {
      if (o.material.normalMap) {
        o.material.normalMap = null;
      }
      if (o.material.roughnessMap) {
        o.material.roughnessMap = null;
        o.material.roughness = 0.3;
      }
      if (o.material.metalnessMap) {
        o.material.metalnessMap = null;
        o.material.metalness = 0.05;
      }
      if (o.material.aoMap) {
        o.material.aoMap = null;
      }
      o.material.needsUpdate = true;
    }
  });
}

function getObjectByNameInParent(object, name) {
  let foundObject = null;
  object.traverse((o) => {
    if (o.name == name) {
      foundObject = o;
    }
  });
  return foundObject;
}

function thickenMesh(mesh, thickness = 0.005) {
  if (
    !mesh.geometry ||
    !mesh.geometry.attributes.position ||
    !mesh.geometry.attributes.normal
  ) {
    console.warn("Geometry or attributes missing for", mesh.name);
    return;
  }

  const clonedMesh = mesh.clone();
  clonedMesh.material = mesh.material.clone();
  clonedMesh.material.side = THREE.DoubleSide;

  const position = mesh.geometry.attributes.position;
  const normal = mesh.geometry.attributes.normal;

  const newPositions = new Float32Array(position.array.length);

  for (let i = 0; i < position.count; i++) {
    newPositions[i * 3] = position.getX(i) + normal.getX(i) * thickness;
    newPositions[i * 3 + 1] = position.getY(i) + normal.getY(i) * thickness;
    newPositions[i * 3 + 2] = position.getZ(i) + normal.getZ(i) * thickness;
  }

  clonedMesh.geometry = mesh.geometry.clone();
  clonedMesh.geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(newPositions, 3)
  );

  mesh.parent.add(clonedMesh);
  return clonedMesh;
}

//#endregion

//#region SHADER and MORPHS
function Shader_ChangeVertexToWorldpos(object) {
  var vUvSymbol = "vUv";
  var vUvSymbolNormal = "vUv";
  var uvTransformSymbol = "uvTransform";

  if (THREE.REVISION >= 150) {
    vUvSymbol = "vMapUv";
    vUvSymbolNormal = "vNormalMapUv";
    uvTransformSymbol = "mapTransform";
  }

  promiseDelayShaderSettings(500, object, () => {
    if (object.isMesh) {
      if (isWorldposVertexShaderEnabled) {
        if (object.material) {
          if (object.material.name.includes("_Z")) {
            object.material.onBeforeCompile = (shader) => {
              shader.vertexShader = shader.vertexShader
                .replace("#include <uv_vertex>\n", "")
                .replace(
                  "#include <worldpos_vertex>",
                  `
                    vec4 worldPosition = vec4( transformed, 1.0 );
                    #ifdef USE_INSTANCING
                    worldPosition = instanceMatrix * worldPosition;
                    #endif
                    worldPosition = modelMatrix * worldPosition;
                    ${vUvSymbol} = (${uvTransformSymbol} * vec3(worldPosition.xz, 1)).xy;
                    ${vUvSymbolNormal} = (${uvTransformSymbol} * vec3(worldPosition.xz, 1)).xy;
                  `
                );
            };
          } else if (object.material.name.includes("_Y")) {
            object.material.onBeforeCompile = (shader) => {
              shader.vertexShader = shader.vertexShader
                .replace("#include <uv_vertex>\n", "")
                .replace(
                  "#include <worldpos_vertex>",
                  `
                    vec4 worldPosition = vec4( transformed, 1.0 );
                    #ifdef USE_INSTANCING
                    worldPosition = instanceMatrix * worldPosition;
                    #endif
                    worldPosition = modelMatrix * worldPosition;
                    ${vUvSymbol} = (${uvTransformSymbol} * vec3(worldPosition.xy, 1)).xy;
                    ${vUvSymbolNormal} = (${uvTransformSymbol} * vec3(worldPosition.xy, 1)).xy;
                  `
                );
            };
          } else if (object.material.name.includes("_X")) {
            object.material.onBeforeCompile = (shader) => {
              shader.vertexShader = shader.vertexShader
                .replace("#include <uv_vertex>\n", "")
                .replace(
                  "#include <worldpos_vertex>",
                  `
                    vec4 worldPosition = vec4( transformed, 1.0 );
                    #ifdef USE_INSTANCING
                    worldPosition = instanceMatrix * worldPosition;
                    #endif
                    worldPosition = modelMatrix * worldPosition;

                    // ÐŸÐ¾Ð²Ð¾Ñ€Ð¾Ñ‚ Ñ‚ÐµÐºÑÑ‚ÑƒÑ€Ð¸ Ð½Ð° 90 Ð³Ñ€Ð°Ð´ÑƒÑÑ–Ð²
                    mat2 rotation = mat2(0.0, 1.0, -1.0, 0.0);
                    vec2 rotatedUV = rotation * vec2(worldPosition.y, worldPosition.z);
    
                    ${vUvSymbol} = (${uvTransformSymbol} * vec3(rotatedUV, 1)).xy;
                    ${vUvSymbolNormal} = (${uvTransformSymbol} * vec3(rotatedUV, 1)).xy;
                  `
                );
            };
          }
          object.material.needsUpdate = true;
        }
      }
    }
  });
}

function promiseDelayShaderSettings(time, object, callback) {
  if (time == null) {
    time = 2000;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
      if (object.material.map == null) {
        promiseDelayShaderSettings(time, object, callback);
      } else {
        if (callback != null) {
          callback();
        }
      }
    }, time);
  });
}

function initMorphModel(model) {
  var BufferGeometryUtils_script = document.createElement("script");
  BufferGeometryUtils_script.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/npm/three@0.147/examples/js/utils/BufferGeometryUtils.js"
  );
  document.body.appendChild(BufferGeometryUtils_script);

  console.log(
    "ðŸš€ ~ initMorphModel ~ BufferGeometryUtils_script:",
    BufferGeometryUtils_script
  );
  parseMorphByModel(model);
}

function parseMorphByModel(model, callback = null) {
  morphs = [];
  model.traverse((object) => {
    if (object.isMesh) {
      Shader_ChangeVertexToWorldpos(object);

      if (object.morphTargetDictionary != null) {
        for (const [key, value] of Object.entries(
          object.morphTargetDictionary
        )) {
          var morph = {
            name: key,
            object: object,
            key: value,
            value: value,
          };

          if (!morphs.includes(morph)) {
            morphs.push(morph);
          }
        }
      }
    }
  });

  PrepareGlobalMorphs(callback);
}

function PrepareGlobalMorphs(callback = null) {
  globalMorphs = [];

  for (let index = 0; index < morphs.length; index++) {
    const morph = morphs[index];

    var hasMorph = false;

    for (let m = 0; m < globalMorphs.length; m++) {
      const globalMorph = globalMorphs[m];
      if (globalMorph.name != morph.name) {
        continue;
      }
      hasMorph = true;
      break;
    }

    if (!hasMorph) {
      globalMorphs.push(morph);
    }
  }

  if (callback != null) {
    callback();
  }
}

function ComputeMorphedAttributes() {
  for (let index = 0; index < morphs.length; index++) {
    const morph = morphs[index];
    var computeMorphedAttributes =
      THREE.BufferGeometryUtils.computeMorphedAttributes(morph.object);
    morph.object.geometry.computeMorphedAttributes = computeMorphedAttributes;
  }
}

function ChangeObjectWithMorph(object, key, inputvalue) {
  if (object == null) {
    return;
  }

  if (object.morphTargetInfluences != null) {
    object.morphTargetInfluences[key] = inputvalue;
  }
}

function changeObjectMorph(object, key, inputValue) {
  if (!object) return;

  function processObject(obj) {
    if (obj.isMesh && obj.morphTargetDictionary) {
      const morphIndex = obj.morphTargetDictionary[key];
      if (morphIndex !== undefined && obj.morphTargetInfluences) {
        obj.morphTargetInfluences[morphIndex] = inputValue;
      }
    }

    if (obj.children && obj.children.length > 0) {
      obj.children.forEach((child) => processObject(child));
    }
  }

  processObject(object);
}

function changeGlobalMorph(
  morphName,
  inputvalue,
  objectUuid = null,
  objectName = null
) {
  for (let index = 0; index < morphs.length; index++) {
    const morph = morphs[index];

    if (morph.name != morphName) {
      continue;
    }
    if (morph.object == null) {
      continue;
    }
    if (!morph.object.isMesh) {
      continue;
    }
    if (morph.object.morphTargetInfluences == null) {
      continue;
    }

    if (objectName != null) {
      if (morph.object.name != objectName) {
        continue;
      }
    }
    if (objectUuid != null) {
      if (morph.object.uuid !== objectUuid) {
        continue;
      }
    }

    morph.object.morphTargetInfluences[morph.key] = inputvalue;
  }
}

function convertMorphValue(
  inputval,
  srcStart,
  srcEnd,
  destStart = 0,
  destEnd = 1
) {
  const result =
    destStart +
    ((inputval - srcStart) * (destEnd - destStart)) / (srcEnd - srcStart);
  return result;
}

function convertMorphValueReverse(
  outputVal,
  srcStart,
  srcEnd,
  destStart = 0,
  destEnd = 1
) {
  const result =
    srcStart +
    ((outputVal - destStart) * (srcEnd - srcStart)) / (destEnd - destStart);
  return result;
}

function animateMorph(
  morphName,
  valueStart,
  valueEnd,
  callback = () => {},
  timeInterval = 200,
  steps = 5
) {
  const stepDuration = timeInterval / steps;
  const stepValue = (valueEnd - valueStart) / steps;
  let currentValue = valueStart;
  let completedSteps = 0;

  for (let i = 1; i <= steps; i++) {
    setTimeout(() => {
      changeGlobalMorph(morphName, currentValue);
      currentValue += stepValue;
      completedSteps++;
      if (completedSteps === steps) {
        changeGlobalMorph(morphName, valueEnd);
        callback();
      }
    }, i * stepDuration);
  }
}

//#endregion

//#region ANIMATION
// ANIMATION OF MODEL - "SCALING"

// ANIMATION OF MODEL - "SCALE" - appearing or disappearing
function animateScale(
  model,
  duration = 500,
  startScale = 0,
  endScale = 1,
  timingKeyword = "ease-in",
  callback = () => springScale(model)
) {
  function timingFunction(progress) {
    switch (timingKeyword) {
      case "ease-in":
        return progress * progress;
      case "ease-out":
        return 1 - Math.pow(1 - progress, 2);
      case "ease-in-out":
        return progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      default:
        return progress;
    }
  }

  let startTime = null;

  function animate(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }

    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easedProgress = timingFunction(progress);
    const interpolatedScale =
      startScale + (endScale - startScale) * easedProgress;
    model.scale.set(interpolatedScale, interpolatedScale, interpolatedScale);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      model.scale.set(endScale, endScale, endScale);
      callback();
    }
  }

  requestAnimationFrame(animate);
}

// ANIMATION OF MODEL - "SPRING-SCALE"
function springScale(
  model,
  duration = 500,
  oscillations = 1,
  callback = () => {}
) {
  const startTime = performance.now();
  const startScale = model.scale.x;
  const dampingFactor = 0.1; // attenuation coefficient
  const maxAmplitude = 0.2 * startScale; // maximum oscillation amplitude (20%)

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const angularFrequency = (oscillations * Math.PI * 2) / duration;
    const amplitude =
      maxAmplitude * Math.pow(dampingFactor, elapsed / duration);
    const phase = angularFrequency * elapsed;
    const currentScale = startScale + amplitude * Math.sin(phase);

    model.scale.set(currentScale, currentScale, currentScale);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      model.scale.set(startScale, startScale, startScale);
      callback();
    }
  }

  requestAnimationFrame(animate);
}

// ANIMATION OF PROPERTY
function animateProperty(object, property, targetValue, duration, onUpdate) {
  const startValue = object[property];
  const startTime = performance.now();

  function animate(time) {
    const elapsedTime = time - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    object[property] = startValue + (targetValue - startValue) * progress;

    if (onUpdate) onUpdate();

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

//#endregion

//#region AR and QR
const copyToClipboard = function () {
  var aux = document.createElement("input");
  aux.setAttribute("value", jQuery("#info-sharing-input").val());
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
};

function prepareAR() {
  jQuery(document).ready(function () {
    const body = jQuery("body");

    modelViewer = jQuery(
      '<model-viewer id="marevo_model" ar ar-modes="webxr scene-viewer quick-look" src="https://s3.eu-central-1.amazonaws.com/marevo.vision/RelevantProjects/webAR/model-viewer-important/scenes/empty_scene.glb" poster="" ar-scale="fixed" loading="eager" alt="Marevo" shadow-intensity="1" shadow-softness="1" environment-image="neutral" stage-light-intensity="1" camera-orbit="-30deg auto auto" max-camera-orbit="auto 100deg auto" camera-controls exposure="0.9" auto-rotate>'
    );
    const arPromt = jQuery('<div id="ar-prompt">');
    const icoImage = jQuery(
      '<img src="https://modelviewer.dev/shared-assets/icons/hand.png" alt="ar-prompt">'
    );

    arPromt.append(icoImage);
    modelViewer.append(arPromt);

    body.append(modelViewer);

    modelViewer[0].addEventListener("ar-status", (event) => {
      if (event.detail.status == "session-started") {
        arPromt[0].style.display = "block";
        // if (getMobileOperatingSystem() == 'Android') {
        //   setTimeout(() => {
        //     fixModelPosition();
        //   }, 500);
        // }
      } else if (event.detail.status == "object-placed") {
        arPromt[0].style.display = "none";
        if (getMobileOperatingSystem() == "Android") {
          console.log("ðŸš€ object-placed");
          setTimeout(() => {
            fixScenePosition();
          }, 300);
        }
      } else if (event.detail.status == "not-presenting") {
        arPromt[0].style.display = "none";
        modelViewer[0].resetScene();

        if (getMobileOperatingSystem() == "Android") {
          if (pergola != null) {
            scene.position.y = 0;

            if (pergolaSettings.mountingWall_Back) {
              pergola.changeMountingWallVisibility(
                pergolaSettings.mountingWall_Back,
                pergolaConst.side.Back
              );
            }

            if (pergolaSettings.mountingWall_Left) {
              pergola.changeMountingWallVisibility(
                pergolaSettings.mountingWall_Left,
                pergolaConst.side.Left
              );
            }

            if (pergolaSettings.mountingWall_Right) {
              pergola.changeMountingWallVisibility(
                pergolaSettings.mountingWall_Right,
                pergolaConst.side.Right
              );
            }

            // floor visibility
            scene.children[2].visible = true;
          }
        }
      } else {
        arPromt[0].style.display = "none";
        if (getMobileOperatingSystem() == "Android") {
          console.log("ðŸš€ none");
          setTimeout(() => {
            fixScenePosition();
          }, 300);
        }
      }
    });
  });
}

function fixScenePosition() {
  const bbox = new THREE.Box3().setFromObject(scene);
  const center = bbox.getCenter(new THREE.Vector3());
  console.log("bbox center:", center.y);
  scene.position.y = -center.y;
}

function fixModelPosition() {
  let attempts = 0;
  let lastCenterY = null;
  let changeDetected = false;

  function adjustPosition() {
    const bbox = new THREE.Box3().setFromObject(scene);
    const center = bbox.getCenter(new THREE.Vector3());
    console.log(`Attempt ${attempts}: bbox center.y =`, center.y);

    if (lastCenterY !== null && Math.abs(center.y - lastCenterY) > 0.001) {
      console.log("bbox was changed!");
      changeDetected = true;
    }

    lastCenterY = center.y;
    attempts++;

    if (changeDetected) {
      setTimeout(() => {
        fixScenePosition();
      }, 1500);
      return;
    }

    if (attempts < 20) {
      setTimeout(adjustPosition, 500);
    } else {
      console.warn("limit attempts");
      fixScenePosition();
    }
  }

  adjustPosition();
}

function createQR() {
  // const qr = qrcode[0];
  const qr = document.querySelector("#qrcode");
  if (!qr) {
    return;
  }

  qr.innerHTML = "";
  qrScaned = 1;

  const uri = getURLWithParameters();
  const encoded = encodeURIComponent(uri);
  const qrImg = new Image();
  qrImg.src = "https://quickchart.io/qr?text=" + encoded + "&size=200";
  qrImg.addEventListener("load", () => {
    qr.appendChild(qrImg);
  });
}

async function checkQRMobile() {
  // eslint-disable-next-line no-unused-vars
  await waitFor((_) => loaded === true);
  // eslint-disable-next-line no-unused-vars
  await waitFor((_) => modelViewer != undefined);
  await new Promise((r) => setTimeout(r, 2000));

  if (qrScaned == 1) {
    if (
      getMobileOperatingSystem() == "Android" ||
      getMobileOperatingSystem() == "iOS" ||
      getMobileOperatingSystem() == "VisionPro"
    ) {
      openAR();
    }

    qrScaned = 0;
    writeUrlParams();
  }
}

async function openAR() {
  unFixScroll();
  ComputeMorphedAttributes();

  // Remove wall
  if (pergola != null) {
    if (pergolaSettings.mountingWall_Back) {
      pergola.changeMountingWallVisibility(false, pergolaConst.side.Back);
    }

    if (pergolaSettings.mountingWall_Left) {
      pergola.changeMountingWallVisibility(false, pergolaConst.side.Left);
    }

    if (pergolaSettings.mountingWall_Right) {
      pergola.changeMountingWallVisibility(false, pergolaConst.side.Right);
    }
  }

  if (getMobileOperatingSystem() == "Android") {
    // const bbox = new THREE.Box3().setFromObject(scene);
    // const center = bbox.getCenter(new THREE.Vector3());
    // console.log("bbox center:", center.y);
    // offsetYforAR = center.y;
    // // pergola.model.position.y = -3;
    // scene.position.y = -offsetYforAR;
  }

  await importScene(scene);

  if (
    getMobileOperatingSystem() == "iOS" ||
    getMobileOperatingSystem() == "VisionPro"
  ) {
    if (pergola != null) {
      if (pergolaSettings.mountingWall_Back) {
        pergola.changeMountingWallVisibility(
          pergolaSettings.mountingWall_Back,
          pergolaConst.side.Back
        );
      }

      if (pergolaSettings.mountingWall_Left) {
        pergola.changeMountingWallVisibility(
          pergolaSettings.mountingWall_Left,
          pergolaConst.side.Left
        );
      }

      if (pergolaSettings.mountingWall_Right) {
        pergola.changeMountingWallVisibility(
          pergolaSettings.mountingWall_Right,
          pergolaConst.side.Right
        );
      }
    }
  }
}

function pergolaOpenARorQR() {
  if (
    getMobileOperatingSystem() == "Android" ||
    getMobileOperatingSystem() == "iOS" ||
    getMobileOperatingSystem() == "VisionPro"
  ) {
    openAR();
    return;
  }

  createQR();

  jQuery(".popup").addClass("arqr active");
  jQuery(".popup-item-qr").addClass("active");
  fixScroll();
}

async function importScene(newScene) {
  await modelViewer[0].importScene(newScene);
  modelViewer[0].activateAR();
}

//#endregion

//#region UI FUNCTIONS
//! ******** UI FUNCTIONS ********
async function prepareUI() {
  var GLTFExporter_script = document.createElement("script");
  GLTFExporter_script.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/npm/three@0.146/examples/js/exporters/GLTFExporter.js"
  );
  document.body.appendChild(GLTFExporter_script);

  async function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Script load error for ${url}`));
      document.head.appendChild(script);
    });
  }

  async function loadPDFmake() {
    try {
      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"
      );
      // await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js');
      await loadScript(pdfmake_customfont);
    } catch (error) {
      console.error(error);
    }
  }

  loadPDFmake();

  // formElement = document.querySelector('.ar_result_container .cart');

  jQuery(document).ready(function () {
    // ****  Main-Menu  *****
    jQuery("#ar_model_viewer").after(`
      <div class="main_menu"></div>
    `);

    const mainMenu = jQuery(".main_menu");

    // ****  Header-Menu  *****
    mainMenu.append(`
      <div class="header_menu">
        <div class="header_menu__group_title"></div>
        <div id="menuReset" data-group_type="" class="header_menu__group_reset" >
          <div class="header_menu__group_reset_icon"></div>
          <div class="header_menu__group_reset_caption">Reset</div>
        </div>
      </div>
    `);

    mainMenu.append(jQuery("#ar_filter"));

    // ****  Product-Title  *****
    productTitle = jQuery(
      ".container.main-content .heading-title .entry-title"
    ).text();
    if (!productTitle) {
      productTitle = "Pi Pergola";
    }

    // ****  Footer-Menu  *****
    mainMenu.after(`
      <div class="footer_menu">
        <div class="footer_menu__product_title">${productTitle}</div>
      </div>
    `);

    let i = 0;

    jQuery(`#${footerMenu_group} .option`).each(function () {
      const groupId = jQuery(this).data("group_id");
      const componentId = jQuery(this).data("component_id");
      const title = jQuery(this).data("value");

      jQuery(".ar_conf_container .footer_menu").append(`
        <div id="footerMenu_${i}" class="footer_menu__item" data-group_id="${groupId}" data-component_id="${componentId}">
          <div class="footer_menu__item_image"></div>
          <div class="footer_menu__item_caption">${title}</div>
        </div>
      `);

      i++;
    });

    jQuery(".ar_conf_container .footer_menu").append(`
      <div id="footerMenu_${i}" class="footer_menu__item" data-group_id="overview"">
        <div class="footer_menu__item_image"></div>
        <div class="footer_menu__item_caption">OVERVIEW</div>
      </div>
    `);

    // ****  Side-Menu-Buttons *****
    mainMenu.append(`
      <div class="side_menu__buttons">
        <div class="button side_menu__button button--black disabled">
          <span class="icon icon__arrow_left"></span>
          <span class="button__caption">PREVIOUS</span>
        </div>

        <div class="button side_menu__button button--orange">
          <span class="button__caption">NEXT</span>
          <span class="icon icon__arrow_right"></span>
        </div>
      </div>
    `);

    function updateButtonStates() {
      const firstMenuItem = jQuery(".footer_menu__item").first();
      const lastMenuItem = jQuery(".footer_menu__item").last();
      const activeMenuItem = jQuery(".footer_menu__item.active");

      if (activeMenuItem.is(firstMenuItem)) {
        jQuery(".side_menu__button.button--black").addClass("disabled");
      } else {
        jQuery(".side_menu__button.button--black").removeClass("disabled");
      }

      if (activeMenuItem.is(lastMenuItem)) {
        jQuery(".side_menu__button.button--orange").addClass("disabled");
      } else {
        jQuery(".side_menu__button.button--orange").removeClass("disabled");
      }
    }

    //* Footer-menu buttons handler
    jQuery(document).on(
      "click",
      ".ar_conf_container .footer_menu__item",
      function () {
        const groupId = jQuery(this).data("group_id");
        const componentId = jQuery(this).data("component_id");

        jQuery(".footer_menu__item").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(
          `#${footerMenu_group} .option_${groupId}-${componentId}`
        ).click();

        updateButtonStates();

        updateUI();

        if (groupId == "overview") {
          // Summary Modal
          prepareSummary();
        } else {
          const menuHeaderTitle = jQuery(
            `#${footerMenu_group} .option_${groupId}-${componentId} .component_title`
          ).text();
          jQuery(".ar_conf_container .header_menu__group_title").text(
            menuHeaderTitle
          );
          jQuery("#menuReset").data("group_type", menuHeaderTitle);
        }
      }
    );

    //* Side menu button PREV handler
    jQuery(document).on(
      "click",
      ".side_menu__button.button--black",
      function () {
        if (!jQuery(this).hasClass("disabled")) {
          const activeMenuItem = jQuery(".footer_menu__item.active");
          const prevMenuItem = activeMenuItem.prev(".footer_menu__item");

          if (prevMenuItem.length) {
            prevMenuItem.click();
          }
        }

        updateUI();
      }
    );

    //* Side menu button NEXT handler
    jQuery(document).on(
      "click",
      ".side_menu__button.button--orange",
      function () {
        if (!jQuery(this).hasClass("disabled")) {
          const activeMenuItem = jQuery(".footer_menu__item.active");
          const nextMenuItem = activeMenuItem.next(".footer_menu__item");

          if (nextMenuItem.length) {
            nextMenuItem.click();
          }
        }

        updateUI();
      }
    );

    //* Side menu button RESET handler
    jQuery(document).on("click", "#menuReset", () =>
      resetGroupValues(jQuery("#menuReset").data("group_type"))
    );

    jQuery(`#footerMenu_0`).click();
  });

  function resetGroupValues(groupType) {
    switch (dataGroupTypes[groupType]) {
      case 0: // Dimensions
        pergolaSettings.width = pergolaSettingsDefault.width;
        pergolaSettings.depth = pergolaSettingsDefault.depth;
        pergolaSettings.height = pergolaSettingsDefault.height;
        break;
      case 1: // Texture & Color
        pergolaSettings.structureColorType =
          pergolaSettingsDefault.structureColorType;
        pergolaSettings.structureColorStandard =
          pergolaSettingsDefault.structureColorStandard;
        pergolaSettings.structureColorWood =
          pergolaSettingsDefault.structureColorWood;
        pergolaSettings.canopyColor = pergolaSettingsDefault.canopyColor;
        break;
      case 2: // Sub Systems
        pergolaSettings.currentSubsystem =
          pergolaSettingsDefault.currentSubsystem;
        pergolaSettings.currentSubsystemKey =
          pergolaSettingsDefault.currentSubsystemKey;
        pergolaSettings.currentOpeningSide =
          pergolaSettingsDefault.currentOpeningSide;
        pergolaSettings.currentOpenValue =
          pergolaSettingsDefault.currentOpenValue;
        pergolaSettings.currentSpan = pergolaSettingsDefault.currentSpan;
        pergolaSettings.spanSet = pergolaSettingsDefault.spanSet;
        pergolaSettings.subBifoldDoorColor =
          pergolaSettingsDefault.subBifoldDoorColor;
        pergolaSettings.subGuillotineGlassColor =
          pergolaSettingsDefault.subGuillotineGlassColor;
        pergolaSettings.subSlidingGlassDoorColor =
          pergolaSettingsDefault.subSlidingGlassDoorColor;
        pergolaSettings.subLiftSlideDoorColor =
          pergolaSettingsDefault.subLiftSlideDoorColor;
        pergolaSettings.subBlindShadeColor =
          pergolaSettingsDefault.subBlindShadeColor;
        pergolaSettings.subLeds = pergolaSettingsDefault.subLeds;
        pergolaSettings.subLedColor = pergolaSettingsDefault.subLedColor;
        pergolaSettings.allSlide = pergolaSettingsDefault.allSlide;
        clearOptionsState(subSystems_group);
        resetSubSystemPopups();

        pergola.span.objects.forEach((span) => {
          if (span.isSystemSet) {
            pergola.removeSystemFromSpan(span);
          }
        });

        break;
      case 3: // Side options
        pergolaSettings.sideOptionHeater =
          pergolaSettingsDefault.sideOptionHeater;
        pergolaSettings.sideOptionFan = pergolaSettingsDefault.sideOptionFan;
        break;

      default:
        break;
    }

    pergola.update();
    applyUiFromSettings();
  }

  //! ******************* Range Slider ***********************

  jQuery(document).ready(function () {
    jQuery('.ar_filter_inputs.type_range input[type="range"]').each(
      function () {
        const captionText = jQuery(this)
          .closest(".ar_filter_group")
          .find(".ar_filter_caption")
          .text();

        const groupHeader = jQuery(this)
          .closest(".ar_filter_group")
          .find(".ar_filter_header");
        groupHeader.hide();

        const minValue = jQuery(this).attr("min");
        const maxValue = jQuery(this).attr("max");

        jQuery(this).before(`
        <div class="range-header">
          <div class="range-caption_container">
            <span class="range-caption">${captionText}</span>
            <span class="range-caption_add">(inch)</span>
          </div>
          <div class="range-buttons_container">
            <div class="range-button range-button_minus"></div>
            <div class="range-label"></div>
            <div class="range-button range-button_plus"></div>
          </div>
        </div>
      `);

        jQuery(this).after(`
        <div class="range-values"></div>
        <div class="range-scale">
          <span class="range-tick" style="left: 0%;">${minValue}</span>
          <span class="range-tick" style="right: -6%;">${maxValue}</span>
        </div>
      `);

        jQuery(this)
          .closest(".ar_filter_inputs.type_range")
          .addClass("range-container");
      }
    );

    jQuery('input[type="range"]').each(function () {
      const input = jQuery(this);
      updateRangeBackgroundAndLabel(input);
    });

    jQuery('input[type="range"]').on("input", function () {
      updateRangeBackgroundAndLabel(jQuery(this));
    });

    jQuery(".range-button_minus").on("click", function () {
      const rangeContainer = jQuery(this).closest(".range-container");
      const input = rangeContainer.find('input[type="range"]');
      const step = parseFloat(input.attr("step")) || 1;
      const min = parseFloat(input.attr("min")) || 0;
      let currentValue = parseFloat(input.val()) || 0;

      currentValue = Math.max(currentValue - step, min);
      input.val(currentValue);
      updateRangeBackgroundAndLabel(input);
      // const event = new Event('change');
      // input[0].dispatchEvent(event);
      input.trigger("change");
    });

    jQuery(".range-button_plus").on("click", function () {
      const rangeContainer = jQuery(this).closest(".range-container");
      const input = rangeContainer.find('input[type="range"]');
      const step = parseFloat(input.attr("step")) || 1;
      const max = parseFloat(input.attr("max")) || 100;
      let currentValue = parseFloat(input.val()) || 0;

      currentValue = Math.min(currentValue + step, max);
      input.val(currentValue);
      updateRangeBackgroundAndLabel(input);
      // const event = new Event('change');
      // input[0].dispatchEvent(event);
      input.trigger("change");
    });
  });

  //! *****  Buttons on the AR-canvas: Hide, AR and SHARE  *****
  jQuery(document).ready(function () {
    jQuery(".ar_model_viewer").append(`
      <div class="canvas_element_container canvas_element__fullscreen">
        <div id="btnFullscreen" class="button__fullscreen "></div>
      </div>

      <div class="canvas_element_container canvas_element__sharearhide">
        <div id="btnShare" class="canvas_btn canvas_btn__share">
          <div class="canvas_btn__icon"></div>
          <div class="canvas_btn__caption">Share</div>
        </div>

        <div id="btnAR" class="canvas_btn canvas_btn__ar">
          <div class="canvas_btn__icon"></div>
          <div class="canvas_btn__caption">AR</div>
        </div>
        
        <!-- <div id="btnHide" class="canvas_btn canvas_btn__hide">
          <div class="canvas_btn__icon"></div>
          <div class="canvas_btn__caption">Hide</div>
        </div> -->
      </div>

      <div class="canvas_element_container canvas_element__wallblide">
        <div id="btnWall" class="canvas_btn canvas_btn__wall">
          <div class="canvas_btn__icon"></div>
          <div class="canvas_btn__caption">ADD MOUNTING WALL</div>
        </div>
        
        <div id="btnBlade" class="canvas_btn canvas_btn__blade">
          <div class="canvas_btn__icon canvas_btn__icon_blade"></div>
          <div class="canvas_btn__caption">ROOF LOUVER OPENING</div>
        </div>
      </div>

      <div class="canvas_menu_container canvas_menu__wall">
        <div class="canvas_menu__header">
          <div class="canvas_menu__title">Mounting Wall</div>
          <div class="canvas_menu__icon canvas_menu__icon_delete"></div>
          <div class="canvas_menu__icon canvas_menu__icon_close"></div>
        </div>

        <div class="canvas_menu__content">
          <div class="canvas_menu__item canvas_menu__item_checkbox">
            <input type="checkbox" id="wall_checkbox" name="wall_checkbox" checked >
            <label for="wall_checkbox">Keep posts</label>
          </div>
        </div>
      </div>

      <div class="canvas_menu_container canvas_menu__blade ">
        <div class="canvas_menu__header">
          <div class="canvas_menu__title">Roof Louver Opening</div>
          <div class="canvas_menu__icon canvas_menu__icon_close"></div>
        </div>

        <div class="canvas_menu__content">
          <div class="canvas_menu__item">
            <div class="range-container">
              <input type="range" min="0" max="1" value="0" step="0.01">
              <div class="range-values"></div>
              <div class="range-scale">
                <span class="range-tick range-tick__left">Close</span>
                <span class="range-tick range-tick__right">Open</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="canvas_subsystem_menu_anchor"></div>
    `);

    jQuery('.canvas_menu_container input[type="range"]').each(function () {
      const input = jQuery(this);
      updateRangeBackgroundAndLabel(input);
    });

    jQuery('.canvas_menu_container input[type="range"]').on(
      "input",
      function () {
        updateRangeBackgroundAndLabel(jQuery(this));
      }
    );

    // jQuery(document).on('click', '#btnHide', () => hideModelUi()); //? removed by design

    jQuery(document).on("click", "#btnFullscreen", () =>
      toggleFullscreenMode()
    );

    jQuery(document).on("click", "#btnShare", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showSharePopup();
    });
    jQuery(document).on("click", "#btnAR", (e) => {
      e.preventDefault();
      e.stopPropagation();
      pergolaOpenARorQR();
    });
    jQuery(document).on("click", "#btnWall", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleCanvasMenuMountingWall();
    });
    jQuery(document).on("click", "#btnBlade", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleCanvasMenuBladeRotation();
    });

    jQuery(".canvas_menu_container").on(
      "click",
      ".canvas_menu__icon_close",
      function () {
        jQuery(this).closest(".canvas_menu_container").removeClass("active");
        jQuery("#btnWall").removeClass("active");
        jQuery("#btnBlade").removeClass("active");
        unFixScroll();
      }
    );
  });

  function toggleFullscreenMode() {
    toggleMenuRight();
    toggleMenuDown();

    function toggleMenuRight() {
      jQuery(".main_menu").animate(
        {
          width: "toggle",
          opacity: "toggle",
        },
        300
      );

      jQuery(".ar_conf_container").toggleClass("fullscreen");
    }

    function toggleMenuDown() {
      jQuery(".footer_menu").animate(
        {
          height: "toggle",
          opacity: "toggle",
        },
        300
      );
    }
  }

  function toggleCanvasMenuMountingWall() {
    jQuery("#btnWall").toggleClass("active");
    jQuery(".canvas_menu__wall").toggleClass("active");
    jQuery("#btnBlade").removeClass("active");
    jQuery(".canvas_menu__blade").removeClass("active");

    if (jQuery(".canvas_menu__wall").hasClass("active")) {
      fixScroll();
    } else {
      unFixScroll();
    }
  }

  function toggleCanvasMenuBladeRotation() {
    jQuery("#btnBlade").toggleClass("active");
    jQuery(".canvas_menu__blade").toggleClass("active");
    jQuery("#btnWall").removeClass("active");
    jQuery(".canvas_menu__wall").removeClass("active");

    if (jQuery(".canvas_menu__blade").hasClass("active")) {
      fixScroll();
    } else {
      unFixScroll();
    }
  }

  //! *****   SUB SYSTEMS   *****

  jQuery(document).ready(function () {
    jQuery(`.${subSystems_options.Led.option}`).addClass("subsystem__led");

    jQuery(`#${subSystems_group} .component_title`).each(function () {
      jQuery(
        '<div class="component__buttons">' +
          '<div class="component__button component__button_add"></div>' +
          '<div class="component__button component__button_all"></div>' +
          "</div>"
      ).insertBefore(jQuery(this));
    });

    // canvas subsystem menu
    Object.keys(subSystemMenuGroups).forEach((key) => {
      jQuery(`#${key}`).addClass("canvas_subsystem_menu");

      const title = jQuery(
        `#${key} .ar_filter_header .ar_filter_caption`
      ).text();

      jQuery(`#${key} .ar_filter_header`).after(`
        <div class="canvas_menu__header">
          <div class="canvas_menu__title">${title}</div>
          <div id="btnDeleteSubSystem_${key}" data-group_id="${key}" class="canvas_menu__icon canvas_menu__icon_delete canvas_subsystem_menu__icon_delete"></div>
          <div class="canvas_menu__icon canvas_menu__icon_close canvas_subsystem_menu__icon_close"></div>
        </div>

        <div class="canvas_menu__content subsystem__menu">
          <div class="canvas_menu__item canvas_menu__item_radio">
            <div class="item_radio__wrapper">
              <input type="radio" id="radio_left_${key}" data-group_id="${key}" name="radio_${key}" value="Left" checked />
              <label class="radio-button-image-inner" for="radio_left_${key}">Left</label>
            </div>

            <div class="item_radio__wrapper">
              <input type="radio" id="radio_right_${key}" data-group_id="${key}" name="radio_${key}" value="Right" />
              <label class="radio-button-image-inner" for="radio_right_${key}">Right</label>
            </div>
          </div>

          <div class="canvas_menu__item canvas_menu__item_tumbler">
            <div class="tumbler__container">
              <div class="tumbler__label">All Slide</div>
              <div class="tumbler-wrapper ">
                <input type="checkbox" class="allSlide_input" id="tumbler_${key}" data-group_id="${key}" name="tumbler_${key}" hidden />
                <div class="tumbler"></div>
              </div>
            </div>
          </div>

          <div class="canvas_menu__item canvas_menu__item_range">
            <div class="range-container">
              <input id="range_opening_${key}" data-group_id="${key}" type="range" min="0" max="1" value="0" step="0.01">
              <div class="range-values"></div>
              <div class="range-scale">
                <span class="range-tick range-tick__left">Close</span>
                <span class="range-tick range-tick__right">Open</span>
              </div>
            </div>
          </div>

          <div class="canvas_menu__item canvas_menu__item_colors"></div>
        </div>
      `);
    });

    jQuery(`#range_opening_${subSystems_options.BifoldDoor.group}`).attr(
      "max",
      "0.98"
    );

    jQuery('.canvas_subsystem_menu input[type="range"]').each(function () {
      updateRangeBackgroundAndLabel(jQuery(this));
    });

    jQuery('.canvas_subsystem_menu input[type="range"]').on(
      "input",
      function () {
        updateRangeBackgroundAndLabel(jQuery(this));
      }
    );

    // Close popup btn
    jQuery(".canvas_subsystem_menu").on(
      "click",
      ".canvas_subsystem_menu__icon_close",
      function () {
        jQuery(this).closest(".canvas_subsystem_menu").removeClass("active");
        unFixScroll();
        clearOptionsState(subSystems_group, [subSystems_options.Led.option]);
        setHotspotsByGroupVisibility("subsystems", false);
      }
    );

    // Cancel btn //! TODO for LEDs
    jQuery(".option").on("click", ".component__button_add", function (event) {
      const thisOption = jQuery(this).closest(".option");

      if (thisOption.hasClass(`${subSystems_options.Led.option}`)) {
        if (thisOption.hasClass("checked")) {
          thisOption.removeClass("checked");
          event.stopPropagation();
          pergola.settings.subLeds = false;
          pergola.update();
          return;
        }
      }

      if (thisOption.hasClass("active")) {
        resetSubSystemPopups();
        setHotspotsByGroupVisibility("subsystems", false);

        setTimeout(() => {
          clearOptionsState(subSystems_group, [subSystems_options.Led.option]);
          setHotspotsByGroupVisibility("subsystems", false);
        }, 100);
      }
    });

    // Delete system btn
    jQuery(".canvas_subsystem_menu").on(
      "click",
      ".canvas_subsystem_menu__icon_delete",
      function () {
        jQuery(this).closest(".canvas_subsystem_menu").removeClass("active");
        unFixScroll();
        clearOptionsState(subSystems_group, [subSystems_options.Led.option]);
        setHotspotsByGroupVisibility("subsystems", false);

        pergola && pergola.removeSystemFromSpan(pergola.settings.currentSpan);
      }
    );
  });

  function updateSubsystemCanvasMenuPosition() {
    const subSystemMenuBlock = jQuery(".canvas_subsystem_menu");
    const anchorOffset = jQuery(".canvas_subsystem_menu_anchor").offset();
    const scrollTop = jQuery(window).scrollTop();
    const scrollLeft = jQuery(window).scrollLeft();

    if (anchorOffset) {
      subSystemMenuBlock.css({
        top: anchorOffset.top - scrollTop + "px",
        left: anchorOffset.left - scrollLeft - 220 + "px",
      });
    }
  }

  jQuery(window).on("resize scroll", updateSubsystemCanvasMenuPosition);
  jQuery(document).ready(updateSubsystemCanvasMenuPosition);

  //! *****   POP-UPs   *****

  // ************** HTML *****************
  jQuery(document).ready(function () {
    const popupsAndModals = jQuery(`
      <!-- popups -->
      <!-- add class 'active' to show it -->
      <div class="popup">
        <div class="popup-box">

          <!-- add class 'active' to show it -->
          <div id="popup-item-share" class="popup-item popup-item-share">
            <div class="popup-sharing-title">Share Configurator</div>

            <div class="popup-sharing-window">
              <input id="info-sharing-input" type="text" value="" />
              <button id="share_copyToClipboard" class="btn btn_copy">
                <span class="icon icon-copy"></span>
              </button>
            </div>
          </div>

          <!-- add class 'active' to show it -->
          <div id="popup-item-qr" class="popup-item popup-item-qr">
            <div class="popup-qr-title">Scan the QR code with your phone. Within 1-3 seconds the AR function opens on your phone.</div>
            <div class="popup-qr-img">
              <div id="qrcode" class="qrcode" >
                <img src="" alt="" />
              </div>
            </div>
          </div>

          <!-- add class 'active' to show it -->
          <div id="popup-item-requestpdf" class="popup-item popup-item-requestpdf">
            <div class="popup-requestpdf-title">Fill in details below to Download PDF:</div>

            <form class="request-form">
              <div class="form-wrap">
                <div class="form-inputs">
                  <input id="form_name" type="text" name="name" placeholder="First & Last name*" />
                  <input id="form_phone" type="tel" name="phone" placeholder="Telephone*" />
                  <input id="form_email" type="email" placeholder="Email*" class="full_size" />
                  <input id="form_address" type="text" placeholder="Address*" class="full_size" />
                  <input id="form_zipcode" type="text" placeholder="Zip Code*" />
                  <input id="form_city" type="text" placeholder="City*" />
                  <textarea id="form_comment" placeholder="Comment" rows="3"></textarea>
                </div>
                
                <div class="option_wrapper--column">
                  <input type="checkbox" id="agree" value="agree" checked />
                  <div class="checkbox__wrapper">
                    <div class="checkbox__header">
                      <label class="checkbox-item__label" for="agree">
                        <span class="checkbox-item__icon"></span>
                        <span class="checkbox-item__label-text ">I agree to the collection, storage, and processing of my
                          personal data by this website</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            
              <div class="form-buttons">
                <button type="button" id="js-closeRequestPdf" class="btn btn_pdf btn_orange">Cancel</button>
                <button type="submit" id="js-downloadPdf" class="btn btn_pdf">Download PDF</button>
              </div>
            </form>

          </div>

          <div class="popup-close"></div>
        </div>

        <div class="popup-overlay"></div>
      </div>

      <!-- modals -->

      <!-- add class 'active' to show it -->
      <div class="modal no-select">
        <div id="modalSummary" class="modal__content summary">
          <table class="summary__table">
            <thead>
              <tr>
                <th>PRODUCT NAME</th>
                <th>DIMENSIONS (INCH)</th>
                <th>DESCRIPTION</th>
                <th id="modalSummaryQty">QUANTITY</th>
              </tr>
            </thead>
            
            <tbody>
              <tr>
                <td id="summary_productTitle"></td>
                <td id="summary_dimensions"></td>
                <td id="summary_mainColors"></td>
                <td>1</td>
              </tr>

              <!-- - All selected Subsystems here - -->
              <tr id="summary_subsystemList"></tr>
              <!-- -------------------------------- -->

              <tr class="summary__table_subtitle">
                <td colspan="4">SIDE OPTIONS</td>
              </tr>
              
              <tr>
                <td colspan="3" class="summary__table_item_name">Fan</td>
                <td id="summary_fanPicked"></td>
              </tr>
              
              <tr>
                <td colspan="3">Heater</td>
                <td id="summary_heaterPicked"></td>
              </tr>

            </tbody>
          </table>

          <div class="summary__wrapper">
            <div class="hdn_prc can-select">
              <div class="hdn_prc--low">
                <span id="summary_currency">$</span>
                <span id="summary_price_base"></span>
              </div>
              <div class="hdn_prc--high">
                <span id="summary_currency">$</span>
                <span id="summary_price_high"></span>
                <nbsp>
                <span">(increased by 25%)</span>
              </div>
            </div>

            <button id="js-showRequestPdf" class="btn btn_pdf no-select">
              Download PDF
              <span class="icon icon__arrow_right"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- modals End -->
    `);

    jQuery(".configurator3d_post").append(popupsAndModals);

    qrcode = jQuery("#qrcode");

    // validateForm(); //! TEMP - uncomment it before release
  });
  // *************************************

  function closePopup() {
    jQuery(".product-type-3dmodel .popup").removeClass("active");

    jQuery(".product-type-3dmodel .popup").removeClass("requestpdf");
    jQuery(".product-type-3dmodel .popup-close").removeClass("requestpdf");
    jQuery(".product-type-3dmodel .popup-item-requestpdf").removeClass(
      "active"
    );

    jQuery(".product-type-3dmodel .popup").removeClass("arqr");
    jQuery(".product-type-3dmodel .popup-item-qr").removeClass("active");

    jQuery(".product-type-3dmodel .popup").removeClass("share");
    jQuery(".product-type-3dmodel .popup-item-share").removeClass("active");

    // jQuery('.product-type-3dmodel .popup').removeClass('inviting');
    // jQuery('.product-type-3dmodel .popup-item-inviting').removeClass('active');

    unFixScroll();
  }

  function closeModal() {
    jQuery(".product-type-3dmodel .modal").removeClass("active");
    jQuery(".product-type-3dmodel .popup-item-qr").removeClass("active");
    jQuery(".product-type-3dmodel .modal_overlay").removeClass("active");
  }

  function showSharePopup() {
    console.log("ðŸš€ ~ showSharePopup ~ ðŸš€");
    jQuery("#info-sharing-input")[0].value = getURLWithParameters();
    jQuery(".product-type-3dmodel .popup").addClass("share active");
    jQuery(".product-type-3dmodel .popup-item-share").addClass("active");
    fixScroll();
  }

  function showRequestPdfFormPopup() {
    jQuery(".product-type-3dmodel .popup").addClass("requestpdf active");
    jQuery(".product-type-3dmodel .popup-close").addClass("requestpdf");
    jQuery(".product-type-3dmodel .popup-item-requestpdf").addClass("active");
    fixScroll();
  }

  jQuery(document).on("click", "#share_copyToClipboard", function () {
    const input = document.getElementById("info-sharing-input");
    navigator.clipboard.writeText(input.value);
    return;
  });

  jQuery(document).on("click", "#js-showRequestPdf", function () {
    showRequestPdfFormPopup();
  });

  jQuery(document).on("click", "#js-closeRequestPdf", function () {
    closePopup();
  });

  jQuery(document).on("click", ".popup-close", function () {
    closePopup();
  });

  jQuery(document).on("click", ".popup-overlay", function () {
    closePopup();
  });

  jQuery(document).on(
    "click",
    "#footerMenu_0, #footerMenu_1, #footerMenu_2, #footerMenu_3",
    function () {
      closeModal();
    }
  );

  jQuery(document).on(
    "input",
    "#form_name, #form_phone, #form_email, #form_address, #form_zipcode, #form_city",
    validateForm
  );
  jQuery(document).on("change", "#agree", validateForm);

  jQuery(document).on(
    "submit",
    "#popup-item-requestpdf form",
    async function (event) {
      event.preventDefault();
      closePopup();
      closeModal();
      createPDF("download");
    }
  );

  // flash price
  let clickCount = 0;
  let timeout;

  jQuery(document).on("click", "#modalSummaryQty", function (event) {
    event.stopPropagation();

    clickCount++;

    if (clickCount === 1) {
      timeout = setTimeout(() => {
        clickCount = 0;
      }, 3000);
    }

    if (clickCount === 5) {
      jQuery(".summary__wrapper").addClass("flashed");
      clearTimeout(timeout);
      clickCount = 0;
    }
  });

  jQuery(document).on("click", function () {
    clickCount = 0;
    clearTimeout(timeout);
  });
}

function fixScroll() {
  jQuery("#header-outer").addClass("popup-open");
  jQuery("#wpadminbar").addClass("popup-open");
  document.body.classList.add("popup-open");
  const adminPanelHeight = jQuery("#wpadminbar").outerHeight() || 0;
  const siteHeaderHeight = jQuery("#header-outer").outerHeight() || 0;
  document.body.style.top = `${adminPanelHeight + siteHeaderHeight}px`;
}

function unFixScroll() {
  jQuery("#header-outer").removeClass("popup-open");
  jQuery("#wpadminbar").removeClass("popup-open");
  document.body.classList.remove("popup-open");
  document.body.classList.remove("popup-open");
  document.body.style.top = "0";
}

function updateRangeBackgroundAndLabel(input) {
  const min = parseFloat(input.attr("min")) || 0;
  const max = parseFloat(input.attr("max")) || 100;
  const val = parseFloat(input.val()) || 0;
  const percentage = ((val - min) / (max - min)) * 100;

  input.css(
    "background",
    `linear-gradient(to right, var(--color-orange, orange) ${percentage}%, var(--color-gray, gray) ${percentage}%)`
  );

  const label = input.closest(".range-container").find(".range-label");
  label.text(`${val}`);
}

// jQuery(window).resize(function () {
//   jQuery('.configurator3d_post input[type="range"]').each(function() {
//     updateRangeBackgroundAndLabel(jQuery(this));
//   });
// });

function updateUI() {
  const removeHiddenClass = () => {
    jQuery(`#${rangeWidth_group}`).removeClass("hidden");
    jQuery(`#${rangeDepth_group}`).removeClass("hidden");
    jQuery(`#${rangeHeight_group}`).removeClass("hidden");
    jQuery(`#${subSystems_group}`).removeClass("hidden");
    jQuery(`#${sideOptions_group}`).removeClass("hidden");
    jQuery(`#${structureColor_group}`).removeClass("hidden");
    jQuery(`#${standardColors_group}`).removeClass("hidden");
    jQuery(`#${woodEffectFinishColors_group}`).removeClass("hidden");
    jQuery(`#${canopyColors_group}`).removeClass("hidden");
  };

  // Menu Dimensions
  if (jQuery("#footerMenu_0").hasClass("active")) {
    removeHiddenClass();
    jQuery(`#${subSystems_group}`).addClass("hidden");
    jQuery(`#${sideOptions_group}`).addClass("hidden");
    jQuery(`#${structureColor_group}`).addClass("hidden");
    jQuery(`#${standardColors_group}`).addClass("hidden");
    jQuery(`#${woodEffectFinishColors_group}`).addClass("hidden");
    jQuery(`#${canopyColors_group}`).addClass("hidden");
  }

  // Menu Texture & Color
  if (jQuery("#footerMenu_1").hasClass("active")) {
    removeHiddenClass();
    jQuery(`#${rangeWidth_group}`).addClass("hidden");
    jQuery(`#${rangeDepth_group}`).addClass("hidden");
    jQuery(`#${rangeHeight_group}`).addClass("hidden");
    jQuery(`#${subSystems_group}`).addClass("hidden");
    jQuery(`#${sideOptions_group}`).addClass("hidden");
  }

  // Menu SubSystems
  if (jQuery("#footerMenu_2").hasClass("active")) {
    removeHiddenClass();
    jQuery(`#${rangeWidth_group}`).addClass("hidden");
    jQuery(`#${rangeDepth_group}`).addClass("hidden");
    jQuery(`#${rangeHeight_group}`).addClass("hidden");
    jQuery(`#${sideOptions_group}`).addClass("hidden");
    jQuery(`#${structureColor_group}`).addClass("hidden");
    jQuery(`#${standardColors_group}`).addClass("hidden");
    jQuery(`#${woodEffectFinishColors_group}`).addClass("hidden");
    jQuery(`#${canopyColors_group}`).addClass("hidden");
  }

  if (!jQuery("#footerMenu_2").hasClass("active")) {
    clearOptionsState(subSystems_group, [subSystems_options.Led.option]);
    resetSubSystemPopups();
    setHotspotsByGroupVisibility("subsystems", false);
  }

  // Side Options
  if (jQuery("#footerMenu_3").hasClass("active")) {
    removeHiddenClass();
    jQuery(`#${rangeWidth_group}`).addClass("hidden");
    jQuery(`#${rangeDepth_group}`).addClass("hidden");
    jQuery(`#${rangeHeight_group}`).addClass("hidden");
    jQuery(`#${subSystems_group}`).addClass("hidden");
    jQuery(`#${structureColor_group}`).addClass("hidden");
    jQuery(`#${standardColors_group}`).addClass("hidden");
    jQuery(`#${woodEffectFinishColors_group}`).addClass("hidden");
    jQuery(`#${canopyColors_group}`).addClass("hidden");
  }
}

function UIgroupVisibility(groupId, value) {
  const element = document.getElementById(groupId);

  if (element) {
    element.style.display = value ? "block" : "none";
  } else {
    console.error("Element not found with id:", groupId);
  }
}

function clearOptionsState(groupId, exceptions = []) {
  const group = jQuery(`#${groupId}`);

  // group.find('.option.active').removeClass('active');

  group.find(".option.active").each(function () {
    const element = jQuery(this);
    const hasExceptionClass = exceptions.some((exceptionClass) =>
      element.hasClass(exceptionClass)
    );
    if (!hasExceptionClass) {
      element.removeClass("active");
    }
  });

  // group.find('.option.inactive').removeClass('inactive');

  Object.keys(subSystems_options).forEach((key) => {
    const grId = subSystems_options[key].group;
    const rangeInput = jQuery(`#${grId} .range-container input[type="range"]`);
    rangeInput.val(0);
    updateRangeBackgroundAndLabel(rangeInput);
  });

  if (pergola && pergola.settings) {
    pergola.settings.currentSubsystem = null;
    pergola.settings.currentSubsystemKey = null;
  }
}

function makeRestOptionsInactive(groupId) {
  const group = jQuery(`#${groupId}`);
  group.find(".option.inactive").removeClass("inactive");

  const activeOptions = group.find(".option.active");

  if (activeOptions.length > 0) {
    group.find(".option:not(.active)").addClass("inactive");
  } else {
    group.find(".option").removeClass("inactive");
  }
}

function resetSubSystemPopups() {
  Object.keys(subSystemMenuGroups).forEach((gr) => {
    jQuery(`#${gr}`).removeClass("active");
  });
}
//#endregion

//#region INITIALIZATION //! ******** START HERE ********
function start() {
  if (loaded) {
    return;
  }
  loaded = true;

  if (theModel) {
    // theModel.visible = true;
    initMorphModel(theModel);
  }

  startSettings();
}

async function startSettings() {
  prepareUI();
  updateUI();
  settings3d();
  prepareAR();
  assignUI();
  readUrlParams();

  createPergola(theModel);

  if (
    getMobileOperatingSystem() == "Android" ||
    getMobileOperatingSystem() == "iOS" ||
    getMobileOperatingSystem() == "VisionPro"
  ) {
    checkQRMobile();
  }

  promiseDelay(1000, () => {
    applyUiFromSettings();

    setIsLoaderActive(false);
    jQuery(".configurator3d_post_cover").css("display", "none");

    scene.visible = true;
    animateScale(theModel);

    blockURLWriter = false;
    writeUrlParams(200, applyUiFromSettings);

    initRaycast();
  });
}

function createPergola(model) {
  pergola = new PergolaObject(pergolaSettings);
  pergola.createFrom3DModel(model);

  setTimeout(() => {
    applyUiFromSettings();
    deserializeSystems(subsystemsStringFromURL);
    // console.log("ðŸš€ ~ createPergola ~ pergola:", pergola);
  }, 750);
}
//#endregion

//#region CONSTANTS
const pergolaConst = {
  structureColorType: {
    Standard: +structureColorTypeStandard_option.split("-")[1],
    Wood: +structureColorTypeWood_option.split("-")[1],
  },
  side: {
    Left: 0,
    Right: 1,
    Front: 2,
    Back: 3,
    Center: 4,
  },
  sideString: {
    0: "Left",
    1: "Right",
    2: "Front",
    3: "Back",
    4: "Center",
  },
  corner: {
    RL: 0,
    RR: 1,
    FL: 2,
    FR: 3,
  },
  direction: {
    Straight: 0,
    Perpendicular: 1,
  },
  postPlace: {
    CornerFront: 0,
    CornerBack: 1,
    MiddleFront: 2,
    MiddleBack: 3,
    CornerBackLeft: 4,
    CornerBackRight: 5,
  },
  canopyType: {
    Fixed: 0,
    Moving: 1,
    Handle: 2,
    Led: 3,
  },
  systemType: {
    BifoldDoor: 0,
    GuillotineGlass: 1,
    SlidingGlassDoor: 2,
    LiftSlideDoor: 3,
    BlindShade: 4,
    Led: 5,
  },
  systemNameString: {
    BifoldDoor: "Bifold Door",
    GuillotineGlass: "Guillotine Glass",
    SlidingGlassDoor: "Sliding Glass",

    LiftSlideDoor: "Lift & Slide Door",
    BlindShade: "Blinds & Shades",
    Led: "Leds",
  },
};

//#endregion

//#region SETTINGS
//! DEFAULT START SETTINGS
class PergolaSettings {
  constructor() {
    this.postWidthInterval = null;
    this.postDepthInterval = null;
    this.minWidth = null;
    this.minDepth = null;
    this.minHeight = null;
    this.maxWidth = null;
    this.maxDepth = null;
    this.maxHeight = null;
    this.canopyFixedDepthMin_m = null;
    this.canopyFixedDepthMax_m = null;
    this.canopyFixedDepthFolded_m = null;
    this.canopyMovingDepthMin_m = null;
    this.canopyMovingDepthMax_m = null;
    this.canopyMovingDepthFolded_m = null;
    this.roofBaseDepthMin_m = null;
    this.roofBaseDepthMax_m = null;
    this.width = null;
    this.depth = null;
    this.height = null;
    this.roofOpen = null;
    this.structureColorType = null;
    this.structureColorStandard = null;
    this.structureColorWood = null;
    this.canopyColor = null;
    this.currentSubsystem = null;
    this.currentSubsystemKey = null;
    this.currentSpan = null;
    this.spanSet = null;
    this.subBifoldDoorColor = null;
    this.subGuillotineGlassColor = null;
    this.subSlidingGlassDoorColor = null;
    this.subLiftSlideDoorColor = null;
    this.subBlindShadeColor = null;
    this.subLeds = null;
    this.subLedColor = null;
    this.allSlide = null;
    this.currentOpeningSide = null;
    this.sideOptionHeater = null;
    this.sideOptionFan = null;
    this.sideOptionLEDlight = null;
    this.mountingWall_Back = null;
    this.mountingWall_Left = null;
    this.mountingWall_Right = null;
    this.wallPosts = true;
  }
}

//! Default Settings
const pergolaSettingsDefault = new PergolaSettings();

pergolaSettingsDefault.postWidthInterval = 169; //inches
pergolaSettingsDefault.postDepthInterval = 252; //inches
pergolaSettingsDefault.minWidth = 94; // inches
pergolaSettingsDefault.minDepth = 96; // inches
pergolaSettingsDefault.minHeight = 60; // inches
pergolaSettingsDefault.maxWidth = 504; // inches
pergolaSettingsDefault.maxDepth = 504; // inches
pergolaSettingsDefault.maxHeight = 144; // inches
pergolaSettingsDefault.canopyFixedDepthMin_m = 0.456; // m
pergolaSettingsDefault.canopyFixedDepthMax_m = 0.557; // m
pergolaSettingsDefault.canopyFixedDepthFolded_m = 0.14; // m
pergolaSettingsDefault.canopyMovingDepthMin_m = 0.425; // m
pergolaSettingsDefault.canopyMovingDepthMax_m = 0.526; // m
pergolaSettingsDefault.canopyMovingDepthFolded_m = 0.109; // m
pergolaSettingsDefault.roofBaseDepthMin_m = 2.8; // m
pergolaSettingsDefault.roofBaseDepthMax_m = 9.56; // m

pergolaSettingsDefault.width = 120; // inches
pergolaSettingsDefault.depth = 120; // inches
pergolaSettingsDefault.height = 60; // inches
pergolaSettingsDefault.roofOpen = 0; // 0 - closed, 1 - open
pergolaSettingsDefault.structureColorType =
  pergolaConst.structureColorType.Standard;
pergolaSettingsDefault.structureColorStandard = 0;
pergolaSettingsDefault.structureColorWood = 0;
pergolaSettingsDefault.canopyColor = 0;
pergolaSettingsDefault.currentSubsystem = null;
pergolaSettingsDefault.currentSubsystemKey = null;
pergolaSettingsDefault.currentSpan = null;

pergolaSettingsDefault.spanSet = new Set();

pergolaSettingsDefault.subBifoldDoorColor = 0;
pergolaSettingsDefault.subGuillotineGlassColor = 0;
pergolaSettingsDefault.subSlidingGlassDoorColor = 0;
pergolaSettingsDefault.subLiftSlideDoorColor = 0;
pergolaSettingsDefault.subBlindShadeColor = 32;
pergolaSettingsDefault.subLeds = false;
pergolaSettingsDefault.subLedColor = 0;

pergolaSettingsDefault.allSlide = false;
pergolaSettingsDefault.currentOpeningSide = true;
pergolaSettingsDefault.currentOpenValue = 0;

pergolaSettingsDefault.sideOptionHeater = 0;
pergolaSettingsDefault.sideOptionFan = 0;
pergolaSettingsDefault.sideOptionLEDlight = 0;
pergolaSettingsDefault.mountingWall_Back = false; // CHANGE WALL ON PRODUCTION
pergolaSettingsDefault.mountingWall_Left = false;
pergolaSettingsDefault.mountingWall_Right = false;
pergolaSettingsDefault.wallPosts = true;

// Current Settings
const pergolaSettings = new PergolaSettings();
pergolaSettings.postWidthInterval = pergolaSettingsDefault.postWidthInterval;
pergolaSettings.postDepthInterval = pergolaSettingsDefault.postDepthInterval;
pergolaSettings.minWidth = pergolaSettingsDefault.minWidth;
pergolaSettings.minDepth = pergolaSettingsDefault.minDepth;
pergolaSettings.minHeight = pergolaSettingsDefault.minHeight;
pergolaSettings.maxWidth = pergolaSettingsDefault.maxWidth;
pergolaSettings.maxDepth = pergolaSettingsDefault.maxDepth;
pergolaSettings.maxHeight = pergolaSettingsDefault.maxHeight;
pergolaSettings.canopyFixedDepthMin_m =
  pergolaSettingsDefault.canopyFixedDepthMin_m;
pergolaSettings.canopyFixedDepthMax_m =
  pergolaSettingsDefault.canopyFixedDepthMax_m;
pergolaSettings.canopyFixedDepthFolded_m =
  pergolaSettingsDefault.canopyFixedDepthFolded_m;
pergolaSettings.canopyMovingDepthMin_m =
  pergolaSettingsDefault.canopyMovingDepthMin_m;
pergolaSettings.canopyMovingDepthMax_m =
  pergolaSettingsDefault.canopyMovingDepthMax_m;
pergolaSettings.canopyMovingDepthFolded_m =
  pergolaSettingsDefault.canopyMovingDepthFolded_m;
pergolaSettings.roofBaseDepthMin_m = pergolaSettingsDefault.roofBaseDepthMin_m;
pergolaSettings.roofBaseDepthMax_m = pergolaSettingsDefault.roofBaseDepthMax_m;

pergolaSettings.width = pergolaSettingsDefault.width;
pergolaSettings.depth = pergolaSettingsDefault.depth;
pergolaSettings.height = pergolaSettingsDefault.height;
pergolaSettings.roofOpen = pergolaSettingsDefault.roofOpen;
pergolaSettings.structureColorType = pergolaSettingsDefault.structureColorType;
pergolaSettings.structureColorStandard =
  pergolaSettingsDefault.structureColorStandard;
pergolaSettings.structureColorWood = pergolaSettingsDefault.structureColorWood;
pergolaSettings.canopyColor = pergolaSettingsDefault.canopyColor;
pergolaSettings.currentSubsystem = pergolaSettingsDefault.currentSubsystem;
pergolaSettings.currentSubsystemKey =
  pergolaSettingsDefault.currentSubsystemKey;
pergolaSettings.currentSpan = pergolaSettingsDefault.currentSpan;

pergolaSettings.spanSet = pergolaSettingsDefault.spanSet;

pergolaSettings.subBifoldDoorColor = pergolaSettingsDefault.subBifoldDoorColor;
pergolaSettings.subGuillotineGlassColor =
  pergolaSettingsDefault.subGuillotineGlassColor;
pergolaSettings.subSlidingGlassDoorColor =
  pergolaSettingsDefault.subSlidingGlassDoorColor;
pergolaSettings.subLiftSlideDoorColor =
  pergolaSettingsDefault.subLiftSlideDoorColor;
pergolaSettings.subBlindShadeColor = pergolaSettingsDefault.subBlindShadeColor;
pergolaSettings.subLeds = pergolaSettingsDefault.subLeds;
pergolaSettings.subLedColor = pergolaSettingsDefault.subLedColor;

pergolaSettings.allSlide = pergolaSettingsDefault.allSlide;
pergolaSettings.currentOpeningSide = pergolaSettingsDefault.currentOpeningSide;
pergolaSettings.currentOpenValue = pergolaSettingsDefault.currentOpenValue;

pergolaSettings.sideOptionHeater = pergolaSettingsDefault.sideOptionHeater;
pergolaSettings.sideOptionFan = pergolaSettingsDefault.sideOptionFan;
pergolaSettings.sideOptionLEDlight = pergolaSettingsDefault.sideOptionLEDlight;
pergolaSettings.mountingWall_Back = pergolaSettingsDefault.mountingWall_Back;
pergolaSettings.mountingWall_Left = pergolaSettingsDefault.mountingWall_Left;
pergolaSettings.mountingWall_Right = pergolaSettingsDefault.mountingWall_Right;
pergolaSettings.wallPosts = pergolaSettingsDefault.wallPosts;

//#endregion

//#region READ/WRITE URL PARAMS
const settingsFieldsMapping = [
  "width",
  "depth",
  "height",
  "structureColorType",
  "structureColorStandard",
  "structureColorWood",
  "canopyColor",
  // 'subBifoldDoorColor',
  // 'subGuillotineGlassColor',
  // 'subSlidingGlassDoorColor',
  // 'subLiftSlideDoorColor',
  "subBlindShadeColor",
  "subLeds",
  // 'subLedColor',
  "sideOptionHeater",
  "sideOptionFan",
  "sideOptionLEDlight",
  "mountingWall_Back",
  "mountingWall_Left",
  "mountingWall_Right",
  "wallPosts",
];

function setPergolaSettingsFromURL(paramArray, callback = null) {
  qrScaned = parseInt(paramArray.pop());
  // sceneTime = (parseInt(paramArray.pop()) === 1) ? 'Night' : 'Day';
  subsystemsStringFromURL = paramArray.pop();

  settingsFieldsMapping.forEach((key, index) => {
    let value = paramArray[index];
    if (typeof pergolaSettings[key] === "boolean") {
      pergolaSettings[key] = parseInt(value) === 1;
    }
    // else if (key.includes('sub') && key.includes('Span')) {
    //   pergolaSettings[key] = new Set(value ? value.split('*') : []);
    // }
    else {
      pergolaSettings[key] = parseInt(value);
    }
  });

  paramsLoaded = true;
  if (callback) callback();
}

function getParametersString() {
  const splitValue = "-";
  const paramArray = settingsFieldsMapping.map((key) => {
    const value = pergolaSettings[key];

    if (typeof value === "boolean") {
      return value ? 1 : 0;
    }
    // else if (key.includes('sub') && key.includes('Span')) {
    //   return Array.from(value).join('*');
    // }
    else {
      return value;
    }
  });

  const systemsString = serializeSystems();
  paramArray.push(systemsString);
  paramArray.push(qrScaned);

  const parametersValue = paramArray.join(splitValue);
  return parametersValue.SEncode();
}

function readUrlParams(callback = null, url = null) {
  const queryString = url || window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const encodedParams = urlParams.get(parametersKey);

  if (!encodedParams) {
    paramsLoaded = true;
    if (callback) callback();
    return;
  }

  const decodedParams = encodedParams.SDecode();
  const paramArray = decodedParams.split("-");

  if (paramArray.length === 0) {
    paramsLoaded = true;
    if (callback) callback();
    return;
  }

  setPergolaSettingsFromURL(paramArray, callback);
}

function writeUrlParams(delay = 0, callback = () => {}) {
  let parametersString = getParametersString();
  if (!parametersString) {
    return;
  }

  const updateURLWithParameters = (params) => {
    const url = new URL(window.location.href);
    url.searchParams.set(parametersKey, params);
    history.pushState(null, "", url.toString());
  };

  if (delay === 0) {
    updateURLWithParameters(parametersString);
    callback();
  } else {
    setTimeout(() => {
      parametersString = getParametersString();
      updateURLWithParameters(parametersString);
      callback();
    }, delay);
  }
}

function serializeSystems() {
  if (!pergola) return;
  const systems = [];

  pergola.span.objects.forEach((span) => {
    if (span.isSystemSet) {
      const system = span.getCurrentSystem();
      if (system) {
        let openingside = "n";
        if (system.openingside !== null) {
          openingside = system.openingside ? "1" : "0";
        }

        const serialized = [
          span.side,
          span.number,
          system.type,
          openingside,
        ].join("*");
        systems.push(serialized);
      }
    }
  });

  return systems.join("_");
}

//! this function should be called after pergola is created
function deserializeSystems(stringFromURL) {
  if (!pergola) return;

  const systemsArray = stringFromURL.split("_");

  systemsArray.forEach((systemData) => {
    const [side, number, type, openingSide] = systemData.split("*");

    const span = pergola.getSpanBySideAndNumber(+side, +number);

    if (span) {
      const system = span.systems.find((sys) => sys.type === parseInt(+type));

      if (system) {
        let openingside = null;
        if (openingSide !== "n") {
          openingside = parseInt(openingSide) == 1 ? true : false;
        }

        system.active = true;
        system.openingside = openingside;
        system.openValue = 0;
        span.active = false;
        span.isLocked = true;
        span.isSystemSet = true;

        pergola.changeObjectVisibility(true, system.object);
      }
    }
  });

  pergola.update();
}

function getURLWithParameters() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // eslint-disable-next-line no-unused-vars
  const keys = urlParams.keys(),
    values = urlParams.values();
  const entries = urlParams.entries();

  var url = location.protocol + "//" + location.host + location.pathname + "?";

  var configEmpty = true;

  for (const entry of entries) {
    if (entry[0] == parametersKey) {
      url += parametersKey + "=" + getParametersString() + "&";
      configEmpty = false;
    } else {
      url += entry[0] + "=" + entry[1] + "&";
    }
  }

  if (configEmpty) {
    url += parametersKey + "=" + getParametersString();
  }

  if (url.endsWith("&")) {
    url = url.substring(0, url.length - 1);
  }

  return url;
}

//#endregion

//#region ASSIGN UI
function assignUI() {
  jQuery(document).ready(function () {
    //* Dimensions
    const onChangeDimensions = (dimensionName, value) => {
      pergolaSettings[dimensionName] = value;
      pergola.update();
    };

    // Width
    jQuery(document).on(
      "input change",
      `#${rangeWidth_group} input[type='range']`,
      function () {
        onChangeDimensions("width", +this.value);
      }
    );

    // Depth
    jQuery(document).on(
      "input change",
      `#${rangeDepth_group} input[type='range']`,
      function () {
        onChangeDimensions("depth", +this.value);
      }
    );

    // Height
    jQuery(document).on(
      "input change",
      `#${rangeHeight_group} input[type='range']`,
      function () {
        onChangeDimensions("height", +this.value);
      }
    );

    //* Structure color Type
    jQuery(document).on(
      "click",
      `.${structureColorTypeStandard_option}`,
      () => {
        // Standard Colors
        pergolaSettings.structureColorType =
          pergolaConst.structureColorType.Standard;
        pergola.update();
      }
    );

    jQuery(document).on("click", `.${structureColorTypeWood_option}`, () => {
      // Wood Effect Finish
      pergolaSettings.structureColorType = pergolaConst.structureColorType.Wood;
      pergola.update();
    });

    //* All Color options
    Object.keys(colorOptionPrefixes).forEach((key) => {
      const optPrefix = colorOptionPrefixes[key];

      jQuery(document).on("click", `[class*="${optPrefix}"]`, function () {
        const className = jQuery(this).attr("class");
        const parts = className.split(" ");

        for (let i = 0; i < parts.length; i++) {
          if (parts[i].startsWith(optPrefix)) {
            const colorIndex = parseInt(parts[i].split(optPrefix)[1], 10);
            pergolaSettings[key] = colorIndex;
            pergola.update();
            break;
          }
        }
      });
    });

    //* Sub Systems group
    Object.keys(subSystems_options).forEach((key) => {
      const option = subSystems_options[key].option;

      jQuery(document).on("click", `.${option}`, function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (option !== subSystems_options.Led.option) {
          pergolaSettings.currentSubsystem = pergolaConst.systemType[key];
          pergolaSettings.currentSubsystemKey = key;

          if (pergolaSettings.subLeds) {
            jQuery(`.${option}`).addClass("checked");
          }
        } else {
          //! Led
          pergolaSettings.currentSubsystem = null;
          pergolaSettings.currentSubsystemKey = null;
          pergolaSettings.subLeds = true;
          jQuery(`.${option}`).addClass("checked");
        }

        resetSubSystemPopups();
        // makeRestOptionsInactive(subSystems_group); //? removed by design
        pergola && pergola.update();
      });

      // Add to all free span btn
      jQuery(document).on(
        "click",
        `.${option} .component__button_all`,
        function () {
          if (jQuery(this).closest(".option").hasClass("active")) {
            setHotspotsByGroupVisibility("subsystems", false);
            pergolaSettings.currentSubsystem = pergolaConst.systemType[key];
            pergolaSettings.currentSubsystemKey = key;
            pergola && pergola.putCurrentMenuSystemToAllFreeSpans();
          }
        }
      );
    });

    jQuery(document).on(
      "change",
      ".subsystem__menu input[type='radio']",
      function () {
        if (pergola) {
          const span = pergola.settings.currentSpan;
          if (!span) {
            return;
          }
          const system = span.getCurrentSystem();
          system.openingside = this.value === "Left" ? true : false;
          pergolaSettingsDefault.currentOpenValue = system.openValue;
          pergolaSettings.currentOpeningSide = system.openingside;
          pergola.update();
        }
      }
    );

    //* All Slide together
    jQuery(document).on(
      "click",
      ".subsystem__menu .tumbler-wrapper",
      function () {
        jQuery(this).toggleClass("active");
        const checkbox = jQuery(this).find(".allSlide_input");
        const isChecked = jQuery(this).hasClass("active") ? true : false;
        checkbox.prop("checked", isChecked);

        if (isChecked) {
          jQuery(".subsystem__menu .tumbler-wrapper").addClass("active");
        } else {
          jQuery(".subsystem__menu .tumbler-wrapper").removeClass("active");
        }

        pergolaSettings.allSlide = isChecked;
        pergola.update();
      }
    );

    //* Opening percentage
    jQuery(document).on(
      "input change",
      ".subsystem__menu input[type='range']",
      function () {
        pergolaSettings.currentOpenValue = +this.value;
        pergola && pergola.openingSubsystems(+this.value);
      }
    );

    //* Side Options
    jQuery(document).on("click", `.${sideOptionHeater_option}`, () => {
      // Heater
      if (jQuery(`.${sideOptionHeater_option}`).hasClass("active")) {
        pergolaSettings.sideOptionHeater = 1;
      } else {
        pergolaSettings.sideOptionHeater = 0;
      }
      pergola.update();
    });

    jQuery(document).on("click", `.${sideOptionFan_option}`, () => {
      // Fan
      if (jQuery(`.${sideOptionFan_option}`).hasClass("active")) {
        pergolaSettings.sideOptionFan = 1;
      } else {
        pergolaSettings.sideOptionFan = 0;
      }
      pergola.update();
    });

    //* Delete mounting wall
    jQuery(document).on(
      "click",
      ".canvas_menu__wall .canvas_menu__icon_delete",
      () => {
        pergolaSettings.mountingWall_Back = false;
        pergolaSettings.mountingWall_Left = false;
        pergolaSettings.mountingWall_Right = false;
        pergola.update();
      }
    );

    jQuery(document).on("click", "#btnWall", () => {
      pergola.changeMountingWall();
    });

    jQuery(document).on(
      "click",
      ".canvas_menu__wall .canvas_menu__icon_close",
      () => {
        pergola.changeMountingWall();
      }
    );

    //* Keep posts (for wall posts)
    jQuery(document).on("change", "#wall_checkbox", function () {
      pergolaSettings.wallPosts = this.checked;
      pergola.update();
    });

    //* Close Open Roof
    const onRoofOpening = (value) => {
      // 0 - 1
      pergolaSettings.roofOpen = value;
      pergola.update();
    };

    jQuery(document).on(
      "input change",
      ".canvas_menu__blade input[type='range']",
      function () {
        onRoofOpening(this.value);
      }
    );
  });
}

function applyUiFromSettings() {
  //* Dimensions
  const inputWidth = jQuery(`#${rangeWidth_group} input[type='range']`);
  const inputDepth = jQuery(`#${rangeDepth_group} input[type='range']`);
  const inputHeight = jQuery(`#${rangeHeight_group} input[type='range']`);
  inputWidth.val(pergolaSettings.width).trigger("change");
  inputDepth.val(pergolaSettings.depth).trigger("change");
  inputHeight.val(pergolaSettings.height).trigger("change");
  updateRangeBackgroundAndLabel(inputWidth);
  updateRangeBackgroundAndLabel(inputDepth);
  updateRangeBackgroundAndLabel(inputHeight);

  //* Structure color Type
  jQuery(
    `.${structureColorTypeStandard_option.split("-")[0]}-` +
      pergolaSettings.structureColorType
  ).trigger("click");

  //* All Color options
  Object.keys(colorOptionPrefixes).forEach((key) => {
    jQuery(`.${colorOptionPrefixes[key]}${pergolaSettings[key]}`).trigger(
      "click"
    );
  });

  //* Side Options
  if (
    pergolaSettings.sideOptionHeater == 1 &&
    !jQuery(`.${sideOptionHeater_option}`).hasClass("active")
  ) {
    jQuery(`.${sideOptionHeater_option}`).trigger("click");
  } else if (
    pergolaSettings.sideOptionHeater == 0 &&
    jQuery(`.${sideOptionHeater_option}`).hasClass("active")
  ) {
    jQuery(`.${sideOptionHeater_option}`).trigger("click");
  }

  if (
    pergolaSettings.sideOptionFan == 1 &&
    !jQuery(`.${sideOptionFan_option}`).hasClass("active")
  ) {
    jQuery(`.${sideOptionFan_option}`).trigger("click");
  } else if (
    pergolaSettings.sideOptionFan == 0 &&
    jQuery(`.${sideOptionFan_option}`).hasClass("active")
  ) {
    jQuery(`.${sideOptionFan_option}`).trigger("click");
  }

  //* Keep posts (for wall posts)
  jQuery(document).on("change", "#wall_checkbox", function () {
    pergolaSettings.wallPosts = this.checked;
    pergola.update();
  });

  if (pergolaSettings.wallPosts && !jQuery(`#wall_checkbox`).prop("checked")) {
    jQuery(`#wall_checkbox`).attr("checked", true);
  } else if (
    !pergolaSettings.wallPosts &&
    jQuery(`#wall_checkbox`).prop("checked")
  ) {
    jQuery(`#wall_checkbox`).attr("checked", false);
  }

  if (pergolaSettings.subLeds) {
    jQuery(`.${subSystems_options.Led.option}`).addClass("checked");
  }
}

//#endregion

//#region PERGOLA CLASSES
//* ROOF
class PergolaRoof {
  constructor() {
    this.open = 0;
    this.canopies = [];
    this.frames = [];
    this.beams = [];
    this.leds = [];
    this.beamX = [];
    this.louver = [];
  }
}

class PergolaRoofObject {
  constructor() {
    this.name = "";
    this.type = null;
    this.object = null;
    this.direction = null;
    this.active = false;
  }
}

//* POSTS
class PergolaPost {
  constructor() {
    this.objects = [];
    this.leftPosts = [];
    this.rightPosts = [];
    this.frontBeamWithPosts = [];
    this.backCenterPosts = [];

    this.centerCenter = [];
  }
}

class PergolaPostObject {
  constructor() {
    this.name = "";
    this.object = null;
    this.place = null;
    this.active = false;
  }
}

//* WALL MOUNTING
class PergolaMountingWall {
  constructor() {
    this.elements = [];
  }
}

class PergolaMountingWallElement {
  constructor() {
    this.name = "";
    this.labelObject = null;
    this.side = null;
    this.object = null;
    this.active = false;
  }
}

//* SYSTEMS
class PergolaSystem {
  constructor() {
    this.objects = [];
  }
}

class PergolaSystemObject {
  constructor() {
    this.name = "";
    this.type = null;
    this.spanWidth = null;
    this.spanHeight = null;
    this.direction = null;
    this.side = null;
    this.posX = 0;
    this.posZ = 0;
    this.openingside = null;
    this.openValue = 0;
    this.color = null;
    this.object = null;
    this.active = false;
    this.isLocked = false;
    this.windowObject = null;
    this.windowPosX = 0;
    this.windowPosZ = 0;
    this.doorQty = 0;
  }
}

//* SPANS
class PergolaSpan {
  constructor() {
    this.objects = [];
  }
}

class PergolaSpanObject {
  constructor() {
    this.side = null;
    this.number = 0;
    this.width = null;
    this.height = null;
    this.posX = 0;
    this.posY = 0;
    this.posZ = 0;
    this.offsetY = 0.2;
    this.avatar = null;
    this.hotspot = null;
    this.active = false;
    this.isSystemSet = false;
    this.systems = [];
    this.isLocked = false;

    this.getCurrentSystem = () => {
      return this.systems.find((system) => {
        return system.active;
      });
    };
  }
}
//#endregion

//#region PERGOLA OBJECT
class PergolaObject {
  constructor(settings) {
    this.width = settings.width || 0;
    this.depth = settings.depth || 0;
    this.height = settings.height || 0;
    this.originZ = 0;
    this.roof = new PergolaRoof();
    this.post = new PergolaPost();
    this.span = new PergolaSpan();
    this.system = new PergolaSystem();
    this.mountingWall = new PergolaMountingWall();
    this.settings = settings;
    this.lastSettings = new PergolaSettings();
    this.model = null;
    this.basePegola = null;
  }

  createFrom3DModel(model) {
    if (!model) {
      return;
    }

    this.model = model;
    this.originZ = pergolaConst.side.Front;

    this.model.traverse((o) => {
      if (!o) {
        console.warn("Undefined node in traverse!");
        return;
      }
      //* WALLS (using hotspots)
      if (o.name.includes("wall")) {
        const mountingWall = new PergolaMountingWallElement();
        mountingWall.name = o.name;
        mountingWall.object = o;
        mountingWall.object.position.y = 0.01; //? to prevent z-fighting
        mountingWall.object.position.z = o.position.z;
        let currentSide = "mountingWall_Back";

        if (o.name.includes("_R")) {
          mountingWall.side = pergolaConst.side.Right;
          mountingWall.labelObject = createHotspot(
            `${mountingWall.name}_hotspot`,
            labelObjects.plusSideRight.url,
            labelObjects.plusSideRightHover.url,
            new THREE.Vector3(0, 0, 0),
            "walls"
          );

          currentSide = "mountingWall_Right";
        } else if (o.name.includes("_L")) {
          mountingWall.side = pergolaConst.side.Left;
          mountingWall.labelObject = createHotspot(
            `${mountingWall.name}_hotspot`,
            labelObjects.plusSideLeft.url,
            labelObjects.plusSideLeftHover.url,
            new THREE.Vector3(0, 0, 0),
            "walls"
          );

          currentSide = "mountingWall_Left";
        } else if (o.name.includes("_back")) {
          mountingWall.side = pergolaConst.side.Back;
          mountingWall.labelObject = createHotspot(
            `${mountingWall.name}_hotspot`,
            labelObjects.plusSideBack.url,
            labelObjects.plusSideBackHover.url,
            new THREE.Vector3(0, 0, 0),
            "walls"
          );

          currentSide = "mountingWall_Back";
        } else {
          mountingWall.side = pergolaConst.side.Back;
          mountingWall.labelObject = createHotspot(
            `${mountingWall.name}_hotspot`,
            labelObjects.plusSideBack.url,
            labelObjects.plusSideBackHover.url,
            new THREE.Vector3(0, 0, 0),
            "walls"
          );

          currentSide = "mountingWall_Back";
        }

        const wallColor = new THREE.Color();
        const wallOpacity = mountingWall.object.material.opacity;
        const wallTransparent = mountingWall.object.material.transparent;
        wallColor.copy(mountingWall.object.material.color);

        mountingWall.labelObject.setHoverFunction(() => {
          if (!mountingWall.object.material.transparent) {
            mountingWall.object.material.transparent = true;
          }
          mountingWall.object.material.opacity = 0;
          mountingWall.object.material.color.set(spanColor);
          mountingWall.object.material.needsUpdate = true;
          mountingWall.object.visible = !this.settings[currentSide];

          animateProperty(
            mountingWall.object.material,
            "opacity",
            spanOpacity,
            500,
            () => {
              mountingWall.object.material.needsUpdate = true;
            }
          );
        });

        mountingWall.labelObject.setNormalFunction(() => {
          mountingWall.object.material.transparent = wallTransparent;
          mountingWall.object.material.opacity = spanOpacity;
          mountingWall.object.material.color.copy(wallColor);
          mountingWall.object.material.needsUpdate = true;
          mountingWall.object.visible = this.settings[currentSide];

          animateProperty(
            mountingWall.object.material,
            "opacity",
            0,
            500,
            () => {
              mountingWall.object.material.needsUpdate = true;
            }
          );
        });

        mountingWall.labelObject.setClickFunction(() => {
          mountingWall.object.material.transparent = wallTransparent;
          mountingWall.object.material.opacity = wallOpacity;
          mountingWall.object.material.color.copy(wallColor);
          mountingWall.object.visible = this.settings[currentSide];
          mountingWall.object.material.needsUpdate = true;
          this.settings[currentSide] = true;
          setHotspotVisibility(mountingWall.labelObject, false);
          this.update();
        });

        setHotspotVisibility(mountingWall.labelObject, false);
        hotspots.push(mountingWall.labelObject);

        this.mountingWall.elements.push(mountingWall);
      }
      //* POSTS
      //   const postElements = {
      //     front_legs: pergolaConst.postPlace.CornerFront,
      //     profile_2_back: pergolaConst.postPlace.CornerBack,
      //     post_front: pergolaConst.postPlace.MiddleFront,
      //     post_back: pergolaConst.postPlace.MiddleBack,
      //     "post-FL": pergolaConst.postPlace.CornerBackLeft,
      //     "post-FR": pergolaConst.postPlace.CornerBackRight,
      //   };
      //   Object.keys(postElements).forEach((key) => {
      //     if (o.name === key) {
      //       const postObject = new PergolaPostObject();
      //       postObject.name = o.name;
      //       postObject.object = o;
      //       postObject.place = postElements[key];
      //       this.post.objects.push(postObject);
      //     }
      //   });
      //* ROOF
      if (o.name === "profile_1_base") {
        const roofObject = new PergolaRoofObject();
        roofObject.name = o.name;
        roofObject.object = o;
        this.roof.frames.push(roofObject);
      }
      if (o.name === "profile_1_midle") {
        const roofObject = new PergolaRoofObject();
        roofObject.name = o.name;
        roofObject.object = o;
        this.roof.beams.push(roofObject);
      }
      //* Canopies
      if (o.name === "profile_4001") {
        const roofObject = new PergolaRoofObject();
        roofObject.name = o.name;
        roofObject.type = pergolaConst.canopyType.Fixed;
        roofObject.object = o;
        this.roof.canopies.push(roofObject);
      }
      if (o.name === "profile_5002") {
        const roofObject = new PergolaRoofObject();
        roofObject.name = o.name;
        roofObject.type = pergolaConst.canopyType.Moving;
        roofObject.object = o;
        this.roof.canopies.push(roofObject);
      }
      if (o.name === "profile_4") {
        const roofObject = new PergolaRoofObject();
        roofObject.name = o.name;
        roofObject.type = pergolaConst.canopyType.Handle;
        roofObject.object = o;
        this.roof.canopies.push(roofObject);
      }
      if (o.name === "profile_LED") {
        const roofObject = new PergolaRoofObject();
        roofObject.name = "canopy_led";
        roofObject.type = pergolaConst.canopyType.Led;

        if (o.parent) {
          o.parent.remove(o);
        }

        roofObject.object = o;
        this.roof.leds.push(roofObject);
      }

      //* SYSTEMS
      const systemElements = {
        bifold_doors_frame: {
          type: pergolaConst.systemType.BifoldDoor,
          name: "BifoldDoor",
        },
        Guillotine_frame: {
          type: pergolaConst.systemType.GuillotineGlass,
          name: "GuillotineGlass",
        },
        sliding_glass_frame: {
          type: pergolaConst.systemType.SlidingGlassDoor,
          name: "SlidingGlassDoor",
        },
        sliding_doors_frame: {
          type: pergolaConst.systemType.LiftSlideDoor,
          name: "LiftSlideDoor",
        },
        shades_frame: {
          type: pergolaConst.systemType.BlindShade,
          name: "BlindShade",
        },
      };

      Object.keys(systemElements).forEach((key) => {
        if (o.name.includes(key)) {
          const systemObject = new PergolaSystemObject();
          systemObject.name = systemElements[key].name;
          systemObject.object = o;
          systemObject.type = systemElements[key].type;
          systemObject.direction = pergolaConst.direction.Straight;
          systemObject.openingside = true;
          systemObject.side = pergolaConst.side.Front;

          if (o.name.includes("_side")) {
            systemObject.direction = pergolaConst.direction.Perpendicular;
            systemObject.side = pergolaConst.side.Left;
          }

          this.system.objects.push(systemObject);
        }
      });
    });

    // console.log("ðŸš€ ~ PergolaObject ~ :", this);
    // ---------------------------------
    this.prepareBaseAndCornerPosts();
    this.preparePosts();
    this.prepareRoof();
    this.prepareSystems();
    this.prepareSpans();

    const ledMaterial = getMaterialFromScene("base.led");

    if (ledMaterial) {
      // ledMaterial.emissive.set(0x000000); // чорний емісив
      ledMaterial.emissiveIntensity = 0;
    }

    parseMorphByModel(this.model);

    this.update();
  }

  prepareBaseAndCornerPosts() {
    this.model.traverse((o) => {
      if (o.name === "base") {
        this.basePegola = o;
        this.basePegola.visible = true;
        this.basePegola.children.forEach((child) => (child.visible = true));

        const modelOffsetZ = this.model.position.z;

        this.basePegola.position.z = this.basePegola.position.z - modelOffsetZ;
        console.log(this.basePegola);
      }

      if (o.name === "post-FL") {
        this.post.flPost = o;
        this.post.flPost.visible = true;
      }

      if (o.name === "post-FR") {
        this.post.frPost = o;
        this.post.frPost.visible = true;
      }

      if (o.name === "post-BL") {
        this.post.blPost = o;
        this.post.blPost.visible = true;
      }

      if (o.name === "post-BR") {
        this.post.brPost = o;
        this.post.brPost.visible = true;
      }
    });
  }

  // ---------------------------------
  preparePosts() {
    const minInterval = 2;

    const qtyMiddlePostsWidth = Math.floor(
      this.inchToMeter(this.settings.maxWidth) / minInterval
    );

    this.clonePostObject(qtyMiddlePostsWidth + 1, "leftPosts");

    this.clonePostObject(qtyMiddlePostsWidth + 1, "rightPosts");

    this.clonePostObject(qtyMiddlePostsWidth + 1, "frontBeamWithPosts");
    this.clonePostObject(qtyMiddlePostsWidth + 1, "backCenterPosts");

    this.clonePostObject(qtyMiddlePostsWidth + 1, "centerCenter");
  }

  //   prepareBase() {
  //     const qtyMiddlePostsWidth = Math.floor(
  //       this.settings.maxWidth / this.settings.postWidthInterval
  //     );
  //     this.clonePostObject(
  //       pergolaConst.postPlace.MiddleFront,
  //       qtyMiddlePostsWidth - 1
  //     );
  //     this.clonePostObject(
  //       pergolaConst.postPlace.MiddleBack,
  //       qtyMiddlePostsWidth - 1
  //     );
  //   }

  clonePostObject(count, side) {
    const element = this.getPost(side);

    if (!element) {
      return;
    }

    for (let i = 0; i < count; i++) {
      const clonedMesh = element.clone();
      clonedMesh.visible = false;
      const parent = scene.getObjectByName("Scene");

      if (parent) {
        parent.add(clonedMesh);
      } else {
        scene.add(clonedMesh);
      }

      const postObject = new PergolaPostObject();
      postObject.name = element.name;
      postObject.object = clonedMesh;
      postObject.place = side;
      this.post[side].push(postObject);
    }
  }

  getPost(side) {
    let element;

    if (this.post == null) {
      return;
    }

    if (side === "leftPosts") {
      this.model.traverse((o) => {
        if (o.name === "post-CL") {
          element = o;
        }
      });
    }

    if (side === "rightPosts") {
      this.model.traverse((o) => {
        if (o.name === "post-CR") {
          element = o;
        }
      });
    }

    if (side === "frontBeamWithPosts") {
      this.model.traverse((o) => {
        if (o.name === "beam_Y") {
          element = o;
        }
      });
    }

    if (side === "backCenterPosts") {
      this.model.traverse((o) => {
        if (o.name === "post-BC") {
          element = o;
        }
      });
    }

    if (side === "centerCenter") {
      this.model.traverse((o) => {
        if (o.name === "midle_post") {
          element = o;
        }
      });
    }

    return element;
  }

  // ---------------------------------
  prepareRoof() {
    const prepareCountBeam = 5;
    const prepareCountLouver =
      Math.ceil(this.inchToMeter(this.settings.maxDepth) / 0.266759) * 3;

    // BEAM
    this.cloneRoofObject("beamX", prepareCountBeam);

    // LOUVER
    this.cloneRoofObject("louver", prepareCountLouver);
  }

  cloneRoofObject(
    type = "baseBeams",
    count,
    needToAdd = true,
    parentName = "Scene"
  ) {
    const element = this.getRoofElement(type);

    if (!element) {
      return;
    }

    for (let i = 0; i < count; i++) {
      const clonedMesh = element.clone();
      clonedMesh.visible = false;
      const parent = scene.getObjectByName(parentName);
      if (needToAdd && parent) {
        parent.add(clonedMesh);
      }
      if (needToAdd && !parent) {
        scene.add(clonedMesh);
      }

      const roofObject = new PergolaRoofObject();
      roofObject.name = element.name;
      roofObject.type = element.type;
      roofObject.object = clonedMesh;
      this.roof[type].push(roofObject);
    }
  }

  getRoofElement(type = "beams", name = null) {
    let element;

    //BEAM
    if (type === "beamX") {
      this.model.traverse((o) => {
        if (o.name === "beam_X") {
          element = o;
        }
      });
    }

    if (type === "louver") {
      this.model.traverse((o) => {
        if (o.name === "louver") {
          element = o;
        }
      });
    }

    // if (type === "louver") {
    //   model.traverse((o) => {
    //     if (o.name === "louver") {
    //       element = o;
    //     }
    //   });
    // }

    // if (type === "fans") {
    //   model.traverse((o) => {
    //     if (o.name === "Cylinder") {
    //       element = o;
    //     }
    //   });
    // }

    // if (type === "heaters") {
    //   model.traverse((o) => {
    //     if (o.name === "Cube004") {
    //       element = o;
    //     }
    //   });
    // }

    // if (type === "fansBeam") {
    //   model.traverse((o) => {
    //     if (o.name === "beam_fan") {
    //       element = o;
    //     }
    //   });
    // }

    return element;
  }

  // ---------------------------------
  prepareSystems() {
    const qtySpansWidth =
      Math.floor(this.settings.maxWidth / this.settings.postWidthInterval) + 1;
    const qtySpansDepth =
      Math.floor(this.settings.maxDepth / this.settings.postDepthInterval) + 1;

    this.cloneSystemObject(
      pergolaConst.systemType.BifoldDoor,
      pergolaConst.direction.Straight,
      pergolaConst.side.Front,
      qtySpansWidth - 1
    );
    this.cloneSystemObject(
      pergolaConst.systemType.GuillotineGlass,
      pergolaConst.direction.Straight,
      pergolaConst.side.Front,
      qtySpansWidth - 1
    );
    this.cloneSystemObject(
      pergolaConst.systemType.SlidingGlassDoor,
      pergolaConst.direction.Straight,
      pergolaConst.side.Front,
      qtySpansWidth - 1
    );
    this.cloneSystemObject(
      pergolaConst.systemType.LiftSlideDoor,
      pergolaConst.direction.Straight,
      pergolaConst.side.Front,
      qtySpansWidth - 1
    );
    this.cloneSystemObject(
      pergolaConst.systemType.BlindShade,
      pergolaConst.direction.Straight,
      pergolaConst.side.Front,
      qtySpansWidth - 1
    );

    this.cloneSystemObject(
      pergolaConst.systemType.BifoldDoor,
      pergolaConst.direction.Straight,
      pergolaConst.side.Back,
      qtySpansWidth
    );
    this.cloneSystemObject(
      pergolaConst.systemType.GuillotineGlass,
      pergolaConst.direction.Straight,
      pergolaConst.side.Back,
      qtySpansWidth
    );
    this.cloneSystemObject(
      pergolaConst.systemType.SlidingGlassDoor,
      pergolaConst.direction.Straight,
      pergolaConst.side.Back,
      qtySpansWidth
    );
    this.cloneSystemObject(
      pergolaConst.systemType.LiftSlideDoor,
      pergolaConst.direction.Straight,
      pergolaConst.side.Back,
      qtySpansWidth
    );
    this.cloneSystemObject(
      pergolaConst.systemType.BlindShade,
      pergolaConst.direction.Straight,
      pergolaConst.side.Back,
      qtySpansWidth
    );

    this.cloneSystemObject(
      pergolaConst.systemType.BifoldDoor,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Left,
      qtySpansDepth - 1
    );
    this.cloneSystemObject(
      pergolaConst.systemType.GuillotineGlass,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Left,
      qtySpansDepth - 1
    );
    this.cloneSystemObject(
      pergolaConst.systemType.SlidingGlassDoor,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Left,
      qtySpansDepth - 1
    );
    this.cloneSystemObject(
      pergolaConst.systemType.LiftSlideDoor,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Left,
      qtySpansDepth - 1
    );
    this.cloneSystemObject(
      pergolaConst.systemType.BlindShade,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Left,
      qtySpansDepth - 1
    );

    this.cloneSystemObject(
      pergolaConst.systemType.BifoldDoor,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Right,
      qtySpansDepth
    );
    this.cloneSystemObject(
      pergolaConst.systemType.GuillotineGlass,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Right,
      qtySpansDepth
    );
    this.cloneSystemObject(
      pergolaConst.systemType.SlidingGlassDoor,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Right,
      qtySpansDepth
    );
    this.cloneSystemObject(
      pergolaConst.systemType.LiftSlideDoor,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Right,
      qtySpansDepth
    );
    this.cloneSystemObject(
      pergolaConst.systemType.BlindShade,
      pergolaConst.direction.Perpendicular,
      pergolaConst.side.Right,
      qtySpansDepth
    );

    this.assignWindowsToSystems();
  }

  assignWindowsToSystems() {
    const win_up_side = scene.getObjectByName("win_up_side");
    // const win_up_side_R = scene.getObjectByName("win_up_side_R");
    // const win_up_back = scene.getObjectByName("win_up_back");
    const win_up = scene.getObjectByName("win_up");

    win_up_side.visible = false;
    // win_up_side_R.visible = false;
    // win_up_back.visible = false;
    win_up.visible = false;

    const baseObjects = {
      [pergolaConst.side.Left]: win_up_side,
      [pergolaConst.side.Right]: win_up_side,
      [pergolaConst.side.Back]: win_up,
      [pergolaConst.side.Front]: win_up,
    };

    for (const side in baseObjects) {
      if (!baseObjects[side]) {
        console.warn(`Object for side ${side} not found on the scene.`);
        return;
      }
    }

    this.system.objects.forEach((obj) => {
      const side = obj.side;

      if (baseObjects[side]) {
        const clonedObject = baseObjects[side].clone();
        this.model.add(clonedObject);
        clonedObject.visible = false;
        obj.windowObject = clonedObject;
      } else {
        console.warn(`Side ${side} does not match any known objects.`);
      }
    });

    scene.remove(win_up_side, win_up);
  }

  cloneSystemObject(type, direction, side, count) {
    const element = this.getSystem(null, type, direction);
    if (!element) {
      return;
    }

    for (let i = 0; i < count; i++) {
      const clonedMesh = element.object.clone();
      clonedMesh.visible = false;
      const parent = scene.getObjectByName("Scene");
      if (parent) {
        parent.add(clonedMesh);
      } else {
        scene.add(clonedMesh);
      }

      if (side === pergolaConst.side.Right || side === pergolaConst.side.Back) {
        clonedMesh.scale.z = -1;
      }

      const systemObject = new PergolaSystemObject();
      systemObject.name = element.name;
      systemObject.object = clonedMesh;
      systemObject.type = type;
      systemObject.direction = direction;
      systemObject.side = side;

      this.system.objects.push(systemObject);
    }
  }

  getSystem(name = null, type = null, direction = null, side = null) {
    if (this.system == null) {
      return;
    }
    if (this.system.objects == null) {
      return;
    }
    if (!this.system.objects) {
      return;
    }

    for (let i = 0; i < this.system.objects.length; i++) {
      const element = this.system.objects[i];

      if (name != null) {
        if (element.name != name) {
          continue;
        }
      }
      if (type != null) {
        if (element.type != type) {
          continue;
        }
      }
      if (direction != null) {
        if (element.direction != direction) {
          continue;
        }
      }
      if (side != null) {
        if (element.side != side) {
          continue;
        }
      }

      return element;
    }
  }

  // =============================================================
  update() {
    this.changeDimensions();
    this.setPosts();
    this.setRoofBeam();
    this.setLouver();
    // this.setRoofCanopy();
    this.setSpans();
    this.showAvailableSpans();
    this.updateSubsystems();

    //check PEREMETR LEDS
    const ledMaterial = getMaterialFromScene("base.led");

    if (pergolaSettings.subLeds) {
      if (ledMaterial) {
        // ledMaterial.emissive.set(0x000000); // чорний емісив
        ledMaterial.emissiveIntensity = 1;
      }
    } else {
      if (ledMaterial) {
        // ledMaterial.emissive.set(0x000000); // чорний емісив
        ledMaterial.emissiveIntensity = 0;
      }
    }

    this.changeMountingWall();

    this.updateRadioButtonsInSystemPopup();

    writeUrlParams(200);
    //? the writeUrlParams in the afterChangeDelegate();
  }

  updateRadioButtonsInSystemPopup() {
    if (
      jQuery(`#${subSystems_options.SlidingGlassDoor.group}`).hasClass(
        "active"
      ) ||
      jQuery(`#${subSystems_options.LiftSlideDoor.group}`).hasClass("active")
    ) {
      const sys = this.settings.currentSpan.getCurrentSystem();
      if (sys) {
        const radioGroup_SlidingGlassDoor = jQuery(
          `#${subSystems_options.SlidingGlassDoor.group} .canvas_menu__item_radio`
        );
        const radioGroup_LiftSlideDoor = jQuery(
          `#${subSystems_options.LiftSlideDoor.group} .canvas_menu__item_radio`
        );
        if (sys.object.children.length > 5) {
          radioGroup_SlidingGlassDoor.css("display", "none");
          radioGroup_LiftSlideDoor.css("display", "none");
        } else {
          radioGroup_SlidingGlassDoor.css("display", "flex");
          radioGroup_LiftSlideDoor.css("display", "flex");
        }
      }
    }
  }

  // =============================================================
  changeDimensions() {
    const width = this.settings.width;
    const depth = this.settings.depth;
    const height = this.settings.height;

    let shapekeyName;
    let shapekeyValue;

    const morphPergola = () => {
      if (!shapekeyName || !shapekeyValue) {
        return;
      }
      changeGlobalMorph(shapekeyName, shapekeyValue);
    };

    //* WIDTH
    if (width !== this.lastSettings.width) {
      shapekeyName = "Width";
      shapekeyValue = interpolateValue(
        width + 0.0001,
        this.settings.minWidth,
        this.settings.maxWidth
      );
      this.width = width;
      pergolaSettings.width = width;
      this.lastSettings.width = width;
      morphPergola();

      // this.openingBifoldDoor();
    }

    //* DEPTH
    if (depth !== this.lastSettings.depth) {
      shapekeyName = "Length";
      shapekeyValue = interpolateValue(
        depth + 0.0001,
        this.settings.minDepth,
        this.settings.maxDepth
      );
      this.depth = depth;
      pergolaSettings.depth = depth;
      this.lastSettings.depth = depth;

      if (this.originZ == pergolaConst.side.Front) {
        this.model.position.z = (depth * 0.0254) / 2;
      }

      morphPergola();

      // left and right windows
      const shapekeyValueWindows = interpolateValue(
        depth + 0.0001 - 8,
        this.settings.minDepth - 4,
        this.settings.maxDepth
      );
      changeGlobalMorph("length_win_up_side", shapekeyValueWindows);

      // this.openingBifoldDoor();
    }

    //* HEIGHT
    if (height !== this.lastSettings.height) {
      shapekeyName = "Height";
      shapekeyValue = interpolateValue(
        height + 0.0001,
        this.settings.minHeight,
        this.settings.maxHeight
      );
      this.height = height;
      pergolaSettings.height = height;
      this.lastSettings.height = height;
      morphPergola();

      // left and right windows
      const shapekeyValueWindows = interpolateValue(
        height + 0.0001,
        this.settings.minHeight,
        this.settings.maxHeight - 0.15
      );
      changeGlobalMorph("height_win_up_side.001", shapekeyValueWindows);

      // this.openingBifoldDoor();
      this.openingBlindShade();
    }

    //* height lowerCase
    if (height !== this.lastSettings.height) {
      shapekeyName = "height";
      shapekeyValue = interpolateValue(
        height + 0.0001,
        this.settings.minHeight,
        this.settings.maxHeight
      );
      this.height = height;
      pergolaSettings.height = height;
      this.lastSettings.height = height;
      morphPergola();

      // left and right windows
      const shapekeyValueWindows = interpolateValue(
        height + 0.0001,
        this.settings.minHeight,
        this.settings.maxHeight - 0.15
      );
      changeGlobalMorph("height_win_up_side.001", shapekeyValueWindows);

      // this.openingBifoldDoor();
      this.openingBlindShade();
    }
  }

  // =============================================================
  setPosts() {
    this.changePostVisibility(false, "leftPosts", true);
    this.changePostVisibility(false, "rightPosts", true);
    this.changePostVisibility(false, "frontBeamWithPosts", true);
    this.changePostVisibility(false, "backCenterPosts", true);
    this.changePostVisibility(false, "centerCenter", true);

    const { point_post_width, point_post_length } = this.getPostPoints();

    // console.log("SET POSTS WIDTH", point_post_width);
    // console.log("SET POSTS LENGHT", point_post_length);

    if (point_post_length.length > 0) {
      this.setPostsPosition("leftPosts", point_post_length);
      this.setPostsPosition("rightPosts", point_post_length);
    }

    if (point_post_width.length > 0) {
      this.setPostsPosition("frontBeamWithPosts", point_post_width);
      this.setPostsPosition("backCenterPosts", point_post_width);
    }

    // center column
    if (point_post_width.length && point_post_length.length) {
      const posts = this.post.centerCenter;

      for (let i = 0; i < point_post_width.length; i++) {
        const point = point_post_width[i];

        for (let j = 0; j < point_post_length.length; j++) {
          const pointZ = point_post_length[j].z;

          const element = this.getAvaliableObjectFromOneArray(posts);

          console.log(element);

          element.object.position.x = point.x;
          element.object.position.z = pointZ;

          this.changeObjectVisibility(true, element.object);
          element.active = true;
        }
      }
    }
  }

  setPostsPosition(nameArray, points) {
    const posts = this.post[nameArray];

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const element = posts[i];

      if (element == null) {
        return;
      }

      switch (nameArray) {
        case "rightPosts":
        case "leftPosts":
          element.object.position.z = point.z;

          break;

        case "backCenterPosts":
        case "frontBeamWithPosts":
          element.object.position.x = point.x;

          break;
      }

      this.changeObjectVisibility(true, element.object);
      element.active = true;
    }
  }

  changePostVisibility(status, nameArray, reset = false) {
    if (this.post == null) {
      return;
    }

    for (let index = 0; index < this.post[nameArray].length; index++) {
      const element = this.post[nameArray][index];

      element.active = false;

      if (element.object.isGroup) {
        for (let index = 0; index < element.object.children.length; index++) {
          const ge = element.object.children[index];
          ge.visible = status;

          if (status === false && reset === true) {
            ge.active = false;
          }
        }
      } else {
        element.object.visible = status;
        if (status === false && reset === true) {
          element.object.active = false;
        }
      }
    }
  }

  getCornerPairs(offset = -0.1, oneSide = false) {
    const borderBeamOffset = offset;
    const end = oneSide ? 0 : borderBeamOffset;

    const { FL_point, FR_point, RL_point, RR_point } = this.getCornerPoints();

    const newFR = new THREE.Vector3(FR_point.x, FR_point.y, FR_point.z + end);
    const newRR = new THREE.Vector3(
      RR_point.x,
      RR_point.y,
      RR_point.z - borderBeamOffset
    );

    return {
      xAligned: [
        new THREE.Vector3(FL_point.x, FL_point.y, FL_point.z),
        new THREE.Vector3(FR_point.x, FR_point.y, FR_point.z),
      ],
      zAligned: [newFR, newRR],
    };
  }

  inchToMeter(inches) {
    return inches * 0.0254;
  }

  getPostPoints(xOffset, zOffset) {
    const offsetX = 0.075;
    const offsetZ = 0;

    const qtyWidth = Math.floor(
      this.inchToMeter(this.settings.width) /
        this.inchToMeter(this.settings.postWidthInterval)
    );

    const qtyWidthLouver = Math.floor(
      this.inchToMeter(this.settings.width) /
        this.inchToMeter(this.settings.postWidthInterval)
    );

    const qtyLength = Math.floor(
      this.inchToMeter(this.settings.depth) /
        this.inchToMeter(this.settings.postDepthInterval)
    );

    console.log(qtyLength, "COUNT DEPLT POSTs");

    const { FL_point, FR_point, RR_point, RL_point } = this.getCornerPoints();

    const point_post_width = generateMidpoints(FL_point, FR_point, qtyWidth);
    const point_louver_width = generateMidpoints(
      FL_point,
      FR_point,
      qtyWidthLouver
    );

    const point_post_length = generateMidpoints(FR_point, RR_point, qtyLength);

    console.log(FR_point, RR_point, "CORNER POINT LENGHT");

    return {
      point_post_width,
      point_louver_width,
      point_post_length,
    };
  }

  changeObjectVisibility(status, object) {
    if (!object) return;
    object.traverse((child) => {
      child.visible = status;
    });
  }

  getAvaliableObjectFromArray(
    objects,
    propertyName = null,
    propertyValue = null
  ) {
    for (let i = 0; i < objects.length; i++) {
      const element = objects[i];
      if (element.active == true) {
        continue;
      }
      if (propertyName !== null && element[propertyName] === propertyValue) {
        return element;
      }
    }

    return null;
  }
  // =============================================================
  generateCenterPoints(points) {
    const centerPoints = [];

    for (let i = 0; i < points.length - 1; i++) {
      const midX = (points[i].x + points[i + 1].x) / 2;
      const midY = (points[i].y + points[i + 1].y) / 2;
      const midZ = (points[i].z + points[i + 1].z) / 2;

      centerPoints.push(new THREE.Vector3(midX, midY, midZ));
    }

    return centerPoints;
  }

  interpolateValue(inputval, rangeMin, rangeMax, kMin = 0, kMax = 1) {
    return (
      kMin + ((inputval - rangeMin) * (kMax - kMin)) / (rangeMax - rangeMin)
    );
  }

  setLouver() {
    this.changeRoofVisibility(false, "louver", null, true);

    const countSolidRoofX = Math.ceil(
      this.inchToMeter(this.settings.depth) / 0.266759
    );
    const { RL_point, FR_point, FL_point, RR_point } = this.getCornerPoints();
    const { point_post_length, point_post_width } = this.getPostPoints();

    const pointsXforLouver = this.generateCenterPoints([
      ...this.addOffset([FL_point], "x", 0.08),
      ...point_post_width,
      ...this.addOffset([FR_point], "x", -0.08),
    ]);

    const interpolatedWidthForLouver = this.interpolateValue(
      this.inchToMeter(this.settings.width) / pointsXforLouver.length - 0.15,
      2.18584,
      4.06544
    );

    const cornerAndBeamPoint = [
      ...this.addOffset([FR_point], "z", testVar),
      ...this.addOffset(point_post_length, "x", 0),
      ...this.addOffset([RR_point], "z", 0),
    ];
    const spanCount = point_post_length.length + 1;
    const louverForOneSpan = Math.floor(countSolidRoofX / spanCount);

    let allPointsForLouvers = [];

    for (let i = 0; i < cornerAndBeamPoint.length - 1; i++) {
      const spanPoints = generateMidpoints(
        ...this.addOffset([cornerAndBeamPoint[i]], "x", -0.05),
        ...this.addOffset([cornerAndBeamPoint[i + 1]], "x", 0.05),
        louverForOneSpan
      );
      allPointsForLouvers.push(...spanPoints);
    }

    changeGlobalMorph("Width_louver", interpolatedWidthForLouver);
    const heightOffset = 0.2;

    this.setLouveraSky(pointsXforLouver, this.roof.louver, this.roof.louver);
  }

  addOffset(target, direction, offset) {
    if (Array.isArray(target)) {
      return target.map((el) => {
        return {
          ...el,
          [direction]: el[direction] + offset,
        };
      });
    } else {
      return {
        ...target,
        [direction]: target[direction] + offset,
      };
    }
  }

  getAvaliableObjectFromOneArray(
    objects,
    propertyName = null,
    propertyValue = null
  ) {
    for (let i = 0; i < objects.length; i++) {
      const element = objects[i];

      if (!element.active) {
        element.active = true;

        return element;
      }
    }
  }

  setRoofBeam() {
    this.changeRoofVisibility(false, "beamX", null, true);

    const { point_post_length } = this.getPostPoints();

    this.setBeamsPosition(point_post_length, this.roof.beamX);
  }

  // setRoof() {
  //   // scene.getObjectByName('back_1_base').visible = true; // wall mounts
  //   this.changeRoofVisibility(false, "baseBeams", null, true);
  //   this.changeRoofVisibility(false, "baseBeamsX", null, true);
  //   this.changeRoofVisibility(false, "glassroomBeamsX", null, true);

  //   this.changeRoofVisibility(false, "louvers", null, true);
  //   this.changeRoofVisibility(false, "louversCLones", null, true);
  //   this.changeRoofVisibility(false, "louversCLonesLight", null, true);

  //   this.changeRoofVisibility(false, "louversSky", null, true);
  //   this.changeRoofVisibility(false, "louversSkyClones", null, true);

  //   this.changeRoofVisibility(false, "louversGlass", null, true);
  //   this.changeRoofVisibility(false, "louversGlassClones", null, true);

  //   this.changeRoofVisibility(false, "pergolaFlats", null, true);
  //   this.changeRoofVisibility(false, "pergolaFlatsClones", null, true);

  //   this.changeRoofVisibility(false, "trailsFlats", null, true);

  //   //CENTER POST LOGIC
  //   this.changePostVisibility(false, "midlePosts", null, true);

  //   this.basePegola.visible = true;

  //   this.glassroomFront.visible = false;
  //   this.glassroomBack.visible = false;
  //   this.glassroomRoof.visible = false;

  //   this.glassroomRoof.children.forEach((child) => (child.visible = false));

  //   this.baseMidleFirst.visible = false;
  //   this.baseMidleSecond.visible = false;

  //   const { point_width, point_length, center_forlouver } =
  //     this.getBeamPoints();
  //   const glassroom = this.settings.typePergola === 4;

  //   const beams = glassroom ? this.roof.glassroomBeamsX : this.roof.baseBeamsX;

  //   //BEAM
  //   // switch (true) {
  //   //   case point_width.length > 0 && !glassroom:
  //   //     this.setBeamsPositionWidth(point_width, this.roof.baseBeams);

  //   //   case point_length.length > 0:
  //   //     this.setBeamsPositionLength(point_length, beams);
  //   // }

  //   // console.log(center_forlouver, this.settings.typePergola);
  //   //ROOF TYPE
  //   switch (true) {
  //     case center_forlouver.length:
  //       this.setLouvera(center_forlouver, this.roof.louver, this.roof.louver);
  //       break;

  //     default:
  //       break;
  //   }
  // }

  setBeamsPosition(points, array, rafter, rotate = false) {
    const beams = array;

    for (let i = 0; i < points.length; i++) {
      const beamPoint = points[i];
      const element = beams[i];

      if (element == null) {
        return;
      }

      if (rafter) {
        element.object.position.x = beamPoint.x;
      } else {
        element.object.position.z = beamPoint.z;
      }

      if (rotate) {
        element.object.rotation.y = Math.PI;
      }

      // this.changeObjectVisibility(true, element.object);
      element.active = true;
      element.object.visible = true;
      element.object.children[0].visible = true;

      // if (state.moodLight) {
      //   element.object.children[1].visible = true;
      // }
    }
  }

  setLouveraSky(points, original, clones) {
    const offsetY = 0.112;
    const offset = this.settings.widthLouver;
    const roofPart = original;
    const borderBeamOffset = 0.2;

    const qtyLouvers = Math.floor(
      this.inchToMeter(this.settings.depth) / offset
    );

    const { FL_point, FR_point, RR_point, RL_point } = this.getCornerPoints();

    const { zAligned } = this.getCornerPairs(-0.08);

    const offsetBeam = 0;

    const { point_post_length } = this.getPostPoints();

    const cornerAndBeamPoint = [
      ...this.addOffset([FR_point], "z", testVar),
      ...this.addOffset(point_post_length, "z", 0),
      ...this.addOffset([RR_point], "z", 0.1),
    ];

    for (let i = 0; i < points.length; i++) {
      const louverPoint = points[i];

      const borderBeamOffset = 0.2;

      const morphForLouver = convertMorphValue(
        this.inchToMeter(
          this.settings.width / points.length - borderBeamOffset
        ),
        this.settings.roofBaseDepthMin_m,
        this.settings.roofBaseDepthMax_m
      );

      // changeGlobalMorph("width_louver", morphForLouver);
      // console.log(cornerAndBeamPoint, "POINT FOR LOUVER");

      for (let a = cornerAndBeamPoint.length - 1; a > 0; a--) {
        this.setLouverSky(
          cornerAndBeamPoint[a].z,
          cornerAndBeamPoint[a - 1].z,
          a,
          louverPoint.x
        );
      }
    }
  }

  setLouverSky(startX, endX, index, zPoint, last = false) {
    const valueRoofOpen = interpolateValue(+this.settings.roofOpen, 0, 1);

    const roofWidth = endX - startX;

    const canFixDfolded = this.settings.canopyFixedDepthFolded_m / 2;
    const canMovDfolded = this.settings.canopyMovingDepthFolded_m;

    const canFixDmin = this.settings.canopyFixedDepthMin_m / 2;
    const size = 0.26;
    const canMovDmin = size;

    const addQty = 0;

    let canQty = Math.ceil((roofWidth - canFixDmin) / canMovDmin) + addQty;
    const canopyOpenWidth = canMovDmin * canQty + canFixDfolded;
    const canopyOffset = roofWidth - canopyOpenWidth;

    let currentXpoints = [];

    const offsetThreshold = canMovDmin * 0.001;

    if (canopyOffset > offsetThreshold && offsetThreshold > 0) {
      canQty++;
    }

    for (let i = 0; i <= canQty; i++) {
      const posStart = startX + i * canMovDfolded;
      const posEnd = startX + i * canMovDmin;
      const curPoint = interpolateValue(
        1 - valueRoofOpen,
        0,
        1,
        posStart,
        posEnd
      );
      currentXpoints.push(curPoint);
    }

    const morpValue = interpolateValue(+this.settings.roofOpen, 0, 1);

    if (currentXpoints.length > 0) {
      this.setLouveraSkyPosition(
        currentXpoints,
        morpValue,
        canopyOffset,
        zPoint,
        index,
        roofWidth
      );
    }
  }

  setLouveraSkyPosition(points, morphValue, canopyOffset, zPos, index, width) {
    for (let i = 0; i < points.length - 2; i++) {
      const offsetY = 0.17;
      const point = points[i + 1];

      let element = this.getAvaliableObjectFromOneArray(this.roof.louver);

      if (element == null) {
        return;
      }

      element.object.position.x = zPos;
      element.object.position.z = point;
      element.object.position.y =
        this.inchToMeter(this.settings.height) + offsetY;

      this.changeObjectVisibility(true, element.object);

      element.object.children[0].visible = false;

      if (i % 3 === 0 && this.settings.sideOptionLEDlight) {
        element.object.children[0].visible = true;
      }

      element.active = true;

      const angle = 1 + morphValue * (90 - 1);
      const anglePre = angle;
      element.object.rotation.x = anglePre * (Math.PI / 180);
    }
  }

  changeRoofVisibility(status, arrayName = null, type = null, reset = false) {
    if (this.roof == null || !arrayName) {
      return;
    }
    if (!this.roof[arrayName]) {
      return;
    }

    for (let i = 0; i < this.roof[arrayName].length; i++) {
      const element = this.roof[arrayName][i];

      if (type != null) {
        if (element.type != type) {
          continue;
        }
      }

      if (element.object.isGroup) {
        for (let index = 0; index < element.object.children.length; index++) {
          const ge = element.object.children[index];
          ge.visible = status;
        }
      } else {
        element.object.visible = status;
      }

      if (status === false && reset === true) {
        element.active = false;
      }
    }
  }

  // =============================================================
  setRoofCanopy() {
    this.changeRoofVisibility(false, "canopies", null, true);
    this.changeRoofVisibility(false, "leds", null, true);

    const valueRoofOpen = +this.settings.roofOpen;

    const roofDepth = this.settings.depth * 0.0254;
    const canFixDfolded = this.settings.canopyFixedDepthFolded_m;
    const canMovDfolded = this.settings.canopyMovingDepthFolded_m;
    const canFixDmin = this.settings.canopyFixedDepthMin_m;
    const canMovDmin = this.settings.canopyMovingDepthMin_m;
    const canQty = Math.floor((roofDepth - canFixDmin) / canMovDmin) - 1;
    const canopyOpenDepth = canMovDmin * canQty + canFixDfolded;
    const canopyOffset = roofDepth - canopyOpenDepth;

    let currentZpoints = [];

    for (let i = 0; i <= canQty + 2; i++) {
      const posStart = i * (canMovDfolded - 0.025);
      const posEnd = i * (canMovDmin - 0.025);
      const curPoint = interpolateValue(
        1 - valueRoofOpen,
        0,
        1,
        posStart,
        posEnd
      );
      currentZpoints.push(curPoint);
    }

    if (currentZpoints.length > 0) {
      //   this.setCanopiesPosition(currentZpoints, valueRoofOpen, canopyOffset);
    }
  }

  setCanopiesPosition(points, morphValue, canopyOffset) {
    const roofDepth = this.settings.depth * 0.0254;

    const offsetDepth = interpolateValue(
      this.settings.depth,
      96,
      360,
      1.03,
      1.43
    );

    const canopyOffsetZ = canopyOffset + offsetDepth;
    const canopies = this.roof.canopies;

    const canopyFixed = this.getAvaliableObjectFromArray(
      canopies,
      "type",
      pergolaConst.canopyType.Fixed
    );
    const startPointZ =
      points[0] - 0.01 - this.settings.depth * 0.0254 + canopyOffsetZ;
    const offsetOpening = interpolateValue(
      morphValue,
      0,
      1,
      0,
      roofDepth + startPointZ - 1.965
    );

    canopyFixed.object.position.z = startPointZ - offsetOpening;

    this.changeObjectVisibility(true, canopyFixed.object);
    canopyFixed.active = true;

    const canopyHandle = this.getAvaliableObjectFromArray(
      canopies,
      "type",
      pergolaConst.canopyType.Handle
    );
    canopyHandle.object.position.z =
      points[points.length - 1] -
      this.settings.depth * 0.0254 +
      canopyOffsetZ -
      offsetOpening;
    this.changeObjectVisibility(true, canopyHandle.object);
    canopyHandle.active = true;

    const { FL_point, FR_point } = this.getCornerPoints();
    const qtySets =
      Math.floor(this.settings.width / this.settings.postWidthInterval) + 1;
    const ledPoints = generateMidpoints(FL_point, FR_point, qtySets * 4);
    const leds = this.roof.leds;

    leds.forEach((led) => {
      if (led && led.object && led.object.parent) {
        led.object.parent.remove(led.object);
      }
    });

    const addLedsToCanopy = (canopy) => {
      if (!canopy) {
        return;
      }

      ledPoints.forEach((point) => {
        const led = this.getAvaliableObjectFromArray(
          leds,
          "type",
          pergolaConst.canopyType.Led
        );
        if (led == null) {
          return;
        }
        led.active = true;

        canopy.add(led.object);
        led.object.position.x = point.x;
        this.changeObjectVisibility(true, led.object);
      });
    };

    for (let i = 0; i < points.length - 2; i++) {
      const point = points[i + 1];
      const element = this.getAvaliableObjectFromArray(
        canopies,
        "type",
        pergolaConst.canopyType.Moving
      );

      if (element == null) {
        return;
      }

      if (i % 2 !== points.length % 2 && this.settings.subLeds) {
        addLedsToCanopy(element.object);
      }

      element.object.position.z =
        point - this.settings.depth * 0.0254 + canopyOffsetZ - offsetOpening;
      this.changeObjectVisibility(true, element.object);
      element.active = true;

      changeGlobalMorph("Cloth_fold", morphValue);
    }
  }

  // =============================================================
  prepareSpans() {
    const qtyLeft =
      Math.floor(this.settings.maxDepth / this.settings.postDepthInterval) + 1;
    const qtyRight = qtyLeft;
    const qtyFront =
      Math.floor(this.settings.maxWidth / this.settings.postWidthInterval) + 1;
    const qtyBack = qtyFront;

    const spanGeometry = new THREE.BoxGeometry(1, 1, 1);
    const spanMaterial = new THREE.MeshBasicMaterial({
      color: spanColor,
      transparent: true,
      opacity: 0,
    });

    const makeSpanBySide = (side, qty) => {
      for (let i = 0; i < qty; i++) {
        const span = new PergolaSpanObject();
        span.side = side;
        span.number = i;
        const spanAvatar = new THREE.Mesh(spanGeometry, spanMaterial);
        spanAvatar.position.set(span.posX, span.posY, span.posZ);
        spanAvatar.visible = false;

        spanAvatar.name = `avatar_${side}_${i}`;
        spanAvatar.parentSpan = span;
        clickableObjects.push(spanAvatar);

        theModel.add(spanAvatar);
        span.avatar = spanAvatar;

        span.hotspot = createHotspot(
          `span_hotspot_${side}_${i}`,
          labelObjects.addObject.url,
          labelObjects.addObjectHover.url,
          new THREE.Vector3(0, 0, 0),
          "subsystems"
        );
        setHotspotVisibility(span.hotspot, false);
        hotspots.push(span.hotspot);

        const subsystems = [];

        Object.keys(pergolaConst.systemType).forEach((key) => {
          if (pergolaConst.systemType[key] !== pergolaConst.systemType.Led) {
            const sys = this.getSubsystemByTypeAndSide(
              pergolaConst.systemType[key],
              side
            );
            subsystems.push(sys);
          }
        });

        if (subsystems.length > 0) {
          span.systems.push(...subsystems);
        }

        this.span.objects.push(span);
      }
    };

    makeSpanBySide(pergolaConst.side.Left, qtyLeft);
    makeSpanBySide(pergolaConst.side.Right, qtyRight);
    makeSpanBySide(pergolaConst.side.Front, qtyFront);
    makeSpanBySide(pergolaConst.side.Back, qtyBack);
  }

  setSpans() {
    const {
      front_span_points,
      back_span_points,
      left_span_points,
      right_span_points,
      span_width,
      span_depth,
    } = this.getSpanPoints();

    this.resetSpans();

    const height = this.inchToMeter(this.height);
    const offsetZ =
      this.originZ == pergolaConst.side.Front
        ? this.inchToMeter(this.settings.depth) / 2
        : 0;

    const configureSpan = (points, side, width, thickness) => {
      points.forEach((point) => {
        const span = this.getSpan(side);

        if (!span) {
          return;
        }

        span.active = span.isSystemSet ? false : true;

        if (
          (this.settings.mountingWall_Back &&
            side === pergolaConst.side.Back) ||
          (this.settings.mountingWall_Left &&
            side === pergolaConst.side.Left) ||
          (this.settings.mountingWall_Right && side === pergolaConst.side.Right)
        ) {
          span.active = false;
          span.isSystemSet = false;
          span.systems.forEach((system) => {
            system.active = false;
            this.changeObjectVisibility(false, system.object);
            this.changeObjectVisibility(false, system.windowObject);
          });
        }

        if (!span.isLocked) {
          span.isSystemSet = false;
          span.systems.forEach((system) => {
            system.active = false;
            this.changeObjectVisibility(false, system.object);
            this.changeObjectVisibility(false, system.windowObject);
          });
        }

        span.posX = point.x;
        span.posZ = point.z;
        span.width = width;
        span.height = height;

        if (span.systems.length > 0) {
          span.systems.forEach((system) => {
            if (system) {
              system.object.position.set(span.posX, span.posY, span.posZ);
              system.spanWidth = width;
              system.spanHeight = height;
            }
          });
        }

        let offsetLeftRightAvatarZ = 0;

        if (
          side === pergolaConst.side.Left ||
          side === pergolaConst.side.Right
        ) {
          offsetLeftRightAvatarZ = -0.03;
        }

        span.avatar.position.set(
          span.posX,
          span.height / 2,
          span.posZ + offsetLeftRightAvatarZ
        );
        span.avatar.scale.set(
          side === pergolaConst.side.Left || side === pergolaConst.side.Right
            ? thickness
            : width,
          span.height,
          side === pergolaConst.side.Left || side === pergolaConst.side.Right
            ? width
            : thickness
        );
        span.avatar.visible = false;

        span.hotspot.position.set(
          span.posX,
          this.model.position.y,
          span.posZ + offsetZ
        );
        setHotspotVisibility(span.hotspot, false);

        span.hotspot.setHoverFunction(() => {
          this.outlineAvatar(span.avatar, true);
        });

        span.hotspot.setNormalFunction(() => {
          this.outlineAvatar(span.avatar, false);
        });

        span.hotspot.setClickFunction(() => {
          this.settings.currentSpan = span;
          this.putCurrentMenuSystemToCurrentSpan(span);
        });
      });
    };

    configureSpan(
      front_span_points,
      pergolaConst.side.Front,
      span_width,
      spanAvatarThickness
    );
    configureSpan(
      back_span_points,
      pergolaConst.side.Back,
      span_width,
      spanAvatarThickness
    );
    configureSpan(
      left_span_points,
      pergolaConst.side.Left,
      span_depth,
      spanAvatarThickness
    );
    configureSpan(
      right_span_points,
      pergolaConst.side.Right,
      span_depth,
      spanAvatarThickness
    );

    this.checkAllSpans();
  }

  getSpan(side) {
    const spans = this.span.objects;

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      if (span.side === side && !span.isLocked) {
        span.isLocked = true;
        return span;
      }
    }

    return null;
  }

  getSpanPoints() {
    const offsetX = 0.04;
    const offsetZ = -0.1;
    const offsetWidth = 0.11;
    let offsetDepth = 0;

    const { FL_point, FR_point, RL_point, RR_point } = this.getCornerPoints();

    // Пост-пойнти зміщені по X (вліво-вправо) і Z (вперед-назад)
    const FL_post_point = FL_point.clone().add(
      new THREE.Vector3(offsetX, 0, offsetZ)
    );
    const FR_post_point = FR_point.clone().add(
      new THREE.Vector3(-offsetX, 0, offsetZ)
    );
    const RL_post_point = RL_point.clone().add(
      new THREE.Vector3(offsetX, 0, -offsetZ)
    );
    const RR_post_point = RR_point.clone().add(
      new THREE.Vector3(-offsetX, 0, -offsetZ)
    );

    switch (true) {
      case this.settings.depth < 252:
        offsetDepth = 0.4;
        break;

      case this.settings.depth > 252 && this.settings.depth < 504:
        offsetDepth = 0.27;
        break;

      default:
        offsetDepth = 0.2;
        break;
    }

    const widthInterval = this.settings.postWidthInterval;
    const depthInterval = this.settings.postDepthInterval;
    const currentWidth = this.settings.width;
    const currentDepth = this.settings.depth;

    const widthSegments = Math.floor(currentWidth / widthInterval);
    const depthSegments = Math.floor(currentDepth / depthInterval);

    // Генерація спанів
    const front_span_points = generateCenterMidpoints(
      FL_post_point,
      FR_post_point,
      widthSegments,
      true
    );

    const back_span_points = generateCenterMidpoints(
      RL_post_point,
      RR_post_point,
      widthSegments,
      true
    );

    const left_span_points = generateCenterMidpoints(
      FL_post_point,
      RL_post_point,
      depthSegments,
      true
    );

    const right_span_points = generateCenterMidpoints(
      FR_post_point,
      RR_post_point,
      depthSegments,
      true
    );

    const span_width =
      this.inchToMeter(currentWidth) / front_span_points.length - offsetWidth;
    const span_depth =
      this.inchToMeter(currentDepth) / left_span_points.length - offsetDepth;

    return {
      front_span_points,
      back_span_points,
      left_span_points,
      right_span_points,
      span_width,
      span_depth,
    };
  }

  resetSpans() {
    const spans = this.span.objects;
    for (let i = 0; i < spans.length; i++) {
      spans[i].avatar.visible = false;
      spans[i].active = false;
      spans[i].isLocked = false;
    }
  }

  checkAllSpans() {
    const spans = this.span.objects;

    spans.forEach((span) => {
      if (!span.isLocked) {
        span.isSystemSet = false;
        span.systems.forEach((system) => {
          system.active = false;
          this.changeObjectVisibility(false, system.object);
          this.changeObjectVisibility(false, system.windowObject);
        });
      }
    });
  }

  outlineAvatar(object, active, animate = true) {
    if (!object) {
      return;
    }
    if (active && object.visible) {
      return;
    }
    if (!active && !object.visible) {
      return;
    }

    if (!active) {
      object.material.opacity = 0;
      object.material.needsUpdate = true;
      object.visible = false;
    } else {
      object.visible = true;

      if (animate) {
        object.material.opacity = 0;
        object.material.needsUpdate = true;
        animateProperty(
          object.material,
          "opacity",
          spanOpacity + 0.2,
          250,
          () => {
            object.material.needsUpdate = true;
          }
        );
      } else {
        object.material.opacity = spanOpacity + 0.2;
        object.material.needsUpdate = true;
      }
    }
  }

  // =============================================================

  showAvailableSpans() {
    if (this.settings.currentSubsystem !== null) {
      const spans = this.span.objects;
      for (let i = 0; i < spans.length; i++) {
        setHotspotVisibility(spans[i].hotspot, spans[i].active);
      }
    }
  }

  putCurrentMenuSystemToCurrentSpan(span) {
    const currentSubsystem = this.settings.currentSubsystem;
    const group = subSystems_options[this.settings.currentSubsystemKey].group;

    span.systems.forEach((system) => {
      system.active = false;
      this.changeObjectVisibility(false, system.object);
      this.changeObjectVisibility(false, system.windowObject);
    });

    span.active = true;
    span.isSystemSet = false;

    const activeSystem = span.systems.find((system) => {
      return system.type === currentSubsystem;
    });

    if (activeSystem) {
      activeSystem.active = true;
      span.active = false;
      span.isSystemSet = true;
      this.changeObjectVisibility(true, activeSystem.object);

      updateInputs(group, activeSystem);
    }

    function updateInputs(groupId, system) {
      const radioGroup = jQuery(`#${groupId} .canvas_menu__item_radio`);
      if (system.openingside) {
        radioGroup.find('input[value="Left"]').prop("checked", true);
      } else {
        radioGroup.find('input[value="Right"]').prop("checked", true);
      }

      const rangeInput = jQuery(
        `#${groupId} .range-container input[type="range"]`
      );
      const newValue = system.openValue !== null ? system.openValue : "0";
      rangeInput.val(newValue);

      updateRangeBackgroundAndLabel(rangeInput);

      jQuery(`#${groupId}`).addClass("active");
      pergola && pergola.updateRadioButtonsInSystemPopup();
    }

    this.update();
  }

  putCurrentMenuSystemToAllFreeSpans() {
    const currentSubsystem = this.settings.currentSubsystem;
    const spans = this.span.objects;

    spans.forEach((span) => {
      if (span.active && !span.isSystemSet) {
        span.systems.forEach((system) => {
          system.active = false;
          this.changeObjectVisibility(false, system.object);
          this.changeObjectVisibility(false, system.windowObject);
        });

        const activeSystem = span.systems.find((system) => {
          return system.type === currentSubsystem;
        });

        if (activeSystem) {
          activeSystem.active = true;
          span.active = false;
          span.isSystemSet = true;
          this.changeObjectVisibility(true, activeSystem.object);
        }
      }
    });

    this.update();
  }

  getSubsystemByTypeAndSide(type, side) {
    const systems = this.system.objects;

    for (let i = 0; i < systems.length; i++) {
      const system = systems[i];

      if (system.type === type && system.side === side && !system.isLocked) {
        system.isLocked = true;
        return system;
      }
    }
  }

  getSpanBySideAndNumber(side, number) {
    return this.span.objects.find(
      (span) => span.side === side && span.number === number
    );
  }

  removeSystemFromSpan(span) {
    const system = span.getCurrentSystem();
    if (system) {
      system.active = false;
      system.openingside = true;
      system.openValue = 0;
      span.active = true;
      span.isLocked = true;
      span.isSystemSet = false;

      this.changeObjectVisibility(false, system.object);
      this.changeObjectVisibility(false, system.windowObject);

      this.update();
    }
  }

  // =============================================================
  changeMountingWall() {
    const hotspotOffsetY = (this.settings.height * 0.0254) / 2;
    const { back_point, left_point, right_point } = this.getWallPoints();
    const modelOffsetZ = this.model.position.z;
    const modelOffsetY = this.model.position.y;

    const backWall = this.getMountingWall(pergolaConst.side.Back);
    const leftWall = this.getMountingWall(pergolaConst.side.Left);
    const rightWall = this.getMountingWall(pergolaConst.side.Right);

    if (backWall) {
      backWall.labelObject.position.set(
        back_point.x,
        back_point.y + modelOffsetY,
        0
      );
      updateHotspots(hotspots);
    }

    if (leftWall) {
      leftWall.labelObject.position.set(
        left_point.x,
        left_point.y + modelOffsetY,
        left_point.z + modelOffsetZ
      );
      updateHotspots(hotspots);
    }

    if (rightWall) {
      rightWall.labelObject.position.set(
        right_point.x,
        right_point.y + modelOffsetY,
        right_point.z + modelOffsetZ
      );
      updateHotspots(hotspots);
    }

    const back = this.settings.mountingWall_Back;
    const left = this.settings.mountingWall_Left;
    const right = this.settings.mountingWall_Right;

    if (jQuery(".canvas_menu__wall").hasClass("active")) {
      backWall && setHotspotVisibility(backWall.labelObject, !back);
      leftWall && setHotspotVisibility(leftWall.labelObject, !left);
      rightWall && setHotspotVisibility(rightWall.labelObject, !right);
    } else {
      backWall && setHotspotVisibility(backWall.labelObject, false);
      leftWall && setHotspotVisibility(leftWall.labelObject, false);
      rightWall && setHotspotVisibility(rightWall.labelObject, false);
    }

    this.changeMountingWallVisibility(back, pergolaConst.side.Back);
    this.changeMountingWallVisibility(left, pergolaConst.side.Left);
    this.changeMountingWallVisibility(right, pergolaConst.side.Right);

    if (back) {
      this.lastSettings.mountingWall_Back = this.settings.mountingWall_Back;

      if (!this.settings.wallPosts) {
        this.changePostVisibility(false, "backCenterPosts");
        // this.changePostVisibility(false, pergolaConst.postPlace.MiddleBack);
      }
    }

    // const wallMountsCorner = scene.getObjectByName("back_1_base");
    // wallMountsCorner.position.y =
    //   this.settings.height * 0.0254 - this.model.position.y - 0.56;
    // wallMountsCorner.visible = back; // wall mounts

    if (left) {
      this.lastSettings.mountingWall_Left = this.settings.mountingWall_Left;

      if (!this.settings.wallPosts) {
        this.changePostVisibility(false, "leftPosts");
        // this.changePostVisibility(false, PergolaPostPlace.Left);
      }
    }

    if (right) {
      this.lastSettings.mountingWall_Right = this.settings.mountingWall_Right;

      if (!this.settings.wallPosts) {
        this.changePostVisibility(false, "rightPosts");
        // this.changePostVisibility(false, PergolaPostPlace.Right);
      }
    }
  }

  getMountingWall(side) {
    if (this.mountingWall == null) {
      return;
    }
    if (this.mountingWall.elements == null) {
      return;
    }

    for (let index = 0; index < this.mountingWall.elements.length; index++) {
      const element = this.mountingWall.elements[index];
      if (element.side == side) {
        return element;
      }
    }

    return null;
  }

  changeMountingWallVisibility(status, side = null) {
    if (this.mountingWall == null) {
      return;
    }
    if (this.mountingWall.elements == null) {
      return;
    }

    for (let index = 0; index < this.mountingWall.elements.length; index++) {
      const element = this.mountingWall.elements[index];

      if (side != null) {
        if (element.side != side) {
          continue;
        }
      }

      if (element.object.isGroup) {
        for (let index = 0; index < element.object.children.length; index++) {
          const ge = element.object.children[index];
          ge.visible = status;
        }
      } else {
        element.object.visible = status;

        // const matName = element.object.material.name;
        // element.object.visible = true;
        // if (status) {
        //   this.setMaterialProperty(matName, false, 'transparent');
        //   this.setMaterialProperty(matName, 0.86, 'opacity');
        //   this.setMaterialProperty(matName, wallColor, 'color');
        // }else {
        //   this.setMaterialProperty(matName, true, 'transparent');
        //   this.setMaterialProperty(matName, 0.14, 'opacity');
        //   this.setMaterialProperty(matName, spanColor, 'color');
        // }
      }
    }
  }

  correctTilling() {
    //! TODO
    // const targetTillingValueRoofLeftRight = interpolateValue(this.settings.depth, this.settings.minDepth, this.settings.maxDepth, 1, 3);
    // this.changeMaterialTilling("roof_house_R", targetTillingValueRoofLeftRight, 1);
  }

  //* =====================================================

  getCornerPoints(xOffset = 0, zOffset = 0) {
    const offsetX = xOffset;
    const offsetZ = zOffset;
    const totalWidth = this.inchToMeter(this.settings.width);
    const totalDepth = this.inchToMeter(this.settings.depth);

    const lineZback = -totalDepth / 2;
    const lineZfront = totalDepth / 2;

    let FL_point = new THREE.Vector3(
      -totalWidth / 2 - offsetX / 2,
      0,
      lineZfront + offsetZ / 2
    );
    let FR_point = new THREE.Vector3(
      totalWidth / 2 + offsetX / 2,
      0,
      lineZfront + offsetZ / 2
    );
    let RL_point = new THREE.Vector3(
      -totalWidth / 2 - offsetX / 2,
      0,
      lineZback - offsetZ / 2
    );
    let RR_point = new THREE.Vector3(
      totalWidth / 2 + offsetX / 2,
      0,
      lineZback - offsetZ / 2
    );

    return { FL_point, FR_point, RL_point, RR_point };
  }

  getWallPoints(offsetY = 0) {
    const { FL_point, FR_point, RL_point, RR_point } = this.getCornerPoints();

    const back_point = new THREE.Vector3(
      (RL_point.x + RR_point.x) / 2,
      offsetY,
      (RL_point.z + RR_point.z) / 2
    );
    const left_point = new THREE.Vector3(
      (FL_point.x + RL_point.x) / 2,
      offsetY,
      (FL_point.z + RL_point.z) / 2
    );
    const right_point = new THREE.Vector3(
      (FR_point.x + RR_point.x) / 2,
      offsetY,
      (FR_point.z + RR_point.z) / 2
    );

    return { back_point, left_point, right_point };
  }

  setMaterialProperty(name, value, property) {
    if (this.model == null) {
      return;
    }
    let mat = null;

    this.model.traverse((o) => {
      if (o.isMesh) {
        if (o.material.name == name) {
          mat = o.material;
          if (property === "color" && typeof value === "string") {
            mat[property] = new THREE.Color(value);
          } else if (Object.prototype.hasOwnProperty.call(mat, property)) {
            mat[property] = value;
          }
        }
      }
    });
  }

  //* =====================================================
  //* SUBSYSTEMS OPENING

  updateSubsystems() {
    const { span_width, span_depth } = this.getSpanPoints();
    const offsetPost = 0; //inch
    const offsetTickness = 0.05;

    // const windowPerpendicular = this.model.getObjectByName("win_up_side");
    // const windowStraight = this.model.getObjectByName("win_up");

    // this.changeObjectVisibility(false, windowPerpendicular);
    // this.changeObjectVisibility(false, windowStraight);

    const spans = this.span.objects;
    let shapekey_direction;
    let length_param;
    let value;

    // this.originZ == pergolaConst.side.Front
    //   ? (this.settings.depth * 0.0254) / 2
    //   : 0;

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];

      if (span.isSystemSet) {
        if (
          span.side === pergolaConst.side.Left ||
          span.side === pergolaConst.side.Right
        ) {
          shapekey_direction = "shapekeys_perpendicular";
          length_param = "depth";
          value = span_depth * 1000; // 50 here is hardcoded value;

          const offsetForX =
            span.side === pergolaConst.side.Right
              ? offsetTickness
              : -offsetTickness;

          // span.systems.forEach((system) => {
          //   system.object.position.z = span.posZ + offsetZ - hardCodeValueZ;
          // });
        } else {
          shapekey_direction = "shapekeys_straight";
          length_param = "width";
          value = span_width * 1000;
        }

        //* Setting shapekeys for subsystems
        Object.keys(subSystems_options).forEach((sys) => {
          if (subSystems_options[sys][shapekey_direction]) {
            // Length
            let shapekeyName =
              subSystems_options[sys][shapekey_direction].frame[length_param]
                .key;
            let srcStart =
              subSystems_options[sys][shapekey_direction].frame[length_param]
                .min - offsetPost;
            let srcEnd =
              subSystems_options[sys][shapekey_direction].frame[length_param]
                .max - offsetPost;
            let shapekeyValue = interpolateValue(value, srcStart, srcEnd);

            changeGlobalMorph(shapekeyName, shapekeyValue);

            //Height
            shapekeyName =
              subSystems_options[sys][shapekey_direction].frame.height.key;
            srcStart =
              subSystems_options[sys][shapekey_direction].frame.height.min;
            srcEnd =
              subSystems_options[sys][shapekey_direction].frame.height.max;
            const limitHeightInch = subSystems_options[sys].limitHeightInch;

            let sysHeight;
            if (limitHeightInch && this.settings.height > limitHeightInch) {
              sysHeight = limitHeightInch * 0.0254;
            } else {
              sysHeight = this.settings.height * 0.0254;
            }
            shapekeyValue = interpolateValue(
              sysHeight * 1000,
              srcStart,
              srcEnd
            );

            changeGlobalMorph(shapekeyName, shapekeyValue);
          }
        });

        //* Windows and equipment

        if (
          span.side === pergolaConst.side.Front ||
          span.side === pergolaConst.side.Back
        ) {
          let windowShapekeyName = subSystems_options.Window.front.width.key;
          let windowSrcStart = subSystems_options.Window.front.width.min;
          let windowSrcEnd = subSystems_options.Window.front.width.max;
          let windowShapekeyValue = interpolateValue(
            value,
            windowSrcStart,
            windowSrcEnd
          );

          changeGlobalMorph(windowShapekeyName, windowShapekeyValue);
        } else {
          let windowShapekeyName =
            subSystems_options.Window.leftRight.width.key;
          let windowSrcStart = subSystems_options.Window.leftRight.width.min;
          let windowSrcEnd = subSystems_options.Window.leftRight.width.max;
          let windowShapekeyValue = interpolateValue(
            value,
            windowSrcStart,
            windowSrcEnd
          );

          changeGlobalMorph(windowShapekeyName, windowShapekeyValue);
        }

        if (span.isSystemSet) {
          span.systems.forEach((system) => {
            if (system.active) {
              switch (system.type) {
                case pergolaConst.systemType.BifoldDoor: //* BifoldDoor
                  if (system.windowObject) {
                    let limitHeightInch =
                      subSystems_options.BifoldDoor.limitHeightInch;

                    if (!limitHeightInch) {
                      limitHeightInch = this.settings.height;
                    }

                    const deltaHeight =
                      this.settings.height > limitHeightInch
                        ? (this.settings.height - limitHeightInch) *
                          0.0254 *
                          1000
                        : 0;

                    const winHeightMin = 0;
                    const winHeight = winHeightMin + deltaHeight;

                    if (this.settings.height > limitHeightInch) {
                      const keyValue = interpolateValue(
                        winHeight + 0,
                        subSystems_options.Window.front.height.min,
                        subSystems_options.Window.front.height.max
                      );

                      changeObjectMorph(
                        system.windowObject,
                        subSystems_options.Window.front.height.key,
                        keyValue
                      );

                      system.object.position.z = span.posZ;

                      if (span.side === pergolaConst.side.Back) {
                        console.log(system.windowObject);
                      }

                      system.windowObject.position.x = system.object.position.x;
                      system.windowObject.position.z = system.object.position.z;

                      system.windowObject.position.y =
                        this.settings.height * 0.0254 - deltaHeight / 1000 + 0;

                      this.changeObjectVisibility(true, system.windowObject);
                    } else {
                      this.changeObjectVisibility(false, system.windowObject);
                    }
                  }

                  this.setupBifoldDoors(span);
                  break;
                case pergolaConst.systemType.GuillotineGlass: //* GuillotineGlass
                  // if (system.windowObject) {
                  //   let limitHeightInch =
                  //     subSystems_options.BifoldDoor.limitHeightInch;

                  //   if (!limitHeightInch) {
                  //     limitHeightInch = this.settings.height;
                  //   }

                  //   const deltaHeight =
                  //     this.settings.height > limitHeightInch
                  //       ? (this.settings.height - limitHeightInch) *
                  //         0.0254 *
                  //         1000
                  //       : 0;

                  //   const winHeightMin = 0;
                  //   const winHeight = winHeightMin + deltaHeight;

                  //   if (this.settings.height > limitHeightInch) {
                  //     const keyValue = interpolateValue(
                  //       winHeight + 0,
                  //       subSystems_options.Window.front.height.min,
                  //       subSystems_options.Window.front.height.max
                  //     );

                  //     changeObjectMorph(
                  //       system.windowObject,
                  //       subSystems_options.Window.front.height.key,
                  //       keyValue
                  //     );

                  //     system.object.position.z = span.posZ;

                  //     if (span.side === pergolaConst.side.Back) {
                  //       console.log(system.windowObject);
                  //     }

                  //     system.windowObject.position.x = system.object.position.x;
                  //     system.windowObject.position.z = system.object.position.z;

                  //     system.windowObject.position.y =
                  //       this.settings.height * 0.0254 - deltaHeight / 1000 + 0;

                  //     this.changeObjectVisibility(true, system.windowObject);
                  //   } else {
                  //     this.changeObjectVisibility(false, system.windowObject);
                  //   }
                  // }

                  this.setupGuillotineGlass(span);
                  break;
                case pergolaConst.systemType.SlidingGlassDoor: //* SlidingGlassDoor
                  if (system.windowObject) {
                    let limitHeightInch =
                      subSystems_options.SlidingGlassDoor.limitHeightInch;

                    if (!limitHeightInch) {
                      limitHeightInch = this.settings.height;
                    }

                    const deltaHeight =
                      this.settings.height > limitHeightInch
                        ? (this.settings.height - limitHeightInch) *
                          0.0254 *
                          1000
                        : 0;

                    const winHeightMin = 0;
                    const winHeight = winHeightMin + deltaHeight;

                    if (this.settings.height > limitHeightInch) {
                      const keyValue = interpolateValue(
                        winHeight + 0,
                        subSystems_options.Window.front.height.min,
                        subSystems_options.Window.front.height.max
                      );

                      changeObjectMorph(
                        system.windowObject,
                        subSystems_options.Window.front.height.key,
                        keyValue
                      );

                      system.object.position.z = span.posZ;

                      if (span.side === pergolaConst.side.Back) {
                        console.log(system.windowObject);
                      }

                      system.windowObject.position.x = system.object.position.x;
                      system.windowObject.position.z = system.object.position.z;

                      system.windowObject.position.y =
                        this.settings.height * 0.0254 - deltaHeight / 1000 + 0;

                      this.changeObjectVisibility(true, system.windowObject);
                    } else {
                      this.changeObjectVisibility(false, system.windowObject);
                    }
                  }

                  this.setupSlidingGlassDoors(span);
                  break;
                case pergolaConst.systemType.LiftSlideDoor: //* LiftSlideDoor
                  if (system.windowObject) {
                    let limitHeightInch =
                      subSystems_options.SlidingGlassDoor.limitHeightInch;

                    if (!limitHeightInch) {
                      limitHeightInch = this.settings.height;
                    }

                    const deltaHeight =
                      this.settings.height > limitHeightInch
                        ? (this.settings.height - limitHeightInch) *
                          0.0254 *
                          1000
                        : 0;

                    const winHeightMin = 0;
                    const winHeight = winHeightMin + deltaHeight;

                    if (this.settings.height > limitHeightInch) {
                      const keyValue = interpolateValue(
                        winHeight + 0,
                        subSystems_options.Window.front.height.min,
                        subSystems_options.Window.front.height.max
                      );

                      changeObjectMorph(
                        system.windowObject,
                        subSystems_options.Window.front.height.key,
                        keyValue
                      );

                      system.object.position.z = span.posZ;

                      if (span.side === pergolaConst.side.Back) {
                        console.log(system.windowObject);
                      }

                      system.windowObject.position.x = system.object.position.x;
                      system.windowObject.position.z = system.object.position.z;

                      system.windowObject.position.y =
                        this.settings.height * 0.0254 - deltaHeight / 1000 + 0;

                      this.changeObjectVisibility(true, system.windowObject);
                    } else {
                      this.changeObjectVisibility(false, system.windowObject);
                    }
                  }

                  this.setupLiftSlideDoor(span);

                  break;
                case pergolaConst.systemType.BlindShade: //* BlindShade
                  // if (system.windowObject) {
                  //   let limitHeightInch =
                  //     subSystems_options.SlidingGlassDoor.limitHeightInch;

                  //   if (!limitHeightInch) {
                  //     limitHeightInch = this.settings.height;
                  //   }

                  //   const deltaHeight =
                  //     this.settings.height > limitHeightInch
                  //       ? (this.settings.height - limitHeightInch) *
                  //         0.0254 *
                  //         1000
                  //       : 0;

                  //   const winHeightMin = 0;
                  //   const winHeight = winHeightMin + deltaHeight;

                  //   if (this.settings.height > limitHeightInch) {
                  //     const keyValue = interpolateValue(
                  //       winHeight + 0,
                  //       subSystems_options.Window.front.height.min,
                  //       subSystems_options.Window.front.height.max
                  //     );

                  //     changeObjectMorph(
                  //       system.windowObject,
                  //       subSystems_options.Window.front.height.key,
                  //       keyValue
                  //     );

                  //     system.object.position.z = span.posZ;

                  //     if (span.side === pergolaConst.side.Back) {
                  //       console.log(system.windowObject);
                  //     }

                  //     system.windowObject.position.x = system.object.position.x;
                  //     system.windowObject.position.z = system.object.position.z;

                  //     system.windowObject.position.y =
                  //       this.settings.height * 0.0254 - deltaHeight / 1000 + 0;

                  //     this.changeObjectVisibility(true, system.windowObject);
                  //   } else {
                  //     this.changeObjectVisibility(false, system.windowObject);
                  //   }
                  // }

                  this.setupBlindShade(span);
                  break;
                default:
                  break;
              }
            }
          });
        }
      } else {
        span.systems.forEach((system) => {
          system.active = false;
          this.changeObjectVisibility(false, system.object);
          this.changeObjectVisibility(false, system.windowObject);
        });
      }
    }
  }

  // =============================================================

  //! SYSTEM EQUIPMENT
  //* BifoldDoor
  setupBifoldDoors(span) {
    const system = span.getCurrentSystem();
    if (!system) return;

    if (system.openingside === null) {
      system.openingside = this.settings.currentOpeningSide;
    }

    mirrorObject(system.object, !system.openingside);

    let frame, door, shapekeys_orientation_key;

    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      frame = system.object.getObjectByName("bifold_doors_frame_side");
      door = system.object.getObjectByName("bifold_doors_door_side");
      shapekeys_orientation_key = "shapekeys_perpendicular";
    } else {
      frame = system.object.getObjectByName("bifold_doors_frame");
      door = system.object.getObjectByName("bifold_doors_door");
      shapekeys_orientation_key = "shapekeys_straight";
    }

    if (span.side === pergolaConst.side.Left) {
      mirrorObject(system.object, !system.openingside);
      // system.object.position.x = span.posX - 0.0236;

      // if (!system.openingside) {
      //   system.object.position.z = -span.width + 0.834;
      // }
    }
    if (span.side === pergolaConst.side.Right) {
      mirrorObject(system.object, system.openingside);
      // system.object.position.x = span.posX + 0.0249;

      // if (system.openingside) {
      //   system.object.position.z = -span.width + 0.834;
      // }
    }
    if (span.side === pergolaConst.side.Front) {
      mirrorObject(system.object, !system.openingside);
    }
    if (span.side === pergolaConst.side.Back) {
      mirrorObject(system.object, system.openingside);
    }

    if (!frame || !door) {
      return;
    }

    door.rotation.y = 0;

    this.changeObjectVisibility(true, door);
    const limitHeightMeters =
      subSystems_options.BifoldDoor.limitHeightInch * 0.0254;
    const adjustedHeight = Math.min(system.spanHeight, limitHeightMeters);
    const doorHeightValue = interpolateValue(
      adjustedHeight * 1000 - 100,
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element.height
        .min,
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element.height
        .max
    );
    const doorHeightKeyName =
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element.height
        .key;
    changeObjectMorph(door, doorHeightKeyName, doorHeightValue);

    const frameWidth =
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
        ? system.spanWidth - 0.05
        : system.spanWidth - 0.1;

    const doorMaxWidth = subSystems_options.BifoldDoor.elementMaxWidthMM;
    const doorCount = Math.ceil(frameWidth / (doorMaxWidth / 1000));
    const doorWidth = frameWidth / doorCount;
    const doorThickness =
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element
        .thickness;
    const doorWidthMorph = interpolateValue(
      doorWidth * 1000,
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element.width
        .min,
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element.width.max
    );
    const doorWidthKeyName =
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element.width
        .key;
    changeObjectMorph(door, doorWidthKeyName, doorWidthMorph);

    while (frame.children.length > 0) {
      frame.remove(frame.children[0]);
    }

    for (let i = 0; i < doorCount; i++) {
      const newDoor = door.clone();
      const pivot = new THREE.Group();

      if (i % 2 === 0) {
        newDoor.rotation.y = Math.PI;
        newDoor.position.set(0, 0, -doorThickness / 2);
      } else {
        newDoor.rotation.y = 0;
        newDoor.position.set(0, 0, -doorThickness / 2);
      }

      pivot.add(newDoor);
      frame.add(pivot);
    }

    system.doorQty = doorCount;

    this.openingBifoldDoor(span);
  }

  //* SlidingGlassDoor
  setupSlidingGlassDoors(span) {
    const system = span.getCurrentSystem();
    if (!system) return;

    if (system.openingside === null) {
      system.openingside = this.settings.currentOpeningSide;
    }

    mirrorObject(system.object, !system.openingside);

    let frame, door, shapekeys_orientation_key;

    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      frame = system.object.getObjectByName("sliding_glass_frame_side");
      door = system.object.getObjectByName("sliding_glass_win_side");
      shapekeys_orientation_key = "shapekeys_perpendicular";
    } else {
      frame = system.object.getObjectByName("sliding_glass_frame");
      door = system.object.getObjectByName("sliding_glass_win");
      shapekeys_orientation_key = "shapekeys_straight";
    }

    if (span.side === pergolaConst.side.Left) {
      mirrorObject(system.object, !system.openingside);
      // system.object.position.x = span.posX - 0.0236;

      // if (!system.openingside) {
      //   system.object.position.z = -span.width + 0.834;
      // }
    }
    if (span.side === pergolaConst.side.Right) {
      mirrorObject(system.object, system.openingside);
      // system.object.position.x = span.posX + 0.0249;

      // if (system.openingside) {
      //   system.object.position.z = -span.width + 0.834;
      // }
    }
    if (span.side === pergolaConst.side.Front) {
      mirrorObject(system.object, !system.openingside);
    }
    if (span.side === pergolaConst.side.Back) {
      mirrorObject(system.object, system.openingside);
    }

    if (!frame || !door) {
      return;
    }

    this.changeObjectVisibility(true, door);
    const limitHeightMeters =
      subSystems_options.SlidingGlassDoor.limitHeightInch * 0.0254;
    const adjustedHeight = Math.min(system.spanHeight, limitHeightMeters);
    const doorHeightValue = interpolateValue(
      adjustedHeight * 1000 - 100,
      subSystems_options.SlidingGlassDoor[shapekeys_orientation_key].element
        .height.min,
      subSystems_options.SlidingGlassDoor[shapekeys_orientation_key].element
        .height.max
    );
    const doorHeightKeyName =
      subSystems_options.SlidingGlassDoor[shapekeys_orientation_key].element
        .height.key;
    changeObjectMorph(door, doorHeightKeyName, doorHeightValue);

    const frameWidth = system.spanWidth;

    const doorThicknessM =
      subSystems_options.SlidingGlassDoor[shapekeys_orientation_key].element
        .thickness;
    const overlapMM = subSystems_options.SlidingGlassDoor.overlapMM;
    const doorMaxWidthMM =
      subSystems_options.SlidingGlassDoor.elementMaxWidthMM;

    let doorCount = Math.ceil(
      (frameWidth * 1000 - overlapMM) / (doorMaxWidthMM - overlapMM)
    );

    system.doorQty = doorCount;

    if (doorCount > 5) {
      if (doorCount % 2 !== 0) {
        doorCount += 1;
      }
    }

    const doorWidthMM = (frameWidth * 1000 - overlapMM) / doorCount + overlapMM;

    const doorWidthMorph = interpolateValue(
      doorWidthMM,
      subSystems_options.SlidingGlassDoor[shapekeys_orientation_key].element
        .width.min,
      subSystems_options.SlidingGlassDoor[shapekeys_orientation_key].element
        .width.max
    );
    const doorWidthKeyName =
      subSystems_options.SlidingGlassDoor[shapekeys_orientation_key].element
        .width.key;
    changeObjectMorph(door, doorWidthKeyName, doorWidthMorph);

    while (frame.children.length > 0) {
      frame.remove(frame.children[0]);
    }

    const gap = -0.001;

    if (doorCount <= 5) {
      for (let i = 0; i < doorCount; i++) {
        const newDoor = door.clone();
        newDoor.scale.z = 0.78;
        newDoor.position.set(0, 0.05, -(doorThicknessM + gap) * i + 0.035);
        frame.add(newDoor);
      }
    } else if (doorCount > 5) {
      for (let j = 0; j < 2; j++) {
        for (let i = 0; i < doorCount / 2; i++) {
          const newDoor = door.clone();
          newDoor.scale.z = 0.78;
          newDoor.position.set(0, 0.05, -(doorThicknessM + gap) * i + 0.035);
          frame.add(newDoor);
        }
      }
    }

    this.openingSlidingGlassDoor(span);
  }

  //* LiftSlideDoor
  setupLiftSlideDoor(span) {
    const system = span.getCurrentSystem();
    if (!system) return;

    if (system.openingside === null) {
      system.openingside = this.settings.currentOpeningSide;
    }

    mirrorObject(system.object, !system.openingside);

    let frame, door, shapekeys_orientation_key;

    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      frame = system.object.getObjectByName("sliding_doors_frame_side");
      door = system.object.getObjectByName("sliding_doors_door_side");
      shapekeys_orientation_key = "shapekeys_perpendicular";
    } else {
      frame = system.object.getObjectByName("sliding_doors_frame");
      door = system.object.getObjectByName("sliding_doors_door");
      shapekeys_orientation_key = "shapekeys_straight";
    }

    if (span.side === pergolaConst.side.Left) {
      mirrorObject(system.object, !system.openingside);
      // system.object.position.x = span.posX - 0.0236;

      // if (!system.openingside) {
      //   system.object.position.z = -span.width + 0.834;
      // }
    }
    if (span.side === pergolaConst.side.Right) {
      mirrorObject(system.object, system.openingside);
      // system.object.position.x = span.posX + 0.0249;

      // if (system.openingside) {
      //   system.object.position.z = -span.width + 0.834;
      // }
    }
    if (span.side === pergolaConst.side.Front) {
      mirrorObject(system.object, !system.openingside);
    }
    if (span.side === pergolaConst.side.Back) {
      mirrorObject(system.object, system.openingside);
    }

    if (!frame || !door) {
      return;
    }

    this.changeObjectVisibility(true, door);
    const limitHeightMeters =
      subSystems_options.LiftSlideDoor.limitHeightInch * 0.0254;
    const adjustedHeight = Math.min(system.spanHeight, limitHeightMeters);
    const doorHeightValue = interpolateValue(
      adjustedHeight * 1000 - 100,
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.height
        .min,
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.height
        .max
    );
    const doorHeightKeyName =
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.height
        .key;
    changeObjectMorph(door, doorHeightKeyName, doorHeightValue);

    const frameWidth =
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
        ? system.spanWidth - 0.05
        : system.spanWidth - 0.1;

    const doorThicknessM =
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element
        .thickness;
    const overlapMM = subSystems_options.LiftSlideDoor.overlapMM;
    const doorMaxWidthMM = subSystems_options.LiftSlideDoor.elementMaxWidthMM;

    let doorCount = Math.ceil(
      (frameWidth * 1000 - overlapMM) / (doorMaxWidthMM - overlapMM)
    );

    system.doorQty = doorCount;

    if (doorCount > 5) {
      if (doorCount % 2 !== 0) {
        doorCount += 1;
      }
    }

    const doorWidthMM = (frameWidth * 1000 - overlapMM) / doorCount + overlapMM;

    const doorWidthMorph = interpolateValue(
      doorWidthMM,
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.width
        .min,
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.width
        .max
    );
    const doorWidthKeyName =
      subSystems_options.LiftSlideDoor[shapekeys_orientation_key].element.width
        .key;
    changeObjectMorph(door, doorWidthKeyName, doorWidthMorph);

    while (frame.children.length > 0) {
      frame.remove(frame.children[0]);
    }

    const gap = -0.001;

    if (doorCount <= 5) {
      for (let i = 0; i < doorCount; i++) {
        const newDoor = door.clone();
        newDoor.scale.z = 0.78;
        newDoor.position.set(0, 0.05, -(doorThicknessM + gap) * i + 0.035);
        frame.add(newDoor);
      }
    } else if (doorCount > 5) {
      for (let j = 0; j < 2; j++) {
        for (let i = 0; i < doorCount / 2; i++) {
          const newDoor = door.clone();
          newDoor.scale.z = 0.78;
          newDoor.position.set(0, 0.05, -(doorThicknessM + gap) * i + 0.035);
          frame.add(newDoor);
        }
      }
    }

    this.openingLiftSlideDoor(span);
  }

  //* GuillotineGlass
  setupGuillotineGlass(span) {
    const system = span.getCurrentSystem();
    if (!system) return;
    let frame, door, shapekeys_orientation_key;
    let framePost = null;

    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      frame = system.object.getObjectByName("Guillotine_frame_side");
      door = system.object.getObjectByName("Guillotine_win_side");
      shapekeys_orientation_key = "shapekeys_perpendicular";
      framePost = system.object.getObjectByName("Guillotine_frame_side001");
    } else {
      frame = system.object.getObjectByName("Guillotine_frame");
      door = system.object.getObjectByName("Guillotine_win");
      shapekeys_orientation_key = "shapekeys_straight";
    }

    framePost && this.changeObjectVisibility(false, framePost);

    if (!frame || !door) {
      return;
    }

    this.changeObjectVisibility(true, door);

    const frameHeight = system.spanHeight - 0.1;
    const frameWidth = system.spanWidth + 0.05;

    const doorWidthValue = interpolateValue(
      frameWidth * 1000,
      subSystems_options.GuillotineGlass[shapekeys_orientation_key].element
        .width.min,
      subSystems_options.GuillotineGlass[shapekeys_orientation_key].element
        .width.max
    );

    const doorWidthKeyName =
      subSystems_options.GuillotineGlass[shapekeys_orientation_key].element
        .width.key;
    changeObjectMorph(door, doorWidthKeyName, doorWidthValue);

    const doorThicknessM =
      subSystems_options.GuillotineGlass[shapekeys_orientation_key].element
        .thickness;
    const overlapMM = subSystems_options.GuillotineGlass.overlapMM;

    const doorCount = 3;

    system.doorQty = doorCount;

    const doorHeightMM =
      (frameHeight * 1000 - overlapMM) / doorCount + overlapMM;

    const doorHeightValue = interpolateValue(
      doorHeightMM,
      subSystems_options.GuillotineGlass[shapekeys_orientation_key].element
        .height.min,
      subSystems_options.GuillotineGlass[shapekeys_orientation_key].element
        .height.max
    );
    const doorHeightKeyName =
      subSystems_options.GuillotineGlass[shapekeys_orientation_key].element
        .height.key;
    changeObjectMorph(door, doorHeightKeyName, doorHeightValue);

    while (frame.children.length > 0) {
      frame.remove(frame.children[0]);
    }

    const gap = 0.002;

    for (let i = 0; i < doorCount; i++) {
      const newDoor = door.clone();
      newDoor.position.set(0, 0.05, -(doorThicknessM + gap) * i + 0.02);
      frame.add(newDoor);
    }

    framePost && frame.add(framePost);

    if (
      this.settings.depth > subSystems_options.GuillotineGlass.limitWidthInch
    ) {
      framePost && this.changeObjectVisibility(true, framePost);
    }

    this.openingGuillotineGlass(span);
  }

  setupBlindShade(span) {
    const system = span.getCurrentSystem();
    if (!system) return;

    let framePost = null;

    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      framePost = system.object.getObjectByName("shades_frame_side001");
    }

    framePost && this.changeObjectVisibility(false, framePost);

    if (this.settings.depth > subSystems_options.BlindShade.limitWidthInch) {
      this.changeObjectVisibility(true, framePost);
    }

    this.openingBlindShade(span);
  }

  //! OPENING SYSTEMS
  openingSubsystems(value) {
    const openSystem = (span, value) => {
      if (!span) {
        return;
      }
      const system = span.getCurrentSystem();
      system.openValue = value;

      switch (system.name) {
        case "BifoldDoor":
          this.openingBifoldDoor(span);
          break;
        case "GuillotineGlass":
          this.openingGuillotineGlass(span);
          break;
        case "SlidingGlassDoor":
          this.openingSlidingGlassDoor(span);
          break;
        case "LiftSlideDoor":
          this.openingLiftSlideDoor(span);
          break;
        case "BlindShade":
          this.openingBlindShade(span);
          break;
        default:
          break;
      }
    };

    if (!pergolaSettings.allSlide) {
      const span = this.settings.currentSpan;
      openSystem(span, value);
    } else {
      const spansWithSystem = this.span.objects.filter(
        (span) => span.isSystemSet
      );
      spansWithSystem.forEach((span) => {
        openSystem(span, value);
      });
    }
  }

  //* BifoldDoors
  openingBifoldDoor(span = null) {
    if (!span) {
      return;
    }
    const system = span.getCurrentSystem();
    if (!system) return;

    const inputValue = pergolaSettings.allSlide
      ? pergolaSettings.currentOpenValue
      : system.openValue;

    let shapekeys_orientation_key = "";
    if (
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
    ) {
      shapekeys_orientation_key = "shapekeys_perpendicular";
    } else {
      shapekeys_orientation_key = "shapekeys_straight";
    }

    const frame = system.object;
    const totalDoors = frame.children.length;

    const frameWidth =
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
        ? system.spanWidth - 0.05
        : system.spanWidth - 0.1;

    const doorWidth = frameWidth / totalDoors;
    const doorThickness =
      subSystems_options.BifoldDoor[shapekeys_orientation_key].element
        .thickness;
    const maxAngle = Math.PI / 2;

    let doorStartPosX = frameWidth / 2;

    // if (this.originZ === pergolaConst.side.Front) {
    //   doorStartPosX =
    //     span.side === pergolaConst.side.Left ||
    //     span.side === pergolaConst.side.Right
    //       ? frameWidth - 0.892
    //       : frameWidth / 2;
    // }

    for (let i = 0; i < totalDoors; i++) {
      const door = frame.children[i];
      const currentAngle = inputValue * maxAngle;
      const offset =
        (doorWidth -
          doorThickness * Math.sin(currentAngle) -
          doorWidth * Math.cos(currentAngle)) *
        2;

      door.rotation.y = i % 2 === 0 ? -currentAngle : currentAngle;
      if (i === 0) {
        door.position.x = -doorStartPosX;
      }
      if (i > 0) {
        const doorOffset = i % 2 === 0 ? 0 : doorWidth * 2;
        const pairIndex = Math.floor((i - 1) / 2);
        door.position.x =
          -doorStartPosX +
          Math.floor(i / 2) * 2 * doorWidth +
          doorOffset -
          offset * (pairIndex + 1);
      }

      door.position.y = 0.05;
    }
  }

  //* SlidingGlassDoor
  openingSlidingGlassDoor(span) {
    if (!span) return;
    const system = span.getCurrentSystem();
    if (!system) return;

    const inputValue = pergolaSettings.allSlide
      ? pergolaSettings.currentOpenValue
      : system.openValue;

    const frame = system.object;
    const totalDoorsQty = frame.children.length;
    if (!frame || totalDoorsQty < 2) return;

    const frameWidth = system.spanWidth;

    const overlap = subSystems_options.SlidingGlassDoor.overlapMM / 1000;
    const k = totalDoorsQty > 5 ? 2 : 1;
    const step = (frameWidth - overlap * k) / totalDoorsQty;

    // start position (closed)
    let doorStartPosX = 0;

    if (totalDoorsQty <= 5) {
      doorStartPosX = frameWidth / 2;

      // if (this.originZ === pergolaConst.side.Front) {
      //   doorStartPosX =
      //     span.side === pergolaConst.side.Left ||
      //     span.side === pergolaConst.side.Right
      //       ? 0.892
      //       : frameWidth / 2;
      // }

      for (let i = 0; i < totalDoorsQty; i++) {
        const door = frame.children[totalDoorsQty - 1 - i];
        door.position.x = doorStartPosX - step * i;
      }

      // opening
      const maxOpening = step * (totalDoorsQty - 1) - 0.0001;
      const currentOpenValue = interpolateValue(
        inputValue,
        0,
        1,
        0,
        maxOpening
      );
      const stepQty = Math.floor(currentOpenValue / step);
      const diffValue = currentOpenValue % step;

      for (let i = 0; i < totalDoorsQty - 1; i++) {
        const door = frame.children[totalDoorsQty - 1 - i];

        if (i === stepQty) {
          door.position.x -= diffValue;
        }
        if (i < stepQty) {
          door.position.x -= (stepQty - i) * step + diffValue;
        }
      }
    } else if (totalDoorsQty > 5) {
      doorStartPosX = 0;

      // if (this.originZ === pergolaConst.side.Front) {
      //   doorStartPosX =
      //     span.side === pergolaConst.side.Left ||
      //     span.side === pergolaConst.side.Right
      //       ? 0.892 - frameWidth / 2
      //       : 0;
      // }

      for (let i = 0; i < totalDoorsQty / 2; i++) {
        const door = frame.children[totalDoorsQty / 2 - 1 - i];
        door.position.x = doorStartPosX - step * i;
      }
      for (let i = totalDoorsQty / 2; i < totalDoorsQty; i++) {
        const door = frame.children[i];
        door.position.x = doorStartPosX - 0.012 + frameWidth - step * i;
      }

      // opening
      const maxOpening = step * (totalDoorsQty / 2 - 1) - 0.0001;
      const currentOpenValue = interpolateValue(
        inputValue,
        0,
        1,
        0,
        maxOpening
      );

      const stepQty = Math.floor(currentOpenValue / step);
      const diffValue = currentOpenValue % step;

      for (let i = 0; i < totalDoorsQty - 1; i++) {
        const doorLeft = frame.children[totalDoorsQty / 2 - 1 - i];
        const doorRight = frame.children[totalDoorsQty - 1 - i];

        if (i === stepQty) {
          doorLeft.position.x -= diffValue;
          doorRight.position.x += diffValue;
        }
        if (i < stepQty) {
          doorLeft.position.x -= (stepQty - i) * step + diffValue;
          doorRight.position.x += (stepQty - i) * step + diffValue;
        }
      }
    }
  }

  //* LiftSlideDoor
  openingLiftSlideDoor(span) {
    if (!span) return;
    const system = span.getCurrentSystem();
    if (!system) return;

    const inputValue = pergolaSettings.allSlide
      ? pergolaSettings.currentOpenValue
      : system.openValue;

    const frame = system.object;
    const totalDoorsQty = frame.children.length;
    if (!frame || totalDoorsQty < 2) return;

    const frameWidth =
      span.side === pergolaConst.side.Left ||
      span.side === pergolaConst.side.Right
        ? system.spanWidth - 0.05
        : system.spanWidth - 0.1;

    const overlap = subSystems_options.LiftSlideDoor.overlapMM / 1000;
    const k = totalDoorsQty > 5 ? 2 : 1;
    const step = (frameWidth - overlap * k) / totalDoorsQty;

    // start position (closed)
    let doorStartPosX = 0;

    if (totalDoorsQty <= 5) {
      doorStartPosX = frameWidth / 2;
      // if (this.originZ === pergolaConst.side.Front) {
      //   doorStartPosX =
      //     span.side === pergolaConst.side.Left ||
      //     span.side === pergolaConst.side.Right
      //       ? 0.892
      //       : frameWidth / 2;
      // }

      for (let i = 0; i < totalDoorsQty; i++) {
        const door = frame.children[totalDoorsQty - 1 - i];
        door.position.x = doorStartPosX - step * i;
      }

      // opening
      const maxOpening = step * (totalDoorsQty - 1) - 0.0001;
      const currentOpenValue = interpolateValue(
        inputValue,
        0,
        1,
        0,
        maxOpening
      );
      const stepQty = Math.floor(currentOpenValue / step);
      const diffValue = currentOpenValue % step;

      for (let i = 0; i < totalDoorsQty - 1; i++) {
        const door = frame.children[totalDoorsQty - 1 - i];

        if (i === stepQty) {
          door.position.x -= diffValue;
        }
        if (i < stepQty) {
          door.position.x -= (stepQty - i) * step + diffValue;
        }
      }
    } else if (totalDoorsQty > 5) {
      doorStartPosX = 0;
      // if (this.originZ === pergolaConst.side.Front) {
      //   doorStartPosX =
      //     span.side === pergolaConst.side.Left ||
      //     span.side === pergolaConst.side.Right
      //       ? 0.892 - frameWidth / 2
      //       : 0;
      // }

      for (let i = 0; i < totalDoorsQty / 2; i++) {
        const door = frame.children[totalDoorsQty / 2 - 1 - i];
        door.position.x = doorStartPosX - step * i;
      }
      for (let i = totalDoorsQty / 2; i < totalDoorsQty; i++) {
        const door = frame.children[i];
        door.position.x = doorStartPosX - 0.06 + frameWidth - step * i;
      }

      // opening
      const maxOpening = step * (totalDoorsQty / 2 - 1) - 0.0001;
      const currentOpenValue = interpolateValue(
        inputValue,
        0,
        1,
        0,
        maxOpening
      );
      const stepQty = Math.floor(currentOpenValue / step);
      const diffValue = currentOpenValue % step;

      for (let i = 0; i < totalDoorsQty - 1; i++) {
        const doorLeft = frame.children[totalDoorsQty / 2 - 1 - i];
        const doorRight = frame.children[totalDoorsQty - 1 - i];

        if (i === stepQty) {
          doorLeft.position.x -= diffValue;
          doorRight.position.x += diffValue;
        }
        if (i < stepQty) {
          doorLeft.position.x -= (stepQty - i) * step + diffValue;
          doorRight.position.x += (stepQty - i) * step + diffValue;
        }
      }
    }
  }

  // GuillotineGlass
  openingGuillotineGlass(span) {
    if (!span) return;
    const system = span.getCurrentSystem();
    if (!system) return;

    const inputValue = pergolaSettings.allSlide
      ? pergolaSettings.currentOpenValue
      : system.openValue;

    const frame = system.object;
    if (!frame) return;

    const totalDoorsQty = 3;

    const frameHeight = system.spanHeight - 0.1;

    const overlap = subSystems_options.GuillotineGlass.overlapMM / 1000;
    const step = (frameHeight - overlap) / totalDoorsQty;

    // start position (closed)
    const doorStartPosY = 0.05;

    for (let i = 0; i < totalDoorsQty; i++) {
      const door = frame.children[totalDoorsQty - 1 - i];
      door.position.y = doorStartPosY + step * i;
    }

    // opening
    const maxOpening = step * (totalDoorsQty - 1) - 0.0001;
    const currentOpenValue = interpolateValue(inputValue, 0, 1, 0, maxOpening);
    const stepQty = Math.floor(currentOpenValue / step);
    const diffValue = currentOpenValue % step;

    for (let i = 0; i < totalDoorsQty - 1; i++) {
      // const door = frame.children[totalDoorsQty - 1 - i];
      const door = frame.children[i];

      if (i === stepQty) {
        door.position.y -= diffValue;
      }
      if (i < stepQty) {
        door.position.y -= (stepQty - i) * step + diffValue;
      }
    }
  }

  //* BlindShade
  openingBlindShade(span = null) {
    const operateOpening = (span) => {
      const system = span.getCurrentSystem();

      const inputValue = pergolaSettings.allSlide
        ? pergolaSettings.currentOpenValue
        : system.openValue || 0;

      const key =
        span.side === pergolaConst.side.Left ||
        span.side === pergolaConst.side.Right
          ? subSystems_options.BlindShade.shapekeys_perpendicular.element
              .closing.key
          : subSystems_options.BlindShade.shapekeys_straight.element.closing
              .key;

      const shapekeyValueMax = 2.6; // hardcoded
      const valMax = interpolateValue(
        this.settings.height,
        this.settings.minHeight,
        this.settings.maxHeight,
        1,
        shapekeyValueMax
      );
      const shapekeyValue = interpolateValue(1 - inputValue, 0, 1, 0, valMax);
      system &&
        system.object &&
        changeObjectMorph(system.object, key, shapekeyValue);
    };

    if (span === null) {
      this.span.objects.forEach((span) => {
        if (span.isSystemSet) {
          const activeSystem = span.systems.find((system) => {
            return (
              system.active &&
              system.type === pergolaConst.systemType.BlindShade
            );
          });

          if (activeSystem) {
            operateOpening(span);
          }
        }
      });
    } else {
      operateOpening(span);
    }
  }

  //* *************************************************************

  getActiveSystemBySpanAndType(span, type = null) {
    if (!span) {
      return;
    }

    if (span.isSystemSet) {
      if (type !== null) {
        return span.systems.find((system) => {
          return system.active && system.type === type;
        });
      } else {
        return span.systems.find((system) => {
          return system.active;
        });
      }
    } else {
      return null;
    }
  }

  editSystem(span) {
    if (!span) {
      return;
    }
    const system = span.getCurrentSystem();
    if (!system) {
      return;
    }

    this.settings.currentSpan = span;
    this.settings.currentSubsystem = system;
    this.settings.currentSubsystemKey = system.name;

    this.showSystemPopup(system);
  }

  showSystemPopup(system) {
    clearOptionsState(subSystems_group, [subSystems_options.Led.option]);

    resetSubSystemPopups();
    setHotspotsByGroupVisibility("subsystems", false);

    const groupId = subSystems_options[system.name].group;
    const popup = jQuery(`#${groupId}`);

    updateInputs(groupId, system);

    function updateInputs(groupId, system) {
      const radioGroup = jQuery(`#${groupId} .canvas_menu__item_radio`);
      if (system.openingside) {
        radioGroup.find('input[value="Left"]').prop("checked", true);
      } else {
        radioGroup.find('input[value="Right"]').prop("checked", true);
      }

      const rangeInput = jQuery(
        `#${groupId} .range-container input[type="range"]`
      );
      const newValue = system.openValue !== null ? system.openValue : "0";
      rangeInput.val(newValue);

      updateRangeBackgroundAndLabel(rangeInput);

      popup.addClass("active");
      fixScroll();
      pergola && pergola.updateRadioButtonsInSystemPopup();
    }
  }
}
//#endregion

//#region PERGOLA FUNCTIONS
function generateMidpoints(
  vectorA,
  vectorB,
  numPoints,
  isFirstLastPointAdded = false
) {
  const points = [];

  if (isFirstLastPointAdded) {
    points.push(vectorA);
  }

  for (let i = 1; i <= numPoints; i++) {
    const t = i / (numPoints + 1);
    const point = new THREE.Vector3().lerpVectors(vectorA, vectorB, t);
    points.push(point);
  }

  if (isFirstLastPointAdded) {
    points.push(vectorB);
  }

  return points;
}

function generateCenterMidpoints(
  vectorA,
  vectorB,
  numPoints,
  isFirstLastPointAdded = false,
  divide = 1
) {
  const points = [];

  if (isFirstLastPointAdded) {
    points.push(vectorA);
  }

  for (let i = 1; i <= numPoints; i++) {
    const t = i / (numPoints + 1);
    const point = new THREE.Vector3().lerpVectors(vectorA, vectorB, t);
    points.push(point);
  }

  if (isFirstLastPointAdded) {
    points.push(vectorB);
  }

  if (points.length == 1) {
    return points;
  }

  let dividePoints = points;
  for (let index = 0; index < divide; index++) {
    dividePoints = pointDivideProcess(dividePoints);
  }

  return dividePoints;
}

function pointDivideProcess(points) {
  const dividePoints = [];

  for (let i = 0; i < points.length; i++) {
    if (i + 1 >= points.length) {
      continue;
    }

    const point1 = points[i];
    const point2 = points[i + 1];
    const centerPoint = new THREE.Vector3().lerpVectors(point1, point2, 0.5);
    dividePoints.push(centerPoint);
  }

  return dividePoints;
}

//#endregion

//#region HOTSPOTS
function createHotspot(id, normalUrl, hoverUrl, position, groupName = "") {
  const hotspotContainer = document.getElementById("ar_model_viewer");
  if (!hotspotContainer) {
    return;
  }

  const hotspot = document.createElement("div");
  hotspot.classList.add("hotspot");
  hotspot.id = id;
  hotspot.dataset.id = id;
  hotspot.style.backgroundImage = `url(${normalUrl})`;
  hotspot.groupName = groupName;
  hotspot.dataset.group = groupName;

  hotspot.hoverFunction = () => {};
  hotspot.normalFunction = () => {};
  hotspot.clickFunction = () => {};

  hotspot.addEventListener("mouseenter", () => {
    hotspot.style.backgroundImage = `url(${hoverUrl})`;
    hotspot.hoverFunction();
  });

  hotspot.addEventListener("mouseleave", () => {
    hotspot.style.backgroundImage = `url(${normalUrl})`;
    hotspot.normalFunction();
  });

  hotspot.addEventListener("click", () => {
    // console.log(`Hotspot ${id} clicked`);
    hotspot.clickFunction();
  });

  hotspotContainer.appendChild(hotspot);

  return {
    element: hotspot,
    position: position,
    setHoverFunction: (newFunction) => {
      hotspot.hoverFunction = newFunction;
    },
    setNormalFunction: (newFunction) => {
      hotspot.normalFunction = newFunction;
    },
    setClickFunction: (newFunction) => {
      hotspot.clickFunction = newFunction;
    },
  };
}

const $canvasContainer = jQuery("#ar_model_viewer");

function updateHotspots(hotspots) {
  hotspots.forEach(({ element, position }) => {
    if (position) {
      const screenPosition = position.clone();
      screenPosition.project(camera);

      const x = (screenPosition.x * 0.5 + 0.5) * $canvasContainer.width();
      const y = (screenPosition.y * -0.5 + 0.5) * $canvasContainer.height();

      jQuery(element).css({
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
        "-webkit-transform": "translate(-50%, -50%)",
      });
    }
  });
}

function setHotspotVisibility(hotspot, visible) {
  if (!hotspot || !hotspot.element) {
    return;
  }
  hotspot.element.style.display = visible ? "block" : "none";
}

function setAllHotspotsVisibility(visible) {
  const hotspots = document.querySelectorAll(".hotspot");
  hotspots.forEach((hotspot) => {
    setHotspotVisibility(hotspot, visible);
  });
}

function setHotspotsByGroupVisibility(groupName, visible) {
  const hotspots = document.querySelectorAll(
    `.hotspot[data-group="${groupName}"]`
  );
  hotspots?.forEach((hotspot) => {
    hotspot.style.display = visible ? "block" : "none";
  });
}

window.addEventListener("resize", () => {
  updateHotspots(hotspots);
});

//#endregion

//#region RAYCAST

const clickableObjects = [];
function initRaycast() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const canvas = document.getElementById("ar_model_view");

  let isMouseMoved = false;
  let clickThreshold = 5;
  let startX, startY;

  let avatarObject;

  function onMouseDown(event) {
    isMouseMoved = false;
    startX = event.offsetX;
    startY = event.offsetY;
  }

  function onMouseMove(event) {
    mouse.x = (event.offsetX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.offsetY / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const visibleClickableObjects =
      getVisibleClickableObjects(clickableObjects);
    const intersects = raycaster.intersectObjects(
      visibleClickableObjects,
      true
    );

    if (intersects.length > 0) {
      canvas.style.cursor = "pointer";
      avatarObject = intersects[0].object;
      visibleClickableObjects.forEach((object) => {
        pergola && pergola.outlineAvatar(object, false);
      });
      pergola && pergola.outlineAvatar(avatarObject, true, false);
    } else {
      canvas.style.cursor = "default";
      visibleClickableObjects.forEach((object) => {
        pergola && pergola.outlineAvatar(object, false);
      });
    }

    if (
      Math.abs(event.offsetX - startX) > clickThreshold ||
      Math.abs(event.offsetY - startY) > clickThreshold
    ) {
      isMouseMoved = true;
    }
  }

  function onMouseUp(event) {
    if (!isMouseMoved) {
      mouse.x = (event.offsetX / renderer.domElement.clientWidth) * 2 - 1;
      mouse.y = -(event.offsetY / renderer.domElement.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const visibleClickableObjects =
        getVisibleClickableObjects(clickableObjects);
      const intersects = raycaster.intersectObjects(
        visibleClickableObjects,
        true
      );

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        // console.log(`CLICKED: ${intersectedObject.name}`);
        const clickedSpan = intersectedObject.parentSpan;
        pergola && pergola.editSystem(clickedSpan);
        visibleClickableObjects.forEach((object) => {
          pergola && pergola.outlineAvatar(object, false);
        });
      }
    }
  }

  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
}

function getVisibleClickableObjects(objects = []) {
  const visibleObjects = objects.filter(
    (avatar) => avatar.parentSpan.isSystemSet === true
  );

  return visibleObjects;
}

//#endregion

//#region SUMMARY
function showSummaryModal() {
  jQuery(".product-type-3dmodel .modal").addClass("active");
  jQuery(".product-type-3dmodel .modal_overlay").addClass("active");
  fixScroll();
}

function prepareSummary() {
  jQuery("#summary_productTitle").text(productTitle);
  jQuery("#summary_dimensions").text(
    `${pergolaSettings.width}(W) X ${pergolaSettings.depth}(D) X ${pergolaSettings.height}(H)`
  );

  const structureColor =
    pergolaSettings.structureColorType ===
    pergolaConst.structureColorType.Standard
      ? jQuery(
          `.${colorOptionPrefixes.structureColorStandard}${pergolaSettings.structureColorStandard} .component_title`
        ).text()
      : jQuery(
          `.${colorOptionPrefixes.structureColorWood}${pergolaSettings.structureColorWood} .component_title`
        ).text();

  const canopyColor = jQuery(
    `.${colorOptionPrefixes.canopyColor}${pergolaSettings.canopyColor} .component_title`
  ).text();

  jQuery("#summary_mainColors").text(
    `Structure: ${structureColor}, Canopy: ${canopyColor}`
  );

  jQuery("#summary_fanPicked").text(
    `${pergolaSettings.sideOptionFan ? "Yes" : "No"}`
  );

  jQuery("#summary_heaterPicked").text(
    `${pergolaSettings.sideOptionHeater ? "Yes" : "No"}`
  );

  const subsystemList = getSubsystemList(pergola);
  createHtmlSubsystemList(subsystemList);
  calculatePrice(subsystemList);
  showSummaryModal();
}

function getSubsystemList(pergolaObject) {
  const spans = pergolaObject.span.objects;
  const subsystemList = [];
  const subsystems = [];

  for (let i = 0; i < spans.length; i++) {
    const span = spans[i];
    if (span.isSystemSet) {
      const subsystem = span.systems.find((system) => {
        return system.active === true;
      });

      subsystem && subsystems.push(subsystem);
    }
  }

  subsystems.forEach((subsystem) => {
    let systemName = pergolaConst.systemNameString[subsystem.name];
    let dimensions = "";
    let description = "";
    let quantity = "";
    let pergolaSide = "";
    let systemArea = 0;

    if (subsystem.name === "BlindShade") {
      const systemColor = jQuery(
        `.${colorOptionPrefixes.subBlindShadeColor}${pergolaSettings.subBlindShadeColor} .component_title`
      ).text();
      dimensions = `${Math.round(
        subsystem.spanWidth / 0.0254
      )}(W) X ${Math.round(subsystem.spanHeight / 0.0254)}(H)`;
      description = `Color: ${systemColor}`;
      pergolaSide = `Pergola side: ${pergolaConst.sideString[subsystem.side]}`;
      quantity = 1;
      systemArea =
        (Math.round(subsystem.spanWidth / 0.0254) *
          Math.round(subsystem.spanHeight / 0.0254)) /
        144;
    } else {
      let slideSide = subsystem.openingside ? "Left" : "Right";

      if (subsystem.doorQty > 5 && subsystem.name !== "BifoldDoor") {
        slideSide = "Both";
      }

      dimensions = `${Math.round(
        subsystem.spanWidth / 0.0254
      )}(W) X ${Math.round(subsystem.spanHeight / 0.0254)}(H)`;
      description = `${subsystem.doorQty} Sliders, Slide ${slideSide}`;
      pergolaSide = `Pergola side: ${pergolaConst.sideString[subsystem.side]}`;
      quantity = 1;
      systemArea =
        (Math.round(subsystem.spanWidth / 0.0254) *
          Math.round(subsystem.spanHeight / 0.0254)) /
        144;
    }

    const dividedSubsystems = ["GuillotineGlass", "BlindShade"];

    dividedSubsystems.forEach((dividedSubsystem) => {
      if (
        subsystem.name === dividedSubsystem &&
        pergola.settings.depth >
          subSystems_options[dividedSubsystem].limitWidthInch &&
        (subsystem.side === pergolaConst.side.Left ||
          subsystem.side === pergolaConst.side.Right)
      ) {
        dimensions = `${Math.round(
          subsystem.spanWidth / 0.0254 / 2
        )}(W) X ${Math.round(subsystem.spanHeight / 0.0254)}(H)`;
        systemArea =
          (Math.round(subsystem.spanWidth / 0.0254 / 2) *
            Math.round(subsystem.spanHeight / 0.0254)) /
          144;
        quantity = 2;
      }
    });

    subsystemList.push({
      systemName: systemName,
      dimensions: dimensions,
      description: description + ", " + pergolaSide,
      quantity: quantity,
      systemArea: systemArea,
    });
  });

  // if (pergolaSettings.subLeds) {
  //   subsystemList.push({
  //     systemName: "Leds",
  //     dimensions: "",
  //     description: "",
  //     quantity: pergola.roof.leds.filter((led) => led.active === true).length,
  //   });
  // }

  return subsystemList;
}

function createHtmlSubsystemList(subsystemList) {
  let systemHtml = "";

  const mergedSubsystemList = subsystemList.reduce((acc, current) => {
    const existingItem = acc.find(
      (item) =>
        item.systemName === current.systemName &&
        item.description === current.description
    );

    if (existingItem) {
      existingItem.quantity += current.quantity;
    } else {
      acc.push({ ...current });
    }

    return acc;
  }, []);

  mergedSubsystemList.sort((a, b) => a.systemName.localeCompare(b.systemName));

  const wallSides = [
    {
      key: "mountingWall_Back",
      description: "Pergola side: Back",
    },
    {
      key: "mountingWall_Left",
      description: "Pergola side: Left",
    },
    {
      key: "mountingWall_Right",
      description: "Pergola side: Right",
    },
  ];

  wallSides.forEach((wallSide) => {
    if (pergolaSettings[wallSide.key]) {
      mergedSubsystemList.push({
        systemName: "Mounting Wall",
        dimensions: "",
        description: wallSide.description,
        quantity: "Yes",
      });
    }
  });

  mergedSubsystemList.forEach((subsystem) => {
    systemHtml += `
      <tr class="subsystem-row">
        <td>${subsystem.systemName}</td>
        <td>${subsystem.dimensions}</td>
        <td>${subsystem.description}</td>
        <td>${subsystem.quantity}</td>
      </tr>
    `;
  });

  jQuery(".subsystem-row").remove();
  jQuery("#summary_subsystemList").after(systemHtml);
}

function calculatePrice(subsystemList) {
  const margin = 1.25;
  let basePrice = 0;

  const prices = getPriceData(prices_group);
  const pergolaArea = (pergola.settings.width * pergola.settings.depth) / 144;

  let mainColorName =
    pergola.settings.structureColorType ===
    pergolaConst.structureColorType.Standard
      ? jQuery(`#${standardColors_group} .option.active`).data("value")
      : "Else Color";

  mainColorName = mainColorName.replace(/\s+/g, "").toUpperCase();
  if (!(mainColorName in prices)) {
    mainColorName = "Else Color";
  }
  mainColorName = mainColorName.replace(/\s+/g, "").toUpperCase();

  const colorPrice = +prices[mainColorName] || 0;

  let installFee = 0;

  if (pergolaArea <= 500) {
    installFee =
      +prices["Area <500 Install Fee".replace(/\s+/g, "").toUpperCase()] || 0;
  }
  if (pergolaArea > 500 && pergolaArea <= 1000) {
    installFee =
      +prices[
        "Area >500 and <1000 Install Fee".replace(/\s+/g, "").toUpperCase()
      ] || 0;
  }
  if (pergolaArea > 500) {
    installFee =
      +prices["Area >1000 Install Fee".replace(/\s+/g, "").toUpperCase()] || 0;
  }

  basePrice = pergolaArea * (colorPrice + installFee);

  // console.log("ðŸš€ ~ calculatePrice ~ prices:", prices);
  // console.log("ðŸš€ Pergola area:", pergolaArea.toFixed(3));
  // console.log("ðŸš€ Color name/price:", mainColorName, colorPrice.toFixed(2));
  // console.log("ðŸš€ Install Fee:", installFee.toFixed(2));
  // console.log("ðŸš€ Current price:", basePrice.toFixed(2));

  subsystemList.forEach((subsystem) => {
    const systemName = subsystem.systemName.replace(/\s+/g, "").toUpperCase();
    if (systemName !== "LEDS") {
      const systemArea = +subsystem.systemArea;
      const systemQty = +subsystem.quantity;
      const systemPricePerFeet = +prices[systemName + mainColorName] || 0;
      const systemInstallFee =
        +prices[
          (systemName + "Install Fee").replace(/\s+/g, "").toUpperCase()
        ] || 0;
      const systemPrice = systemArea * (systemPricePerFeet + systemInstallFee);
      basePrice += systemPrice * systemQty;

      // console.log("ðŸš€ systemName:", systemName);
      // console.log("ðŸš€ systemArea:", systemArea.toFixed(3));
      // console.log("ðŸš€ systemPriceColor:", systemPricePerFeet);
      // console.log("ðŸš€ systemPriceInstallFee:", systemInstallFee);
      // console.log("ðŸš€ systemQty:", systemQty);
    }
  });

  if (pergola.settings.subLeds) {
    const ledPricePerFeet =
      +prices["LED light".replace(/\s+/g, "").toUpperCase()] || 0;
    const ledPrice = pergolaArea * ledPricePerFeet;
    basePrice += ledPrice;

    // console.log("ðŸš€ ledPrice:", ledPrice.toFixed(2));
  }

  if (pergola.settings.sideOptionHeater === 1) {
    const heaterPricePerFeet =
      +prices["heater".replace(/\s+/g, "").toUpperCase()] ||
      prices["heaters".replace(/\s+/g, "").toUpperCase()] ||
      0;
    const heaterPrice = pergolaArea * heaterPricePerFeet;
    basePrice += heaterPrice;

    // console.log("ðŸš€ heaterPrice:", heaterPrice.toFixed(2));
  }

  if (pergola.settings.sideOptionFan === 1) {
    const fanPricePerFeet =
      +prices["fan".replace(/\s+/g, "").toUpperCase()] ||
      prices["fans".replace(/\s+/g, "").toUpperCase()] ||
      0;
    const fanPrice = pergolaArea * fanPricePerFeet;
    basePrice += fanPrice;

    // console.log("ðŸš€ fanPrice:", fanPrice.toFixed(2));
  }

  const shippingCost =
    +prices["Shipping Cost".replace(/\s+/g, "").toUpperCase()] || 0;

  // console.log("ðŸš€ shippingCost:", shippingCost.toFixed(2));

  basePrice += shippingCost;

  // console.log("--------------------------------");
  // console.log("ðŸš€ FINAL PRICE:", basePrice.toFixed(2));

  const priceForSale = basePrice * margin;
  jQuery("#summary_price_base").text(basePrice.toFixed(2));
  jQuery("#summary_price_high").text(priceForSale.toFixed(2));
}

function getPriceData(groupId) {
  const result = {};

  jQuery(`#${groupId} .option`).each(function () {
    const price = jQuery(this).data("price");
    const str = jQuery(this).data("value");
    const res = str.includes("Price Per Feet")
      ? str.replace("Price Per Feet ", "")
      : str;
    const value = res.replace(/\s+/g, "").toUpperCase();

    if (value && price) {
      result[value] = parseFloat(price);
    }
  });

  return result;
}

//#endregion

//#region FORM VALIDATION
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function validatePhone(phone) {
  const phonePattern = /^[0-9+\-\s()]*$/;
  return phonePattern.test(phone);
}

function validateForm() {
  const isNameValid = jQuery("#form_name").val().trim() !== "";
  const isPhoneValid = validatePhone(jQuery("#form_phone").val().trim());
  const isEmailValid = validateEmail(jQuery("#form_email").val().trim());
  const isAddressValid = jQuery("#form_address").val().trim() !== "";
  const isZipcodeValid = jQuery("#form_zipcode").val().trim() !== "";
  const isCityValid = jQuery("#form_city").val().trim() !== "";

  const isCheckboxChecked = jQuery("#agree").is(":checked");

  const isFormValid =
    isNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isAddressValid &&
    isZipcodeValid &&
    isCityValid &&
    isCheckboxChecked;

  jQuery("#js-downloadPdf").prop("disabled", !isFormValid);
}

//#endregion

//#region PDF (lirary PDFMAKE)

async function createPDF(opt = "open") {
  await createImageList();

  const uiPdfPhone = "(800) 000-0000";
  const uiPdfEmail = "info@pipergola.com";
  const uiPdfWeb = "www.pipergola.com";

  const mainMargins = [30, 130, 30, 60];

  const imageUrls = [
    pdf_logo_url,
    pdf_icon_web_url,
    pdf_icon_phone_url,
    pdf_icon_email_url,
  ];

  pdfMake.fonts = {
    ITCAvantGardePro: {
      normal: "ITCAvantGardePro-Md.ttf",
    },
    Manrope: {
      normal: "Manrope-Regular.ttf",
      bold: "Manrope-Bold.ttf",
    },
  };

  const pergolaDimensions = `${pergolaSettings.width}(W) X ${pergolaSettings.depth}(D) X ${pergolaSettings.height}(H)`;
  const structureColor =
    pergolaSettings.structureColorType ===
    pergolaConst.structureColorType.Standard
      ? jQuery(
          `.${colorOptionPrefixes.structureColorStandard}${pergolaSettings.structureColorStandard} .component_title`
        ).text()
      : jQuery(
          `.${colorOptionPrefixes.structureColorWood}${pergolaSettings.structureColorWood} .component_title`
        ).text();
  const canopyColor = jQuery(
    `.${colorOptionPrefixes.canopyColor}${pergolaSettings.canopyColor} .component_title`
  ).text();
  const pergolaDescription = `Structure: ${structureColor}, Canopy: ${canopyColor}`;

  const subsystemList = getSubsystemList(pergola);

  const subsystemListTableData = subsystemList.map((item) => [
    { text: item.systemName, bold: true },
    item.dimensions,
    item.description,
    item.quantity,
  ]);

  const sideOptionsIndex = subsystemListTableData.length + 2;

  const promises = imageUrls.map(async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    return await new Promise((resolve, reject) => {
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  });

  Promise.all(promises)
    .then(([logoImage, websiteIconImage, phoneIconImage, emailIconImage]) => {
      const headerContent = {
        stack: [
          {
            image: logoImage,
            width: 535,
            margin: [30, 30, 30, 0],
          },
        ],
        alignment: "left center",
      };

      const footerContent = function () {
        return [
          {
            margin: [30, 20, 30, 0],
            table: {
              widths: [12, "auto", "*", 12, "auto", "*", 12, "auto"],
              body: [
                [
                  {
                    image: phoneIconImage,
                    width: 12,
                    height: 12,
                    margin: [0, 0, 0, 0],
                    alignment: "right",
                  },
                  {
                    text: uiPdfPhone,
                    margin: [0, 0, 0, 0],
                    alignment: "left",
                    style: "footer",
                  },
                  { text: "" },
                  {
                    image: emailIconImage,
                    width: 12,
                    height: 12,
                    margin: [0, 0, 0, 0],
                    alignment: "right",
                  },
                  {
                    text: uiPdfEmail,
                    link: `mailto:${uiPdfEmail}`,
                    margin: [0, 0, 0, 0],
                    alignment: "left",
                    style: "footer",
                  },
                  { text: "" },
                  {
                    image: websiteIconImage,
                    width: 12,
                    height: 12,
                    margin: [0, 0, 0, 0],
                    alignment: "right",
                  },
                  {
                    text: uiPdfWeb,
                    link: uiPdfWeb,
                    margin: [0, 0, 0, 0],
                    alignment: "left",
                    style: "footer",
                  },
                ],
              ],
            },
            layout: "noBorders",
          },
        ];
      };

      const tableData = [
        [
          { text: "PRODUCT NAME", style: "tableTitle" },
          { text: "DIMENSIONS (INCH)", style: "tableTitle" },
          { text: "DESCRIPTION", style: "tableTitle" },
          { text: "QUANTITY", style: "tableTitle" },
        ],
        [
          { text: productTitle, style: "tableItemTitle" },
          { text: pergolaDimensions, style: "tableItemText" },
          { text: pergolaDescription, style: "tableItemText" },
          { text: "1", style: "tableItemText" },
        ],

        ...subsystemListTableData,

        [
          {
            text: "SIDE OPTIONS",
            colSpan: 4,
            alignment: "left",
            style: "tableTitle",
          },
          {},
          {},
          {},
        ],
        [
          {
            text: "Fan",
            colSpan: 3,
            alignment: "left",
            style: "tableItemTitle",
          },
          {},
          {},
          `${pergolaSettings.sideOptionFan ? "Yes" : "No"}`,
        ],
        [
          {
            text: "Heater",
            colSpan: 3,
            alignment: "left",
            style: "tableItemTitle",
          },
          {},
          {},
          `${pergolaSettings.sideOptionHeater ? "Yes" : "No"}`,
        ],
      ];

      const pdfContent = [
        {
          image: imageSources[0],
          width: 350,
          margin: [0, 0, 0, 20],
          alignment: "center",
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*"],
            body: tableData,
          },
          layout: {
            fillColor: (rowIndex) => {
              if (rowIndex === 0) return "#F3865B";
              if (rowIndex === sideOptionsIndex) return "#F3865B";
              return null;
            },
            hLineColor: () => "#E0E0E0",
            vLineColor: () => "#E0E0E0",
            paddingLeft: () => 10,
            paddingRight: () => 10,
            paddingTop: () => 10,
            paddingBottom: () => 10,
            hLineWidth: () => 2,
            vLineWidth: () => 2,
          },
          heights: () => 37,
        },
      ];

      // -------------------------------------------------
      const pdfDefinition = {
        pageMargins: mainMargins,
        header: headerContent,
        content: pdfContent,
        footer: footerContent,

        styles: {
          tableTitle: {
            fontSize: 12,
            bold: false,
            font: "Manrope",
            color: "#FFFFFF",
          },
          tableItemTitle: { fontSize: 12, bold: true, font: "Manrope" },
          tableItemText: { fontSize: 12, bold: false, font: "Manrope" },
          footer: { fontSize: 12, bold: false, font: "ITCAvantGardePro" },
        },
        defaultStyle: { font: "Manrope" },
      };
      // -------------------------------------------------
      switch (opt) {
        case "open":
          pdfMake.createPdf(pdfDefinition).open();
          break;

        case "download":
          pdfMake.createPdf(pdfDefinition).download("Pi-Pergola.pdf");
          break;

        case "all":
          pdfMake.createPdf(pdfDefinition).getBlob((pdfBlob) => {
            const urlForTab = URL.createObjectURL(pdfBlob);
            window.open(urlForTab);

            const link = document.createElement("a");
            link.href = urlForTab;
            link.download = "Pi-Pergola.pdf";
            link.click();

            URL.revokeObjectURL(urlForTab);
          });
          break;

        default:
          break;
      }
    })
    .catch((error) => {
      console.error("Image loading error:", error);
    });
}

//#endregion

//#region Dimmensions

function removeObject3D(object3D) {
  if (!(object3D instanceof THREE.Object3D)) return false;

  if (object3D.geometry) object3D.geometry.dispose();

  if (object3D.material) {
    if (object3D.material instanceof Array) {
      object3D.material.forEach((material) => material.dispose());
    } else {
      object3D.material.dispose();
    }
  }
  object3D.removeFromParent();
  return true;
}

var dimmensionObjects = [];

// eslint-disable-next-line no-unused-vars
function changeDimmensionRender(status, lookAtCamera = null, stage) {
  if (!status) {
    for (let index = 0; index < dimmensionObjects.length; index++) {
      const element = dimmensionObjects[index];
      removeObject3D(element);
    }

    dimmensionObjects = [];
    return;
  }

  const { FL_point, FR_point, RR_point } = pergola.getCornerPoints();
  const modelHeight = pergola.totalHeight;
  const deltaHeight = 0.7;

  let textSize = 0.2;

  if (pergolaSettings.width > 15 || pergolaSettings.depth > 15) {
    textSize = 0.25;
  }

  if (pergolaSettings.width > 25 || pergolaSettings.depth > 25) {
    textSize = 0.3;
  }

  if (pergolaSettings.width > 30 || pergolaSettings.depth > 30) {
    textSize = 0.35;
  }

  var pos_width_0 = new THREE.Vector3(
    FL_point.x - 0.1,
    modelHeight - deltaHeight,
    FL_point.z + 0.1
  );
  var pos_width_1 = new THREE.Vector3(
    FR_point.x + 0.08,
    modelHeight - deltaHeight,
    FR_point.z + 0.1
  );

  var pos_length_0 = new THREE.Vector3(
    FR_point.x + 0.1,
    modelHeight - deltaHeight,
    FR_point.z + 0.08
  );
  var pos_length_1 = new THREE.Vector3(
    RR_point.x + 0.1,
    modelHeight - deltaHeight,
    RR_point.z - 0.1
  );

  var pos_width_center = pergola.generateMidpoints(pos_width_0, pos_width_1, 1);
  var pos_length_center = pergola.generateMidpoints(
    pos_length_0,
    pos_length_1,
    1
  );

  var pos_width_textPosition = new THREE.Vector3(
    pos_width_center[0].x,
    pos_width_center[0].y + 0.2,
    pos_width_center[0].z + 0.1
  );
  var pos_length_textPosition = new THREE.Vector3(
    pos_length_center[0].x + 0.1,
    pos_length_center[0].y + 0.1,
    pos_length_center[0].z
  );

  AddDimmension(
    pos_width_center[0],
    pos_width_0,
    pos_width_1,
    pergolaSettings.width.toString() + "'",
    pos_width_textPosition,
    "x",
    0.01,
    0xf41818,
    lookAtCamera
  );
  createDimensionBorderLine(pos_width_0, 0.25, 0.01, "x", 0xf41818);
  createDimensionBorderLine(pos_width_1, 0.25, 0.01, "x", 0xf41818);
  createDimensionText(
    pergolaSettings.width.toString() + "'",
    pos_width_textPosition,
    0xf41818,
    lookAtCamera,
    textSize
  );

  AddDimmension(
    pos_length_center[0],
    pos_length_0,
    pos_length_1,
    pergolaSettings.depth.toString() + "'",
    pos_length_textPosition,
    "z",
    0.01,
    0xf41818,
    lookAtCamera
  );
  createDimensionBorderLine(pos_length_0, 0.25, 0.01, "x", 0xf41818);
  createDimensionBorderLine(pos_length_1, 0.25, 0.01, "x", 0xf41818);
  createDimensionText(
    pergolaSettings.depth.toString() + "'",
    pos_length_textPosition,
    0xf41818,
    lookAtCamera,
    textSize
  );

  var pos_height_0 = new THREE.Vector3(RR_point.x + 0.5, -1, RR_point.z);
  var pos_height_1 = new THREE.Vector3(
    RR_point.x + 0.5,
    modelHeight - 1,
    RR_point.z
  );

  var pos_height_center = pergola.generateMidpoints(
    pos_height_0,
    pos_height_1,
    1
  );
  var pos_height_textPosition = new THREE.Vector3(
    pos_height_center[0].x + 0.1,
    pos_height_center[0].y,
    pos_height_center[0].z
  );

  AddDimmension(
    pos_height_center[0],
    pos_height_0,
    pos_height_1,
    "8" + "'",
    pos_height_textPosition,
    "y",
    0.01,
    0xf41818,
    lookAtCamera
  );
  createDimensionBorderLine(pos_height_0, 0.25, 0.01, "y", 0xf41818);
  createDimensionBorderLine(pos_height_1, 0.25, 0.01, "y", 0xf41818);
  createDimensionText(
    pergolaSettings.height.toString() + "'",
    pos_height_textPosition,
    0xf41818,
    lookAtCamera,
    textSize
  );
}

// eslint-disable-next-line no-unused-vars
function AddDimmension(
  position,
  start,
  end,
  text,
  textPosition = null,
  side = "x",
  thickness = 0.01,
  color = 0xf41818,
  lookAtCamera = null
) {
  const line = createDimensionLine(
    position,
    start,
    end,
    thickness,
    side,
    color
  );
  scene.add(line);
  dimmensionObjects.push(line);
}

function getDistance(point1, point2) {
  return point1.distanceTo(point2);
}

function createDimensionLine(
  position,
  start,
  end,
  thickness = 0.01,
  side = "x",
  color = 0xf41818
) {
  //const material = new THREE.LineBasicMaterial({ color: color });
  var length = getDistance(start, end);

  var x_value = side != "x" ? thickness : length;
  var y_value = side != "y" ? thickness : length;
  var z_value = side != "z" ? thickness : length;

  const material = new THREE.MeshBasicMaterial({ color: color });
  const geometry = new THREE.BoxGeometry(x_value, y_value, z_value);
  const lineMesh = new THREE.Mesh(geometry, material);
  lineMesh.position.set(position.x, position.y, position.z);

  return lineMesh;
}

function createDimensionBorderLine(
  position,
  length,
  thickness = 0.01,
  side = "x",
  color = 0xf41818
) {
  var x_value = side != "y" ? thickness : length;
  var y_value = side != "x" ? thickness : length;
  var z_value = side != "z" ? thickness : length;

  switch (side) {
    case "x":
      x_value = thickness;
      y_value = length;
      z_value = thickness;
      break;
    case "y":
      x_value = length;
      y_value = thickness;
      z_value = thickness;
      break;
    case "z":
      x_value = thickness;
      y_value = length;
      z_value = thickness;
      break;

    default:
      break;
  }

  const material = new THREE.MeshBasicMaterial({ color: color });
  const geometry = new THREE.BoxGeometry(x_value, y_value, z_value);
  const lineBorderMesh = new THREE.Mesh(geometry, material);
  lineBorderMesh.position.set(position.x, position.y, position.z);

  scene.add(lineBorderMesh);
  dimmensionObjects.push(lineBorderMesh);
  return lineBorderMesh;
}

function createDimensionText(
  text,
  position,
  color = 0xf41818,
  lookAtCamera = null,
  textSize = 0.2
) {
  if (threejs_font_helvetiker_regular == null) {
    return;
  }

  const textGeometry = new TextGeometry(text, {
    font: threejs_font_helvetiker_regular,
    size: textSize, // Ð Ð¾Ð·Ð¼Ñ–Ñ€ Ñ‚ÐµÐºÑÑ‚Ñƒ
    depth: 0.01, // Ð“Ð»Ð¸Ð±Ð¸Ð½Ð° Ñ‚ÐµÐºÑÑ‚Ñƒ
  });
  const textMaterial = new THREE.MeshBasicMaterial({ color: color });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.set(position.x, position.y, position.z);
  if (lookAtCamera != null) {
    textMesh.lookAt(lookAtCamera.position);
  }

  scene.add(textMesh);
  dimmensionObjects.push(textMesh);

  return textMesh;
}

//#endregion

//#region CAPTURE CAMERA IMAGE

var share_RenderImageSize = {
  x: 650,
  y: 350,
};

var share_RenderImages = [];
var imageSources = [];

async function createImageList() {
  if (canvas == null) {
    return;
  }

  const fov = 50;
  let width = pergolaSettings.width * 0.0254;
  let depth = pergolaSettings.depth * 0.0254;
  const sizeValue = width > depth ? width : depth;

  const koefDist = interpolateValue(
    sizeValue,
    94 * 0.0254,
    504 * 0.0254,
    1.6,
    0.6
  );
  const deltaY = interpolateValue(pergolaSettings.height, 60, 144, 0, 1);
  const dist = sizeValue * koefDist;

  const cameraImageViews_Global = [
    {
      id: "view_1.png",
      alt: "view 1",
      cameraObject: new THREE.PerspectiveCamera(
        fov,
        canvas.width / canvas.height,
        0.01,
        500
      ),
      position: new THREE.Vector3(dist, deltaY, dist),
    },
  ];

  share_RenderImages = [];

  if (pergola != null) {
    if (pergolaSettings.mountingWall_Back) {
      pergola.changeMountingWallVisibility(false, pergolaConst.side.Back);
    }

    if (pergolaSettings.mountingWall_Left) {
      pergola.changeMountingWallVisibility(false, pergolaConst.side.Left);
    }

    if (pergolaSettings.mountingWall_Right) {
      pergola.changeMountingWallVisibility(false, pergolaConst.side.Right);
    }
  }

  for (let index = 0; index < cameraImageViews_Global.length; index++) {
    const element = cameraImageViews_Global[index];
    element.cameraObject.visible = true;
    element.cameraObject.aspect = camera.aspect;
    element.cameraObject.updateProjectionMatrix();
    element.cameraObject.position.set(
      element.position.x,
      element.position.y,
      element.position.z
    );
    element.cameraObject.lookAt(new THREE.Vector3(0, 0, 0));
    // changeDimmensionRender(true, element, index);
    TakeImage(element, "ar_pop_share_image");
    await new Promise((resolve) => setTimeout(resolve, 1));
    // changeDimmensionRender(false);
  }

  // jQuery("#js-summary-image-preview-1").find('img').attr("src", share_RenderImages[0].src);

  if (pergola != null) {
    if (pergolaSettings.mountingWall_Back) {
      pergola.changeMountingWallVisibility(
        pergolaSettings.mountingWall_Back,
        pergolaConst.side.Back
      );
    }

    if (pergolaSettings.mountingWall_Left) {
      pergola.changeMountingWallVisibility(
        pergolaSettings.mountingWall_Left,
        pergolaConst.side.Left
      );
    }

    if (pergolaSettings.mountingWall_Right) {
      pergola.changeMountingWallVisibility(
        pergolaSettings.mountingWall_Right,
        pergolaConst.side.Right
      );
    }
  }
}

function TakeImage(view, img_class) {
  var img_div = document.createElement("div");
  img_div.classList.add(img_class);
  var img = CreateImage(view);
  img_div.appendChild(img);
}

function CreateImage(view) {
  var img = new Image();

  renderer.setSize(share_RenderImageSize.x, share_RenderImageSize.y, false);
  view.cameraObject.aspect = share_RenderImageSize.x / share_RenderImageSize.y;
  view.cameraObject.updateProjectionMatrix();
  renderer.render(scene, view.cameraObject);

  img.src = renderer.domElement.toDataURL();
  img.alt = view.alt;

  imageSources.push(img.src);
  share_RenderImages.push(img);

  view.cameraObject.visible = false;
  updateRenderSize();
  return img;
}

function updateRenderSize() {
  if (renderer == null) {
    return;
  }

  const canvasContainer = document.getElementById("ar_model_viewer");
  const rect = canvasContainer.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  controls.update();

  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}

// eslint-disable-next-line no-unused-vars
function DownloadRenderImage(src, alt) {
  if (src == null) {
    return;
  }
  if (alt == 0) {
    return;
  }

  var a = document.createElement("a");
  a.href = src;
  a.download = alt;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

//#endregion
