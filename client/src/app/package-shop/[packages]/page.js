"use client";
import ImageShowBox from "@/components/packages/ImageShowBox";
import ProductSection from "@/components/packages/ProductSection";
import BestSellerProducts from "@/components/product_sliders/BestSellerProducts";
import MostViewdProducts from "@/components/product_sliders/MostViewdProducts";
import NavigationTabs from "@/components/products/NavigationTabs";
import PricingSection from "@/components/products/PricingSection";
import Specifications from "@/components/products/Specification";
import { products, productsExtraInfo } from "@/config";
import Breadcrumb from "@/utils/Breadcrumb";
import React, { useEffect, useState } from "react";

export default function Packages(product) {
  //console.log(product);
  const Product = JSON.parse(product.searchParams.product);

  const slug = Product.title;

  const [allProducts, setAllProducts] = useState([]);

  const getProducts = async () => {
    const response = fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));

    return response;
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="px-20 bg-white dlg:px-7 mlg:px-5">
      <Breadcrumb slug={slug} />
      {/* --------- Main --------- */}
      <div className="flex flex-row mlg:flex-wrap mlg:justify-center w-full mt-10">
        {/* Left Contents */}
        <div className="flex flex-col mr-10 mlg:mr-0">
          {/* Image show box */}
          <ImageShowBox images={Product.image} />
          {/* description */}
          <div className="mt-2 mb-20 stm:hidden">
            <NavigationTabs
              slug={slug}
              desc={Product.desc}
              garantie={productsExtraInfo.garantie}
              expedition={productsExtraInfo.expedition}
              payment={productsExtraInfo.payment}
              descCard={Product.descCard}
            />
          </div>
        </div>
        {/* ----Right Contents--- */}
        <div className="flex flex-col">
          <h1 className="uppercase text-[33px] font-medium leading-[1.2em]">
            {slug}
          </h1>
          {/* products  */}
          <ProductSection products={Product.products} />

          {/* pricing section */}
          {/* <PricingSection product={Product.products} /> */}
          {/* extra content  */}
          <div className="flex flex-row items-center text-[#333] text-[14px] my-2 cursor-pointer">
            <i className="fa-solid fa-list mr-2"></i>
            <p>ajoutez à la liste d'envie</p>
          </div>
          {/* banner img */}
          <img src="/products/info-banner.webp" className="my-3" />
          {/* small icons */}
          <div className="flex flex-row stm:flex-col items-center text-[#333] text-[11px] stm:text-[14px] font-bold uppercase">
            <div className="flex flex-row stm:flex-col items-center mr-5 stm:my-3 ">
              <img
                src="/icons/expedition-icon.webp"
                className="w-[30px] h-[26px] stm:w-[70px] stm:h-[60px] object-contain mr-2"
              />
              <p className="">EXPÉDITION</p>
            </div>
            <div className="flex flex-row stm:flex-col items-center mr-5 stm:my-3 ">
              <img
                src="/icons/satisfait-icon.webp"
                className="w-[30px] h-[26px] stm:w-[70px] stm:h-[60px] object-contain mr-2"
              />
              <p className="">SATISFAIT OU REMBOURSÉ</p>
            </div>
            <div className="flex flex-row stm:flex-col items-center mr-5 stm:my-3 ">
              <img
                src="/icons/payment-icon.webp"
                className="w-[30px] h-[26px] stm:w-[70px] stm:h-[60px] object-contain mr-2"
              />
              <p className="">PAIEMENT SÉCURISÉ</p>
            </div>
          </div>
          {/* specification */}
          <Specifications specs={Product.specifications} />
        </div>
      </div>
      {/* -------------------------- */}
      {/* PRODUITS LES PLUS CONSULTÉS */}
      <MostViewdProducts />
      {/* MEILLEURES VENTES */}
      <BestSellerProducts />
    </main>
  );
}
