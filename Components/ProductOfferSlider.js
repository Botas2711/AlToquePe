import { StyleSheet, Text, View, FlatList } from "react-native";
import ProductOffer from "./ProductOffer";
import React from "react";

const ProductOfferSlider = () => {
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
      title: "iPhone 17 Pro Max 256GB",
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
  return (
    <>
      <FlatList
        style={styles.slide}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductOffer product={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      />
    </>
  );
};

export default ProductOfferSlider;

const styles = StyleSheet.create({
  slide: {
    marginLeft: 16,
    marginTop: 15
  },
});
