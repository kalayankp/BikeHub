import React, { useState, useEffect, useContext, useRef } from 'react';
import { 
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BikeContext } from '../Context/BikeContext';

const headerImages = {
  All: require('../img/all.png'),
  Road: require('../img/road.png'),
  Mountain: require('../img/mountain.png'),
  Electric: require('../img/mountain.png'),
};

const heartIcon = require('../img/heart.png');
const menuIcon = require('../img/menu.png');
const likeIcon = require('../img/heart.png');

const BikeDetailsScreen = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { bikes, loading } = useContext(BikeContext);
  const [liked, setLiked] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

  const headerTranslateY = useRef(new Animated.Value(-100)).current;
  const headerScale = useRef(new Animated.Value(0.9)).current;

  const likeScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(colorAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(headerTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(headerScale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#e0f7fa']
  });

  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
  };

  const handleLikePress = () => {
    setLiked(!liked);
    Animated.sequence([
      Animated.spring(likeScale, {
        toValue: 1.2,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(likeScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      })
    ]).start();
  };

  const filteredBikes = bikes
    .filter(bike => selectedFilter === 'All' || bike.type === selectedFilter)
    .filter(bike => bike.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderBikeItem = ({ item }) => (
    <Animated.View 
      style={[styles.cardContainer, 
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
      ]} 
    >
      <Animated.View style={[styles.card, { backgroundColor }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Bikefilter', { bike: item })}>
          <Image source={item.image} style={styles.bikeImage} />
          <View style={styles.cardContent}>
            <Text style={styles.bikeName}>{item.name}</Text>
            <Text style={styles.bikePrice}>${item.price.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.likeButton} onPress={handleLikePress}>
            <Animated.Image
              source={likeIcon}
              style={[
                styles.likeIcon,
                {
                  tintColor: liked ? '#ff6f61' : '#888',
                  transform: [{ scale: likeScale }]
                }
              ]}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading bikes...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredBikes}
      renderItem={renderBikeItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.bikeList}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      columnWrapperStyle={styles.row}
      ListHeaderComponent={
        <Animated.View 
          style={[styles.header, 
            { transform: [{ translateY: headerTranslateY }, { scale: headerScale }] }
          ]}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={menuIcon} style={styles.menuIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Bike Shop</Text>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search bikes..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.filterContainer}>
            {['All', 'Road', 'Mountain', 'Electric'].map(filter => (
              <TouchableOpacity
                key={filter}
                style={[styles.filterButton, selectedFilter === filter && styles.selectedFilterButton]}
                onPress={() => handleFilterPress(filter)}
              >
                <Animated.Image
                  source={headerImages[filter]}
                  style={[
                    styles.filterImage,
                    selectedFilter === filter && styles.selectedFilterImage,
                    { transform: [{ scale: selectedFilter === filter ? 1.2 : 1 }] }
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      }
    />
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  header: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007bff',
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  searchContainer: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  searchInput: {
    height: 40,
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  filterButton: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectedFilterButton: {
    backgroundColor: '#007bff',
  },
  filterImage: {
    width: 30,
    height: 30,
  },
  selectedFilterImage: {
    tintColor: '#fff',
  },
  filterText: {
    marginLeft: 5,
    color: '#007bff',
  },
  selectedFilterText: {
    color: '#fff',
  },
  bikeList: {
    paddingBottom: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    flex: 1,
    margin: 5,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 10,
  },
  bikeImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  bikeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  bikePrice: {
    fontSize: 16,
    color: '#555',
  },
  likeButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  likeIcon: {
    width: 25,
    height: 25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#007bff',
  },
});

export default BikeDetailsScreen;
