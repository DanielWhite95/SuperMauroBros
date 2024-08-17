"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mesh = void 0;
var webgl_obj_loader_1 = require("webgl-obj-loader");
var globals_1 = require("./globals");
var utils = require("../lib/utils");
var Mesh = /** @class */ (function () {
    //creates a mesh
    function Mesh(positions, positionBuffer, normalBuffer, textCoordBuffer, indexBuffer, bBoxesPositions, bBoxesIndices) {
        this.positions = positions;
        this.positionBuffer = positionBuffer;
        this.normalBuffer = normalBuffer;
        this.textCoordBuffer = textCoordBuffer;
        this.indexBuffer = indexBuffer;
        this.bBoxesPositions = bBoxesPositions;
        this.bBoxesIndices = bBoxesIndices;
    }
    Mesh.loadFromOBJFile = function (modelFile, boundingBoxesFile) {
        if (boundingBoxesFile === void 0) { boundingBoxesFile = null; }
        var modelObj, bBoxObj;
        //load model
        utils.loadFile(globals_1.Globals.OBJModelsDir() + modelFile, 0, function (fileText) {
            modelObj = new webgl_obj_loader_1.OBJ.Mesh(fileText);
            webgl_obj_loader_1.OBJ.initMeshBuffers(globals_1.Globals.gl, modelObj);
        });
        var bBoxesPositions = null;
        var bBoxesIndices = null;
        if (boundingBoxesFile) {
            //load bounding boxes
            utils.loadFile(globals_1.Globals.OBJModelsDir() + boundingBoxesFile, 0, function (fileText) {
                bBoxObj = new webgl_obj_loader_1.OBJ.Mesh(fileText);
                bBoxesPositions = bBoxObj.vertices;
                bBoxesIndices = bBoxObj.indices;
            });
        }
        return new Mesh(modelObj.vertices, modelObj.vertexBuffer, modelObj.normalBuffer, modelObj.textureBuffer, modelObj.indexBuffer, bBoxesPositions, bBoxesIndices);
    };
    //draws the mesh
    Mesh.prototype.render = function (worldMatrix, shader) {
        shader.use();
        var matrix = utils.multiplyMatrices(globals_1.Globals.projectionMatrix, worldMatrix); // world matrix
        globals_1.Globals.gl.uniformMatrix4fv(shader.getMatrixLocation(), false, utils.transposeMatrix(matrix));
        var WVMatrix = utils.multiplyMatrices(globals_1.Globals.viewMatrix, globals_1.Globals.worldMatrix); // world view matrix
        var nMatrix = utils.invertMatrix(utils.transposeMatrix(WVMatrix));
        globals_1.Globals.gl.uniformMatrix4fv(shader.getWorldViewMatrixLocation(), false, utils.transposeMatrix(WVMatrix));
        globals_1.Globals.gl.uniformMatrix4fv(shader.getNormalMatrixLocation(), false, utils.transposeMatrix(nMatrix));
        //positions
        globals_1.Globals.gl.bindBuffer(globals_1.Globals.gl.ARRAY_BUFFER, this.positionBuffer);
        globals_1.Globals.gl.vertexAttribPointer(shader.getPositionsLocation(), this.positionBuffer.itemSize, globals_1.Globals.gl.FLOAT, false, 0, 0);
        //normals
        globals_1.Globals.gl.bindBuffer(globals_1.Globals.gl.ARRAY_BUFFER, this.normalBuffer);
        globals_1.Globals.gl.vertexAttribPointer(shader.getNormalsLocation(), this.normalBuffer.itemSize, globals_1.Globals.gl.FLOAT, false, 0, 0);
        //uv
        if (shader.getUVsLocation() != -1) {
            globals_1.Globals.gl.bindBuffer(globals_1.Globals.gl.ARRAY_BUFFER, this.textCoordBuffer);
            globals_1.Globals.gl.vertexAttribPointer(shader.getUVsLocation(), this.textCoordBuffer.itemSize, globals_1.Globals.gl.FLOAT, false, 0, 0);
        }
        //rendering
        globals_1.Globals.gl.bindBuffer(globals_1.Globals.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        globals_1.Globals.gl.drawElements(globals_1.Globals.gl.TRIANGLES, this.indexBuffer.numItems, globals_1.Globals.gl.UNSIGNED_SHORT, 0);
    };
    return Mesh;
}());
exports.Mesh = Mesh;
