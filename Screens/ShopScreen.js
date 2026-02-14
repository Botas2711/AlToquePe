import { StyleSheet, Text, View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import Search from "../Components/Search";
import CategoryItem from "../Components/CategoryItem";
import categories from "../Data/categories.json";
import allProducts from "../Data/products";
import ProductItem from "../Components/ProductItem";

const ShopScreen = () => {
  const allProductsOrder = allProducts.sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const [searchText, setSearchText] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(allProductsOrder);

  useEffect(() => {
    const filtered = allProductsOrder.filter((product) => {
      const lowerText = searchText.toLowerCase();
      const matchText =
        product.name.toLowerCase().includes(lowerText) ||
        product.brand.toLowerCase().includes(lowerText);

      const matchCategory = activeCategoryId
        ? product.categoryId === activeCategoryId
        : true;
      return matchText && matchCategory;
    });

    setFilteredProducts(filtered);
  }, [searchText, activeCategoryId]);

  const handlePress = (id) => {
    setActiveCategoryId((prevId) => (prevId === id ? null : id));
  };

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
            <Search onSearch={setSearchText} />

            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>Categorías</Text>

              <FlatList
                data={categories}
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

export default ShopScreen;

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 10,
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
