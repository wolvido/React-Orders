import useOrientation from '../../../shared/hooks/orientation-hook';
import { RelativePathString, useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

interface Step {
  step: number;
  label: string;
}

interface StepIndicatorProps {
  currentStep: number;
  backPath?: RelativePathString;
  steps: Step[];
}

const StepIndicator = ({ currentStep, backPath, steps }: StepIndicatorProps) => {
  const router = useRouter();

  const isLandscape = useOrientation() === 'LANDSCAPE';
  
  const handleBack = () => {
    if (backPath) {
        router.push(backPath);
    }
  }

  return (
    <View style={[
      styles.outerContainer,
      isLandscape && styles.outerContainerLandscape
    ]}>
      {backPath && (
        <TouchableOpacity 
          onPress={handleBack} 
          style={[
            styles.backButton,
            isLandscape && styles.backButtonLandscape
          ]}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      )}

      <View style={[
        styles.stepsContainer,
        !backPath && { paddingLeft: 50 },
        isLandscape && styles.stepsContainerLandscape
      ]}>
        {steps.map((step, index) => (
          <View key={index} style={[
            styles.stepContainer,
            isLandscape && styles.stepContainerLandscape
          ]}>

            <View style={[
              styles.stepWrapper,
              isLandscape && styles.stepWrapperLandscape
            ]}>

              <View
                style={[
                  styles.stepCircle,
                  currentStep >= step.step ? styles.activeStep : styles.inactiveStep,
                ]}
              >
                <Text style={styles.stepText}>{step.step}</Text>
              </View>

              {isLandscape && (
                <Text style={[
                  styles.stepLabelLandscape,
                  currentStep >= step.step && styles.activeLabel
                ]}>{step.label}</Text>
              )}

              {!isLandscape && (
                  <Text style={[
                    styles.stepLabel,
                    currentStep >= step.step && styles.activeLabel
                  ]}>{step.label}</Text>
                )}
            </View>

            {index < steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  currentStep > step.step ? styles.activeLine : styles.inactiveLine,
                  isLandscape && styles.lineLandscape
                ]}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
    height: 'auto',
    marginBottom: 15, //15 -5
  },
  stepsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 33, //33
    paddingRight: 50,
  },
  backButton: {
    width: 33,
    height: 33,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    lineHeight: 25, //back arrow vertical position
    paddingBottom: 4,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepWrapper: {
    alignItems: 'center',
    position: 'relative',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStep: {
    backgroundColor: '#4CAF50',
  },
  inactiveStep: {
    backgroundColor: '#ccc',
  },
  stepText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepLabel: {
    fontSize: 18,
    color: '#666',
    position: 'absolute', 
    top: 30,
    width: '1000%', // ensures text exceed container when needed
    textAlign: 'center',
  },
  line: {
    width: 150,
    height: 2,
    backgroundColor: '#ccc',
  },
  activeLine: {
    backgroundColor: '#4CAF50',
  },
  inactiveLine: {
    backgroundColor: '#ccc',
  },
  outerContainerLandscape: {
    marginVertical: 3
  },
  backButtonLandscape: {
    marginBottom: -14,
  },
  stepsContainerLandscape: {
    height: 33,
    marginBottom: -14,
    marginTop: 2,
  },
  stepContainerLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepWrapperLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  stepLabelLandscape: {
    fontSize: 18,
    color: '#666',
    marginLeft: 8,
    textAlign: 'right',
  },
  lineLandscape: {
    width: 100,
    marginHorizontal: 8,
  },
  activeLabel: {
    color: '#4CAF50',  // Same green as the active step circles
  },
});

export default StepIndicator;
