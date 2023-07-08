// import { initGallery } from "./gallery";

import Gallery from './gallery'

const numberImagesUrls = [
  'https://images.pexels.com/photos/1061142/pexels-photo-1061142.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1061141/pexels-photo-1061141.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1061140/pexels-photo-1061140.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1061139/pexels-photo-1061139.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1061138/pexels-photo-1061138.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1061142/pexels-photo-1061142.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1061141/pexels-photo-1061141.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1061140/pexels-photo-1061140.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1061139/pexels-photo-1061139.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1061138/pexels-photo-1061138.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1061142/pexels-photo-1061142.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1061141/pexels-photo-1061141.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1061140/pexels-photo-1061140.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1061139/pexels-photo-1061139.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1061138/pexels-photo-1061138.jpeg?auto=compress&cs=tinysrgb&w=800',
]

const imagesUrls = [
  'https://gcdn.polovniautomobili.com/user-images/thumbs/2174/21747219/11a84d78a81c-1920x1080.jpg',
  'https://gcdn.polovniautomobili.com/user-images/thumbs/2174/21747219/bff825cdfcc8-1920x1080.jpg',
  'https://gcdn.polovniautomobili.com/user-images/thumbs/2174/21747219/de37270c3626-1920x1080.jpg',
  'https://gcdn.polovniautomobili.com/user-images/thumbs/2174/21747219/e49d62439723-1920x1080.jpg',
  'https://gcdn.polovniautomobili.com/user-images/thumbs/2174/21747219/43b0455e0299-1920x1080.jpg',
  'https://gcdn.polovniautomobili.com/user-images/thumbs/2174/21747219/c38dd880fe3c-1920x1080.jpg',
  'https://gcdn.polovniautomobili.com/user-images/thumbs/2174/21747219/9f8bbbb1a11f-1920x1080.jpg',
  'https://gcdn.polovniautomobili.com/user-images/thumbs/2174/21747219/661c373d1194-1920x1080.jpg',
  'https://gcdn.polovniautomobili.com/user-images/thumbs/2174/21747219/4c8b98b745b1-1920x1080.jpg',
  'https://gcdn.polovniautomobili.com/user-images/thumbs/2174/21747219/d0f77c6ab801-1920x1080.jpg',
  'https://gcdn.polovniautomobili.com/user-images/thumbs/2174/21747219/5890454f20bb-1920x1080.jpg',
  'https://gcdn.polovniautomobili.com/user-images/thumbs/2174/21747219/bdfe548baa41-1920x1080.jpg',
  // 'https://gcdn.polovniautomobili.com/user-images/thumbs/2174/21747219/9259ba44e280-1920x1080.jpg',
  'https://gcdn.polovniautomobili.com/user-images/thumbs/2174/21747219/b0c982146e05-1920x1080.jpg',
  'https://gcdn.polovniautomobili.com/user-images/thumbs/2174/21747219/eca053e91a22-1920x1080.jpg',
]

const animationType: 'fade' | 'flip' | 'scale' = 'fade'

// initGallery({
//   imagesUrls,
//   animationType,
//   // autoplay: true,
//   // autoplayIntervalDuration: 1000,
//   loop: true,
// });

new Gallery(imagesUrls, 'fade', false, 1000, true)
