"use client"

import React from 'react';
import Lottie from "lottie-react";

const animationData = {"assets":[{"id":"5","layers":[{"ind":4,"ty":4,"ks":{},"ip":0,"op":312.4,"st":0,"shapes":[{"ty":"rc","p":{"a":0,"k":[22,45]},"r":{"a":0,"k":0},"s":{"a":0,"k":[44,90]}},{"ty":"fl","c":{"a":0,"k":[0,0,0,0]},"o":{"a":0,"k":0}}]},{"ind":0,"ty":4,"ks":{"s":{"a":0,"k":[133.33,133.33]}},"ip":0,"op":312.4,"st":0,"shapes":[{"ty":"gr","it":[{"ty":"gr","it":[{"ty":"sh","ks":{"a":0,"k":{"c":true,"i":[[0,0],[2.3,0],[1.63,1.59],[0,2.3],[-1.58,1.58],[-2.3,0],[-1.59,-1.63],[0,-2.3],[1.63,-1.63]],"o":[[-1.59,1.59],[-2.3,0],[-1.58,-1.63],[0,-2.3],[1.63,-1.63],[2.3,0],[1.63,1.58],[0,2.3],[0,0]],"v":[[16.63,63.95],[10.8,66.33],[4.89,63.95],[2.52,58.05],[4.89,52.22],[10.8,49.77],[16.63,52.22],[19.08,58.05],[16.63,63.95]]}}},{"ty":"fl","c":{"a":0,"k":[0.04,0.38,1,1]},"o":{"a":0,"k":100}},{"ty":"tr","o":{"a":0,"k":100}}]},{"ty":"tr","o":{"a":0,"k":100}}]}]}]};

export const LoadingAnimation = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
};

export default LoadingAnimation;