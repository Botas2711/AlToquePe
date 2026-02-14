import {
  StyleSheet,
  Text,
  View,
  FlatList
} from "react-native";
import ProductOfferSlider from "../Components/ProductOfferSlider";
import CategoryItem from "../Components/CategoryItem";
import { useState, useEffect } from "react";
import categories from "../Data/categories.json";
import allProducts from "../Data/products";
import ProductItem from "../Components/ProductItem";

const HomeScreen = () => {
  const [activeCategoryId, setActiveCategoryId] = useState("1");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handlePress = (id) => {
    setActiveCategoryId(id);
  };

  useEffect(() => {
    const activeCategory = categories.find(
      (cat) => cat.id === activeCategoryId,
    );
    const filtered = allProducts.filter(
      (product) => product.categoryId === activeCategory.id,
    );
    setFilteredProducts(filtered);
  }, [activeCategoryId]);

  return (
    <>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <ProductItem product={item} />}
        ListHeaderComponent={
          <>
            <ProductOfferSlider />

            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>Categorías populares</Text>

              <FlatList
                data={categories.slice(0, 5)}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <CategoryItem
                    category={item}
                    active={item.id === activeCategoryId}
                    onPress={handlePress}
                  />
                )}
              />
            </View>
          </>
        }
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 10,
    marginTop: 15,
  },
  categoryTitle: {
    fontFamily: "QuickSand-Bold",
    fontSize: 16,
    marginHorizontal: 18,
    marginBottom: 2,
  },
  productList: {
    marginHorizontal: 10,
  },
  row: {
    justifyContent: "space-between",
    marginVertical: 5,
    marginHorizontal: 7,
  },
});
