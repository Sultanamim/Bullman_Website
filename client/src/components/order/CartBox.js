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
      initialQuantities[item.id] = 1; // Assuming initial quantity is 1 for all items
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
      const itemTotal = parseInt(item.price) * quantities[item.id];
      totalWithoutVAT += itemTotal;
    });

    totalVAT = totalWithoutVAT * 0.2; // Assuming 20% VAT
    totalWithVAT = totalWithoutVAT + totalVAT;

    setTotalWithoutVAT(totalWithoutVAT.toFixed(2));
    setTotalVAT(totalVAT.toFixed(2));
    setTotalWithVAT(totalWithVAT.toFixed(2));
  };

  const increaseQuantity = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]:
        (prevQuantities[itemId] || 1) > 1 ? prevQuantities[itemId] - 1 : 1,
    }));
  };

  const toggleAccordion = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

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
            <div key={item.id} className="relative flex flex-col p-[10px] mt-2">
              <i
                className="fa-solid fa-xmark absolute top-2 right-2 text-[#333] text-[14px] cursor-pointer"
                onClick={() => removeFromCart(item.id)}
              ></i>
              <div className="cursor-pointer">
                <div className="flex flex-row items-center">
                  <Link
                    href={
                      item.product.products
                        ? {
                            pathname: `/package-shop/${item.name}`,
                            query: { product: JSON.stringify(item.product) },
                          }
                        : {
                            pathname: `/shop/${item.name}`,
                            query: { product: JSON.stringify(item.product) },
                          }
                    }
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
                      href={
                        item.product.products
                          ? {
                              pathname: `/package-shop/${item.name}`,
                              query: {
                                product: JSON.stringify(item.product),
                              },
                            }
                          : {
                              pathname: `/shop/${item.name}`,
                              query: {
                                product: JSON.stringify(item.product),
                              },
                            }
                      }
                    >
                      <p className="text-[#333] text-[14px] mb-3">
                        {item.name}
                      </p>
                    </Link>
                    <div className="flex flex-row h-[35px] items-center">
                      <div className="border px-5 py-[5px] flex items-center justify-center">
                        {quantities[item.id]}
                      </div>
                      <div className="flex flex-col">
                        <i
                          className="fa-solid fa-chevron-up text-[10px] leading-[8px] border py-1 px-3 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            increaseQuantity(item.id);
                          }}
                        ></i>
                        <i
                          className="fa-solid fa-chevron-down text-[10px] leading-[8px] border py-1 px-3 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            decreaseQuantity(item.id);
                          }}
                        ></i>
                      </div>
                      <p className="text-[12px] italic font-bold text-[#aaa] ml-3">
                        {(parseInt(item.price) * quantities[item.id]).toFixed(
                          2
                        )}{" "}
                        €
                      </p>
                    </div>
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
