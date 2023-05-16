import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "smartphones",
    description:
      "Smartphones are advanced mobile devices that offer a wide range of features and capabilities beyond traditional calling and texting.",
  },
  {
    _id: uuid(),
    categoryName: "laptops",
    description:
      "Laptops are portable computers that offer users the flexibility to work, study, and engage in various activities on the go.",
  },
  {
    _id: uuid(),
    categoryName: "fragrances",
    description:
      "Fragrances, also known as perfumes or colognes, are scented products designed to enhance and personalize one's aroma.",
  },
  {
    _id: uuid(),
    categoryName: "skincare",
    description:
      "Skincare products are designed to promote healthy and radiant skin by addressing various concerns and maintaining its overall well-being.",
  },
  {
    _id: uuid(),
    categoryName: "groceries",
    description:
      "Groceries are everyday food and household items that are essential for our daily needs.",
  },
  {
    _id: uuid(),
    categoryName: "home-decoration",
    description:
      "Home decoration encompasses a variety of items and accessories that are used to enhance the aesthetic appeal and create a comfortable atmosphere within a living space.",
  },
];
