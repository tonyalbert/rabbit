import { useState } from 'react';
import { TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { createBox, createText, useTheme } from '@shopify/restyle';
import { Theme } from '@/theme/theme';

const Box = createBox<Theme>();
const Text = createText<Theme>();

type InputProps = TextInputProps & {
  placeholder: string;
  type?: 'text' | 'password' | 'email' | 'phone' | 'number' | 'search';
};

export default function Input({ placeholder, type = 'text', ...props }: InputProps) {
  const theme = useTheme<Theme>();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <Box
      padding="sm"
      paddingHorizontal="md"
      //backgroundColor="white"
      borderWidth={1}
      borderColor="gray"
      borderRadius={8}
      marginBottom="md"
      flexDirection="row"
      alignItems="center"
    >
      <TextInput
        secureTextEntry={type === 'password' && !showPassword}
        keyboardType={
          type === 'email' ? 'email-address' :
          type === 'phone' ? 'phone-pad' :
          type === 'number' ? 'numeric' : 
          'default'
        }
        placeholder={placeholder}
        style={{ fontSize: 14, color: theme.colors.gray, flex: 1 }}
        {...props}
      />

      {type === 'password' && (
        <TouchableOpacity onPress={handleTogglePassword}>
          <Text variant="body" color="gray">
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </Text>
        </TouchableOpacity>
      )}
    </Box>
  );
}
