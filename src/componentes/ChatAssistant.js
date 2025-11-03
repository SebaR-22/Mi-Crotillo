import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FloatingChatButton from './FloatingChatButton';

const ChatAssistant = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([{
    text: "¡Hola! 👋 Soy tu asistente virtual de MiBolsillo. Puedo ayudarte con:\n\n" +
          "• Encontrar funciones en la app 🔍\n" +
          "• Explicar cómo usar características 📱\n" +
          "• Responder preguntas sobre finanzas 💰\n" +
          "• Contactar al supervisor 👨‍💼\n\n" +
          "¿En qué puedo ayudarte hoy?",
    isUser: false,
    timestamp: new Date().toISOString()
  }]);
  const [inputText, setInputText] = useState('');
  
  const contactSupervisor = () => {
    Linking.openURL('https://wa.me/5492944364439');
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Agregar mensaje del usuario
    const userMessage = {
      text: inputText,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');

    try {
      if (inputText.toLowerCase().includes('supervisor') || 
          inputText.toLowerCase().includes('contactar') || 
          inputText.toLowerCase().includes('ayuda personal')) {
        // Respuesta para contacto con supervisor
        const assistantMessage = {
          text: "Por supuesto, puedes contactar al supervisor a través de WhatsApp haciendo clic aquí: \n\n" +
                "📱 +54 9 294 436-4439\n\n" +
                "(Toca el mensaje para abrir WhatsApp)",
          isUser: false,
          timestamp: new Date().toISOString(),
          isContactLink: true
        };
        setMessages(prevMessages => [...prevMessages, assistantMessage]);
        return;
      }

      // Llamada a la API
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();
      
      const assistantMessage = {
        text: data.response,
        isUser: false,
        timestamp: new Date().toISOString()
      };

      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      const errorMessage = {
        text: "Lo siento, parece que hay un problema de conexión. Por favor, intenta de nuevo más tarde.",
        isUser: false,
        timestamp: new Date().toISOString()
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  const renderMessage = (message, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.messageBox,
        message.isUser ? styles.userMessage : styles.assistantMessage,
      ]}
      onPress={() => message.isContactLink && contactSupervisor()}
    >
      <Text style={[
        styles.messageText,
        message.isUser ? styles.userMessageText : styles.assistantMessageText,
        message.isContactLink && styles.linkText
      ]}>
        {message.text}
      </Text>
      <Text style={styles.timestamp}>
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <FloatingChatButton onPress={() => setIsVisible(true)} />
      
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.chatContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setIsVisible(false)} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Asistente MiBolsillo</Text>
            </View>
            
            <ScrollView style={styles.messagesContainer}>
              {messages.map(renderMessage)}
            </ScrollView>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Escribe tu mensaje..."
                multiline
                maxLength={500}
              />
              <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                <Ionicons name="send" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#0084ff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  closeButton: {
    padding: 5,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  messageBox: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
    borderBottomRightRadius: 5,
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#fff',
  },
  assistantMessageText: {
    color: '#000',
  },
  linkText: {
    color: '#0084ff',
    textDecorationLine: 'underline',
  },
  timestamp: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#0084ff',
    width: 45,
    height: 45,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatAssistant;