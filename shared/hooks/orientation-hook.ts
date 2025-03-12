import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

const useOrientation = () => {
  const [orientation, setOrientation] = useState<'PORTRAIT' | 'LANDSCAPE'>('PORTRAIT');

  // Function to determine the current orientation
  const getOrientation = () => {
    const { width, height } = Dimensions.get('window');
    return width > height ? 'LANDSCAPE' : 'PORTRAIT';
  };

  useEffect(() => {
    // Set initial orientation
    setOrientation(getOrientation());

    // Allow all orientations
    (async () => {
      await ScreenOrientation.unlockAsync();
    })();

    // Listen for orientation changes
    const subscription = Dimensions.addEventListener('change', () => {
      setOrientation(getOrientation());
    });

    // Cleanup
    return () => {
      subscription.remove();
    };
  }, []);

  return orientation;
};

export default useOrientation;
