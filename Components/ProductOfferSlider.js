import { StyleSheet, Text, View, FlatList } from "react-native";
import ProductOffer from "./ProductOffer";
import { useState } from "react";
import { colors } from "../Global/colors";
import { useGetProductsQuery } from "../Services/shopService";
import { WIDTH, MARGIN, SPACING, SLIDER_HEIGHT } from "../Global/layout";

const SLIDER_WIDTH = WIDTH - MARGIN * 2;

const ProductOfferSlider = ({ navigation }) => {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const productsForSlider = products.filter(
    (product) => product.isOffer === true,
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SLIDER_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
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
        scrollEventThrottle={16}
        snapToInterval={SLIDER_WIDTH + MARGIN * 2}
        decelerationRate="fast"
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
  container: {
    marginTop: SPACING.lg,
    height: SLIDER_HEIGHT + SPACING.xl,
  },
  slide: {
    marginTop: 25,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING.md,
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
