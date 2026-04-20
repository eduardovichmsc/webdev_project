import { BlogCategory } from '../shared/models/blog.model';
import { AnyProduct, Bracelet, ProductCategory, Ring } from '../shared/models/product.model';

// export const products: AnyProduct[] = [
//   {
//     id: 0,
//     slug: 'bracelet-cherry',
//     image: [
//       'blueprint/simuero-26-delfina-los-delfines-necklace-01.webp',
//       'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000',
//       'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000',
//     ],
//     name: 'Bracelet Cherry',
//     description:
//       'Elegant cherry-themed bracelet with fine detailing. Handcrafted with precision to ensure a unique organic feel for every wearer.',
//     category: 'bracelet',
//     price: 389,
//     length: 18,
//     hasCharm: true,
//   } as Bracelet,
//   {
//     id: 1,
//     slug: 'simuero-ring',
//     image: [
//       'blueprint/ALBA-GD_Simuero-1.webp',
//       'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000',
//       'https://images.unsplash.com/photo-1603561591411-0e7310f3915c?q=80&w=1000',
//     ],
//     name: 'Simuero Ring',
//     description:
//       'Raw. Radiant. Eternal. Handcrafted gold ring with organic texture and engraved ancient symbols. Each piece is individually cast, giving it a raw yet elegant finish that captures the warmth of the sun. Hand-sculpted gold ring with organic texture and engraved symbols reminiscent of ancient sun emblems. Each curve and imperfection tells a story of light, resiliency, and individuality. A statement piece born from the meeting of earth and fire - bold, imperfect, alive.',
//     category: 'ring',
//     price: 250,
//     sizes: [16, 17, 18],
//     material: 'Gold 18k',
//   } as Ring,
//   {
//     id: 2,
//     slug: 'seashell-necklace',
//     image: [
//       'blueprint/ALBA-GD_Simuero-2.webp',
//       'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000',
//       'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000',
//     ],
//     name: 'Seashell Necklace',
//     description:
//       'Unique necklace inspired by Mediterranean sea shells. A delicate piece that brings the essence of the ocean to your everyday look.',
//     category: 'necklace',
//     price: 250,
//   },
//   {
//     id: 3,
//     slug: 'solara-ring',
//     image: [
//       'blueprint/SOYE-GD_Simuero-1.webp',
//       'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000',
//       'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=1000',
//     ],
//     name: 'Solara Ring',
//     description:
//       'Bold statement ring featuring a sun-inspired design. Its textured surface reflects light like the dancing waves at sunset.',
//     category: 'ring',
//     price: 389,
//     sizes: [15, 16, 17, 18],
//     material: 'Silver 925',
//   } as Ring,
// ];

export const products = [];

// export const productCategories: ProductCategory[] = [
//   {
//     id: 1,
//     slug: '',
//     name: 'All',
//   },
//   {
//     id: 2,
//     slug: 'ring',
//     name: 'Ring',
//   },
//   {
//     id: 3,
//     slug: 'bracelet',
//     name: 'Bracelet',
//   },
//   {
//     id: 4,
//     slug: 'necklace',
//     name: 'Necklace',
//   },
// ];

// export const blogs = [
//   {
//     id: 1,
//     imageUrl:
//       'https://images.unsplash.com/photo-1599643478524-fb66f70a00ba?q=80&w=800&auto=format&fit=crop', // Девушка с кулоном
//     categoryId: 2,
//     title: 'Jewelry Trends to Watch This Season',
//     description:
//       'The beauty of imperfection lies in honesty — handcrafted pieces that move, breathe, and belong to no mold.',
//     url: '/article/1',
//   },
//   {
//     id: 2,
//     imageUrl:
//       'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop', // Профиль девушки
//     categoryId: 2,
//     title: 'Sustainability in Fine Jewelry',
//     description:
//       'Each piece is hand-sculpted to capture the warmth of touch and the softness of organic forms. Inspired by the rhythm of waves,',
//     url: '/article/2',
//   },
//   {
//     id: 3,
//     imageUrl:
//       'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop', // Руки с кольцами
//     categoryId: 1,
//     title: 'How to Choose the Perfect Gift',
//     description:
//       'The beauty of imperfection lies in honesty — handcrafted pieces that move, breathe, and belong to no mold.',
//     url: '/article/3',
//   },
//   {
//     id: 4,
//     imageUrl:
//       'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop', // Девушка крупный план (бьюти)
//     categoryId: 4,
//     title: 'Mixing Metals — The New Classic',
//     description:
//       'The beauty of imperfection lies in honesty — handcrafted pieces that move, breathe, and belong to no mold.',
//     url: '/article/4',
//   },
//   {
//     id: 5,
//     imageUrl:
//       'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop', // Крупный план уха/серьги
//     categoryId: 1,
//     title: 'How to Style Minimal Jewelry',
//     description:
//       'Each piece is hand-sculpted to capture the warmth of touch and the softness of organic forms. Inspired by the rhythm of waves,',
//     url: '/article/5',
//   },
//   {
//     id: 6,
//     imageUrl:
//       'https://images.unsplash.com/photo-1610986165502-1ef0ee94cdd8?q=80&w=800&auto=format&fit=crop', // Эстетика, руки у воды с украшениями
//     categoryId: 3,
//     title: 'The Meaning Behind Stones and Symbols',
//     description:
//       'The beauty of imperfection lies in honesty — handcrafted pieces that move, breathe, and belong to no mold.',
//     url: '/article/6',
//   },
// ];

// export const blogCategories: BlogCategory[] = [
//   {
//     id: 0,
//     slug: 'all',
//     name: 'All',
//   },
//   {
//     id: 1,
//     slug: 'jewelry-trends',
//     name: 'Jewelry Trends',
//   },
//   {
//     id: 2,
//     slug: 'jewelry-care',
//     name: 'Jewelry Care',
//   },
//   {
//     id: 3,
//     slug: 'art-of-layering',
//     name: 'Art of Layering',
//   },
//   {
//     id: 4,
//     slug: 'layers-of-light',
//     name: 'Layers of Light',
//   },
// ];
