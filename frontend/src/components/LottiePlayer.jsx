import React, { useEffect } from 'react';

const LottiePlayer = () => {
  useEffect(() => {
    // Dynamically import the Lottie player script in React.
    import('@dotlottie/player-component');
  }, []);

  return (
    <div>
      <dotlottie-player
        src="https://lottie.host/d3c3b4b5-a24f-4091-8712-aec2a19ed83f/kxWl8JQZP8.json"
        background="transparent"
        speed="1"
        style={{ width: '300px', height: '300px' }}
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
};

export default LottiePlayer;
