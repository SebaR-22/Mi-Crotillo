import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatAssistant from '../../componentes/ChatAssistant';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <ChatAssistant />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ChatScreen;