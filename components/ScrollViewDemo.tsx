import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const categories = [
  { id: 1, name: 'Electronics', icon: 'devices', iconFamily: 'MaterialIcons' },
  { id: 2, name: 'Fashion', icon: 'shirt', iconFamily: 'Ionicons' },
  { id: 3, name: 'Home', icon: 'home', iconFamily: 'MaterialIcons' },
  { id: 4, name: 'Sports', icon: 'football', iconFamily: 'Ionicons' },
];

const featuredProducts = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, icon: 'headset', iconFamily: 'MaterialIcons', rating: 4.5 },
  { id: 2, name: 'Smart Watch', price: 199.99, icon: 'watch', iconFamily: 'Ionicons', rating: 4.8 },
  { id: 3, name: 'Laptop Stand', price: 49.99, icon: 'laptop', iconFamily: 'MaterialIcons', rating: 4.3 },
  { id: 4, name: 'USB-C Cable', price: 12.99, icon: 'flash', iconFamily: 'Ionicons', rating: 4.6 },
];

const products = [
  { id: 5, name: 'Running Shoes', price: 89.99, icon: 'walk', iconFamily: 'Ionicons', rating: 4.7 },
  { id: 6, name: 'Backpack', price: 45.99, icon: 'bag', iconFamily: 'Ionicons', rating: 4.4 },
  { id: 7, name: 'Water Bottle', price: 19.99, icon: 'water', iconFamily: 'Ionicons', rating: 4.2 },
  { id: 8, name: 'Yoga Mat', price: 29.99, icon: 'yoga', iconFamily: 'MaterialCommunityIcons', rating: 4.5 },
  { id: 9, name: 'Desk Lamp', price: 34.99, icon: 'lightbulb', iconFamily: 'MaterialIcons', rating: 4.3 },
  { id: 10, name: 'Plant Pot', price: 15.99, icon: 'leaf', iconFamily: 'Ionicons', rating: 4.1 },
];

// Helper function to render the appropriate icon
const renderIcon = (iconFamily: string, iconName: string, size: number, color: string) => {
  switch (iconFamily) {
    case 'MaterialIcons':
      return <MaterialIcons name={iconName as any} size={size} color={color} />;
    case 'Ionicons':
      return <Ionicons name={iconName as any} size={size} color={color} />;
    case 'FontAwesome5':
      return <FontAwesome5 name={iconName as any} size={size} color={color} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />;
    default:
      return <MaterialIcons name="help" size={size} color={color} />;
  }
};

export default function ScrollViewDemo() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Welcome to Our Shop</Text>
        <Text style={styles.bannerSubtitle}>Discover amazing products at great prices</Text>
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryIcon}>
                {renderIcon(category.iconFamily, category.icon, 36, '#4A90E2')}
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.featuredScroll}
        >
          {featuredProducts.map((product) => (
            <TouchableOpacity key={product.id} style={styles.featuredCard}>
              <View style={styles.productImageContainer}>
                {renderIcon(product.iconFamily, product.icon, 48, '#4A90E2')}
              </View>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.productInfo}>
                <Text style={styles.productPrice}>${product.price}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFB800" />
                  <Text style={styles.productRating}>{product.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* All Products Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Products</Text>
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard}>
              <View style={styles.productImageContainer}>
                {renderIcon(product.iconFamily, product.icon, 40, '#4A90E2')}
              </View>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.productInfo}>
                <Text style={styles.productPrice}>${product.price}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={12} color="#FFB800" />
                  <Text style={styles.productRating}>{product.rating}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.addToCartButton}>
                <MaterialIcons name="shopping-cart" size={16} color="#fff" />
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Thank you for shopping with us!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  banner: {
    backgroundColor: '#4A90E2',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
    color: '#333',
  },
  categoriesScroll: {
    paddingLeft: 16,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  featuredScroll: {
    paddingLeft: 16,
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  productRating: {
    fontSize: 12,
    color: '#666',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addToCartButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  footer: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
});
