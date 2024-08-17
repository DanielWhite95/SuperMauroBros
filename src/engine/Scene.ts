////	GLOBAL ASSETS  ///
////____________________________________________

import { Globals } from "./globals";
import { Canvas } from "./Canvas";
import { Mesh } from "./Mesh";
import { Input } from "./Input";
import { TextureMaterial, TextureDiffuse, LiquidTexture } from "./Texture";
import { DiffuseMaterial, SimpleMaterial, SpecularMaterial } from "./Materials";
import { Light, PointLight, SpotLight } from "./Lights";
import { LookAtCamera, FirstPersonCamera } from "./Camera";
import { Player } from "./Player";
import { CameraKeyFrame, KeyFrame, BezierCurve, CameraBezierCurve, Animation, CameraAnimator } from "./Animator";
import { Object3D } from "./Object3D/Object3D";
import { Lava3D } from "./Object3D/Lava3D";
import { GravityTrigger3D } from "./Object3D/GravityTrigger3D";

import { Key3D } from "./Object3D/Key3D";
import { AutomaticBridge3D } from "./Object3D/AutomaticBridge3D";
import { Lantern3D } from "./Object3D/Lantern3D";
import { Door3D, DoorKey3D,  } from "./Object3D/Door3D";
import { TriggerBox3D } from "./Object3D/TriggerBox3D";
import { GhostSpawner3D } from "./Object3D/Ghost3D";
import { Tree3D } from "./Object3D/Tree3D";
import { Castle3D, doorToDungeonL, doorToDungeonR } from "./Object3D/Castle3D";
import { DestroyableObject3D } from "./Object3D/DestroyableObject3D";
import { MobileObject3D } from "./Object3D/MobileObject3D";
import { InterfaceOverlay } from "./InterfaceOverlay"



export class Scene {
  ///MESHES
  public static unitCubeMesh: Mesh;
  public static unitCubeTexMesh: Mesh;
  public static castleTowerMesh: Mesh;
  public static castleWallMesh: Mesh;
  public static woodBox: Mesh;
  public static rock0Mesh: Mesh;
  public static rock1Mesh: Mesh;
  public static stone0Mesh: Mesh;
  public static house0Mesh: Mesh;
  public static house1Mesh: Mesh;
  public static tree0TrunkMesh: Mesh;
  public static tree0LeafsMesh: Mesh;
  public static doorMesh: Mesh;
  public static castleExteriorMesh: Mesh;
  public static castleInteriorMesh: Mesh;
  public static castleTowersMesh: Mesh;
  public static castleDoorRMesh: Mesh;
  public static castleDoorLMesh: Mesh;
  public static castleDungeonWallsMesh: Mesh;
  public static castleFloorMesh: Mesh;
  public static skyboxMesh: Mesh;
  public static ghostMesh: Mesh;
  public static ghostTongueMesh: Mesh;
  public static bombMesh: Mesh;
  public static keyHoleMesh: Mesh;
  public static keyMesh: Mesh
  public static floorMesh: Mesh;
  public static lavaMesh: Mesh;
  public static gearMesh: Mesh;
  public static lanternMesh: Mesh;
  public static lanternInteriorMesh: Mesh;
  public static finalDestMesh: Mesh;
  public static windmillBaseMesh: Mesh;
  public static windmillWheelMesh: Mesh;
  public static flashlightMesh: Mesh;
  public static treasureMesh: Mesh;

  ///MATERIALS
  public static greenSpecMaterial: SpecularMaterial;
  public static greenMaterial: DiffuseMaterial;
  public static redMaterial: DiffuseMaterial;
  public static brownMaterial: DiffuseMaterial;
  public static yellowMaterial: DiffuseMaterial;
  public static textureMaterial: TextureMaterial;
  public static castleInteriorTex: TextureMaterial;
  public static castleExteriorTex: TextureMaterial;
  public static castleDoorsTex: TextureMaterial;
  public static castleDungeonWallsTex: TextureMaterial;
  public static grassTex: TextureMaterial;
  public static house0Tex: TextureMaterial;
  public static house1Tex: TextureMaterial;
  public static rocksTex: TextureMaterial;
  public static rock1Tex: TextureMaterial;
  public static terrain0Tex: TextureMaterial;
  public static terrain1Tex: TextureMaterial;
  public static stone0Tex: TextureMaterial;
  public static tree0LeafsTex: TextureMaterial;
  public static tree0TrunkTex: TextureMaterial;
  public static skyboxTex: TextureMaterial;
  public static woodenDoorTex: TextureMaterial;
  public static woodenCrateTex: TextureMaterial;
  public static ghostMaterial: TextureMaterial;
  public static ghostDamagedMaterial: TextureMaterial;
  public static ghostTongueMaterial: SimpleMaterial;
  public static keyMaterial: SpecularMaterial;
  public static lavaMaterial: SimpleMaterial;
  public static lanternTex: TextureMaterial;
  public static windmillTex: TextureMaterial;
  public static flashlightTex: TextureMaterial;
  public static treasureMaterial: SpecularMaterial;
  ///_________________________________________________________

  public static objects = [];
  public static lights = []; // should have maximum 3 lights
  public static lanterns = [];
  public static materials: SimpleMaterial[] = [];


  //collision group 1
  public static rocksCratesCollGroup = [];

  public static firstPersonCamera;
  public static lookAtCamera;
  public static currCamera;
  public static camAnimator;

  public static player;
  public static endCredits = false;
  public static gameOver = false;

