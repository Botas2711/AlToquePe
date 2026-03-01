import { StyleSheet, Text, View, FlatList } from "react-native";
import ProductOfferSlider from "../Components/ProductOfferSlider";
import CategoryItem from "../Components/CategoryItem";
import { useState, useEffect } from "react";
import ProductItem from "../Components/ProductItem";
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "../Services/shopService";

const Home = ({ navigation }) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (categories?.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  const { data: products } = useGetProductsByCategoryQuery(
    selectedCategory,
    {
      skip: !selectedCategory,
    },
  );

  const handlePress = (category) => {
    setSelectedCategory(category);
  };

  const categoriesPopulares = categories?.slice(0, 5) || [];

  const activeCategoryId = selectedCategory?.id;

  return (
    <>
      <FlatList
        data={products}
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
            <ProductOfferSlider navigation={navigation}/>

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
