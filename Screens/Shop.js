import { StyleSheet, Text, View, FlatList } from "react-native";
import { useState, useEffect, useMemo } from "react";
import Search from "../Components/Search";
import CategoryItem from "../Components/CategoryItem";
import ProductItem from "../Components/ProductItem";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
} from "../Services/shopService";

const Shop = ({ navigation }) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState("");

  const { data: allProducts = [], isLoading: loadingAll } = useGetProductsQuery(
    undefined,
    {
      skip: !!selectedCategory,
    },
  );

  const { data: categoryProducts = [], isLoading: loadingCategory } =
    useGetProductsByCategoryQuery(selectedCategory, {
      skip: !selectedCategory,
    });

  const products = selectedCategory ? categoryProducts : allProducts;

  const activeCategoryId = selectedCategory?.id;
  const allProductsOrder = [...products].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const filteredProducts = useMemo(() => {
    return products
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter((product) => {
        const lowerText = searchText.toLowerCase();

        return (
          product.name.toLowerCase().includes(lowerText) ||
          product.brand.toLowerCase().includes(lowerText)
        );
      });
  }, [products, searchText]);

  const handlePress = (category) => {
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

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

export default Shop;

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
