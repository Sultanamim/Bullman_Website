// Payment.js
import Button from "@/utils/Button";
import React, { useState } from "react";

export default function Payment({
  description,
  setDescription,
  handlePaymentSubmit,
}) {
  const [title, setTitle] = useState("");
  const [acceptCondition, setAcceptCondition] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <div>
      <label className="flex items-center w-full  pb-5 mb-1 text-[#414141] text-[1.063rem] mlg:text-[14px] font-medium">
        <input
          type="radio"
          name="title"
          value="Cartes Bancaires (CB, VISA, Mastercard, Amex, etc)"
          checked={
            title === "Cartes Bancaires (CB, VISA, Mastercard, Amex, etc)"
          }
          onChange={handleTitleChange}
          className="radio-custom"
        />
        <div className="flex flex-row mlg:flex-wrap items-center">
          <p className="mx-2">
            Cartes Bancaires (CB, VISA, Mastercard, Amex, etc){" "}
          </p>
          <img src="/img/payment-card-1.webp" className="w-[30px] h-auto" />
        </div>
      </label>
      {/* Mollie card Info box */}
      {title === "Cartes Bancaires (CB, VISA, Mastercard, Amex, etc)" ? (
        <>
          <div className="pr-20">
            <p className="text-[#414141] text-[15px] font-medium">
              Veuillez saisir les informations de votre carte
            </p>
            <input
              placeholder="Titulaire de la carte"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-[#222] text-[16px] px-[15px] py-[10px] min-h-[18px] border border-b-[2px] border-gray-300 w-4/5 rounded-[12px] my-2 outline-rose-600"
            />
            <div className="border border-b-[2px] border-gray-300 rounded-[12px] text-[#222] text-[16px] w-4/5 mt-1 mb-2">
              <input
                placeholder="Numéro de la carte"
                className="w-full border-b border-gray-300 min-h-[18px] px-[15px] py-[10px] bg-transparent rounded-tl-[12px] rounded-tr-[12px] outline-rose-600"
              />
              <div className="flex flex-row">
                <input
                  placeholder="Date d’expiration (MM/YY)"
                  className="w-1/2 border-r border-gray-300 min-h-[18px] px-[15px] py-[10px] bg-transparent  rounded-bl-[12px] outline-rose-600"
                />
                <input
                  placeholder="CVC/CVV"
                  className="w-1/2 min-h-[18px] px-[15px] py-[10px] bg-transparent  rounded-br-[12px]  outline-rose-600"
                />
              </div>
            </div>
            <div className="flex flex-row items-center mb-3">
              <i className="fa-solid fa-lock text-[13px]"></i>
              <p className="text-[16px]">
                Paiement sécurisé organisé par <b>mollie</b>
              </p>
            </div>
          </div>
        </>
      ) : null}
      <label className="flex items-center w-full  pb-5 mb-1 text-[#414141] text-[1.063rem] mlg:text-[14px] font-medium">
        <input
          type="radio"
          name="title"
          value="Payer par virement immédiat Réduction + 0,30 €"
          checked={title === "Payer par virement immédiat Réduction + 0,30 €"}
          onChange={handleTitleChange}
          className="radio-custom"
        />
        <div className="flex flex-row mlg:flex-wrap items-center">
          <p className="mx-2">Payer par virement immédiat </p>
          <img src="/img/payment-img-1.svg" className="w-[30px] h-auto" />
          <p className="mx-2">Réduction + 0,30 €</p>
        </div>
      </label>
      {title === "Payer par virement immédiat Réduction + 0,30 €" ? (
        <>
          <img src="/img/payment-process-img.svg" className="mt-4 mb-10" />
        </>
      ) : null}
      <label className="flex items-center w-full  pb-5 mb-1 text-[#414141] text-[1.063rem] mlg:text-[14px] font-medium">
        <input
          type="checkbox"
          checked={acceptCondition}
          onChange={(e) => setAcceptCondition(e.target.checked)}
        />
        <div className="flex flex-row mlg:flex-wrap items-center">
          <p className="ml-2">J'ai lu les</p>
          <p className="underline"> conditions générales de vente </p>
          <p className="">et j'y adhère sans réserve.</p>
        </div>
      </label>
      <Button title={"Commander"} onclick={handlePaymentSubmit} />
    </div>
  );
}
