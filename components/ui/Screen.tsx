import { SafeAreaView } from 'react-native-safe-area-context';
import { createBox } from '@shopify/restyle';
import { Theme } from '@/theme/theme';
import { ReactNode } from 'react';

const Box = createBox<Theme>();

type ScreenProps = {
  children: ReactNode;
  backgroundColor?: keyof Theme['colors'];
  padding?: keyof Theme['spacing'];
  paddingHorizontal?: keyof Theme['spacing'];
  paddingVertical?: keyof Theme['spacing'];
};

export default function Screen({ children, backgroundColor = 'background', padding = 'none' }: ScreenProps) {
  return (
    <Box flex={1} backgroundColor={backgroundColor}>
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex={1} padding={padding}>
          {children}
        </Box>
      </SafeAreaView>
    </Box>
  );
}
