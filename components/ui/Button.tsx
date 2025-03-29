import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { createBox, createText, useTheme } from '@shopify/restyle';
import { Theme } from '@/theme/theme';

const Box = createBox<Theme>();
const Text = createText<Theme>();

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export default function Button({ title, onPress, loading = false, disabled = false }: ButtonProps) {
  const theme = useTheme<Theme>();

  const isDisabled = loading || disabled;

  return (
    <TouchableOpacity disabled={isDisabled} onPress={onPress} style={{ opacity: isDisabled ? 0.6 : 1 }}>
      <Box 
        backgroundColor={isDisabled ? 'gray' : 'primary'} 
        padding="md" 
        borderRadius={8} 
        alignItems="center" 
        justifyContent="center"
        flexDirection="row"
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.white} />
        ) : (
          <Text variant="body" color="white">{title}</Text>
        )}
      </Box>
    </TouchableOpacity>
  );
}
