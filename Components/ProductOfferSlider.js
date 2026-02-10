import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import ProductOffer from "./ProductOffer";
import { useState } from "react";
import { colors } from "../Global/colors";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width - 32;

const ProductOfferSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const products = [
    {
      id: "1",
      brand: "Apple",
      title: "MacBook Air M4",
      oldPrice: 5299.0,
      newPrice: 4999.0,
      image: require("../assets/images/macBook.png"),
      color: "#D4EAF7",
    },
    {
      id: "2",
      brand: "Apple",
      title: "iPhone 17 Pro Max",
      oldPrice: 8999.0,
      newPrice: 5399.0,
      image: require("../assets/images/iphone.png"),
      color: "#FDECEC",
    },
    {
      id: "3",
      brand: "Apple",
      title: "AirPods Pro 3",
      oldPrice: 1299,
      newPrice: 949.99,
      image: require("../assets/images/airpods.png"),
      color: "#DFF3E3",
    },
  ];

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        style={styles.slide}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductOffer product={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
      <View style={styles.dotsContainer}>
        {products.map((_, index) => (
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
    marginTop: 20,
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
