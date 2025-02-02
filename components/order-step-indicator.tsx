import { RelativePathString, useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

//this component is not recommended to be used directly
//but rather to be used by a context

interface Step {
  step: number;
  label: string;
}

interface StepIndicatorProps {
  currentStep: number;
  backPath: RelativePathString;
  steps: Step[];  // New prop for steps
}

const StepIndicator = ({ currentStep, backPath, steps }: StepIndicatorProps) => {
  const router = useRouter();
  
  const handleBack = () => {
    if (currentStep > 1) {
        router.push(backPath);
    }
  }

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity 
        onPress={handleBack} 
        style={[
          styles.backButton,
          { opacity: currentStep > 1 ? 1 : 0.5 }
        ]}
        disabled={currentStep <= 1}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <View style={styles.stepWrapper}>
              <View
                style={[
                  styles.stepCircle,
                  currentStep >= step.step ? styles.activeStep : styles.inactiveStep,
                ]}
              >
                <Text style={styles.stepText}>{step.step}</Text>
              </View>
              <Text style={styles.stepLabel} >{step.label}</Text>
            </View>
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  currentStep > step.step ? styles.activeLine : styles.inactiveLine,
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
    marginVertical: 20,
    height: 'auto',
    marginBottom: 30,
  },
  stepsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
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
    lineHeight: 20,  // This helps center it vertically
    paddingBottom: 4, // Fine-tune the position
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepWrapper: {
    alignItems: 'center',
    paddingTop: 10,
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
});

export default StepIndicator;
