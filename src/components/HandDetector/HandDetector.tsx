import React, { useRef, useEffect, useState, useCallback } from 'react';
import { load as loadModel, startVideo, Prediction, ObjectDetection } from 'handtrackjs';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';

export const modelParams = {
  flipHorizontal: false, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for (maybe) gains in speed.
  maxNumBoxes: 2, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.79, // confidence threshold for predictions.
};

export const detectionInterval = 50; // in ms

export interface Point {
  x?: number;
  y?: number;
}

export const HandDetector: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [model, setModel] = useState<ObjectDetection>();
  const [hand1Position, setHand1Position] = useState<Point>({});
  const [hand2Position, setHand2Position] = useState<Point>({});

  const runDetection = useCallback(() => {
    if (!model) return;
    model.detect(videoRef.current).then((predictions: Array<Prediction>) => {
      if (predictions.length) {
        // if hands on screen - set coords
        const [x1, y1] = predictions[0].bbox;
        const [x2, y2] = predictions[1] ? predictions[1].bbox : [];
        setHand1Position({ x: Math.round(x1), y: Math.round(y1) });
        setHand2Position({ x: Math.round(x2), y: Math.round(y2) });
      } else {
        // else - remove coords
        setHand1Position({});
        setHand2Position({});
      }
    });
  }, [model]);

  useEffect(() => {
    loadModel(modelParams).then((loadedModel: ObjectDetection) => {
      setModel(loadedModel);
    });
  }, []);

  useEffect(() => {
    if (errorMessage) return;
    // start video on component mounting
    startVideo(videoRef.current)
      .then((status: boolean) => {
        if (status) {
          navigator.getUserMedia(
            { video: {} },
            (stream) => {
              if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setLoading(false);
                setInterval(runDetection, detectionInterval);
              }
            },
            (error) => {
              setErrorMessage(error.message);
            },
          );
        } else {
          setErrorMessage('Camera is not found. Please give the site access to the camera');
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [runDetection, setLoading, setErrorMessage, errorMessage]);

  if (errorMessage) {
    return <ErrorMessage severity="error">{errorMessage}</ErrorMessage>;
  }

  return (
    <>
      <video ref={videoRef} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <span>
            Hand1
            <div>x: {hand1Position.x}</div>
            <div>y: {hand1Position.y}</div>
          </span>
          <span>
            Hand2
            <div>x: {hand2Position.x}</div>
            <div>y: {hand2Position.y}</div>
          </span>
        </>
      )}
    </>
  );
};

const ErrorMessage = styled(Alert)`
  margin: 20px;
`;

export default HandDetector;
