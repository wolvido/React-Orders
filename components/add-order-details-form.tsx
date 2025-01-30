import * as React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';
import { ExternalPathString, RelativePathString, useRouter } from 'expo-router';

//replace this later
interface DummyFormModel {
    name: string;
    email: string;
}

function OrderDetailsForm() {

    const router = useRouter();

    //form Handling logic
    const [formData, setFormData] = useState<DummyFormModel>({
        name: '',
        email: ''
    });
    const handleInputChange = (field: keyof DummyFormModel, value: string) => {
        setFormData(prevData => ({
          ...prevData,
          [field]: value
        }));
      };

    const handleSubmit = () => {
        console.log('Form Data:', formData);
        console.log('Router object:', router);
        router.push('/(tabs)/(products)/products');
    };


  return (
    <View>
      <TextInput
        label="Name"
        value={formData.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />

      <TextInput
        label="Email"
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
        keyboardType="email-address"
      />

    <Button 
        mode="contained" 
        onPress={handleSubmit}
      >
        Submit
      </Button>

    </View>
  );
}

export default OrderDetailsForm;