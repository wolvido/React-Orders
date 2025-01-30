import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Order Details', 'Add Items', 'Finalize'];
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View
            style={[
              styles.stepCircle,
              currentStep >= index + 1 ? styles.activeStep : styles.inactiveStep,
            ]}
          >
            <Text style={styles.stepText}>{index + 1}</Text>
          </View>
          {index < steps.length - 1 && (
            <View
              style={[
                styles.line,
                currentStep > index + 1 ? styles.activeLine : styles.inactiveLine,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
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
  line: {
    width: 50,
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
