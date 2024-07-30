// Addresses.js
import { countries } from "@/config";
import Button from "@/utils/Button";
import React, { useState } from "react";

export default function Addresses({ onContinue }) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [company, setCompany] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [address, setAddress] = useState("");
  const [aditionalAddress, setAdditionalAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("France");

  const handleAddressSubmit = () => {
    // if (
    //   fname !== "" &&
    //   lname !== "" &&
    //   address !== "" &&
    //   postalCode !== "" &&
    //   city !== "" &&
    //   phone !== ""
    // ) {
    // //   onContinue();
    // } else {
    //   window.alert("please fill the required field!");
    // }
    onContinue();
  };

  return (
    <div>
      <h3 className="">
        L'adresse sélectionnée sera utilisée à la fois comme adresse personnelle
        (pour la facturation) et comme adresse de livraison.
      </h3>
      {/* First name */}
      <div className=" mt-9 ">
        <label className="text-[1.063em]">Prénom</label>
        <input
          type="text"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
          required
        />
      </div>
      {/* Last name */}
      <div className=" mt-9 ">
        <label className="text-[1.063em]">Nom</label>
        <input
          type="text"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
          required
        />
      </div>
      {/* company */}
      <div className=" mt-9 relative">
        <label className="text-[1.063em]">Société</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
        />
        <p className="italic text-[#6c6c6c] text-[13px] absolute bottom-2 right-8">
          Optionnel
        </p>
      </div>
      {/* vat number */}
      <div className=" mt-9 relative">
        <label className="text-[1.063em]">Numéro de TVA</label>
        <input
          type="text"
          value={vatNumber}
          onChange={(e) => setVatNumber(e.target.value)}
          className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
        />
        <p className="italic text-[#6c6c6c] text-[13px] absolute bottom-2 right-8">
          Optionnel
        </p>
      </div>
      {/* Address */}
      <div className=" mt-9 ">
        <label className="text-[1.063em]">Adresse</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
          required
        />
      </div>
      {/* Additional Address */}
      <div className=" mt-9 relative">
        <label className="text-[1.063em]">Complément d'adresse</label>
        <input
          type="text"
          value={aditionalAddress}
          onChange={(e) => setAdditionalAddress(e.target.value)}
          className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
        />
        <p className="italic text-[#6c6c6c] text-[13px] absolute bottom-2 right-8">
          Optionnel
        </p>
      </div>
      {/* Postal code */}
      <div className=" mt-9 ">
        <label className="text-[1.063em]">Code postal</label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
          required
        />
      </div>
      {/* City */}
      <div className=" mt-9 ">
        <label className="text-[1.063em]">Ville</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
          required
        />
      </div>
      {/* country */}
      <div className="mt-9">
        <label className="text-[1.063em]">Pays</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
        >
          <option value="">-- Choisissez s'il vous plaît --</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* phone */}
      <div className=" mt-9 ">
        <label className="text-[1.063em]">Téléphone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="px-3.5 py-1.5 border border-gray-300 w-full placeholder-transparent"
          required
        />
      </div>
      <div className="mt-5">
        <Button title={"Continue"} onclick={handleAddressSubmit} />
      </div>
    </div>
  );
}
