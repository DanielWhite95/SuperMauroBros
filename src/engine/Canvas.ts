import { Globals } from "./globals";
import * as utils from "../lib/utils";

export class Canvas {
  public static  init() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    document.body.style.overflow = "hidden";

    try {
      Globals.canvas = canvas;
      Globals.gl = canvas.getContext("webgl2");
    } catch (e) {
      console.log(e);
    }

    if (Globals.gl) {
      window.onresize = Canvas.onResize;
      Canvas.onResize();

      Globals.gl.enable(Globals.gl.CULL_FACE);
      Globals.gl.enable(Globals.gl.DEPTH_TEST);
      Globals.gl.cullFace(Globals.gl.BACK);

      Globals.gl.enable(Globals.gl.BLEND);
      Globals.gl.blendFunc(
        Globals.gl.SRC_ALPHA,
        Globals.gl.ONE_MINUS_SRC_ALPHA,
      );
    } else alert("Error: WebGL not supported by your browser!");
  }

  public static onResize() {
    Globals.canvas.width = window.innerWidth;
    Globals.canvas.height = window.innerHeight;
    Globals.canvas.style.left = "0";
    Globals.canvas.style.top = "0";
    Globals.canvas.style.position = "absolute";

    var w = Globals.canvas.clientWidth;
    var h = Globals.canvas.clientHeight;

    Globals.aspectRatio = w / h;

    Canvas.makePerspectiveMatrix();

    Globals.gl.viewport(0.0, 0.0, w, h);
    Globals.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    Globals.gl.clear(Globals.gl.COLOR_BUFFER_BIT | Globals.gl.DEPTH_BUFFER_BIT);
  }

  public static makePerspectiveMatrix() {
    Globals.perspectiveMatrix = utils.MakePerspective(
      60,
      Globals.aspectRatio,
      0.1,
      2000.0,
    );
  }
}
