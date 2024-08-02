"use client";
import { useCart } from "@/context/CartContext";
import Button from "@/utils/Button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function CartBox({ setAmount }) {
  const { cartItems, removeFromCart } = useCart();
  const [promo, setPromo] = useState("");
  const [quantities, setQuantities] = useState({});
  const [isExpanded, setIsExpanded] = useState(true);
  const [totalWithoutVAT, setTotalWithoutVAT] = useState(0);
  const [totalVAT, setTotalVAT] = useState(0);
  const [totalWithVAT, setTotalWithVAT] = useState(0); // Set initial state to true to show items by default
  const contentRef = useRef(null);

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((item) => {
      if (item.selectedVariants.length > 0) {
        item.selectedVariants.forEach((variant) => {
          const variantKey = Object.keys(variant).find(
            (key) => key !== "priceInclTax" && key !== "quantity"
          );
          initialQuantities[`${item.name}-${variant[variantKey]}`] =
            variant.quantity;
        });
      } else {
        initialQuantities[item.name] = item.quantity;
      }
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
      } else {
        contentRef.current.style.height = "0px";
      }
    }
  }, [isExpanded, cartItems]);

  useEffect(() => {
    calculateTotals();
    // setAmount(totalWithVAT);
  }, [quantities, cartItems]);

  const calculateTotals = () => {
    let totalWithoutVAT = 0;
    let totalVAT = 0;
    let totalWithVAT = 0;

    cartItems.forEach((item) => {
      if (item.selectedVariants.length > 0) {
        item.selectedVariants.forEach((variant) => {
          const variantKey = Object.keys(variant).find(
            (key) => key !== "priceInclTax" && key !== "quantity"
          );
          const itemKey = `${item.name}-${variant[variantKey]}`;
          const variantQuantity = quantities[itemKey] || variant.quantity;
          const itemTotalExclVAT = variant.priceExclTax * variantQuantity;
          const itemTotalInclVAT = variant.priceInclTax * variantQuantity;

          totalWithoutVAT += itemTotalExclVAT;
          totalWithVAT += itemTotalInclVAT;
          totalVAT += itemTotalInclVAT - itemTotalExclVAT;
        });
      } else {
        const itemQuantity = quantities[item.name] || item.quantity;
        const itemTotalExclVAT = item.priceExclTax * itemQuantity;
        const itemTotalInclVAT = item.priceInclTax * itemQuantity;

        totalWithoutVAT += itemTotalExclVAT;
        totalWithVAT += itemTotalInclVAT;
        totalVAT += itemTotalInclVAT - itemTotalExclVAT;
      }
    });

    setTotalWithoutVAT(totalWithoutVAT.toFixed(2));
    setTotalVAT(totalVAT.toFixed(2));
    setTotalWithVAT(totalWithVAT.toFixed(2));
  };

  const increaseQuantity = (itemKey) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemKey]: (prevQuantities[itemKey] || 0) + 1,
    }));
  };

  const decreaseQuantity = (itemKey) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemKey]:
        (prevQuantities[itemKey] || 1) > 1 ? prevQuantities[itemKey] - 1 : 1,
    }));
  };

  const toggleAccordion = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };
  console.log(quantities);

  setAmount(parseInt(totalWithVAT));
  return (
    <div className="bg-white py-3 px-6 w-[400px] nlg:w-auto nsm:px-6 nlg:my-5">
      {/* fixed header of Accordion */}
      <div className="flex flex-row items-center justify-between">
        <p className="text-[#5f5f5f]">{cartItems.length} articles</p>
        {/* Accordion toggle button */}
        <span
          className="flex flex-row items-center text-[#8f8f8f] font-medium text-[14px] cursor-pointer"
          onClick={toggleAccordion}
        >
          Vérifier les détails{" "}
          <i
            className={`fa-solid fa-chevron-${
              isExpanded ? "up" : "down"
            } text-[9px] ml-2`}
          ></i>
        </span>
      </div>
      {/* toggle element */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500"
      >
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="relative flex flex-col p-[10px] mt-2"
            >
              <i
                className="fa-solid fa-xmark absolute top-2 right-2 text-[#333] text-[14px] cursor-pointer"
                onClick={() => removeFromCart(item.uniqueKey)}
              ></i>
              <div className="cursor-pointer">
                <div className="flex flex-row items-center">
                  <Link
                    // href={
                    //   item.product.products
                    //     ? {
                    //         pathname: `/package-shop/${item.name}`,
                    //         query: { product: JSON.stringify(item.product) },
                    //       }
                    //     : {
                    //         pathname: `/shop/${item.name}`,
                    //         query: { product: JSON.stringify(item.product) },
                    //       }
                    // }
                    href="#"
                  >
                    <Image
                      src={item.image}
                      width={77}
                      height={100}
                      className="w-[77px] h-[100px] object-contain hover:scale-110"
                    />
                  </Link>
                  <div className="flex flex-col mx-5">
                    <Link
                      // href={
                      //   item.product.products
                      //     ? {
                      //         pathname: `/package-shop/${item.name}`,
                      //         query: {
                      //           product: JSON.stringify(item.product),
                      //         },
                      //       }
                      //     : {
                      //         pathname: `/shop/${item.name}`,
                      //         query: {
                      //           product: JSON.stringify(item.product),
                      //         },
                      //       }
                      // }
                      href="#"
                    >
                      <p className="text-[#333] text-[14px] mb-3">
                        {item.name}
                      </p>
                    </Link>
                    {item.selectedVariants.length > 0 ? (
                      item.selectedVariants.map((variant) => {
                        const variantKey = Object.keys(variant).find(
                          (key) => key !== "priceInclTax" && key !== "quantity"
                        );
                        return (
                          <div
                            key={variant[variantKey]}
                            className="flex flex-col mb-2"
                          >
                            <p className="text-[12px]">
                              {variantKey}: {variant[variantKey]}
                            </p>
                            <div className="flex flex-row h-[35px] items-center">
                              <div className="border px-5 py-[5px] flex items-center justify-center">
                                {
                                  quantities[
                                    `${item.name}-${variant[variantKey]}`
                                  ]
                                }
                              </div>
                              <div className="flex flex-col">
                                <i
                                  className="fa-solid fa-chevron-up text-[10px] leading-[8px] border py-1 px-3 cursor-pointer"
                                  onClick={() =>
                                    increaseQuantity(
                                      `${item.name}-${variant[variantKey]}`
                                    )
                                  }
                                ></i>
                                <i
                                  className="fa-solid fa-chevron-down text-[10px] leading-[8px] border py-1 px-3 cursor-pointer"
                                  onClick={() =>
                                    decreaseQuantity(
                                      `${item.name}-${variant[variantKey]}`
                                    )
                                  }
                                ></i>
                              </div>
                              <p className="text-[12px] italic font-bold text-[#aaa] ml-3">
                                {(
                                  parseInt(variant.priceInclTax) *
                                  (quantities[
                                    `${item.name}-${variant[variantKey]}`
                                  ] || variant.quantity)
                                ).toFixed(2)}{" "}
                                €
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex flex-row h-[35px] items-center">
                        <div className="border px-5 py-[5px] flex items-center justify-center">
                          {quantities[item.name]}
                        </div>
                        <div className="flex flex-col">
                          <i
                            className="fa-solid fa-chevron-up text-[10px] leading-[8px] border py-1 px-3 cursor-pointer"
                            onClick={() => increaseQuantity(item.name)}
                          ></i>
                          <i
                            className="fa-solid fa-chevron-down text-[10px] leading-[8px] border py-1 px-3 cursor-pointer"
                            onClick={() => decreaseQuantity(item.name)}
                          ></i>
                        </div>
                        <p className="text-[12px] italic font-bold text-[#aaa] ml-3">
                          {(
                            parseInt(item.priceInclTax) *
                            (quantities[item.name] || item.quantity)
                          ).toFixed(2)}{" "}
                          €
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-[10px] flex flex-row items-center w-full bg-[#D7E9FF] mt-4 border-l-[6px] border-[#b9d8fe] ">
            <p className="text-[#606a7b] px-2 py-[6px] font-[500] text-[16px] ">
              Votre panier est vide
            </p>
          </div>
        )}
      </div>
      {/* bottom content */}
      <div className="flex flex-row py-4 w-full justify-center">
        <input
          placeholder="code promo"
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          className=" border-2 border-[#acaaa6] outline-none px-[10px] h-[2.5rem] text-[#414141] w-[244px] nlg:w-auto nsm:px-2"
        />
        <Button title={"AJOUTER"} onclick={() => {}} />
      </div>
      <div className="flex flex-row py-4 w-full justify-between">
        <div className="font-medium text-[16px]">
          <p className="uppercase">TOTAL (TTC)</p>
          <p className="text-[18px]">Taxes incluses :</p>
        </div>
        <div className="text-right text-[#414141] text-[16px] ">
          <p className="">{totalWithVAT} €</p>
          <p className="">{totalVAT} €</p>
        </div>
      </div>
    </div>
  );
}
