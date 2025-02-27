import React, { useEffect, useState, useRef } from 'react';

function CameraPermission() {
  const [error, setError] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        setError('Permission denied or no media devices found.');
        console.error("Error accessing media devices:", err);
      });
  }, []);

  const videoStyles = {
    position: 'fixed',
    top: '10px',
    right: '10px',
    width: '150px',
    height: '100px',
    border: '2px solid #ccc',
    borderRadius: '8px',
    zIndex: 1000,
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <video ref={videoRef} autoPlay style={videoStyles} />
    </div>
  );
}

export default CameraPermission;
