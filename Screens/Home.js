import { StyleSheet, Text, View, FlatList } from "react-native";
import Header from "../Components/Header";
import { useState } from "react";
import ProductOffer from "../Components/ProductOffer";
import ProductOfferSlider from "../Components/ProductOfferSlider";
import CategoryItem from "../Components/CategoryItem";
import categories from "../Data/categories.json";

const Home = () => {
  const [activeCategoryId, setActiveCategoryId] = useState("1");

  const handlePress = (id) => {
    setActiveCategoryId(id);
  };

  return (
    <>
      <Header />
      <ProductOfferSlider />
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryItem
            category={item}
            active={item.id === activeCategoryId}
            onPress={handlePress}
          />
        )}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
