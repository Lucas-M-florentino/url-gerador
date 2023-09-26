import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert} from 'react-native';
import * as Clipboard from "expo-clipboard";

export default function App() {
  const [url, setUrl] = useState('');
  const [urlFinal, setUrlFinal] = useState('');

  const short = () => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      Alert.alert('Erro', 'A URL deve começar com http:// ou https://');
      return;
    }

    const tinyUrlApi = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;

    fetch(tinyUrlApi)
      .then(response => response.text())
      .then(data => {
        if (data.startsWith('http')) {
          setUrlFinal(data);
        } else {
          alert('Erro', 'Erro ao encurtar a URL');
        }
      })
      .catch(error => {
        console.error('Erro ao encurtar a URL:', error);
        alert('Erro', 'Erro ao encurtar a URL');
      });
  }
  
  const copyUrl = async () => {
    await Clipboard.setStringAsync(urlFinal);
    alert('Sucesso', 'URL copiada com sucesso');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>
          URL
          <Text style={{ color: '#1076F7' }}> Encurtador</Text>
        </Text>
        <TextInput
          style={styles.urlInput}
          onChangeText={texto => setUrl(texto)}
          value={url}
          placeholder="Digite a URL..."
        />
        <TouchableOpacity onPress={() => short()} style={styles.shortBtn}>
          <Text style={{ color: '#fff' }}>Encurtar</Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={ urlFinal ? copyUrl : () => {}}>

        <Text style={styles.finalUrl}>{urlFinal}</Text>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    color: '#21243d',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
  },
  urlInput: {
    height: 50,
    width: '80%',
    borderColor: '#21243d',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fafafa',
    marginBottom: 20,
    fontSize: 20,
  },
  shortBtn: {
    backgroundColor: '#ff7c7c',
    borderRadius: 20,
    height: 40,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalUrl: {
    height: 40,
    width: '80%',
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
  },
});
