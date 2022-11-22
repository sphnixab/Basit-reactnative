import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

const Header = () => {

  return (
    <View style={styles.container}>
      <Text style = {styles.title}>UPayments Store</Text>
      <TouchableOpacity>
        <Image style = {styles.icon} source={require('../assets/search.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    alignItems: 'center',
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontStyle: 'italic',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: -1 },
    shadowOpacity: 1,
    shadowRadius: 2,  
    elevation: 6
  },
  icon: {
    height: 20,
    width: 20,
    margin: 10
  }
});

export default Header;
