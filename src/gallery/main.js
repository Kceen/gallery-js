import { initGallery } from "./gallery";

const imagesUrls = [
  "https://images.pexels.com/photos/1061142/pexels-photo-1061142.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1061141/pexels-photo-1061141.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1061140/pexels-photo-1061140.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1061139/pexels-photo-1061139.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1061138/pexels-photo-1061138.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1061142/pexels-photo-1061142.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1061141/pexels-photo-1061141.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1061140/pexels-photo-1061140.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1061139/pexels-photo-1061139.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1061138/pexels-photo-1061138.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1061142/pexels-photo-1061142.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1061141/pexels-photo-1061141.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1061140/pexels-photo-1061140.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1061139/pexels-photo-1061139.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1061138/pexels-photo-1061138.jpeg?auto=compress&cs=tinysrgb&w=800",
];

const animationType = "fade" | "flip" | "scale";

initGallery({
  imagesUrls,
  animationType: "fade",
  // autoplay: true,
  // autoplayIntervalDuration: 1000,
  loop: true,
});
