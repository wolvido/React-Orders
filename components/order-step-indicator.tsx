import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { number: 1, label: 'Order Details' },
    { number: 2, label: 'Add Items' },
    { number: 3, label: 'Finalize' }
  ];

  const handleBack = () => {
    if (currentStep > 1) {
      window.history.back();
    }
  };

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
                  currentStep >= step.number ? styles.activeStep : styles.inactiveStep,
                ]}
              >
                <Text style={styles.stepText}>{step.number}</Text>
              </View>
              <Text style={styles.stepLabel}>{step.label}</Text>
            </View>
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  currentStep > step.number ? styles.activeLine : styles.inactiveLine,
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
  },
  stepsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,  // This helps center it vertically
    paddingBottom: 2, // Fine-tune the position
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepWrapper: {
    alignItems: 'center',
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
  },
  stepLabel: {
    fontSize: 12,
    color: '#666'
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
