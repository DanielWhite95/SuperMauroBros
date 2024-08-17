import { OBJ } from "webgl-obj-loader";
import { Globals } from "./globals";
import * as utils from "../lib/utils";

export class Mesh {
  //factory for creating mesh from .obj file
  positions: any;
  positionBuffer: any;
  normalBuffer: any;
  textCoordBuffer: any;
  indexBuffer: any;
  bBoxesPositions: any;
  bBoxesIndices: any;

  public static loadFromOBJFile(
    modelFile: string,
    boundingBoxesFile: string = null,
  ) {
    var modelObj, bBoxObj;

    //load model
    utils.loadFile(Globals.OBJModelsDir() + modelFile, 0, function (fileText) {
      modelObj = new OBJ.Mesh(fileText);
      OBJ.initMeshBuffers(Globals.gl, modelObj);
    });

    var bBoxesPositions = null;
    var bBoxesIndices = null;

    if (boundingBoxesFile) {
      //load bounding boxes
      utils.loadFile(Globals.OBJModelsDir() + boundingBoxesFile, 0, function (fileText) {
        bBoxObj = new OBJ.Mesh(fileText);
        bBoxesPositions = bBoxObj.vertices;
        bBoxesIndices = bBoxObj.indices;
      });
    }

    return new Mesh(
      modelObj.vertices,
      modelObj.vertexBuffer,
      modelObj.normalBuffer,
      modelObj.textureBuffer,
      modelObj.indexBuffer,
      bBoxesPositions,
      bBoxesIndices,
    );
  }

  //creates a mesh
  public constructor(
    positions,
    positionBuffer,
    normalBuffer,
    textCoordBuffer,
    indexBuffer,
    bBoxesPositions,
    bBoxesIndices,
  ) {
    this.positions = positions;
    this.positionBuffer = positionBuffer;
    this.normalBuffer = normalBuffer;
    this.textCoordBuffer = textCoordBuffer;
    this.indexBuffer = indexBuffer;
    this.bBoxesPositions = bBoxesPositions;
    this.bBoxesIndices = bBoxesIndices;
  }

  //draws the mesh
  public render(worldMatrix, shader) {
    shader.use();

    var matrix = utils.multiplyMatrices(Globals.projectionMatrix, worldMatrix); // world matrix
    Globals.gl.uniformMatrix4fv(
      shader.getMatrixLocation(),
      false,
      utils.transposeMatrix(matrix),
    );

    var WVMatrix = utils.multiplyMatrices(Globals.viewMatrix, worldMatrix); // world view matrix
    var nMatrix = utils.invertMatrix(utils.transposeMatrix(WVMatrix));
    Globals.gl.uniformMatrix4fv(
      shader.getWorldViewMatrixLocation(),
      false,
      utils.transposeMatrix(WVMatrix),
    );
    Globals.gl.uniformMatrix4fv(
      shader.getNormalMatrixLocation(),
      false,
      utils.transposeMatrix(nMatrix),
    );

    //positions
    Globals.gl.bindBuffer(Globals.gl.ARRAY_BUFFER, this.positionBuffer);
    Globals.gl.vertexAttribPointer(
      shader.getPositionsLocation(),
      this.positionBuffer.itemSize,
      Globals.gl.FLOAT,
      false,
      0,
      0,
    );

    //normals
    Globals.gl.bindBuffer(Globals.gl.ARRAY_BUFFER, this.normalBuffer);
    Globals.gl.vertexAttribPointer(
      shader.getNormalsLocation(),
      this.normalBuffer.itemSize,
      Globals.gl.FLOAT,
      false,
      0,
      0,
    );

    //uv
    if (shader.getUVsLocation() != -1) {
      Globals.gl.bindBuffer(Globals.gl.ARRAY_BUFFER, this.textCoordBuffer);
      Globals.gl.vertexAttribPointer(
        shader.getUVsLocation(),
        this.textCoordBuffer.itemSize,
        Globals.gl.FLOAT,
        false,
        0,
        0,
      );
    }

    //rendering
    Globals.gl.bindBuffer(Globals.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    Globals.gl.drawElements(
      Globals.gl.TRIANGLES,
      this.indexBuffer.numItems,
      Globals.gl.UNSIGNED_SHORT,
      0,
    );
  }
}
