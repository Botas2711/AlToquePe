import { StyleSheet, Text, View, FlatList } from "react-native";
import Header from "../Components/Header";
import ProductOffer from "../Components/ProductOffer";
import ProductOfferSlider from "../Components/ProductOfferSlider";

const Home = () => {
  return (
    <>
      <Header />
      <ProductOfferSlider/>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
