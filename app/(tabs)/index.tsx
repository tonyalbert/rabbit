import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { logout } from '@/services/auth';
import { router } from 'expo-router';
import Button from '@/components/ui/Button';
import Screen from '@/components/ui/Screen';
import { mangaDexApi } from '@/services/mangaDex';
import MangaCarousel from '@/components/MangaCarousel'; // Importando o carrossel

export default function Home() {
  const { user, loading } = useContext(AuthContext);
  const [isMounted, setIsMounted] = useState(false);
  const [tags, setTags] = useState([]);
  const [mangas, setMangas] = useState([]);

  const fetchData = async () => {
    try {
      // Fetch tags list from MangaDex API
      const dataTags = await mangaDexApi.getTags();
      setTags(dataTags);

      // Fetch manga list from MangaDex API
      const dataMangas = await mangaDexApi.getMangaList();
      setMangas(dataMangas);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && !user && isMounted) {
      setTimeout(() => {
        router.replace('/auth/login');
      }, 0);
    }
  }, [loading, user, isMounted]);

  if (loading || !user) return null;

  return (
    <Screen>

      <MangaCarousel mangas={mangas} />
      <Button title="Sair" onPress={logout} />

    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
