import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import ProductOfferSlider from "./ProductOfferSlider";
import CategoryItem from "./CategoryItem";
import { useState, useEffect } from "react";
import categories from "../Data/categories.json";
import allProducts from "../Data/products";
import ProductItem from "./ProductItem";
import { colors } from "../Global/colors";

const { width } = Dimensions.get("window");

const QuickBrowser = () => {
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
      (product) => product.category === activeCategory.name,
    );
    setFilteredProducts(filtered);
  }, [activeCategoryId]);

  return (
    <View>
      <ProductOfferSlider />
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Categorias populares</Text>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => (
            <CategoryItem
              category={item}
              active={item.id === activeCategoryId}
              onPress={handlePress}
            />
          )}
        />
      </View>
      <View>
        <FlatList
          style={styles.productList}
          data={filteredProducts}
          renderItem={({ item }) => <ProductItem product={item} />}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.row}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default QuickBrowser;

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 10,
    marginTop: 15,
  },
  categoryTitle: {
    fontFamily: "QuickSand-Bold",
    fontSize: 15,
    marginHorizontal: 18,
    marginBottom: 2,
  },
  productList:{
    marginHorizontal: 10,
  }

});
