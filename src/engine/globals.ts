export class Globals {
  public static gl: WebGLRenderingContext;
  public static canvas: HTMLCanvasElement;
  public static aspectRatio: number;
  public static basePath: string = `${window.location}`;
  public static perspectiveMatrix: number[];
  public static viewMatrix: number[];
  public static worldMatrix: number[];
  public static projectionMatrix: number[];

  //flag to show/hide bounding boxes of every object in the scene
  public static showBoundingBoxes: boolean = false;
  //flag to toggle fpcamera/lookatcamera, first person = true;
  public static cameraMode = true;
  public static gravityAccelY = -0.02;

  public static OBJModelsDir() {
    return Globals.basePath + 'models/'
  }

  public static shaderDir() {
    return Globals.basePath + "shaders/"
  }

  public static textureDir() {
    return Globals.basePath + "textures/"
  }

  public static requestCORSIfNotSameOrigin(img: HTMLImageElement, url: string) {
    if ((new URL(url)).origin !== window.location.origin) {
      img.crossOrigin = "";
    }
  }
}