  public static lava;

  public static loadMeshes() {
    Scene.unitCubeMesh = Mesh.loadFromOBJFile("u_cube.obj");
    Scene.unitCubeTexMesh = Mesh.loadFromOBJFile("u_cube_leather.obj");
    Scene.gearMesh = Mesh.loadFromOBJFile("gear.obj");
    Scene.castleTowerMesh = Mesh.loadFromOBJFile("castle_tower.obj");
    Scene.castleWallMesh = Mesh.loadFromOBJFile("castle_wall.obj");
    Scene.woodBox = Mesh.loadFromOBJFile("wood_box.obj");
    Scene.rock0Mesh = Mesh.loadFromOBJFile("rock0.obj");
    Scene.rock1Mesh = Mesh.loadFromOBJFile("rock1.obj");
    Scene.stone0Mesh = Mesh.loadFromOBJFile("stone0.obj");
    Scene.house0Mesh = Mesh.loadFromOBJFile("house0.obj", "house0_bBoxes.obj");
    Scene.house1Mesh = Mesh.loadFromOBJFile("house1.obj", "house1_bBoxes.obj");
    Scene.tree0TrunkMesh = Mesh.loadFromOBJFile("tree0_trunk.obj");
    Scene.tree0LeafsMesh = Mesh.loadFromOBJFile("tree0_leafs.obj");
    Scene.doorMesh = Mesh.loadFromOBJFile("wooden_door.obj");
    Scene.castleExteriorMesh = Mesh.loadFromOBJFile(
      "castle_exterior.obj",
      "castle_exterior_bBoxes.obj",
    );
    Scene.castleInteriorMesh = Mesh.loadFromOBJFile(
      "castle_interior.obj",
      "castle_interior_bBoxes.obj",
    );
    Scene.castleTowersMesh = Mesh.loadFromOBJFile(
      "castle_towers_doors.obj",
      "castle_towers_doors_bBoxes.obj",
    );
    Scene.castleDoorRMesh = Mesh.loadFromOBJFile("castle_doorR.obj");
    Scene.castleDoorLMesh = Mesh.loadFromOBJFile("castle_doorL.obj");
    Scene.castleDungeonWallsMesh = Mesh.loadFromOBJFile(
      "castle_dungeon_walls.obj",
      "castle_dungeon_bBoxes.obj",
    );
    Scene.castleFloorMesh = Mesh.loadFromOBJFile("castle_floor.obj");
    Scene.floorMesh = Mesh.loadFromOBJFile("floor.obj");
    Scene.skyboxMesh = Mesh.loadFromOBJFile("skybox.obj");
    Scene.ghostMesh = Mesh.loadFromOBJFile("ghost.obj");
    Scene.ghostTongueMesh = Mesh.loadFromOBJFile("ghost_tongue.obj");
    Scene.bombMesh = Mesh.loadFromOBJFile("bomb.obj");
    Scene.keyHoleMesh = Mesh.loadFromOBJFile("keyhole.obj");
    Scene.keyMesh = Mesh.loadFromOBJFile("key.obj");
    Scene.lavaMesh = Mesh.loadFromOBJFile("lava.obj");
    Scene.lanternMesh = Mesh.loadFromOBJFile("lantern.obj");
    Scene.lanternInteriorMesh = Mesh.loadFromOBJFile("lantern_interior.obj");
    Scene.windmillBaseMesh = Mesh.loadFromOBJFile("windmill_base.obj");
    Scene.windmillWheelMesh = Mesh.loadFromOBJFile("windmill_wheel.obj");
    Scene.flashlightMesh = Mesh.loadFromOBJFile("flashlight.obj");
    Scene.treasureMesh = Mesh.loadFromOBJFile("treasure_chest.obj");
  }

  public static loadMaterials() {
    Scene.materials.push(
      (Scene.greenSpecMaterial = new SpecularMaterial(0.0, 255, 10, 255)),
    );
    Scene.materials.push(
      (Scene.greenMaterial = new DiffuseMaterial(0.0, 255, 10, 255)),
    );
    Scene.materials.push(
      (Scene.redMaterial = new DiffuseMaterial(255, 50, 50, 255)),
    );
    Scene.materials.push(
      (Scene.lavaMaterial = new SimpleMaterial(255, 0, 0, 255)),
    );
    Scene.materials.push(
      (Scene.brownMaterial = new DiffuseMaterial(255, 200, 50, 255)),
    );
    Scene.materials.push(
      (Scene.yellowMaterial = new DiffuseMaterial(255, 255, 0, 255)),
    );
    Scene.materials.push(
      (Scene.textureMaterial = new TextureMaterial("crate.png")),
    );
    Scene.materials.push(
      (Scene.castleInteriorTex = new TextureDiffuse("castle_interior.jpg")),
    );
    Scene.materials.push(
      (Scene.castleExteriorTex = new TextureDiffuse("castle_exterior.jpg")),
    );
    Scene.materials.push(
      (Scene.castleDoorsTex = new TextureDiffuse("castle_towers_doors.jpg")),
    );
    Scene.materials.push(
      (Scene.castleDungeonWallsTex = new TextureDiffuse("bricks1.jpg")),
    );
    Scene.materials.push(
      (Scene.terrain0Tex = new TextureDiffuse("terrain0.jpg")),
    );
    Scene.materials.push(
      (Scene.terrain1Tex = new TextureDiffuse("terrain1.jpg")),
    );
    Scene.materials.push((Scene.house0Tex = new TextureDiffuse("house0.jpg")));
    Scene.materials.push((Scene.house1Tex = new TextureDiffuse("house1.png")));
    Scene.materials.push((Scene.rocksTex = new TextureDiffuse("rocks.jpg")));
    Scene.materials.push((Scene.rock1Tex = new TextureDiffuse("rock1.jpg")));
    Scene.materials.push((Scene.stone0Tex = new TextureDiffuse("stone0.jpg")));
    Scene.materials.push(
      (Scene.tree0LeafsTex = new TextureDiffuse("tree0_leafs.png")),
    );
    Scene.materials.push(
      (Scene.tree0TrunkTex = new TextureDiffuse("tree0_trunk.jpg")),
    );
    Scene.materials.push((Scene.skyboxTex = new TextureMaterial("skybox.jpg")));
    Scene.materials.push(
      (Scene.woodenDoorTex = new TextureDiffuse("wooden_door.png")),
    );
    Scene.materials.push(
      (Scene.woodenCrateTex = new TextureDiffuse("wood_crate.png")),
    );
    Scene.materials.push(
      (Scene.ghostMaterial = new TextureDiffuse("ghost.png")),
    );
    Scene.materials.push(
      (Scene.ghostDamagedMaterial = new TextureDiffuse("ghost_damaged.png")),
    );
    Scene.materials.push(
      (Scene.ghostTongueMaterial = new DiffuseMaterial(200, 0, 0, 140)),
    );
    Scene.materials.push(
      (Scene.keyMaterial = new SpecularMaterial(200, 200, 0, 255)),
    );
    Scene.materials.push((Scene.lavaMaterial = new LiquidTexture("lava.png")));
    Scene.materials.push(
      (Scene.lanternTex = new TextureDiffuse("lantern_violet.jpg")),
    );
    Scene.materials.push(
      (Scene.windmillTex = new TextureDiffuse("windmill.jpg")),
    );
    Scene.materials.push(
      (Scene.flashlightTex = new TextureDiffuse("flashlight.jpg")),
    );
    Scene.materials.push(
      (Scene.treasureMaterial = new SpecularMaterial(255, 255, 0, 255)),
    );
    Scene.treasureMaterial.setSpecularShine(50);

    for (var i = 0; i < Scene.materials.length; i++) {
      Scene.materials[i].setMaterialAmbient(10, 10, 10, 255);
      Scene.materials[i].setAmbientLowColor(150, 10, 10, 255);
      Scene.materials[i].setAmbientHighColor(0, 0, 77, 255);
      Scene.materials[i].setAmbientDirection(0, 1, 0);
    }
    Scene.lavaMaterial.setAmbientLowColor(200, 0, 0, 255);
  }

  //add at the end
  public static addObject3D(object) {
    Scene.objects.push(object);
  }

  //add at the beginning
  public static addObject3D_(object) {
    Scene.objects.unshift(object);
  }

  public static removeObject3D(object) {
    //remove from scene
    for (var i = 0; i < Scene.objects.length; i++)
      if (Scene.objects[i] == object) Scene.objects.splice(i, 1);

    //remove from collision group
    for (var i = 0; i < Scene.rocksCratesCollGroup.length; i++)
      if (Scene.rocksCratesCollGroup[i] == object) Scene.rocksCratesCollGroup.splice(i, 1);
  }

  public static clearLanterns() {
    for (var i = 0; i < Scene.lanterns.length; i++) {
      Scene.lanterns[i].removeFromScene();
    }
    Scene.lanterns = [];
  }

  public static switchLights_Extern() {
    //delete old lights
    Scene.lights.splice(0, Scene.lights.length);

    Scene.lights.push(new SpotLight("LA", 0, 20, 30, 0, -0.05, 1, 50, 0.8)); //player flashlight
    Scene.lights.push(new PointLight("LB", 0, 10, 200, 30, 0.8)); //castle lantern light
    Scene.lights.push(new PointLight("LC", 0, 10, 350, 30, 1.5)); //yellow light
    Scene.lights.push(new PointLight("LD", 0, 10, 350, 30, 1.5)); //blue lantern light
    Scene.lights[0].setCone(20, 50);
    Scene.lights[0].setColor(255, 255, 255);
    Scene.lights[1].setColor(0, 255, 0);
    Scene.lights[2].setColor(255, 255, 0);
    Scene.lights[3].setColor(0, 100, 255);

    Scene.lanterns[0].linkLight(Scene.lights[1]);
    Scene.lanterns[1].linkLight(Scene.lights[3]);
    Scene.lanterns[2].linkLight(Scene.lights[2]);
    Scene.lanterns[3].linkLight(null);

    Light.moveAllLights(Globals.viewMatrix);

    Scene.lava.material.setWaveHeight(10);
    Scene.lava.setPosition(0, -10, 0);
  }

  public static switchLights_Dungeon() {
    //delete old lights
    Scene.lights.splice(0, Scene.lights.length);

    Scene.lights.push(new SpotLight("LA", 0, 20, 30, 0, 0.05, 1, 50, 0.8));
    Scene.lights.push(new PointLight("LB", -115, -8, -61, 20, 5));
    Scene.lights.push(new PointLight("LC", -1, 6, -180, 30, 0.8)); // lava light
    Scene.lights[0].setCone(20, 50);
    Scene.lights[0].setColor(255, 255, 255);
    Scene.lights[1].setColor(100, -1, 255);
    Scene.lights[2].setColor(255, 0, 0);
    Light.moveAllLights(
      Globals.viewMatrix);

    Scene.lanterns[0].linkLight(null);
    Scene.lanterns[1].linkLight(null);
    Scene.lanterns[2].linkLight(null);
    Scene.lanterns[3].linkLight(Scene.lights[1]);

    Scene.lava.material.setWaveHeight(6);
    Scene.lava.setPosition(0, -16, 0);
  }

