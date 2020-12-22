import React, { useRef, useEffect, useState, useCallback } from 'react';
import { load as loadModel, startVideo, Prediction, ObjectDetection } from 'handtrackjs';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';

import { FixedArray } from '../../types/FixedArray';

export const modelParams = {
  flipHorizontal: false, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for (maybe) gains in speed.
  maxNumBoxes: 2, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.79, // confidence threshold for predictions.
};

export type Gesture = 'SwipeUp' | 'SwipeDown' | 'SwipeLeft' | 'SwipeRight' | 'HandsUp';
export interface Point {
  x: number;
  y: number;
}

export const emptyPoint = { x: NaN, y: NaN };
export const swipeSensitivity = 20; // in px
export const detectionInterval = 50; // in ms
export const videoWidth = 600; // in px
export const videoHeight = (videoWidth / 16) * 9;
export const gestureCooldownMS = 1500;

interface Props {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onHandsUp?: () => void;
}

export const HandDetector: React.FC<Props> = ({ onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onHandsUp }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [model, setModel] = useState<ObjectDetection>();
  const [hand1Position, setHand1Position] = useState<Point>(emptyPoint);
  const [hand2Position, setHand2Position] = useState<Point>(emptyPoint);

  const [isGestureCooldown, setIsGestureCooldown] = useState(false);

  const [prevHand1Positions, setPrevHand1Positions] = useState<FixedArray<Point, 3>>([
    emptyPoint,
    emptyPoint,
    emptyPoint,
  ]);

  const runDetection = useCallback(() => {
    if (!model) return;
    try {
      model
        .detect(videoRef.current)
        .then((predictions: Array<Prediction>) => {
          if (predictions.length) {
            // if hands on screen - set coords
            const [x1, y1] = predictions[0].bbox;
            const [x2, y2] = predictions[1] ? predictions[1].bbox : [];
            setHand1Position({ x: Math.round(x1), y: Math.round(y1) });
            setHand2Position({ x: Math.round(x2), y: Math.round(y2) });
          } else {
            // else - remove coords
            setHand1Position(emptyPoint);
            setHand2Position(emptyPoint);
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
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

  useEffect(() => {
    setPrevHand1Positions((value) => [value[1], value[2], hand1Position]);
  }, [setPrevHand1Positions, hand1Position]);

  const setGestureCooldown = useCallback(() => {
    setIsGestureCooldown(true);
    setTimeout(() => setIsGestureCooldown(false), gestureCooldownMS);
  }, [setIsGestureCooldown]);

  const processGesture = useCallback(
    (gesture: Gesture) => {
      if (isGestureCooldown) return;
      if (gesture === 'SwipeDown' && onSwipeDown) onSwipeDown();
      if (gesture === 'SwipeUp' && onSwipeUp) onSwipeUp();
      if (gesture === 'SwipeRight' && onSwipeRight) onSwipeRight();
      if (gesture === 'SwipeLeft' && onSwipeLeft) onSwipeLeft();
      if (gesture === 'HandsUp' && onHandsUp) onHandsUp();
      setGestureCooldown();
    },
    [isGestureCooldown, onSwipeDown, onSwipeUp, onSwipeLeft, onSwipeRight, onHandsUp, setGestureCooldown],
  );

  // swipes
  useEffect(() => {
    const swipeDown = prevHand1Positions.every((point, index, arr) => {
      if (index === 0) return true;
      return point.y - arr[index - 1].y >= swipeSensitivity;
    });

    const swipeUp = prevHand1Positions.every((point, index, arr) => {
      if (index === 0) return true;
      return arr[index - 1].y - point.y >= swipeSensitivity;
    });

    const swipeLeft = prevHand1Positions.every((point, index, arr) => {
      if (index === 0) return true;
      return point.x - arr[index - 1].x >= swipeSensitivity;
    });

    const swipeRight = prevHand1Positions.every((point, index, arr) => {
      if (index === 0) return true;
      return arr[index - 1].x - point.x >= swipeSensitivity;
    });

    if (swipeDown) processGesture('SwipeDown');
    if (swipeUp) processGesture('SwipeUp');
    if (swipeRight) processGesture('SwipeRight');
    if (swipeLeft) processGesture('SwipeLeft');
  }, [prevHand1Positions, processGesture]);

  // hands up
  useEffect(() => {
    if (!isNaN(hand1Position.x + hand1Position.y) && !isNaN(hand2Position.x + hand2Position.y)) {
      processGesture('HandsUp');
    }
  }, [hand1Position, hand2Position, processGesture]);

  if (errorMessage) {
    return <ErrorMessage severity="error">{errorMessage}</ErrorMessage>;
  }

  return (
    <Container>
      <video ref={videoRef} width={videoWidth} height={videoHeight} />
      {loading && <div>Loading...</div>}
    </Container>
  );
};

const Container = styled.div`
  height: ${videoHeight}px;
  width: ${videoWidth}px;
`;

const ErrorMessage = styled(Alert)`
  margin: 20px;
`;

export default HandDetector;
