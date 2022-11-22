/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import Webservice from '../webservice/Webservice';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [addCategories, setAddCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [detailItem, setDetailItem] = useState(null);

  const [addItemModal, setAddItem] = useState(false);

  const [selectedCategoryAddItem, setSelectedCategoryAddItem] = useState(-1);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');

  useEffect(() => {
    Webservice.getCategories(responseJson => {
      if (!!responseJson.categories) {
        setCategories([{id: 0, name: 'All'}, ...responseJson.categories]);
        setAddCategories(responseJson.categories);
      }
    });

    Webservice.getProducts(responseJson => {
      console.log(responseJson);
      if (!!responseJson.products) {
        setProducts(responseJson.products);
        setFilteredProducts(responseJson.products);
      }
    });
  }, []);

  const addItemApi = () => {
    Webservice.addItem({
      Name: title,
      Price: price,
      Category: selectedCategoryAddItem != -1 ? addCategories[selectedCategoryAddItem]._id : "",
      Description: description,
      Avatar: imageLink,
      DeveloperEmail: ''
    }, (responseJson) => {
      alert(JSON.stringify(responseJson))
      if(responseJson.statusCode == 200) {
        setAddItem(false)
      }
    })
  }

  const categoryItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.categoryView,
          {backgroundColor: selectedCategory == index ? '#fff' : '#000'},
        ]}
        onPress={() => {
          setSelectedCategory(index);
          if (item.id == 0) {
            setFilteredProducts(products);
          } else {
            let filteredProducts = products.filter(
              e => item.name == e.category,
            );
            setFilteredProducts(filteredProducts);
          }
        }}>
        <Text
          style={[
            styles.categoryTitle,
            {color: selectedCategory == index ? '#000' : '#fff'},
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const categoryAddItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.categoryView,
          {backgroundColor: selectedCategoryAddItem == index ? '#000' : '#fff'},
        ]}
        onPress={() => {
          setSelectedCategoryAddItem(index);
        }}>
        <Text
          style={[
            styles.categoryTitle,
            {color: selectedCategoryAddItem == index ? '#fff' : '#000'},
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const productItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.productView}
        onPress={() => {
          setDetailItem(item);
        }}>
        <Image
          style={{flex: 1, margin: 15, resizeMode: 'contain'}}
          source={{uri: item.avatar}}
        />
        <View
          style={{
            backgroundColor: '#000',
            borderRadius: 10,
          }}>
          <Text
            style={[
              styles.categoryTitle,
              {marginTop: 2, fontSize: 14, color: '#fff'},
            ]}>
            {item.name}
          </Text>
          <Text
            style={[
              styles.categoryTitle,
              {marginBottom: 2, fontSize: 14, color: '#fff'},
            ]}>
            ${item.price}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View
        style={{
          height: 60,
        }}>
        <FlatList horizontal data={categories} renderItem={categoryItem} />
      </View>
      <FlatList
        style={{
          flex: 1,
        }}
        numColumns={2}
        data={filteredProducts}
        renderItem={productItem}
      />

      <TouchableOpacity
        style={{
          height: 60,
          width: 60,
          borderRadius: 30,
          backgroundColor: '#fff',
          position: 'absolute',
          right: 15,
          bottom: 50,
          borderWidth: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          setAddItem(true);
        }}>
        <Image
          source={require('../assets/plus-icon.png')}
          style={{
            height: 40,
            width: 40,
          }}
        />
      </TouchableOpacity>

      <Modal visible={detailItem != null}>
        <SafeAreaView
          style={{
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={() => {
              setDetailItem(null);
            }}>
            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                margin: 15,
              }}
              source={require('../assets/left-arrow.png')}
            />
          </TouchableOpacity>
          <ScrollView
            style={{
              flex: 1,
            }}
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: '100%',
                  height: '50%',
                  resizeMode: 'contain',
                }}
                source={{uri: detailItem?.avatar}}
              />
              <View
                style={{
                  backgroundColor: '#000',
                  paddingVertical: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  flex: 1,
                  width: '100%',
                  marginTop: 15,

                  shadowColor: '#000',
                  shadowOffset: {width: 1, height: -2},
                  shadowOpacity: 0.5,
                  shadowRadius: 3,
                  elevation: 6,
                }}>
                <Text
                  style={[
                    styles.categoryTitle,
                    {fontWeight: '700', width: '90%', color: '#fff'},
                  ]}>
                  {detailItem?.name}
                </Text>
                <Text
                  style={[
                    styles.categoryTitle,
                    {marginTop: 5, fontSize: 14, color: '#fff'},
                  ]}>
                  {detailItem?.description}
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal visible={addItemModal}>
        <SafeAreaView
          style={{
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={() => {
              setAddItem(false);
            }}>
            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                margin: 15,
              }}
              source={require('../assets/left-arrow.png')}
            />
          </TouchableOpacity>
          <ScrollView
            style={{
              flex: 1,
            }}
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 15,
              }}>
              <TextInput
                style={{
                  height: 45,
                  borderRadius: 10,
                  borderWidth: 1.2,
                  paddingHorizontal: 15,
                }}
                placeholder="Product title"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={{
                  height: 45,
                  borderRadius: 10,
                  borderWidth: 1.2,
                  paddingHorizontal: 15,
                  marginTop: 15,
                }}
                keyboardType='decimal-pad'
                value={price}
                placeholder="Price"
                onChangeText={setPrice}
              />
              <TextInput
                style={{
                  height: 80,
                  borderRadius: 10,
                  borderWidth: 1.2,
                  paddingHorizontal: 15,
                  marginTop: 15,
                }}
                numberOfLines={0}
                multiline
                value={description}
                placeholder="Description"
                onChangeText={setDescription}
              />
              <TextInput
                style={{
                  height: 45,
                  borderRadius: 10,
                  borderWidth: 1.2,
                  paddingHorizontal: 15,
                  marginTop: 15,
                }}
                value={imageLink}
                placeholder="Image Link"
                onChangeText={setImageLink}
              />

              <Text
                style={{
                  marginTop: 15,
                  fontSize: 17,
                }}>
                Selected Category: {selectedCategoryAddItem != -1 ? addCategories[selectedCategoryAddItem].name : ""}
              </Text>
              <FlatList
                horizontal
                style={{
                  marginTop: 15,
                }}
                data={addCategories}
                renderItem={categoryAddItem}
              />

              <TouchableOpacity
                style={{
                  backgroundColor: '#000',
                  height: 40,
                  width: 150,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  alignSelf: 'center'
                }}
                onPress={addItemApi}>
                <Text style={[styles.categoryTitle, {color: '#fff'}]}>
                  Add Product
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryTitle: {
    marginHorizontal: 15,
    fontSize: 18,
    fontWeight: '600',
  },
  categoryView: {
    borderRadius: 7,
    borderWidth: 2,
    paddingVertical: 7,
    height: 40,
    marginHorizontal: 10,
  },

  productView: {
    borderRadius: 10,
    backgroundColor: '#fff',
    aspectRatio: 0.9,
    flex: 1,

    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 6,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
});

export default Home;
