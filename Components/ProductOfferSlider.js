import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import ProductOffer from "./ProductOffer";
import { useState } from "react";
import { colors } from "../Global/colors";
import { useGetProductsQuery } from "../Services/shopService";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width - 32;

const ProductOfferSlider = ({ navigation }) => {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const productsForSlider = products.filter(
    (product) => product.isOffer === true,
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        style={styles.slide}
        data={productsForSlider}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductOffer
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetail", { product: item })
            }
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
      <View style={styles.dotsContainer}>
        {productsForSlider.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default ProductOfferSlider;

const styles = StyleSheet.create({
  slide: {
    marginTop: 25,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.disable,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.text,
    width: 11,
  },
});
