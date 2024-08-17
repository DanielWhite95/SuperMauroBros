"use strict";
////	GLOBAL ASSETS  ///
////____________________________________________
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
var globals_1 = require("./globals");
var Canvas_1 = require("./Canvas");
var Mesh_1 = require("./Mesh");
var Input_1 = require("./Input");
var Texture_1 = require("./Texture");
var Materials_1 = require("./Materials");
var Lights_1 = require("./Lights");
var Camera_1 = require("./Camera");
var Player_1 = require("./Player");
var Animator_1 = require("./Animator");
var Object3D_1 = require("./Object3D/Object3D");
var Lava3D_1 = require("./Object3D/Lava3D");
var GravityTrigger3D_1 = require("./Object3D/GravityTrigger3D");
var Key3D_1 = require("./Object3D/Key3D");
var AutomaticBridge3D_1 = require("./Object3D/AutomaticBridge3D");
var Lantern3D_1 = require("./Object3D/Lantern3D");
var Door3D_1 = require("./Object3D/Door3D");
var TriggerBox3D_1 = require("./Object3D/TriggerBox3D");
var Ghost3D_1 = require("./Object3D/Ghost3D");
var Tree3D_1 = require("./Object3D/Tree3D");
var Castle3D_1 = require("./Object3D/Castle3D");
var DestroyableObject3D_1 = require("./Object3D/DestroyableObject3D");
var MobileObject3D_1 = require("./Object3D/MobileObject3D");
var InterfaceOverlay_1 = require("./InterfaceOverlay");
var Scene = /** @class */ (function () {
    function Scene() {
    }
    Scene.loadMeshes = function () {
        Scene.unitCubeMesh = Mesh_1.Mesh.loadFromOBJFile("u_cube.obj");
        Scene.unitCubeTexMesh = Mesh_1.Mesh.loadFromOBJFile("u_cube_leather.obj");
        Scene.gearMesh = Mesh_1.Mesh.loadFromOBJFile("gear.obj");
        Scene.castleTowerMesh = Mesh_1.Mesh.loadFromOBJFile("castle_tower.obj");
        Scene.castleWallMesh = Mesh_1.Mesh.loadFromOBJFile("castle_wall.obj");
        Scene.woodBox = Mesh_1.Mesh.loadFromOBJFile("wood_box.obj");
        Scene.rock0Mesh = Mesh_1.Mesh.loadFromOBJFile("rock0.obj");
        Scene.rock1Mesh = Mesh_1.Mesh.loadFromOBJFile("rock1.obj");
        Scene.stone0Mesh = Mesh_1.Mesh.loadFromOBJFile("stone0.obj");
        Scene.house0Mesh = Mesh_1.Mesh.loadFromOBJFile("house0.obj", "house0_bBoxes.obj");
        Scene.house1Mesh = Mesh_1.Mesh.loadFromOBJFile("house1.obj", "house1_bBoxes.obj");
        Scene.tree0TrunkMesh = Mesh_1.Mesh.loadFromOBJFile("tree0_trunk.obj");
        Scene.tree0LeafsMesh = Mesh_1.Mesh.loadFromOBJFile("tree0_leafs.obj");
        Scene.doorMesh = Mesh_1.Mesh.loadFromOBJFile("wooden_door.obj");
        Scene.castleExteriorMesh = Mesh_1.Mesh.loadFromOBJFile("castle_exterior.obj", "castle_exterior_bBoxes.obj");
        Scene.castleInteriorMesh = Mesh_1.Mesh.loadFromOBJFile("castle_interior.obj", "castle_interior_bBoxes.obj");
        Scene.castleTowersMesh = Mesh_1.Mesh.loadFromOBJFile("castle_towers_doors.obj", "castle_towers_doors_bBoxes.obj");
        Scene.castleDoorRMesh = Mesh_1.Mesh.loadFromOBJFile("castle_doorR.obj");
        Scene.castleDoorLMesh = Mesh_1.Mesh.loadFromOBJFile("castle_doorL.obj");
        Scene.castleDungeonWallsMesh = Mesh_1.Mesh.loadFromOBJFile("castle_dungeon_walls.obj", "castle_dungeon_bBoxes.obj");
        Scene.castleFloorMesh = Mesh_1.Mesh.loadFromOBJFile("castle_floor.obj");
        Scene.floorMesh = Mesh_1.Mesh.loadFromOBJFile("floor.obj");
        Scene.skyboxMesh = Mesh_1.Mesh.loadFromOBJFile("skybox.obj");
        Scene.ghostMesh = Mesh_1.Mesh.loadFromOBJFile("ghost.obj");
        Scene.ghostTongueMesh = Mesh_1.Mesh.loadFromOBJFile("ghost_tongue.obj");
        Scene.bombMesh = Mesh_1.Mesh.loadFromOBJFile("bomb.obj");
        Scene.keyHoleMesh = Mesh_1.Mesh.loadFromOBJFile("keyhole.obj");
        Scene.keyMesh = Mesh_1.Mesh.loadFromOBJFile("key.obj");
        Scene.lavaMesh = Mesh_1.Mesh.loadFromOBJFile("lava.obj");
        Scene.lanternMesh = Mesh_1.Mesh.loadFromOBJFile("lantern.obj");
        Scene.lanternInteriorMesh = Mesh_1.Mesh.loadFromOBJFile("lantern_interior.obj");
        Scene.windmillBaseMesh = Mesh_1.Mesh.loadFromOBJFile("windmill_base.obj");
        Scene.windmillWheelMesh = Mesh_1.Mesh.loadFromOBJFile("windmill_wheel.obj");
        Scene.flashlightMesh = Mesh_1.Mesh.loadFromOBJFile("flashlight.obj");
        Scene.treasureMesh = Mesh_1.Mesh.loadFromOBJFile("treasure_chest.obj");
    };
    Scene.loadMaterials = function () {
        Scene.materials.push((Scene.greenSpecMaterial = new Materials_1.SpecularMaterial(0.0, 255, 10, 255)));
        Scene.materials.push((Scene.greenMaterial = new Materials_1.DiffuseMaterial(0.0, 255, 10, 255)));
        Scene.materials.push((Scene.redMaterial = new Materials_1.DiffuseMaterial(255, 50, 50, 255)));
        Scene.materials.push((Scene.lavaMaterial = new Materials_1.SimpleMaterial(255, 0, 0, 255)));
        Scene.materials.push((Scene.brownMaterial = new Materials_1.DiffuseMaterial(255, 200, 50, 255)));
        Scene.materials.push((Scene.yellowMaterial = new Materials_1.DiffuseMaterial(255, 255, 0, 255)));
        Scene.materials.push((Scene.textureMaterial = new Texture_1.TextureMaterial("crate.png")));
        Scene.materials.push((Scene.castleInteriorTex = new Texture_1.TextureDiffuse("castle_interior.jpg")));
        Scene.materials.push((Scene.castleExteriorTex = new Texture_1.TextureDiffuse("castle_exterior.jpg")));
        Scene.materials.push((Scene.castleDoorsTex = new Texture_1.TextureDiffuse("castle_towers_doors.jpg")));
        Scene.materials.push((Scene.castleDungeonWallsTex = new Texture_1.TextureDiffuse("bricks1.jpg")));
        Scene.materials.push((Scene.terrain0Tex = new Texture_1.TextureDiffuse("terrain0.jpg")));
        Scene.materials.push((Scene.terrain1Tex = new Texture_1.TextureDiffuse("terrain1.jpg")));
        Scene.materials.push((Scene.house0Tex = new Texture_1.TextureDiffuse("house0.jpg")));
        Scene.materials.push((Scene.house1Tex = new Texture_1.TextureDiffuse("house1.png")));
        Scene.materials.push((Scene.rocksTex = new Texture_1.TextureDiffuse("rocks.jpg")));
        Scene.materials.push((Scene.rock1Tex = new Texture_1.TextureDiffuse("rock1.jpg")));
        Scene.materials.push((Scene.stone0Tex = new Texture_1.TextureDiffuse("stone0.jpg")));
        Scene.materials.push((Scene.tree0LeafsTex = new Texture_1.TextureDiffuse("tree0_leafs.png")));
        Scene.materials.push((Scene.tree0TrunkTex = new Texture_1.TextureDiffuse("tree0_trunk.jpg")));
        Scene.materials.push((Scene.skyboxTex = new Texture_1.TextureMaterial("skybox.jpg")));
        Scene.materials.push((Scene.woodenDoorTex = new Texture_1.TextureDiffuse("wooden_door.png")));
        Scene.materials.push((Scene.woodenCrateTex = new Texture_1.TextureDiffuse("wood_crate.png")));
        Scene.materials.push((Scene.ghostMaterial = new Texture_1.TextureDiffuse("ghost.png")));
        Scene.materials.push((Scene.ghostDamagedMaterial = new Texture_1.TextureDiffuse("ghost_damaged.png")));
        Scene.materials.push((Scene.ghostTongueMaterial = new Materials_1.DiffuseMaterial(200, 0, 0, 140)));
        Scene.materials.push((Scene.keyMaterial = new Materials_1.SpecularMaterial(200, 200, 0, 255)));
        Scene.materials.push((Scene.lavaMaterial = new Texture_1.LiquidTexture("lava.png")));
        Scene.materials.push((Scene.lanternTex = new Texture_1.TextureDiffuse("lantern_violet.jpg")));
        Scene.materials.push((Scene.windmillTex = new Texture_1.TextureDiffuse("windmill.jpg")));
        Scene.materials.push((Scene.flashlightTex = new Texture_1.TextureDiffuse("flashlight.jpg")));
        Scene.materials.push((Scene.treasureMaterial = new Materials_1.SpecularMaterial(255, 255, 0, 255)));
        Scene.treasureMaterial.setSpecularShine(50);
        for (var i = 0; i < Scene.materials.length; i++) {
            Scene.materials[i].setMaterialAmbient(10, 10, 10, 255);
            Scene.materials[i].setAmbientLowColor(150, 10, 10, 255);
            Scene.materials[i].setAmbientHighColor(0, 0, 77, 255);
            Scene.materials[i].setAmbientDirection(0, 1, 0);
        }
        Scene.lavaMaterial.setAmbientLowColor(200, 0, 0, 255);
    };
    //add at the end
    Scene.addObject3D = function (object) {
        Scene.objects.push(object);
    };
    //add at the beginning
    Scene.addObject3D_ = function (object) {
        Scene.objects.unshift(object);
    };
    Scene.removeObject3D = function (object) {
        //remove from scene
        for (var i = 0; i < Scene.objects.length; i++)
            if (Scene.objects[i] == object)
                Scene.objects.splice(i, 1);
        //remove from collision group
        for (var i = 0; i < Scene.rocksCratesCollGroup.length; i++)
            if (Scene.rocksCratesCollGroup[i] == object)
                Scene.rocksCratesCollGroup.splice(i, 1);
    };
    Scene.clearLanterns = function () {
        for (var i = 0; i < Scene.lanterns.length; i++) {
            Scene.lanterns[i].removeFromScene();
        }
        Scene.lanterns = [];
    };
    Scene.switchLights_Extern = function () {
        //delete old lights
        Scene.lights.splice(0, Scene.lights.length);
        Scene.lights.push(new Lights_1.SpotLight("LA", 0, 20, 30, 0, -0.05, 1, 50, 0.8)); //player flashlight
        Scene.lights.push(new Lights_1.PointLight("LB", 0, 10, 200, 30, 0.8)); //castle lantern light
        Scene.lights.push(new Lights_1.PointLight("LC", 0, 10, 350, 30, 1.5)); //yellow light
        Scene.lights.push(new Lights_1.PointLight("LD", 0, 10, 350, 30, 1.5)); //blue lantern light
        Scene.lights[0].setCone(20, 50);
        Scene.lights[0].setColor(255, 255, 255);
        Scene.lights[1].setColor(0, 255, 0);
        Scene.lights[2].setColor(255, 255, 0);
        Scene.lights[3].setColor(0, 100, 255);
        Scene.lanterns[0].linkLight(Scene.lights[1]);
        Scene.lanterns[1].linkLight(Scene.lights[3]);
        Scene.lanterns[2].linkLight(Scene.lights[2]);
        Scene.lanterns[3].linkLight(null);
        Lights_1.Light.moveAllLights(globals_1.Globals.viewMatrix);
        Scene.lava.material.setWaveHeight(10);
        Scene.lava.setPosition(0, -10, 0);
    };
    Scene.switchLights_Dungeon = function () {
        //delete old lights
        Scene.lights.splice(0, Scene.lights.length);
        Scene.lights.push(new Lights_1.SpotLight("LA", 0, 20, 30, 0, 0.05, 1, 50, 0.8));
        Scene.lights.push(new Lights_1.PointLight("LB", -115, -8, -61, 20, 5));
        Scene.lights.push(new Lights_1.PointLight("LC", -1, 6, -180, 30, 0.8)); // lava light
        Scene.lights[0].setCone(20, 50);
        Scene.lights[0].setColor(255, 255, 255);
        Scene.lights[1].setColor(100, -1, 255);
        Scene.lights[2].setColor(255, 0, 0);
        Lights_1.Light.moveAllLights(globals_1.Globals.viewMatrix);
        Scene.lanterns[0].linkLight(null);
        Scene.lanterns[1].linkLight(null);
        Scene.lanterns[2].linkLight(null);
        Scene.lanterns[3].linkLight(Scene.lights[1]);
        Scene.lava.material.setWaveHeight(6);
        Scene.lava.setPosition(0, -16, 0);
    };
    Scene.clearObjects = function () {
        for (var i = 0; i < Scene.objects.length; i++)
            Scene.objects[i] = null;
        Scene.objects = [];
        //clear collision group
        for (var i = 0; i < Scene.rocksCratesCollGroup.length; i++)
            Scene.rocksCratesCollGroup[i] = null;
        Scene.rocksCratesCollGroup = [];
    };
    Scene.createObjects = function () {
        ////		CREATE OBJECTS 3D
        ////__________________________________
        //player
        Scene.player = new Player_1.Player(Scene.unitCubeTexMesh, Scene.textureMaterial, Scene.rock1Mesh, Scene.rock1Tex);
        Scene.player.setPosition(25, 30, 360);
        //player.setPosition(-1, 5, 0);
        Scene.player.setRotation(0, -90, 0);
        Scene.player.hasKey = false;
        Scene.player.enableCollisionWith(Scene.objects);
        Scene.player.addToScene();
        //lava
        Scene.lava = new Lava3D_1.Lava3D(Scene.lavaMesh, Scene.lavaMaterial);
        Scene.lava.setPosition(0, -10, 0);
        Scene.lava.setScale(3, 2, 3);
        Scene.rocksCratesCollGroup.push(Scene.lava);
        Scene.lava.addToScene();
        //trigger for falling rocks/boxes
        var trigg = new GravityTrigger3D_1.GravityTrigger3D(35, 35, 35);
        trigg.setPosition(0, 10, 40);
        trigg.addToScene();
        //rocks with gravity
        var tmpObj = new Object3D_1.Object3D(Scene.stone0Mesh, Scene.stone0Tex);
        tmpObj.setPosition(-38, 150, 0);
        tmpObj.setScale(0.3, 0.35, 0.4);
        tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
        tmpObj.addToScene();
        trigg.registerObject3D(tmpObj);
        Scene.rocksCratesCollGroup.push(tmpObj);
        tmpObj = new Object3D_1.Object3D(Scene.stone0Mesh, Scene.stone0Tex);
        tmpObj.setPosition(-45, 150, 35);
        tmpObj.setScale(0.2, 0.2, 0.3);
        tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
        tmpObj.addToScene();
        trigg.registerObject3D(tmpObj);
        Scene.rocksCratesCollGroup.push(tmpObj);
        //destroyable wood boxes
        tmpObj = new DestroyableObject3D_1.DestroyableObject3D(Scene.woodBox, Scene.woodenCrateTex, Scene.redMaterial);
        tmpObj.setPosition(-25, 50, 40);
        tmpObj.setScale(2, 2, 2);
        tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
        tmpObj.addToScene();
        trigg.registerObject3D(tmpObj);
        Scene.rocksCratesCollGroup.push(tmpObj);
        tmpObj = new DestroyableObject3D_1.DestroyableObject3D(Scene.woodBox, Scene.woodenCrateTex, Scene.redMaterial);
        tmpObj.setPosition(-23, 80, 40);
        tmpObj.setScale(2, 3, 2);
        tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
        tmpObj.addToScene();
        trigg.registerObject3D(tmpObj);
        Scene.rocksCratesCollGroup.push(tmpObj);
        tmpObj = new DestroyableObject3D_1.DestroyableObject3D(Scene.woodBox, Scene.woodenCrateTex, Scene.redMaterial);
        tmpObj.setPosition(-38, 105, 0);
        tmpObj.setScale(3, 3, 3);
        tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
        tmpObj.addToScene();
        trigg.registerObject3D(tmpObj);
        Scene.rocksCratesCollGroup.push(tmpObj);
        tmpObj = new DestroyableObject3D_1.DestroyableObject3D(Scene.woodBox, Scene.woodenCrateTex, Scene.redMaterial);
        tmpObj.setPosition(-45, 100, 35);
        tmpObj.setScale(4, 3, 5);
        tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
        tmpObj.addToScene();
        trigg.registerObject3D(tmpObj);
        Scene.rocksCratesCollGroup.push(tmpObj);
        //second trigger for falling rocks/boxes
        var trigg = new GravityTrigger3D_1.GravityTrigger3D(15, 15, 15);
        trigg.setPosition(-70, 35, -15);
        trigg.addToScene();
        tmpObj = new DestroyableObject3D_1.DestroyableObject3D(Scene.woodBox, Scene.woodenCrateTex, Scene.redMaterial);
        tmpObj.setPosition(-75, 100, -60);
        tmpObj.setScale(2, 2, 2);
        tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
        tmpObj.addToScene();
        trigg.registerObject3D(tmpObj);
        Scene.rocksCratesCollGroup.push(tmpObj);
        tmpObj = new Object3D_1.Object3D(Scene.stone0Mesh, Scene.stone0Tex);
        tmpObj.setPosition(-75, 150, -60);
        tmpObj.setScale(0.2, 0.2, 0.3);
        tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
        tmpObj.addToScene();
        trigg.registerObject3D(tmpObj);
        Scene.rocksCratesCollGroup.push(tmpObj);
        //destroyable door (castle top)
        tmpObj = new DestroyableObject3D_1.DestroyableObject3D(Scene.doorMesh, Scene.woodenDoorTex, Scene.redMaterial);
        tmpObj.setPosition(-0.9, 49, -43);
        tmpObj.setScale(2.5, 1.5, 2);
        tmpObj.addToScene();
        //mobile wood boxes in dungeon
        tmpObj = new MobileObject3D_1.MobileObject3D(Scene.woodBox, Scene.woodenCrateTex);
        tmpObj.setPosition(-1, -2.5, -183);
        tmpObj.setScale(3, 4, 3);
        tmpObj.enablePhysics(true);
        tmpObj.enableGravity(true);
        tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
        tmpObj.addToScene();
        //end treasure
        var treasure = new Object3D_1.Object3D(Scene.treasureMesh, Scene.treasureMaterial);
        treasure.setPosition(-1, 25, -170);
        treasure.setScale(1, 1, 1);
        treasure.addToScene();
        treasure.preUpdate = function () {
            treasure.rotate(0, 1, 0);
        };
        //castle
        tmpObj = new Castle3D_1.Castle3D(Scene.castleExteriorMesh, Scene.castleExteriorTex, Scene.castleInteriorMesh, Scene.castleInteriorTex, Scene.castleTowersMesh, Scene.castleDoorsTex, Scene.castleDoorRMesh, Scene.castleDoorLMesh, Scene.keyHoleMesh, Scene.keyMesh, Scene.keyMaterial, Scene.castleFloorMesh, Scene.terrain1Tex, Scene.floorMesh, Scene.terrain0Tex, Scene.castleDungeonWallsMesh, Scene.castleDungeonWallsTex);
        tmpObj.setPosition(0, 0, 8);
        tmpObj.setScale(3, 3, 3);
        tmpObj.addToScene();
        //adds castle floor, exterior and dungeon, to rock/boxes collisions group
        Scene.rocksCratesCollGroup.push(tmpObj.objects[3]);
        Scene.rocksCratesCollGroup.push(tmpObj.objects[0]);
        Scene.rocksCratesCollGroup.push(tmpObj.objects[5]);
        //key
        tmpObj = new Key3D_1.Key3D(Scene.keyMesh, Scene.keyMaterial);
        tmpObj.setPosition(-0.9, 50, -59);
        tmpObj.setScale(15, 15, 15);
        tmpObj.addToScene();
        //bridge with rocks
        tmpObj = new AutomaticBridge3D_1.AutomaticBridge3D(40, 100, 40, Scene.rock0Mesh, Scene.rocksTex);
        tmpObj.setPosition(0, -15, 140);
        tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
        tmpObj.addToScene();
        tmpObj = new AutomaticBridge3D_1.AutomaticBridge3D(40, 100, 40, Scene.rock0Mesh, Scene.rocksTex);
        tmpObj.setPosition(10, -10, 130);
        tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
        tmpObj.addToScene();
        tmpObj = new AutomaticBridge3D_1.AutomaticBridge3D(40, 100, 40, Scene.rock0Mesh, Scene.rocksTex);
        tmpObj.setPosition(4, -4, 115);
        tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
        tmpObj.addToScene();
        tmpObj = new AutomaticBridge3D_1.AutomaticBridge3D(40, 100, 40, Scene.rock0Mesh, Scene.rocksTex);
        tmpObj.setPosition(-8, -9, 108);
        tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
        tmpObj.addToScene();
        //houses
        tmpObj = new Object3D_1.Object3D(Scene.house0Mesh, Scene.house0Tex);
        tmpObj.setPosition(40, 0, 200);
        tmpObj.setScale(0.5, 0.5, 0.5);
        tmpObj.addToScene();
        tmpObj = new Object3D_1.Object3D(Scene.house1Mesh, Scene.house1Tex);
        tmpObj.setPosition(-30, 0, 350);
        tmpObj.setScale(0.25, 0.25, 0.25);
        tmpObj.addToScene();
        //windmill
        var base = new Object3D_1.Object3D(Scene.windmillBaseMesh, Scene.windmillTex);
        base.setPosition(-40, 0, 250);
        base.setScale(0.25, 0.25, 0.25);
        base.setRotation(0, -90, 0);
        base.addToScene();
        var wheel = new Object3D_1.Object3D(Scene.windmillWheelMesh, Scene.windmillTex);
        wheel.setPosition(0.3, 174.1, 53.4);
        //wheel.setScale(0.25, 0.25, 0.25);
        wheel.setParent(base);
        wheel.addToScene();
        wheel.preUpdate = function () {
            wheel.rotate(0, 0, 1);
        };
        //ghost spawner
        tmpObj = new Ghost3D_1.GhostSpawner3D();
        tmpObj.addToScene();
        //trees
        tmpObj = new Tree3D_1.Tree3D(Scene.tree0TrunkMesh, Scene.tree0TrunkTex, Scene.tree0LeafsMesh, Scene.tree0LeafsTex);
        tmpObj.setPosition(40, 0, 240);
        tmpObj.setScale(8, 8, 8);
        tmpObj.addToScene();
        tmpObj = new Tree3D_1.Tree3D(Scene.tree0TrunkMesh, Scene.tree0TrunkTex, Scene.tree0LeafsMesh, Scene.tree0LeafsTex);
        tmpObj.setPosition(-10, 0, 200);
        tmpObj.setScale(7, 10, 4);
        tmpObj.addToScene();
        tmpObj = new Tree3D_1.Tree3D(Scene.tree0TrunkMesh, Scene.tree0TrunkTex, Scene.tree0LeafsMesh, Scene.tree0LeafsTex);
        tmpObj.setPosition(5, 0, 300);
        tmpObj.setScale(10, 9, 10);
        tmpObj.addToScene();
        tmpObj = new Tree3D_1.Tree3D(Scene.tree0TrunkMesh, Scene.tree0TrunkTex, Scene.tree0LeafsMesh, Scene.tree0LeafsTex);
        tmpObj.setPosition(-30, 0, 210);
        tmpObj.setScale(5, 5, 5);
        tmpObj.addToScene();
        tmpObj = new Tree3D_1.Tree3D(Scene.tree0TrunkMesh, Scene.tree0TrunkTex, Scene.tree0LeafsMesh, Scene.tree0LeafsTex);
        tmpObj.setPosition(25, 0, 250);
        tmpObj.setScale(3, 4, 5);
        tmpObj.addToScene();
        tmpObj = new Tree3D_1.Tree3D(Scene.tree0TrunkMesh, Scene.tree0TrunkTex, Scene.tree0LeafsMesh, Scene.tree0LeafsTex);
        tmpObj.setPosition(-50, 0, 200);
        tmpObj.setScale(5, 5, 5);
        tmpObj.addToScene();
        tmpObj = new Tree3D_1.Tree3D(Scene.tree0TrunkMesh, Scene.tree0TrunkTex, Scene.tree0LeafsMesh, Scene.tree0LeafsTex);
        tmpObj.setPosition(50, 0, 280);
        tmpObj.setScale(5, 5, 5);
        tmpObj.addToScene();
        //trigger to switch lights
        var dungeonLightsTrigg = new TriggerBox3D_1.TriggerBox3D(10, 20, 10);
        dungeonLightsTrigg.setPosition(0, -5, -40);
        dungeonLightsTrigg.oneShot = true;
        dungeonLightsTrigg.onTrigger = function (inst) {
            Scene.switchLights_Dungeon();
            Castle3D_1.doorToDungeonL.close();
            Castle3D_1.doorToDungeonR.close();
        };
        dungeonLightsTrigg.addToScene();
        //dungeon doors
        tmpObj = new Door3D_1.Door3D(Scene.doorMesh, Scene.woodenDoorTex, true, false);
        tmpObj.setPosition(-135, -13, -57);
        tmpObj.setRotation(0, 90, 0);
        tmpObj.objects[0].setScale(1.8, 1.5, 1);
        tmpObj.addToScene();
        tmpObj = new Door3D_1.Door3D(Scene.doorMesh, Scene.woodenDoorTex, true, false);
        tmpObj.setPosition(-129, -13, -91);
        tmpObj.setRotation(0, 90, 0);
        tmpObj.objects[0].setScale(1.6, 1.5, 1);
        tmpObj.addToScene();
        tmpObj = new Door3D_1.DoorKey3D(Scene.doorMesh, Scene.woodenDoorTex, Scene.keyHoleMesh, Scene.keyMesh, Scene.keyMaterial, null, false);
        tmpObj.setPosition(0.85, -12, -75);
        tmpObj.objects[0].setScale(1.6, 1.55, 1);
        tmpObj.addToScene();
        var endGameTrigger = new TriggerBox3D_1.TriggerBox3D(5, 5, 5);
        endGameTrigger.setPosition(-1, 25, -170);
        endGameTrigger.oneShot = true;
        endGameTrigger.onTrigger = function (inst) {
            Scene.switchLights_Extern();
            var dungeonLightsTrigg = new TriggerBox3D_1.TriggerBox3D(10, 20, 10);
            dungeonLightsTrigg.setPosition(0, -5, -40);
            dungeonLightsTrigg.oneShot = true;
            dungeonLightsTrigg.onTrigger = function (inst) {
                Scene.switchLights_Dungeon();
                Castle3D_1.doorToDungeonL.close();
                Castle3D_1.doorToDungeonR.close();
            };
            dungeonLightsTrigg.addToScene();
            Scene.endCredits = true;
        };
        endGameTrigger.addToScene();
        //second key
        tmpObj = new Key3D_1.Key3D(Scene.keyMesh, Scene.keyMaterial);
        tmpObj.setPosition(-109, -5, -94);
        tmpObj.setScale(15, 15, 15);
        tmpObj.addToScene();
        //second bridge with rocks
        tmpObj = new AutomaticBridge3D_1.AutomaticBridge3D(40, 100, 40, Scene.rock0Mesh, Scene.rocksTex);
        tmpObj.setPosition(0, -15, -245);
        tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
        tmpObj.addToScene();
        tmpObj = new AutomaticBridge3D_1.AutomaticBridge3D(40, 100, 40, Scene.rock0Mesh, Scene.rocksTex);
        tmpObj.setPosition(-10, -10, -265);
        tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
        tmpObj.addToScene();
        tmpObj = new AutomaticBridge3D_1.AutomaticBridge3D(40, 100, 40, Scene.rock0Mesh, Scene.rocksTex);
        tmpObj.setPosition(-25, -5, -262);
        tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
        tmpObj.addToScene();
        tmpObj = new AutomaticBridge3D_1.AutomaticBridge3D(40, 100, 40, Scene.rock0Mesh, Scene.rocksTex);
        tmpObj.setPosition(-45, -2, -261);
        tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
        tmpObj.addToScene();
        //skybox
        tmpObj = new Object3D_1.Object3D(Scene.skyboxMesh, Scene.skyboxTex);
        tmpObj.addToScene();
        tmpObj.setScale(350, 350, 450);
        tmpObj.boundingBoxes[0].setScaleCorrection(0, 0, 0);
        ///			CAMERA
        ///_______________________
        Scene.lookAtCamera = new Camera_1.LookAtCamera();
        Scene.lookAtCamera.setLookRadius(15.0);
        Scene.lookAtCamera.setElevation(35.0);
        Scene.lookAtCamera.setLookPoint(0, 0, 0);
        Scene.firstPersonCamera = new Camera_1.FirstPersonCamera();
        Scene.firstPersonCamera.setElevation(0.0);
        Scene.firstPersonCamera.setPosition(0, 0, 0);
        Scene.firstPersonCamera.look();
        Scene.currCamera = Scene.firstPersonCamera;
        //end credits animation
        Scene.camAnimator = new Animator_1.CameraAnimator(Scene.lookAtCamera);
        var cameraPath = new Animator_1.CameraBezierCurve();
        // Pass through windmill wheel
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(100, 0, 250, 0, 90, 0));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(50, 80, 300, 90, 0, 10));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(-100, 50, 200, 110, 0, 20));
        Scene.camAnimator.addAnimation(new Animator_1.Animation(cameraPath, 500));
        cameraPath = new Animator_1.CameraBezierCurve();
        // // look backward
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(-100, 50, 200, 110, 0, 20));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(-60, 40, 190, 180, 0, 20));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, 15, 150, 180, 0, 20));
        Scene.camAnimator.addAnimation(new Animator_1.Animation(cameraPath, 300));
        cameraPath = new Animator_1.CameraBezierCurve();
        // enter the castle
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, 15, 150, 180, 0, 20));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, 5, 80, 0, 0, 0));
        Scene.camAnimator.addAnimation(new Animator_1.Animation(cameraPath, 250));
        cameraPath = new Animator_1.CameraBezierCurve();
        // look into castle garden
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, 5, 80, 0, 0, 0));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, 5, 40, -90, 0, 0));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, 5, -10, 0, 0, 0));
        Scene.camAnimator.addAnimation(new Animator_1.Animation(cameraPath, 500));
        cameraPath = new Animator_1.CameraBezierCurve();
        // // enter the dungeon
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, 5, -10, 0, 0, 0));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, 6, -30, -10, 0, 0));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, -13, -50, -90, 0, 0));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, -10, -70, 0, 0, 0));
        Scene.camAnimator.addAnimation(new Animator_1.Animation(cameraPath, 500));
        //pass through the door
        cameraPath = new Animator_1.CameraBezierCurve();
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, -10, -70, 0, 0, 0));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, -5, -130, 0, 0, 0));
        Scene.camAnimator.addAnimation(new Animator_1.Animation(cameraPath, 200));
        // traverse the tunnel
        cameraPath = new Animator_1.CameraBezierCurve();
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, -5, -130, 0, 0, 0));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(-25, 7, -160, 120, 50, 0));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(-25, 15, -200, 150, 50, 0));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, 0, -250, 0, 0, 0));
        Scene.camAnimator.addAnimation(new Animator_1.Animation(cameraPath, 800));
        // exit the tunnel
        cameraPath = new Animator_1.CameraBezierCurve();
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, 0, -250, 0, 0, 0));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, 0, -300, -100, 0, 0));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, 50, -280, -180, 0, 0));
        Scene.camAnimator.addAnimation(new Animator_1.Animation(cameraPath, 500));
        // up to the sky
        cameraPath = new Animator_1.CameraBezierCurve();
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, 50, -280, -180, 0, 0));
        cameraPath.addPoint(new Animator_1.CameraKeyFrame(0, 150, -280, -180, 20, 10));
        Scene.camAnimator.addAnimation(new Animator_1.Animation(cameraPath, 500));
        Scene.camAnimator.play(true);
        //lanterns
        //castle lantern
        Scene.lanterns.push(new Lantern3D_1.Lantern3D(Scene.lanternMesh, Scene.lanternInteriorMesh, Scene.lanternTex, Scene.lights[1]));
        Scene.lanterns[0].setPosition(0, 12, 100);
        Scene.lanterns[0].animateColor = true;
        var lanternPath = new Animator_1.BezierCurve();
        lanternPath.addPoint(new Animator_1.KeyFrame(0, 0, 0));
        lanternPath.addPoint(new Animator_1.KeyFrame(60, 40, -20));
        lanternPath.addPoint(new Animator_1.KeyFrame(50, 30, -20));
        lanternPath.addPoint(new Animator_1.KeyFrame(0, 5, -100));
        Scene.lanterns[0].animator.addAnimation(new Animator_1.Animation(lanternPath, 400));
        lanternPath = new Animator_1.BezierCurve();
        lanternPath.addPoint(new Animator_1.KeyFrame(0, 5, -100));
        lanternPath.addPoint(new Animator_1.KeyFrame(-60, 30, -20));
        lanternPath.addPoint(new Animator_1.KeyFrame(-35, 40, -20));
        lanternPath.addPoint(new Animator_1.KeyFrame(0, 0, 0));
        Scene.lanterns[0].animator.addAnimation(new Animator_1.Animation(lanternPath, 400));
        Scene.lanterns[0].animator.play(false);
        Scene.lanterns[0].animator.instance = Scene.lanterns[0].animator;
        Scene.lanterns[0].animator.onStop = function (inst) {
            inst.play(false);
            inst.currTime = 0;
        };
        Scene.lanterns[0].addToScene();
        //blue lantern
        Scene.lanterns.push(new Lantern3D_1.Lantern3D(Scene.lanternMesh, Scene.lanternInteriorMesh, Scene.lanternTex, Scene.lights[3]));
        Scene.lanterns[1].setPosition(-20, 10, 250);
        lanternPath = new Animator_1.BezierCurve();
        lanternPath.addPoint(new Animator_1.KeyFrame(0, 0, -15));
        lanternPath.addPoint(new Animator_1.KeyFrame(+30, +20, 0));
        lanternPath.addPoint(new Animator_1.KeyFrame(0, 0, +15));
        Scene.lanterns[1].animator.addAnimation(new Animator_1.Animation(lanternPath, 300));
        Scene.lanterns[1].animator.play(true);
        Scene.lanterns[1].addToScene();
        Scene.lanterns.push(new Lantern3D_1.Lantern3D(Scene.lanternMesh, Scene.lanternInteriorMesh, Scene.lanternTex, Scene.lights[2]));
        lanternPath = new Animator_1.BezierCurve();
        Scene.lanterns[2].setPosition(-20, 10, 320);
        lanternPath.addPoint(new Animator_1.KeyFrame(0, -3, 0));
        lanternPath.addPoint(new Animator_1.KeyFrame(0, +3, 0));
        Scene.lanterns[2].animator.addAnimation(new Animator_1.Animation(lanternPath, 100));
        Scene.lanterns[2].animator.play(true);
        Scene.lanterns[2].addToScene();
        Scene.lanterns.push(new Lantern3D_1.Lantern3D(Scene.lanternMesh, Scene.lanternInteriorMesh, Scene.lanternTex));
        Scene.lanterns[3].setPosition(-10, -5, -30);
        lanternPath = new Animator_1.BezierCurve();
        lanternPath.addPoint(new Animator_1.KeyFrame(-10, -1, -30));
        lanternPath.addPoint(new Animator_1.KeyFrame(-80, -1, -30));
        Scene.lanterns[3].animator.addAnimation(new Animator_1.Animation(lanternPath, 300));
        Scene.lanterns[3].animator.play(true);
        Scene.lanterns[3].addToScene();
        //lights
        Scene.switchLights_Extern();
    };
    Scene.start = function () {
        //LOAD ASSETS
        Scene.loadMeshes();
        Scene.loadMaterials();
        InterfaceOverlay_1.InterfaceOverlay.init();
        //CREATE SCENE
        Scene.createObjects();
        window.requestAnimationFrame(Scene.waitsForTextures);
    };
    Scene.waitsForTextures = function () {
        //waits for all textures to load
        var waiting = true;
        for (var i = 0; i < Scene.materials.length; i++) {
            waiting = waiting && Scene.materials[i].isLoaded();
        }
        waiting = !waiting;
        if (waiting)
            window.requestAnimationFrame(Scene.waitsForTextures);
        else
            window.requestAnimationFrame(Scene.render);
    };
    Scene.render = function () {
        globals_1.Globals.gl.clear(globals_1.Globals.gl.COLOR_BUFFER_BIT);
        Canvas_1.Canvas.makePerspectiveMatrix();
        if (Scene.player)
            Scene.player.handleInput();
        if (Scene.endCredits)
            Scene.player.setPosition(Scene.lookAtCamera.x, Scene.lookAtCamera.y, Scene.lookAtCamera.z);
        //physics and collisions
        for (var i = 0; i < Scene.objects.length; i++) {
            Scene.objects[i].solveCollisions(); //only solve collisions with enabled objects
            Scene.objects[i].update();
        }
        if (Scene.endCredits) {
            Scene.lights[0].setColor(0, 0, 0, 0);
            Scene.camAnimator.update();
            Scene.lookAtCamera.look();
        }
        else if (Scene.player) {
            if (globals_1.Globals.cameraMode) {
                Scene.firstPersonCamera.setAngle(Scene.player.roty);
                Scene.firstPersonCamera.setPosition(Scene.player.x, Scene.player.y + 5, Scene.player.z);
                Scene.firstPersonCamera.look();
                //flashlight rotation alligned to camera
                Scene.lights[0].setRotation(Scene.firstPersonCamera.angle, Scene.firstPersonCamera.elevation);
            }
            else {
                Scene.lookAtCamera.setAngle(Scene.player.roty);
                Scene.lookAtCamera.setLookPoint(Scene.player.x, Scene.player.y, Scene.player.z);
                Scene.lookAtCamera.look();
                //flashlight rotation alligned to camera
                Scene.lights[0].setRotation(Scene.lookAtCamera.angle, Scene.lookAtCamera.elevation);
            }
            //flashlight position alligned to Scene.player's flashlight
            Scene.lights[0].setPosition(Scene.player.x, Scene.player.y + 4, Scene.player.z);
        }
        Lights_1.Light.moveAllLights(globals_1.Globals.viewMatrix);
        //toggle showing of bounding boxes
        if (Input_1.Input.isKeyClicked(Input_1.Input.B_KEY))
            globals_1.Globals.showBoundingBoxes = !globals_1.Globals.showBoundingBoxes;
        //toggle camera modes
        if (Input_1.Input.isKeyClicked(Input_1.Input.C_KEY))
            globals_1.Globals.cameraMode = !globals_1.Globals.cameraMode;
        //render all the objects in the scene
        for (var i = 0; i < Scene.objects.length; i++)
            Scene.objects[i].render();
        //game over screen
        if (this.gameOver) {
            InterfaceOverlay_1.InterfaceOverlay.renderGameOver();
            //respawn
            if (Input_1.Input.isMouseDown()) {
                Scene.createObjects();
                this.gameOver = false;
            }
        }
        //Scene.player just died
        else if (Scene.player.health <= 0.0 && !Scene.endCredits) {
            Scene.clearObjects();
            Scene.player = null;
            Scene.gameOver = true;
        }
        else if (!Scene.endCredits)
            InterfaceOverlay_1.InterfaceOverlay.render();
        else
            InterfaceOverlay_1.InterfaceOverlay.renderCredits();
        window.requestAnimationFrame(Scene.render);
    };
    ///_________________________________________________________
    Scene.objects = [];
    Scene.lights = []; // should have maximum 3 lights
    Scene.lanterns = [];
    Scene.materials = [];
    //collision group 1
    Scene.rocksCratesCollGroup = [];
    Scene.endCredits = false;
    Scene.gameOver = false;
    return Scene;
}());
exports.Scene = Scene;
