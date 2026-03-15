import { StyleSheet, Text, View, FlatList } from "react-native";
import ProductOfferSlider from "../Components/ProductOfferSlider";
import CategoryItem from "../Components/CategoryItem";
import { useState, useEffect, useCallback } from "react";
import ProductItem from "../Components/ProductItem";
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "../Services/shopService";
import { WIDTH, MARGIN, FONT, SPACING } from "../Global/layout";

const Home = ({ navigation }) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (categories?.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  const { data: products } = useGetProductsByCategoryQuery(selectedCategory, {
    skip: !selectedCategory,
  });

  const handlePress = (category) => {
    setSelectedCategory(category);
  };

  const categoriesPopulares = categories?.slice(0, 5) || [];

  const activeCategoryId = selectedCategory?.id;

  const renderItem = useCallback(
    ({ item }) => (
      <ProductItem
        product={item}
        onPress={() => navigation.navigate("ProductDetail", { product: item })}
      />
    ),
    [navigation],
  );

  return (
    <FlatList
      data={products}
      removeClippedSubviews={true}
      initialNumToRender={4}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContent}
      renderItem={renderItem}
      ListHeaderComponent={
        <View>
          <ProductOfferSlider navigation={navigation} />

          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>Categorías populares</Text>

            <View style={styles.categoryRow}>
              {categoriesPopulares.map((item) => (
                <CategoryItem
                  key={item.id}
                  category={item}
                  active={item.id === activeCategoryId}
                  onPress={() => setSelectedCategory(item)}
                />
              ))}
            </View>
          </View>
        </View>
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: SPACING.xl,
  },
  categoryContainer: {
    paddingVertical: SPACING.sm,
    marginTop: SPACING.sm,
  },
  categoryTitle: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.lg,
    marginHorizontal: MARGIN,
    marginBottom: SPACING.xs,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: MARGIN,
  },
  row: {
    justifyContent: "space-between",
    marginVertical: SPACING.sm,
    marginHorizontal: MARGIN,
  },
});
