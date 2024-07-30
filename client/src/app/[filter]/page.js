"use client";
import Breadcrumb from "@/utils/Breadcrumb";
import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import { fetchFromBackend } from "@/utils/api";
import ProductImageCard from "@/utils/ProductImageCard";
import Pagination from "@/utils/Pagination";
import Link from "next/link";

export default function Filter(category) {
  //console.log(category);
  const cat = JSON.parse(category.searchParams.category);
  const catId = cat.id;
  const slug = cat.name;

  const limitOptions = [12, 24, 36, 48];
  const defaultLimit = limitOptions[0];

  const [selectedLimit, setSelectedLimit] = useState(defaultLimit);
  const [showSorts, setShowSorts] = useState(false);
  const [showLimits, setShowLimits] = useState(false);
  const [filters, setFilters] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [promotions, setPromotions] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 2960]);
  const [weightRange, setWeightRange] = useState([0, 200]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sorts, setSorts] = useState([]);
  const [selectedSort, setSelectedSort] = useState(null);
  const [fetchingProducts, setFetchingProducts] = useState(false); // New state for showing loader in products area

  const price = `${priceRange[0]}-${priceRange[1]}`;
  const weight = `${weightRange[0]}-${weightRange[1]}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const catProduct = await fetchFromBackend(`/categories/${catId}`);
      setFilters(catProduct.filters);
      setProducts(catProduct.products);
      setTotalPages(Math.ceil(catProduct.products.length / selectedLimit));
      setSubCategories(catProduct.filters.subcategories);
      setPromotions(catProduct.filters.delivery_promotions);
      setPriceRange([0, catProduct.filters.max_price]);
      setWeightRange([0, catProduct.filters.max_weight]);
      setLoading(false);
    };

    fetchData();
  }, [catId, selectedLimit]);

  useEffect(() => {
    const updatedSorts = [
      {
        label: "Nom, A à Z",
        api: `/categories/${catId}/subcategory/${selectedSubCategory}/promotion/${selectedPromotion}/limit/${selectedLimit}/order/name/asc/price/${price}/weight/${weight}`,
      },
      {
        label: "Nom, Z à A",
        api: `/categories/${catId}/subcategory/${selectedSubCategory}/promotion/${selectedPromotion}/limit/${selectedLimit}/order/name/desc/price/${price}/weight/${weight}`,
      },
      {
        label: "Prix, croissant",
        api: `/categories/${catId}/subcategory/${selectedSubCategory}/promotion/${selectedPromotion}/limit/${selectedLimit}/order/list_price/asc/price/${price}/weight/${weight}`,
      },
      {
        label: "Prix, décroissant",
        api: `/categories/${catId}/subcategory/${selectedSubCategory}/promotion/${selectedPromotion}/limit/${selectedLimit}/order/list_price/desc/price/${price}/weight/${weight}`,
      },
    ];
    setSorts(updatedSorts);
    setSelectedSort(updatedSorts[0]);
  }, [selectedSubCategory, selectedPromotion, selectedLimit, price, weight]);

  useEffect(() => {
    let fetchTimeout;

    const fetchSortedProducts = async () => {
      const api = selectedSort?.api;
      if (api) {
        const sortedProducts = await fetchFromBackend(api);
        // console.log(sortedProducts);
        setProducts(sortedProducts.products);
        setTotalPages(
          Math.ceil(sortedProducts.products.length / selectedLimit)
        );
        setFetchingProducts(false);
      }
    };

    if (!loading && selectedSort) {
      setFetchingProducts(true);
      fetchTimeout = setTimeout(fetchSortedProducts, 500);
    }

    return () => {
      clearTimeout(fetchTimeout);
      setFetchingProducts(false);
    };
  }, [
    selectedLimit,
    selectedSubCategory,
    selectedPromotion,
    selectedSort,
    price,
    weight,
    loading,
  ]);

  const handleWeightChange = (range) => {
    setWeightRange(range);
  };

  const handleWeightAfterChange = (range) => {
    setWeightRange(range);
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  const handlePriceAfterChange = (range) => {
    setPriceRange(range);
  };

  const handleSortClick = async (item) => {
    setSelectedSort(item);
    setShowSorts(false);
  };

  const handleLimitClick = async (limit) => {
    setSelectedLimit(limit);
    setShowLimits(false);
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const handlePromotionChange = (e) => {
    setSelectedPromotion(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading && selectedSort) {
    return (
      <div className="mt-10 px-16">
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  //console.log(fetchingProducts);

  return (
    <div className="mt-10 px-16">
      <Breadcrumb slug={slug} />
      <div className="flex flex-row items-start mt-5">
        {/* ----- Left side contents -------- */}
        <div className="w-[350px]">
          {/* sub categories */}
          <div className="mb-5">
            <div className="flex flex-row items-center justify-between text-[#000] pb-[3px] border-b-2 border-b-[#313537] mb-[30px]">
              <p className="text-[18px] uppercase font-semibold">
                Sous-catégories
              </p>
              <i className="fa-solid fa-chevron-down text-[9px] font-[900]"></i>
            </div>
            <div className="space-y-3">
              {subCategories
                ? Object.entries(subCategories).map(([key, value]) => (
                    <label
                      key={key}
                      className="flex items-center space-x-2 cursor-pointer"
                      htmlFor={`subcategory-${key}`}
                    >
                      <input
                        type="radio"
                        id={`subcategory-${key}`}
                        name="subcategory"
                        value={key}
                        checked={selectedSubCategory === key}
                        onChange={handleSubcategoryChange}
                        className="hidden"
                      />
                      <span
                        className={`w-4 h-4 flex items-center justify-center border border-gray-400 rounded ${
                          selectedSubCategory === key
                            ? "bg-blue-600"
                            : "bg-white"
                        }`}
                      >
                        {selectedSubCategory === key && (
                          <i className="fa-solid fa-check text-white text-xs"></i>
                        )}
                      </span>
                      <span className="text-gray-700">{value}</span>
                    </label>
                  ))
                : null}
            </div>
          </div>
          {/* delivery promotions */}
          <div className="mb-5">
            <div className="flex flex-row items-center justify-between text-[#000] pb-[3px] border-b-2 border-b-[#313537] mb-[30px]">
              <p className="text-[18px] uppercase font-semibold">Promotions</p>
              <i className="fa-solid fa-chevron-down text-[9px] font-[900]"></i>
            </div>
            <div className="space-y-3">
              {promotions
                ? Object.entries(promotions).map(([key, value]) => (
                    <label
                      key={key}
                      className="flex items-center space-x-2 cursor-pointer"
                      htmlFor={`promotion-${key}`}
                    >
                      <input
                        type="radio"
                        id={`promotion-${key}`}
                        name="promotion"
                        value={key}
                        checked={selectedPromotion === key}
                        onChange={handlePromotionChange}
                        style={{ display: "none" }}
                      />
                      <span
                        className={`w-4 h-4 flex items-center justify-center border border-gray-400 rounded ${
                          selectedPromotion === key ? "bg-blue-600" : "bg-white"
                        }`}
                      >
                        {selectedPromotion === key && (
                          <i className="fa-solid fa-check text-white text-xs"></i>
                        )}
                      </span>
                      <span className="text-gray-700">{value}</span>
                    </label>
                  ))
                : null}
            </div>
          </div>
          {/* Price Filter */}
          <div className="mb-10 w-[263px]">
            <div className="flex flex-row items-center justify-between  text-[#000] pb-[3px] border-b-2 border-b-[#313537] mb-[30px]">
              <p className="text-[18px] uppercase font-semibold">Prix</p>
              <i className="fa-solid fa-chevron-down text-[9px] font-[900]"></i>
            </div>
            <p className="py-[13px] text-[14px] text-[#333] font-medium">
              {priceRange[0]} € - {priceRange[1]} €
            </p>
            <Slider
              range
              min={0}
              max={filters?.max_price}
              defaultValue={priceRange}
              onChange={handlePriceChange}
              onChangeComplete={handlePriceAfterChange}
            />
          </div>
          {/* Poids Filter */}
          <div className="mb-5 w-[263px]">
            <div className="flex flex-row items-center justify-between  text-[#000] pb-[3px] border-b-2 border-b-[#313537] mb-[30px]">
              <p className="text-[18px] uppercase font-semibold">Poids</p>
              <i className="fa-solid fa-chevron-down text-[9px] font-[900]"></i>
            </div>
            <p className="py-[13px] text-[14px] text-[#333] font-medium">
              {weightRange[0]}kg - {weightRange[1]}kg
            </p>
            <Slider
              range
              min={0}
              max={filters?.max_weight}
              defaultValue={weightRange}
              onChange={handleWeightChange}
              onChangeComplete={handleWeightAfterChange}
            />
          </div>
        </div>
        {/*------------------------------------ */}
        {/* ----- Right side contents -------- */}
        <div className="ml-16 flex flex-col w-full">
          {/* top filters */}
          <div className="flex flex-row items-start justify-start">
            {/* Sort Filter */}
            <div className="relative">
              <div
                className="bg-white flex flex-row items-center justify-between border border-[#dfdfd] px-3 py-[5px] text-[16px] text-[#414141] cursor-pointer"
                onClick={() => {
                  setShowSorts((prevOpen) => !prevOpen);
                  setShowLimits(false);
                }}
              >
                <p>Sort by: {selectedSort?.label}</p>
                <i className="fa-solid fa-chevron-down text-[10px] text-[#414141] ml-3 "></i>
              </div>
              {showSorts && (
                <div className="bg-[#f8f8f8] shadow-md text-[16px] text-[#414141] absolute top-10 w-[250px] left-0 z-30">
                  {sorts.map((item, index) => (
                    <p
                      key={index}
                      onClick={() => handleSortClick(item)}
                      className="hover:bg-darkSlate hover:text-white py-3 px-4 cursor-pointer"
                    >
                      {item.label}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {/* Limit filter */}
            <div className="ml-5 relative">
              <div
                className="bg-white flex flex-row items-center justify-between border border-[#dfdfd] px-3 py-[5px] text-[16px] text-[#414141] w-[155px] cursor-pointer"
                onClick={() => {
                  setShowLimits((prevOpen) => !prevOpen);
                  setShowSorts(false);
                }}
              >
                <p>Per Page: {selectedLimit}</p>
                <i className="fa-solid fa-chevron-down text-[10px] text-[#414141] ml-3 "></i>
              </div>
              {showLimits && (
                <div className="bg-[#f8f8f8] shadow-md text-[16px] text-[#414141] absolute top-10 w-[250px] left-0 z-30">
                  {limitOptions.map((item, index) => (
                    <p
                      key={index}
                      className="hover:bg-darkSlate hover:text-white py-3 px-4 cursor-pointer"
                      onClick={() => handleLimitClick(item)}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* products */}
          {fetchingProducts ? (
            <div className="w-full z-20">
              <p className="text-center mt-10 text-[18px] text-[#333]">
                Loading...
              </p>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-4 px-3 w-full mt-5">
                {products.map((item, index) => (
                  <Link
                    key={index}
                    href={{
                      pathname: `/shop/${encodeURIComponent(item.name)}`,
                      query: { p: JSON.stringify(item) },
                    }}
                  >
                    <ProductImageCard
                      product={item}
                      primaryImg1={item.image1}
                      primaryImg2={item.image2 && item.image2}
                      name={item.name}
                      price={item.price}
                    />
                  </Link>
                ))}
              </div>
              {/* Pagination */}
              <div className="flex flex-row justify-end mb-10 w-full">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="w-full z-20">
              <p className="text-center mt-10 text-[18px] text-[#333]">
                No Products with this filter
              </p>
            </div>
          )}
        </div>
        {/* ------------------------------------ */}
      </div>
    </div>
  );
}
