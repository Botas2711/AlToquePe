import { StyleSheet, Text, View, FlatList } from "react-native";
import ProductOfferSlider from "../Components/ProductOfferSlider";
import CategoryItem from "../Components/CategoryItem";
import { useState, useEffect } from "react";
import ProductItem from "../Components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { setHomeSelectedCategory } from "../Store/features/Shop/shopSlice";

const Home = ({ navigation }) => {
  const categories = useSelector((state) => state.shop.categories);
  const categoriesPopulares = categories.slice(0, 5);

  const products = useSelector((state) => state.shop.products);
  const selectedCategory = useSelector((state) => state.shop.homeSelectedCategory);

  const dispatch = useDispatch();

  const activeCategoryId = selectedCategory?.id;

  const [filteredProducts, setFilteredProducts] = useState([]);

  const handlePress = (category) => {
    dispatch(setHomeSelectedCategory(category));
  };

  useEffect(() => {
    if (!selectedCategory) return;

    const filtered = products.filter(
      (product) => product.categoryId === selectedCategory.id,
    );

    setFilteredProducts(filtered);
  }, [selectedCategory]);

  return (
    <>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetail", { product: item })
            }
          />
        )}
        ListHeaderComponent={
          <>
            <ProductOfferSlider />

            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>Categorías populares</Text>

              <FlatList
                data={categoriesPopulares}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <CategoryItem
                    category={item}
                    active={item.id === activeCategoryId}
                    onPress={() => handlePress(item)}
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

export default Home;

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
