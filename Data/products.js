import ChanelN5 from "../assets/images/chanelN5.png";
import DiorAddict from "../assets/images/diorAddict.png";
import Bombshell from "../assets/images/bombshell.png";
import LoveSpell from "../assets/images/lovespell.png";
import VerySexy from "../assets/images/verysexy.png";
import LancomeIdole from "../assets/images/lancomeIdole.png";
import MacRubyWoo from "../assets/images/macRuby.png";
import EsteeLauderAdvanced from "../assets/images/esteeLauder.png";

import NikeShirt from "../assets/images/nikeShirt.png";
import NikeShort from "../assets/images/nikeShort.png";
import AdidasShorts from "../assets/images/adidasShort.png";
import AdidasShirt from "../assets/images/adidasShirt.png";
import ZaraMidi from "../assets/images/zaraMidi.png";
import ZaraNylon from "../assets/images/zaraNylon.png";
import ZaraTop from "../assets/images/zaraTop.png";
import MangoShort from "../assets/images/mangoShort.png";
import GuessShort from "../assets/images/guessValentina.png";
import LevisCasaca from "../assets/images/levisCasaca.png";
import HmBlusa from "../assets/images/hmBlusa.png";
import BalenciagaChaqueta from "../assets/images/balenciagaChaqueta.png";
import BalenciagaCamiseta from "../assets/images/balenciagaCamiseta.png";
import PradaPantalon from "../assets/images/pradaVaquero.png";
import HmCargo from "../assets/images/hmCargo.png";
import HmPolo from "../assets/images/hmPolo.png";
import HmVintage from "../assets/images/hmOversize.png";

import OsterArrocera from "../assets/images/osterArrocera.png";
import OsterCafetera from "../assets/images/osterCafetera.png";
import OsterLicuadora from "../assets/images/osterLicuadora.png";
import PhilipsFreidora from "../assets/images/philipsFreidora.png";
import LgMicroondas from "../assets/images/lgMicroondas.png";

import BeastAudio from "../assets/images/beatsAudio.png";
import SamsungS24 from "../assets/images/samsungS24.png";
import SonyAudifonos from "../assets/images/sonyAudio.png";
import AppleMac from "../assets/images/macBook.png";
import AppleIphone from "../assets/images/iphone.png";
import AppleAirPods from "../assets/images/airpods.png";
import HuaweiWatch from "../assets/images/huaweiReloj.png";
import SonyTV from "../assets/images/sonyTv.png";

import AdidasF50 from "../assets/images/adidasF50.png";
import AdidasPredator from "../assets/images/adidasPredator.png";
import NikeVapor from "../assets/images/nikeVapor.png";
import NikeKM from "../assets/images/nikeKM.png";
import NikeMedia from "../assets/images/nikeMedias.png";
import AdidasPelota from "../assets/images/adidasPelota.png";
import NikeAL from "../assets/images/nikeAL.png";

