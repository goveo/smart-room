declare module 'handtrackjs' {
  export interface ObjectDetection {
    fps: number;
    modelPath: string;
    weightPath: string;
    modelParams: ModelParams;
    model: object;
    detect: (video: HTMLVideoElement | null) => Promise<Prediction[]>;
  }

  export interface ModelParams {
    flipHorizontal: boolean;
    outputStride?: number;
    imageScaleFactor: number;
    maxNumBoxes: number;
    iouThreshold: number;
    scoreThreshold: number;
    modelType?: string;
  }

  export type Prediction = {
    bbox: Array<number>;
  };

  export const load = (params: ModelParams): Promise<ObjectDetection> => Promise;
  export const startVideo = (video: HTMLVideoElement | null): Promise<boolean> => Promise;

  export default {
    load,
    startVideo,
  };
}
