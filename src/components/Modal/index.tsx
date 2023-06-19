import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface Props {
  isVisible?: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function ModalBox({ isVisible, children, onClose }: Props) {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onClose()}
    >
      <TouchableOpacity style={styles.modalContent} onPress={() => onClose()}>
        <TouchableWithoutFeedback>
          <View  >{children}</View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : "#00000047",

  },
});