  public static clearObjects() {
    for (var i = 0; i < Scene.objects.length; i++) Scene.objects[i] = null;
    Scene.objects = [];

    //clear collision group
    for (var i = 0; i < Scene.rocksCratesCollGroup.length; i++)
      Scene.rocksCratesCollGroup[i] = null;
    Scene.rocksCratesCollGroup = [];
  }

  public static createObjects() {
    ////		CREATE OBJECTS 3D
    ////__________________________________

    //player
    Scene.player = new Player(Scene.unitCubeTexMesh, Scene.textureMaterial, Scene.rock1Mesh, Scene.rock1Tex);
    Scene.player.setPosition(25, 30, 360);
    //player.setPosition(-1, 5, 0);
    Scene.player.setRotation(0, -90, 0);
    Scene.player.hasKey = false;
    Scene.player.enableCollisionWith(Scene.objects);
    Scene.player.addToScene();

    //lava
    Scene.lava = new Lava3D(Scene.lavaMesh, Scene.lavaMaterial);
    Scene.lava.setPosition(0, -10, 0);
    Scene.lava.setScale(3, 2, 3);
    Scene.rocksCratesCollGroup.push(Scene.lava);
    Scene.lava.addToScene();

    //trigger for falling rocks/boxes
    var trigg = new GravityTrigger3D(35, 35, 35);
    trigg.setPosition(0, 10, 40);
    trigg.addToScene();

    //rocks with gravity
    var tmpObj = new Object3D(Scene.stone0Mesh, Scene.stone0Tex);
    tmpObj.setPosition(-38, 150, 0);
    tmpObj.setScale(0.3, 0.35, 0.4);
    tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
    tmpObj.addToScene();
    trigg.registerObject3D(tmpObj);
    Scene.rocksCratesCollGroup.push(tmpObj);

    tmpObj = new Object3D(Scene.stone0Mesh, Scene.stone0Tex);
    tmpObj.setPosition(-45, 150, 35);
    tmpObj.setScale(0.2, 0.2, 0.3);
    tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
    tmpObj.addToScene();
    trigg.registerObject3D(tmpObj);
    Scene.rocksCratesCollGroup.push(tmpObj);

    //destroyable wood boxes
    tmpObj = new DestroyableObject3D(Scene.woodBox, Scene.woodenCrateTex, Scene.redMaterial);
    tmpObj.setPosition(-25, 50, 40);
    tmpObj.setScale(2, 2, 2);
    tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
    tmpObj.addToScene();
    trigg.registerObject3D(tmpObj);
    Scene.rocksCratesCollGroup.push(tmpObj);

    tmpObj = new DestroyableObject3D(Scene.woodBox, Scene.woodenCrateTex, Scene.redMaterial);
    tmpObj.setPosition(-23, 80, 40);
    tmpObj.setScale(2, 3, 2);
    tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
    tmpObj.addToScene();
    trigg.registerObject3D(tmpObj);
    Scene.rocksCratesCollGroup.push(tmpObj);

    tmpObj = new DestroyableObject3D(Scene.woodBox, Scene.woodenCrateTex, Scene.redMaterial);
    tmpObj.setPosition(-38, 105, 0);
    tmpObj.setScale(3, 3, 3);
    tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
    tmpObj.addToScene();
    trigg.registerObject3D(tmpObj);
    Scene.rocksCratesCollGroup.push(tmpObj);

    tmpObj = new DestroyableObject3D(Scene.woodBox, Scene.woodenCrateTex, Scene.redMaterial);
    tmpObj.setPosition(-45, 100, 35);
    tmpObj.setScale(4, 3, 5);
    tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
    tmpObj.addToScene();
    trigg.registerObject3D(tmpObj);
    Scene.rocksCratesCollGroup.push(tmpObj);

    //second trigger for falling rocks/boxes
    var trigg = new GravityTrigger3D(15, 15, 15);
    trigg.setPosition(-70, 35, -15);
    trigg.addToScene();

    tmpObj = new DestroyableObject3D(Scene.woodBox, Scene.woodenCrateTex, Scene.redMaterial);
    tmpObj.setPosition(-75, 100, -60);
    tmpObj.setScale(2, 2, 2);
    tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
    tmpObj.addToScene();
    trigg.registerObject3D(tmpObj);
    Scene.rocksCratesCollGroup.push(tmpObj);

    tmpObj = new Object3D(Scene.stone0Mesh, Scene.stone0Tex);
    tmpObj.setPosition(-75, 150, -60);
    tmpObj.setScale(0.2, 0.2, 0.3);
    tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
    tmpObj.addToScene();
    trigg.registerObject3D(tmpObj);
    Scene.rocksCratesCollGroup.push(tmpObj);

    //destroyable door (castle top)
    tmpObj = new DestroyableObject3D(Scene.doorMesh, Scene.woodenDoorTex, Scene.redMaterial);
    tmpObj.setPosition(-0.9, 49, -43);
    tmpObj.setScale(2.5, 1.5, 2);
    tmpObj.addToScene();

    //mobile wood boxes in dungeon
    tmpObj = new MobileObject3D(Scene.woodBox, Scene.woodenCrateTex);
    tmpObj.setPosition(-1, -2.5, -183);
    tmpObj.setScale(3, 4, 3);
    tmpObj.enablePhysics(true);
    tmpObj.enableGravity(true);
    tmpObj.enableCollisionWith(Scene.rocksCratesCollGroup);
    tmpObj.addToScene();

    //end treasure
    var treasure = new Object3D(Scene.treasureMesh, Scene.treasureMaterial);
    treasure.setPosition(-1, 25, -170);
    treasure.setScale(1, 1, 1);
    treasure.addToScene();
    treasure.preUpdate = function () {
      treasure.rotate(0, 1, 0);
    };

    //castle
    tmpObj = new Castle3D(
      Scene.castleExteriorMesh,
      Scene.castleExteriorTex,
      Scene.castleInteriorMesh,
      Scene.castleInteriorTex,
      Scene.castleTowersMesh,
      Scene.castleDoorsTex,
      Scene.castleDoorRMesh,
      Scene.castleDoorLMesh,
      Scene.keyHoleMesh,
      Scene.keyMesh,
      Scene.keyMaterial,
      Scene.castleFloorMesh,
      Scene.terrain1Tex,
      Scene.floorMesh,
      Scene.terrain0Tex,
      Scene.castleDungeonWallsMesh,
      Scene.castleDungeonWallsTex,
    );
    tmpObj.setPosition(0, 0, 8);
    tmpObj.setScale(3, 3, 3);
    tmpObj.addToScene();

    //adds castle floor, exterior and dungeon, to rock/boxes collisions group
    Scene.rocksCratesCollGroup.push(tmpObj.objects[3]);
    Scene.rocksCratesCollGroup.push(tmpObj.objects[0]);
    Scene.rocksCratesCollGroup.push(tmpObj.objects[5]);

    //key
    tmpObj = new Key3D(Scene.keyMesh, Scene.keyMaterial);
    tmpObj.setPosition(-0.9, 50, -59);
    tmpObj.setScale(15, 15, 15);
    tmpObj.addToScene();

    //bridge with rocks
    tmpObj = new AutomaticBridge3D(40, 100, 40, Scene.rock0Mesh, Scene.rocksTex);
    tmpObj.setPosition(0, -15, 140);
    tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
    tmpObj.addToScene();

    tmpObj = new AutomaticBridge3D(40, 100, 40, Scene.rock0Mesh, Scene.rocksTex);
    tmpObj.setPosition(10, -10, 130);
    tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
    tmpObj.addToScene();

    tmpObj = new AutomaticBridge3D(40, 100, 40, Scene.rock0Mesh, Scene.rocksTex);
    tmpObj.setPosition(4, -4, 115);
    tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
    tmpObj.addToScene();

    tmpObj = new AutomaticBridge3D(40, 100, 40, Scene.rock0Mesh, Scene.rocksTex);
    tmpObj.setPosition(-8, -9, 108);
    tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
    tmpObj.addToScene();

    //houses
    tmpObj = new Object3D(Scene.house0Mesh, Scene.house0Tex);
    tmpObj.setPosition(40, 0, 200);
    tmpObj.setScale(0.5, 0.5, 0.5);
    tmpObj.addToScene();

    tmpObj = new Object3D(Scene.house1Mesh, Scene.house1Tex);
    tmpObj.setPosition(-30, 0, 350);
    tmpObj.setScale(0.25, 0.25, 0.25);
    tmpObj.addToScene();

    //windmill
    var base = new Object3D(Scene.windmillBaseMesh, Scene.windmillTex);
    base.setPosition(-40, 0, 250);
    base.setScale(0.25, 0.25, 0.25);
    base.setRotation(0, -90, 0);
    base.addToScene();

    var wheel = new Object3D(Scene.windmillWheelMesh, Scene.windmillTex);
    wheel.setPosition(0.3, 174.1, 53.4);
    //wheel.setScale(0.25, 0.25, 0.25);
    wheel.setParent(base);
    wheel.addToScene();
    wheel.preUpdate = function () {
      wheel.rotate(0, 0, 1);
    };

    //ghost spawner
    tmpObj = new GhostSpawner3D();
    tmpObj.addToScene();

    //trees
    tmpObj = new Tree3D(
      Scene.tree0TrunkMesh,
      Scene.tree0TrunkTex,
      Scene.tree0LeafsMesh,
      Scene.tree0LeafsTex,
    );
    tmpObj.setPosition(40, 0, 240);
    tmpObj.setScale(8, 8, 8);
    tmpObj.addToScene();
    tmpObj = new Tree3D(
      Scene.tree0TrunkMesh,
      Scene.tree0TrunkTex,
      Scene.tree0LeafsMesh,
      Scene.tree0LeafsTex,
    );
    tmpObj.setPosition(-10, 0, 200);
    tmpObj.setScale(7, 10, 4);
    tmpObj.addToScene();
    tmpObj = new Tree3D(
      Scene.tree0TrunkMesh,
      Scene.tree0TrunkTex,
      Scene.tree0LeafsMesh,
      Scene.tree0LeafsTex,
    );
    tmpObj.setPosition(5, 0, 300);
    tmpObj.setScale(10, 9, 10);
    tmpObj.addToScene();
    tmpObj = new Tree3D(
      Scene.tree0TrunkMesh,
      Scene.tree0TrunkTex,
      Scene.tree0LeafsMesh,
      Scene.tree0LeafsTex,
    );
    tmpObj.setPosition(-30, 0, 210);
    tmpObj.setScale(5, 5, 5);
    tmpObj.addToScene();
    tmpObj = new Tree3D(
      Scene.tree0TrunkMesh,
      Scene.tree0TrunkTex,
      Scene.tree0LeafsMesh,
      Scene.tree0LeafsTex,
    );
    tmpObj.setPosition(25, 0, 250);
    tmpObj.setScale(3, 4, 5);
    tmpObj.addToScene();
    tmpObj = new Tree3D(
      Scene.tree0TrunkMesh,
      Scene.tree0TrunkTex,
      Scene.tree0LeafsMesh,
      Scene.tree0LeafsTex,
    );
    tmpObj.setPosition(-50, 0, 200);
    tmpObj.setScale(5, 5, 5);
    tmpObj.addToScene();
    tmpObj = new Tree3D(
      Scene.tree0TrunkMesh,
      Scene.tree0TrunkTex,
      Scene.tree0LeafsMesh,
      Scene.tree0LeafsTex,
    );
    tmpObj.setPosition(50, 0, 280);
    tmpObj.setScale(5, 5, 5);
    tmpObj.addToScene();

    //trigger to switch lights
    var dungeonLightsTrigg = new TriggerBox3D(10, 20, 10);
    dungeonLightsTrigg.setPosition(0, -5, -40);
    dungeonLightsTrigg.oneShot = true;
    dungeonLightsTrigg.onTrigger = function (inst) {
      Scene.switchLights_Dungeon();
      doorToDungeonL.close();
      doorToDungeonR.close();
    };
    dungeonLightsTrigg.addToScene();

    //dungeon doors
    tmpObj = new Door3D(Scene.doorMesh, Scene.woodenDoorTex, true, false);
    tmpObj.setPosition(-135, -13, -57);
    tmpObj.setRotation(0, 90, 0);
    tmpObj.objects[0].setScale(1.8, 1.5, 1);
    tmpObj.addToScene();

    tmpObj = new Door3D(Scene.doorMesh, Scene.woodenDoorTex, true, false);
    tmpObj.setPosition(-129, -13, -91);
    tmpObj.setRotation(0, 90, 0);
    tmpObj.objects[0].setScale(1.6, 1.5, 1);
    tmpObj.addToScene();

    tmpObj = new DoorKey3D(
      Scene.doorMesh,
      Scene.woodenDoorTex,
      Scene.keyHoleMesh,
      Scene.keyMesh,
      Scene.keyMaterial,
      null,
      false,
    );
    tmpObj.setPosition(0.85, -12, -75);
    tmpObj.objects[0].setScale(1.6, 1.55, 1);
    tmpObj.addToScene();

    var endGameTrigger = new TriggerBox3D(5, 5, 5);
    endGameTrigger.setPosition(-1, 25, -170);
    endGameTrigger.oneShot = true;
    endGameTrigger.onTrigger = function (inst) {
      Scene.switchLights_Extern();
      var dungeonLightsTrigg = new TriggerBox3D(10, 20, 10);
      dungeonLightsTrigg.setPosition(0, -5, -40);
      dungeonLightsTrigg.oneShot = true;
      dungeonLightsTrigg.onTrigger = function (inst) {
        Scene.switchLights_Dungeon();
        doorToDungeonL.close();
        doorToDungeonR.close();
      };
      dungeonLightsTrigg.addToScene();
      Scene.endCredits = true;
    };
    endGameTrigger.addToScene();

    //second key
    tmpObj = new Key3D(Scene.keyMesh, Scene.keyMaterial);
    tmpObj.setPosition(-109, -5, -94);
    tmpObj.setScale(15, 15, 15);
    tmpObj.addToScene();

    //second bridge with rocks
    tmpObj = new AutomaticBridge3D(40, 100, 40, Scene.rock0Mesh, Scene.rocksTex);
    tmpObj.setPosition(0, -15, -245);
    tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
    tmpObj.addToScene();

    tmpObj = new AutomaticBridge3D(40, 100, 40, Scene.rock0Mesh, Scene.rocksTex);
    tmpObj.setPosition(-10, -10, -265);
    tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
    tmpObj.addToScene();

    tmpObj = new AutomaticBridge3D(40, 100, 40, Scene.rock0Mesh, Scene.rocksTex);
    tmpObj.setPosition(-25, -5, -262);
    tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
    tmpObj.addToScene();

    tmpObj = new AutomaticBridge3D(40, 100, 40, Scene.rock0Mesh, Scene.rocksTex);
    tmpObj.setPosition(-45, -2, -261);
    tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
    tmpObj.addToScene();

    //skybox
    tmpObj = new Object3D(Scene.skyboxMesh, Scene.skyboxTex);
    tmpObj.addToScene();
    tmpObj.setScale(350, 350, 450);
    tmpObj.boundingBoxes[0].setScaleCorrection(0, 0, 0);

    ///			CAMERA
    ///_______________________

    Scene.lookAtCamera = new LookAtCamera();
    Scene.lookAtCamera.setLookRadius(15.0);
    Scene.lookAtCamera.setElevation(35.0);
    Scene.lookAtCamera.setLookPoint(0, 0, 0);

    Scene.firstPersonCamera = new FirstPersonCamera();
    Scene.firstPersonCamera.setElevation(0.0);
    Scene.firstPersonCamera.setPosition(0, 0, 0);
    Scene.firstPersonCamera.look();

    Scene.currCamera = Scene.firstPersonCamera;

    //end credits animation
    Scene.camAnimator = new CameraAnimator(Scene.lookAtCamera);
    var cameraPath = new CameraBezierCurve();
    // Pass through windmill wheel
    cameraPath.addPoint(new CameraKeyFrame(100, 0, 250, 0, 90, 0));
    cameraPath.addPoint(new CameraKeyFrame(50, 80, 300, 90, 0, 10));
    cameraPath.addPoint(new CameraKeyFrame(-100, 50, 200, 110, 0, 20));
    Scene.camAnimator.addAnimation(new Animation(cameraPath as unknown as BezierCurve, 500));
    cameraPath = new CameraBezierCurve();
    // // look backward
    cameraPath.addPoint(new CameraKeyFrame(-100, 50, 200, 110, 0, 20));
    cameraPath.addPoint(new CameraKeyFrame(-60, 40, 190, 180, 0, 20));
    cameraPath.addPoint(new CameraKeyFrame(0, 15, 150, 180, 0, 20));
    Scene.camAnimator.addAnimation(new Animation(cameraPath as unknown as BezierCurve, 300));
    cameraPath = new CameraBezierCurve();
    // enter the castle
    cameraPath.addPoint(new CameraKeyFrame(0, 15, 150, 180, 0, 20));
    cameraPath.addPoint(new CameraKeyFrame(0, 5, 80, 0, 0, 0));

    Scene.camAnimator.addAnimation(new Animation(cameraPath as unknown as  BezierCurve, 250));
    cameraPath = new CameraBezierCurve();

    // look into castle garden
    cameraPath.addPoint(new CameraKeyFrame(0, 5, 80, 0, 0, 0));
    cameraPath.addPoint(new CameraKeyFrame(0, 5, 40, -90, 0, 0));
    cameraPath.addPoint(new CameraKeyFrame(0, 5, -10, 0, 0, 0));
    Scene.camAnimator.addAnimation(new Animation(cameraPath as unknown as BezierCurve, 500));

    cameraPath = new CameraBezierCurve();
    // // enter the dungeon
    cameraPath.addPoint(new CameraKeyFrame(0, 5, -10, 0, 0, 0));
    cameraPath.addPoint(new CameraKeyFrame(0, 6, -30, -10, 0, 0));
    cameraPath.addPoint(new CameraKeyFrame(0, -13, -50, -90, 0, 0));
    cameraPath.addPoint(new CameraKeyFrame(0, -10, -70, 0, 0, 0));
    Scene.camAnimator.addAnimation(new Animation(cameraPath as unknown as BezierCurve, 500));

    //pass through the door
    cameraPath = new CameraBezierCurve();
    cameraPath.addPoint(new CameraKeyFrame(0, -10, -70, 0, 0, 0));
    cameraPath.addPoint(new CameraKeyFrame(0, -5, -130, 0, 0, 0));
    Scene.camAnimator.addAnimation(new Animation(cameraPath as unknown as BezierCurve, 200));

    // traverse the tunnel
    cameraPath = new CameraBezierCurve();
    cameraPath.addPoint(new CameraKeyFrame(0, -5, -130, 0, 0, 0));
    cameraPath.addPoint(new CameraKeyFrame(-25, 7, -160, 120, 50, 0));

    cameraPath.addPoint(new CameraKeyFrame(-25, 15, -200, 150, 50, 0));
    cameraPath.addPoint(new CameraKeyFrame(0, 0, -250, 0, 0, 0));
    Scene.camAnimator.addAnimation(new Animation(cameraPath as unknown as BezierCurve, 800));
    // exit the tunnel
    cameraPath = new CameraBezierCurve();
    cameraPath.addPoint(new CameraKeyFrame(0, 0, -250, 0, 0, 0));
    cameraPath.addPoint(new CameraKeyFrame(0, 0, -300, -100, 0, 0));
    cameraPath.addPoint(new CameraKeyFrame(0, 50, -280, -180, 0, 0));
    Scene.camAnimator.addAnimation(new Animation(cameraPath as unknown as BezierCurve, 500));

    // up to the sky
    cameraPath = new CameraBezierCurve();
    cameraPath.addPoint(new CameraKeyFrame(0, 50, -280, -180, 0, 0));
    cameraPath.addPoint(new CameraKeyFrame(0, 150, -280, -180, 20, 10));
    Scene.camAnimator.addAnimation(new Animation(cameraPath as unknown as BezierCurve, 500));

    Scene.camAnimator.play(true);

    //lanterns

    //castle lantern
    Scene.lanterns.push(
      new Lantern3D(Scene.lanternMesh, Scene.lanternInteriorMesh, Scene.lanternTex, Scene.lights[1]),
    );
    Scene.lanterns[0].setPosition(0, 12, 100);
    Scene.lanterns[0].animateColor = true;
    var lanternPath = new BezierCurve();
    lanternPath.addPoint(new KeyFrame(0, 0, 0));
    lanternPath.addPoint(new KeyFrame(60, 40, -20));
    lanternPath.addPoint(new KeyFrame(50, 30, -20));
    lanternPath.addPoint(new KeyFrame(0, 5, -100));
    Scene.lanterns[0].animator.addAnimation(new Animation(lanternPath, 400));

    lanternPath = new BezierCurve();
    lanternPath.addPoint(new KeyFrame(0, 5, -100));
    lanternPath.addPoint(new KeyFrame(-60, 30, -20));
    lanternPath.addPoint(new KeyFrame(-35, 40, -20));
    lanternPath.addPoint(new KeyFrame(0, 0, 0));
    Scene.lanterns[0].animator.addAnimation(new Animation(lanternPath, 400));
    Scene.lanterns[0].animator.play(false);
    Scene.lanterns[0].animator.instance = Scene.lanterns[0].animator;
    Scene.lanterns[0].animator.onStop = function (inst) {
      inst.play(false);
      inst.currTime = 0;
    };
    Scene.lanterns[0].addToScene();

    //blue lantern
    Scene.lanterns.push(
      new Lantern3D(Scene.lanternMesh, Scene.lanternInteriorMesh, Scene.lanternTex, Scene.lights[3]),
    );
    Scene.lanterns[1].setPosition(-20, 10, 250);
    lanternPath = new BezierCurve();
    lanternPath.addPoint(new KeyFrame(0, 0, -15));
    lanternPath.addPoint(new KeyFrame(+30, +20, 0));
    lanternPath.addPoint(new KeyFrame(0, 0, +15));
    Scene.lanterns[1].animator.addAnimation(new Animation(lanternPath, 300));
    Scene.lanterns[1].animator.play(true);
    Scene.lanterns[1].addToScene();

    Scene.lanterns.push(
      new Lantern3D(Scene.lanternMesh, Scene.lanternInteriorMesh, Scene.lanternTex, Scene.lights[2]),
    );
    lanternPath = new BezierCurve();
    Scene.lanterns[2].setPosition(-20, 10, 320);
    lanternPath.addPoint(new KeyFrame(0, -3, 0));
    lanternPath.addPoint(new KeyFrame(0, +3, 0));
    Scene.lanterns[2].animator.addAnimation(new Animation(lanternPath, 100));
    Scene.lanterns[2].animator.play(true);
    Scene.lanterns[2].addToScene();

    Scene.lanterns.push(new Lantern3D(Scene.lanternMesh, Scene.lanternInteriorMesh, Scene.lanternTex));
    Scene.lanterns[3].setPosition(-10, -5, -30);
    lanternPath = new BezierCurve();
    lanternPath.addPoint(new KeyFrame(-10, -1, -30));
    lanternPath.addPoint(new KeyFrame(-80, -1, -30));
    Scene.lanterns[3].animator.addAnimation(new Animation(lanternPath, 300));
    Scene.lanterns[3].animator.play(true);
    Scene.lanterns[3].addToScene();

    //lights
    Scene.switchLights_Extern();
  }

