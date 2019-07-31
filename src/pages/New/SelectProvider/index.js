import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/Components/Background';

import { Container, ProviderList, Provider, Avatar, Name } from './styles';
import api from '~/services/api';

export default function SelectProvider({ navigation }) {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');
      setProviders(response.data);
    }
    loadProviders();
  }, []);
  return (
    <Background>
      <Container>
        <ProviderList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({ item }) => (
            <Provider
              onPress={() => {
                navigation.navigate('SelectDatetime', { item });
              }}
            >
              <Avatar
                source={{
                  uri: item.avatar
                    ? item.avatar.url.replace('localhost', '192.168.0.104')
                    : `https://api.adorable.io/avatars/120/${item.name}.png`,
                }}
              />
              <Name>{item.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}

SelectProvider.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o prestador',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
