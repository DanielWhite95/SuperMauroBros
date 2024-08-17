import { SimpleMaterial } from "../Materials";
import { Globals } from "../globals"
import { Scene } from "../Scene";
import { BoundingBox} from "../BoundingBox";
import * as utils from "../../lib/utils";

export class Object3D {
  mesh;
  health;
  parent;
  x;
  y;
  z;
  rotx;
  roty;
  rotz;

  //scale
  scaleX;
  scaleY;
  scaleZ;

  //speed
  speedX;
  speedY;
  speedZ;

  // collisons
  collisionX;
  collisionY;
  collisionZ;

  // penetration
  penetrationX;
  penetrationY;
    penetrationZ;

  //boolean flags
  enGravity;
  enPhysics;
  visible;
  avoideProjectiles;
  changeBBColor;
  collisionObjects;
  colliding;
  material;

  boundingBoxes;
  objects;

  constructor(mesh = null, material = null) {
    //reference to a loaded mesh
    this.mesh = mesh;

    this.health = 1.0;

    //hierarchy
    this.parent = null;

    //position
    this.x = 0;
    this.y = 0;
    this.z = 0;

    //rotation
    this.rotx = 0;
    this.roty = 0;
    this.rotz = 0;

    //scale
    this.scaleX = 1.0;
    this.scaleY = 1.0;
    this.scaleZ = 1.0;

    //speed
    this.speedX = 0;
    this.speedY = 0;
    this.speedZ = 0;

    //boolean flags
    this.enGravity = false;
    this.enPhysics = false;
    this.visible = true;
    this.avoideProjectiles = false;
    this.changeBBColor = false; //must be only active on one objects

    //Object3D list
    //objects in the array are collision-checked against this
    this.collisionObjects = [];
    this.colliding = false;

    if (material) this.material = material;
    else this.material = new SimpleMaterial(20, 20, 20, 255);

    //support multiple bounding boxes
    this.boundingBoxes = [];

    //if no bounding box file specified, creates a single default bbox that fills the whole mesh inside
    if (this.mesh != null && this.mesh.bBoxesPositions == null) {
      //computes a default bbox centred in the center of the mesh
      var minX = mesh.positions[0];
      var maxX = mesh.positions[0];
      var minY = mesh.positions[1];
      var maxY = mesh.positions[1];
      var minZ = mesh.positions[2];
      var maxZ = mesh.positions[2];
      //computes bounding box coords
      for (var i = 0; i < mesh.positions.length; i += 3) {
        if (mesh.positions[i] < minX) minX = mesh.positions[i];
        if (mesh.positions[i] > maxX) maxX = mesh.positions[i];

        if (mesh.positions[i + 1] < minY) minY = mesh.positions[i + 1];
        if (mesh.positions[i + 1] > maxY) maxY = mesh.positions[i + 1];

        if (mesh.positions[i + 2] < minZ) minZ = mesh.positions[i + 2];
        if (mesh.positions[i + 2] > maxZ) maxZ = mesh.positions[i + 2];
      }
      //computes center of the mesh (in case it's not the origin)
      var cX = (maxX - minX) / 2.0 + minX;
      var cY = (maxY - minY) / 2.0 + minY;
      var cZ = (maxZ - minZ) / 2.0 + minZ;

      this.boundingBoxes[0] = new BoundingBox(
        cX,
        cY,
        cZ,
        minX,
        maxX,
        minY,
        maxY,
        minZ,
        maxZ,
      );
      this.boundingBoxes[0].update(
        this.x,
        this.y,
        this.z,
        this.scaleX,
        this.scaleY,
        this.scaleZ,
        this.roty,
      );
    }
    //bounding boxes specified, creates bounding boxes from bBoxPositions
    else if (this.mesh != null) {
      var bBoxesCount = this.mesh.bBoxesPositions.length / (24 * 3);
      var indicesCount = this.mesh.bBoxesPositions / bBoxesCount;

      console.log(mesh.bBoxesPositions);
      console.log(mesh.bBoxesIndices);

      for (var i = 0; i < bBoxesCount; i++) {
        //computes i bbox coords
        var minX = mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i] * 3];
        var maxX = mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i] * 3];
        var minY = mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i] * 3 + 1];
        var maxY = mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i] * 3 + 1];
        var minZ = mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i] * 3 + 2];
        var maxZ = mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i] * 3 + 2];
        //computes bounding box coords
        for (var j = 0; j < 36; j++) {
          if (mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i + j] * 3] < minX)
            minX = mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i + j] * 3];
          if (mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i + j] * 3] > maxX)
            maxX = mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i + j] * 3];

          if (
            mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i + j] * 3 + 1] < minY
          )
            minY = mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i + j] * 3 + 1];
          if (
            mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i + j] * 3 + 1] > maxY
          )
            maxY = mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i + j] * 3 + 1];

          if (
            mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i + j] * 3 + 2] < minZ
          )
            minZ = mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i + j] * 3 + 2];
          if (
            mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i + j] * 3 + 2] > maxZ
          )
            maxZ = mesh.bBoxesPositions[mesh.bBoxesIndices[36 * i + j] * 3 + 2];
        }

        //computes center of the current bbox
        var cX = (maxX - minX) / 2.0 + minX;
        var cY = (maxY - minY) / 2.0 + minY;
        var cZ = (maxZ - minZ) / 2.0 + minZ;

        this.boundingBoxes[i] = new BoundingBox(
          cX,
          cY,
          cZ,
          minX,
          maxX,
          minY,
          maxY,
          minZ,
          maxZ,
        );
        this.boundingBoxes[i].update(
          this.x,
          this.y,
          this.z,
          this.scaleX,
          this.scaleY,
          this.scaleZ,
          this.roty,
        );
      }
    }
    //no mesh
    else this.boundingBoxes[0] = new BoundingBox(0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  public addToScene() {
    Scene.addObject3D(this);
  }

  public removeFromScene() {
    Scene.removeObject3D(this);
  }

  ////
  ////		SETTERS/GETTERS
  ////____________________________

  public setPosition(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.updateBoundingBoxes(
      this.x,
      this.y,
      this.z,
      this.scaleX,
      this.scaleY,
      this.scaleZ,
      this.roty,
    );
  }

  public move(x, y, z) {
    this.x += x;
    this.y += y;
    this.z += z;
    this.updateBoundingBoxes(
      this.x,
      this.y,
      this.z,
      this.scaleX,
      this.scaleY,
      this.scaleZ,
      this.roty,
    );
  }

  public setRotation(x, y, z) {
    this.rotx = x;
    this.roty = y;
    this.rotz = z;
  }

  public rotate(x, y, z) {
    this.rotx += x;
    this.roty += y;
    this.rotz += z;
  }

  public setScale(x, y, z) {
    this.scaleX = x;
    this.scaleY = y;
    this.scaleZ = z;
  }

  public setSpeed(x, y, z) {
    this.speedX = x;
    this.speedY = y;
    this.speedZ = z;
  }

  public enablePhysics(boolean) {
    this.enPhysics = boolean;
  }

  public enableGravity(boolean) {
    this.enGravity = boolean;
  }

  public setVisible(boolean) {
    this.visible = boolean;
  }

  public setParent(object) {
    this.parent = object;
  }

  public setMaterial(material) {
    this.material = material;
  }

  public getWorldPosition() {
    return this.recursivePositionTransform([this.x, this.y, this.z, 1.0]);
  }

  ///			BOUNDING BOXES
  ///________________________________

  public updateBoundingBoxes(x, y, z, scaleX, scaleY, scaleZ, roty) {
    for (var i = 0; i < this.boundingBoxes.length; i++)
      this.boundingBoxes[i].update(x, y, z, scaleX, scaleY, scaleZ, roty);
  }

  ///			RECURSIVE HIERARCHY
  ///______________________________

  public recursivePositionTransform(position) {
    if (this.parent != null) {
      var parentWorldMat = utils.MakeWorld_(
        this.parent.x,
        this.parent.y,
        this.parent.z,
        this.parent.rotx,
        this.parent.roty,
        this.parent.rotz,
        this.parent.scaleX,
        this.parent.scaleY,
        this.parent.scaleZ,
      );

      var transformedPosition = utils.multiplyMatrixVector(
        parentWorldMat,
        position,
      );

      return this.parent.recursivePositionTransform(transformedPosition);
    } else return position;
  }

  public recursiveRotationTransform(rotation) {
    if (this.parent != null)
      return this.parent.recursiveRotationTransform([
        rotation[0] + this.parent.rotx,
        rotation[1] + this.parent.roty,
        rotation[2] + this.parent.rotz,
      ]);
    else return rotation;
  }

  public recursiveScaleTransform(scale) {
    if (this.parent != null)
      return this.parent.recursiveScaleTransform([
        scale[0] * this.parent.scaleX,
        scale[1] * this.parent.scaleY,
        scale[2] * this.parent.scaleZ,
      ]);
    else return scale;
  }

  ////_____________________________________

  public render() {
    //values that needs to be recursivley modified by hierarchy
    var transormedPos = this.recursivePositionTransform([
      this.x,
      this.y,
      this.z,
      1.0,
    ]);
    var transormedRot = this.recursiveRotationTransform([
      this.rotx,
      this.roty,
      this.rotz,
    ]);
    var transormedSca = this.recursiveScaleTransform([
      this.scaleX,
      this.scaleY,
      this.scaleZ,
    ]);

    this.updateBoundingBoxes(
      transormedPos[0],
      transormedPos[1],
      transormedPos[2],
      transormedSca[0],
      transormedSca[1],
      transormedSca[2],
      transormedRot[1],
    );

    //renders bounding box
    if (Globals.showBoundingBoxes)
      for (var i = 0; i < this.boundingBoxes.length; i++)
        this.boundingBoxes[i].render();
    //doesn't render invisible objects
    else if (this.visible) {
      //renders object
      var worldMatrix = utils.MakeWorld_(
        transormedPos[0],
        transormedPos[1],
        transormedPos[2],
        transormedRot[0],
        transormedRot[1],
        transormedRot[2],
        transormedSca[0],
        transormedSca[1],
        transormedSca[2],
      );

      this.material.bindShader();
      if (this.mesh != null)
        this.mesh.render(worldMatrix, this.material.shader);
    }
  }

  ////
  ////		COLLISIONS AND PHYSICS
  ////____________________________

  //boolean collision check
  public checkCollision(object, bBoxNum) {
    return this.boundingBoxes[0].checkCollision(object.boundingBoxes[bBoxNum]);
  }

  public enableCollisionWith(objects) {
    this.collisionObjects = objects;
  }

  public solveCollisions() {
    for (var i = 0; i < this.collisionObjects.length; i++) {
      //doens't collide with itself
      if (this.collisionObjects[i] != this) {
        for (
          var bBoxNum = 0;
          bBoxNum < this.collisionObjects[i].boundingBoxes.length;
          bBoxNum++
        ) {
          if (this.changeBBColor)
            this.collisionObjects[i].boundingBoxes[bBoxNum].setColor(
              this.collisionObjects[i].boundingBoxes[bBoxNum].nonCollidedColor,
            );

          if (this.checkCollision(this.collisionObjects[i], bBoxNum)) {
            if (this.changeBBColor)
              this.collisionObjects[i].boundingBoxes[bBoxNum].setColor(
                this.collisionObjects[i].boundingBoxes[bBoxNum].collidedColor,
              );

            this.solveCollision(this.collisionObjects[i], bBoxNum);
          }
        }
      }
    }
  }

  //solve the collision for this object using the handler of the collided object
  public solveCollision(object, bBoxNum) {
    object.collisionHandler(this, bBoxNum);
  }

  //defines the reponse of this object when another objects collides with it
  //can be override
  //default acts as a rigid body that stops colliding objects
  public collisionHandler(object, bboxNum) {
    object.colliding = true;

    //collision from y++
    if (
      object.boundingBoxes[0].maxY >= this.boundingBoxes[bboxNum].maxY &&
      object.boundingBoxes[0].minY <= this.boundingBoxes[bboxNum].maxY &&
      object.speedY <= 0
    ) {
      object.collisionY = true;
      object.collisionYUp = true;
      object.penetrationY =
        this.boundingBoxes[bboxNum].maxY - object.boundingBoxes[0].minY;
    } else {
      //collision from x++
      if (
        object.boundingBoxes[0].maxX >= this.boundingBoxes[bboxNum].maxX &&
        object.boundingBoxes[0].minX <= this.boundingBoxes[bboxNum].maxX &&
        object.speedX < 0
      )
        object.collisionX = true;

      //collision from x--
      if (
        object.boundingBoxes[0].maxX >= this.boundingBoxes[bboxNum].minX &&
        object.boundingBoxes[0].minX <= this.boundingBoxes[bboxNum].minX &&
        object.speedX > 0
      )
        object.collisionX = true;

      //collision from z++
      if (
        object.boundingBoxes[0].maxZ >= this.boundingBoxes[bboxNum].maxZ &&
        object.boundingBoxes[0].minZ <= this.boundingBoxes[bboxNum].maxZ &&
        object.speedZ < 0
      )
        object.collisionZ = true;

      //collision from z--
      if (
        object.boundingBoxes[0].maxZ >= this.boundingBoxes[bboxNum].minZ &&
        object.boundingBoxes[0].minZ <= this.boundingBoxes[bboxNum].minZ &&
        object.speedZ > 0
      )
        object.collisionZ = true;
    }

    //collision from y--
    if (
      object.boundingBoxes[0].maxY >= this.boundingBoxes[bboxNum].minY &&
      object.boundingBoxes[0].minY <= this.boundingBoxes[bboxNum].minY &&
      object.speedY > 0
    )
      object.collisionY = true;
  }

  //to override
  public preUpdate() {}

  //update physics
  public update() {
    this.preUpdate();
    this.colliding = false;

    //gravity
    if (this.enGravity) {
      this.speedY += Globals.gravityAccelY;
    }

    if (this.enPhysics) {
      //collisions
      if (this.collisionX) this.speedX = 0;
      if (this.collisionY) {
        this.speedY = 0;
        this.y += this.penetrationY;
      }
      if (this.collisionZ) this.speedZ = 0;

      this.collisionX = false;
      this.collisionY = false;
      this.collisionZ = false;

      //update position
      this.x += this.speedX;
      this.y += this.speedY;
      this.z += this.speedZ;
    }

    this.updateBoundingBoxes(
      this.x,
      this.y,
      this.z,
      this.scaleX,
      this.scaleY,
      this.scaleZ,
      this.roty,
    );
  }

  //to override
  public damage(val) {}
}
