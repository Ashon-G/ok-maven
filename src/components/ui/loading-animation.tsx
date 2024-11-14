"use client";

import React from 'react';
import Lottie from "lottie-react";

const animationData = {
  v: "5.5.7",
  fr: 29.9700012207031,
  ip: 0,
  op: 180.00000733155,
  w: 300,
  h: 300,
  nm: "Loading",
  ddd: 0,
  assets: [],
  layers: [{
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "Circle",
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: {
        a: 1,
        k: [{
          i: { x: [0.833], y: [0.833] },
          o: { x: [0.167], y: [0.167] },
          t: 0,
          s: [0]
        }, {
          t: 180.00000733155,
          s: [360]
        }]
      },
      p: { a: 0, k: [150, 150, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] }
    },
    ao: 0,
    shapes: [{
      ty: "gr",
      it: [{
        d: 1,
        ty: "el",
        s: { a: 0, k: [80, 80] },
        p: { a: 0, k: [0, 0] }
      }, {
        ty: "st",
        c: { a: 0, k: [0.2, 0.4, 1, 1] },
        o: { a: 0, k: 100 },
        w: { a: 0, k: 8 }
      }, {
        ty: "tr",
        p: { a: 0, k: [0, 0] },
        a: { a: 0, k: [0, 0] },
        s: { a: 0, k: [100, 100] },
        r: { a: 0, k: 0 },
        o: { a: 0, k: 100 }
      }]
    }],
    ip: 0,
    op: 180.00000733155,
    st: 0
  }]
};

interface LoadingAnimationProps {
  className?: string;
}

export const LoadingAnimation = ({ className = "" }: LoadingAnimationProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: 100, height: 100 }}
      />
    </div>
  );
};

export default LoadingAnimation;