const products = [
  {
    id: "1",
    name: "Chanel N°5 Eau de Parfum",
    categoryId: "1",
    oldPrice: 150.0,
    newPrice: 135.0,
    brand: "Chanel",
    image: ChanelN5,
  },
  {
    id: "2",
    name: "Dior Addict Lipstick",
    categoryId: "1",
    oldPrice: 40.0,
    newPrice: null,
    brand: "Dior",
    image: DiorAddict,
  },
  {
    id: "3",
    name: "Bombshell Eau de Parfum",
    categoryId: "1",
    oldPrice: 120.0,
    newPrice: 99.99,
    brand: "Victoria's Secret",
    image: Bombshell,
  },
  {
    id: "4",
    name: "Love Spell Body Mist",
    categoryId: "1",
    oldPrice: 30.0,
    newPrice: null,
    brand: "Victoria's Secret",
    image: LoveSpell,
  },
  {
    id: "5",
    name: "Very Sexy Eau de Parfum",
    categoryId: "1",
    oldPrice: 110.0,
    newPrice: 95.0,
    brand: "Victoria's Secret",
    image: VerySexy,
  },
  {
    id: "6",
    name: "Lancôme Idôle Eau de Parfum",
    categoryId: "1",
    oldPrice: 579.0,
    newPrice: 405.3,
    brand: "Lancome",
    image: LancomeIdole,
  },
  {
    id: "7",
    name: "MAC Ruby Woo Lipstick",
    categoryId: "1",
    oldPrice: 109.0,
    newPrice: null,
    brand: "MAC",
    image: MacRubyWoo,
  },
  {
    id: "8",
    name: "Estée Lauder Advanced Night Repair",
    categoryId: "1",
    oldPrice: 499.0,
    newPrice: null,
    brand: "Estée Lauder",
    image: EsteeLauderAdvanced,
  },
  // 2
  {
    id: "9",
    name: "Nike Jordan x A Ma Maniére",
    categoryId: "2",
    oldPrice: 279.0,
    newPrice: null,
    brand: "Nike",
    image: NikeShirt,
  },
  {
    id: "10",
    name: "Nike Jordan Sport Diamond Mesh",
    categoryId: "2",
    oldPrice: 149.0,
    newPrice: null,
    brand: "Nike",
    image: NikeShort,
  },
  {
    id: "11",
    name: "Short Skateboarding x Tyshawn",
    categoryId: "2",
    oldPrice: 279.0,
    newPrice: null,
    brand: "Adidas",
    image: AdidasShorts,
  },
  {
    id: "12",
    name: "Adidas Polo Ringer Britcore",
    categoryId: "2",
    oldPrice: 149.0,
    newPrice: null,
    brand: "Adidas",
    image: AdidasShirt,
  },
  {
    id: "13",
    name: "Zara Vestido Midi Asimétrico",
    categoryId: "2",
    oldPrice: 229.0,
    newPrice: null,
    brand: "Zara",
    image: ZaraMidi,
  },
  {
    id: "14",
    name: "Zara Chaqueta Nylon Cuadros",
    categoryId: "2",
    oldPrice: 179.0,
    newPrice: null,
    brand: "Zara",
    image: ZaraNylon,
  },
  {
    id: "15",
    name: "Zara Top Peplum",
    categoryId: "2",
    oldPrice: 139.0,
    newPrice: null,
    brand: "Zara",
    image: ZaraTop,
  },
  {
    id: "16",
    name: "Mango Short Casual Mujer",
    categoryId: "2",
    oldPrice: 129.9,
    newPrice: 90.93,
    brand: "Mango",
    image: MangoShort,
  },
  {
    id: "17",
    name: "Guess Short New Valentina",
    categoryId: "2",
    oldPrice: 290.0,
    newPrice: 145.0,
    brand: "Guess",
    image: GuessShort,
  },
  {
    id: "18",
    name: "Levi’s Casaca Jean Mujer",
    categoryId: "2",
    oldPrice: 249.9,
    newPrice: null,
    brand: "Levi’s",
    image: LevisCasaca,
  },
  {
    id: "19",
    name: "H&M Blusa Peplum",
    categoryId: "2",
    oldPrice: 59.95,
    newPrice: null,
    brand: "H&M",
    image: HmBlusa,
  },
  {
    id: "20",
    name: "Balenciaga Chaqueta Deportiva",
    categoryId: "2",
    oldPrice: 1250.0,
    newPrice: 1150.0,
    brand: "Balenciaga",
    image: BalenciagaChaqueta,
  },
  {
    id: "21",
    name: "Balenciaga Camiseta NBA",
    categoryId: "2",
    oldPrice: 1050.0,
    newPrice: 899.0,
    brand: "Balenciaga",
    image: BalenciagaCamiseta,
  },
  {
    id: "22",
    name: "Prada Pantalon Vaquero",
    categoryId: "2",
    oldPrice: 1200.0,
    newPrice: 989.0,
    brand: "Prada",
    image: PradaPantalon,
  },
  {
    id: "23",
    name: "H&M Pantalon Cargo Loose",
    categoryId: "2",
    oldPrice: 159.0,
    newPrice: null,
    brand: "H&M",
    image: HmCargo,
  },
  {
    id: "24",
    name: "H&M Polo Sin Mangas SLIM",
    categoryId: "2",
    oldPrice: 39.95,
    newPrice: null,
    brand: "H&M",
    image: HmPolo,
  },
  {
    id: "25",
    name: "H&M Polo Estilo Vintage",
    categoryId: "2",
    oldPrice: 79.95,
    newPrice: null,
    brand: "H&M",
    image: HmVintage,
  },
  {
    id: "26",
    name: "Microondas LG 25L",
    categoryId: "3",
    oldPrice: 609.0,
    newPrice: 389.0,
    brand: "LG",
    image: LgMicroondas,
  },
  {
    id: "27",
    name: "Freidora de Aire Philips",
    categoryId: "3",
    oldPrice: 299.0,
    newPrice: null,
    brand: "Philips",
    image: PhilipsFreidora,
  },
  {
    id: "28",
    name: "Licuadora Oster Silver 700W",
    categoryId: "3",
    oldPrice: 489.0,
    newPrice: 399.0,
    brand: "Oster",
    image: OsterLicuadora,
  },
  {
    id: "29",
    name: "Cafetera Oster 4 tazas",
    categoryId: "3",
    oldPrice: 199.0,
    newPrice: 135.0,
    brand: "Oster",
    image: OsterCafetera,
  },
  {
    id: "30",
    name: "Olla Arrocera Oster 1.8L",
    categoryId: "3",
    oldPrice: 249.0,
    newPrice: 139.0,
    brand: "Oster",
    image: OsterArrocera,
  },
  // 4
  {
    id: "31",
    name: "Audifonos SoundCore Beats",
    categoryId: "4",
    oldPrice: 399.0,
    newPrice: 329.0,
    brand: "Beats",
    image: BeastAudio,
  },
  {
    id: "32",
    name: "Samsung Galaxy S24 256GB",
    categoryId: "4",
    oldPrice: 2999.0,
    newPrice: 2499.0,
    brand: "Samsung",
    image: SamsungS24,
  },
  {
    id: "33",
    name: "Audifonos Sony Utl Wear",
    categoryId: "4",
    oldPrice: 799.0,
    newPrice: 499.0,
    brand: "Sony",
    image: SonyAudifonos,
  },
  {
    id: "34",
    name: "MacBook Air M4",
    categoryId: "4",
    oldPrice: 5299.0,
    newPrice: 4999.0,
    brand: "Apple",
    image: AppleMac,
  },
  {
    id: "35",
    name: "iPhone 17 Pro Max",
    categoryId: "4",
    oldPrice: 8999.0,
    newPrice: 5399.0,
    brand: "Apple",
    image: AppleIphone,
  },
  {
    id: "36",
    name: "AirPods Pro 3",
    categoryId: "4",
    oldPrice: 1299,
    newPrice: 949.99,
    brand: "Apple",
    image: AppleAirPods,
  },
  {
    id: "37",
    name: "Huawei Watch Fit 4",
    categoryId: "4",
    oldPrice: 599.0,
    newPrice: 479.0,
    brand: "Huawei",
    image: HuaweiWatch,
  },
  {
    id: "38",
    name: "Televisor Sony Bravia 3 4K Ultra HD",
    categoryId: "4",
    oldPrice: 4699.0,
    newPrice: 3499.0,
    brand: "Sony",
    image: SonyTV,
  },
  // Deporte
  {
    id: "39",
    name: "Chimpunes F50 League",
    categoryId: "5",
    oldPrice: 359.0,
    newPrice: null,
    brand: "Adidas",
    image: AdidasF50,
  },
  {
    id: "40",
    name: "Chimpunes Predator con Lengueta Plegable",
    categoryId: "5",
    oldPrice: 549.0,
    newPrice: null,
    brand: "Adidas",
    image: AdidasPredator,
  },
  {
    id: "41",
    name: "Nike Mercurial Vapor 16",
    categoryId: "5",
    oldPrice: 429.9,
    newPrice: null,
    brand: "Nike",
    image: NikeVapor,
  },
  {
    id: "42",
    name: "Nike Mercurial Superfly 10 KM",
    categoryId: "5",
    oldPrice: 489.9,
    newPrice: null,
    brand: "Nike",
    image: NikeKM,
  },
  {
    id: "43",
    name: "Nike Medias Everyday",
    categoryId: "5",
    oldPrice: 69.9,
    newPrice: null,
    brand: "Nike",
    image: NikeMedia,
  },
  {
    id: "44",
    name: "Pelota Trionda Copa Mundial 2026",
    categoryId: "5",
    oldPrice: 99,
    newPrice: null,
    brand: "Adidas",
    image: AdidasPelota,
  },
  {
    id: "43",
    name: "Nike Camiseta Alianza Lima 2026",
    categoryId: "5",
    oldPrice: 269.90,
    newPrice: null,
    brand: "Nike",
    image: NikeAL,
  },
];

export default products;
