import React from 'react';
import { FlatList, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { createBox, createText } from '@shopify/restyle';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@/theme/theme';

type Manga = {
  id: string;
  title: string;
  cover: string;
};

type MangaCarouselProps = {
  title?: string;
  mangas: Manga[];
};

const Box = createBox<Theme>();
const Text = createText<Theme>();

const MangaCarousel: React.FC<MangaCarouselProps> = ({ mangas }) => {
  const theme = useTheme();

  const renderItem = ({ item }: { item: Manga }) => (
    <TouchableWithoutFeedback onPress={() => console.log(item.id)}>
        <Box elevation={2}  marginRight="md" width={130}>
        <Image
            source={{ uri: item.cover }}
            style={[styles.image]}
        />
        <Text variant='body' style={[styles.title, { color: theme.colors.text }]}>{item.title || 'No title'}</Text>
        </Box>  
    </TouchableWithoutFeedback>
  );

  return (
    <Box>
        <Text style={{ marginLeft: 16}} variant="title" marginBottom="md">Manga Carousel</Text>
        <FlatList
            horizontal
            data={mangas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }} // Espaço à esquerda
        />
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MangaCarousel;