  public static start() {
    //LOAD ASSETS
    Scene.loadMeshes();
    Scene.loadMaterials();
    InterfaceOverlay.init();

    //CREATE SCENE
    Scene.createObjects();

    window.requestAnimationFrame(Scene.waitsForTextures);
  }

  public static waitsForTextures() {
    //waits for all textures to load
    var waiting = true;
    for (var i = 0; i < Scene.materials.length; i++) {
      waiting = waiting && Scene.materials[i].isLoaded();
    }
    waiting = !waiting;

    if (waiting) window.requestAnimationFrame(Scene.waitsForTextures);
    else window.requestAnimationFrame(Scene.render);
  }

  public static render() {
    Globals.gl.clear(Globals.gl.COLOR_BUFFER_BIT);

    Canvas.makePerspectiveMatrix();

    if (Scene.player) Scene.player.handleInput();

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
    } else if (Scene.player) {
      if (Globals.cameraMode) {
        Scene.firstPersonCamera.setAngle(Scene.player.roty);
        Scene.firstPersonCamera.setPosition(Scene.player.x, Scene.player.y + 5, Scene.player.z);
        Scene.firstPersonCamera.look();
        //flashlight rotation alligned to camera
        Scene.lights[0].setRotation(
          Scene.firstPersonCamera.angle,
          Scene.firstPersonCamera.elevation,
        );
      } else {
        Scene.lookAtCamera.setAngle(Scene.player.roty);
        Scene.lookAtCamera.setLookPoint(Scene.player.x, Scene.player.y, Scene.player.z);
        Scene.lookAtCamera.look();
        //flashlight rotation alligned to camera
        Scene.lights[0].setRotation(Scene.lookAtCamera.angle, Scene.lookAtCamera.elevation);
      }

      //flashlight position alligned to Scene.player's flashlight
      Scene.lights[0].setPosition(Scene.player.x, Scene.player.y + 4, Scene.player.z);
    }

    Light.moveAllLights(Globals.viewMatrix);

    //toggle showing of bounding boxes
    if (Input.isKeyClicked(Input.B_KEY)) Globals.showBoundingBoxes = !Globals.showBoundingBoxes;

    //toggle camera modes
    if (Input.isKeyClicked(Input.C_KEY)) Globals.cameraMode = !Globals.cameraMode;

    //render all the objects in the scene
    for (var i = 0; i < Scene.objects.length; i++) Scene.objects[i].render();

    //game over screen
    if (Scene.gameOver) {
      InterfaceOverlay.renderGameOver();

      //respawn
      if (Input.isMouseDown()) {
        Scene.createObjects();
        Scene.gameOver = false;
      }
    }
    //Scene.player just died
    else if (Scene.player.health <= 0.0 && !Scene.endCredits) {
      Scene.clearObjects();
      Scene.player = null;
      Scene.gameOver = true;
    } else if (!Scene.endCredits) InterfaceOverlay.render();
    else InterfaceOverlay.renderCredits();

    window.requestAnimationFrame(Scene.render);
  }
}
