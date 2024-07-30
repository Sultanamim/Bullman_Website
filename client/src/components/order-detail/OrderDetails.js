import Breadcrumb from "@/utils/Breadcrumb";
import Button from "@/utils/Button";
import React from "react";
import TrackingSlider from "./TrackingSlider";

export default function OrderDetails() {
  return (
    <div className="mt-12 px-20 mlg:mt-20 mlg:px-5 mb-5">
      <Breadcrumb slug={" Follow-up of guest order "} />
      <p className="mt-4 flex flex-row items-start justify-start text-[1.563em] font-medium tracking-[.1em] uppercase ">
        Suivi des invités
      </p>
      {/* ------ main ------------ */}
      {/* Order-reference */}
      <div className=" bg-white border">
        <div className="flex flex-row items-center justify-between pt-4 px-6 ">
          <p className=" text-[#315593] text-[20px] font-[600] ">
            Référence de commande %référence% - placé sur 19/06/2024
          </p>
          <a href="/" className=" text-[#333] text-[18px] ">
            Recommander
          </a>
        </div>
        <div className="flex flex-col px-10 pt-3 pb-4">
          <ul className=" list-disc text-[18px] ">
            <li>
              {" "}
              <strong className=" font-[550] ">Transporteur </strong> DPD Point
              Relais
            </li>
            <li>
              {" "}
              <strong className=" font-[550]">Mode de paiement</strong> Commande
              gratuite
            </li>
            <li>Téléchargez votre facture au format PDF.</li>
          </ul>
        </div>
      </div>
      {/* Order-status */}
      <div className=" bg-white border mt-5 pt-6 pb-8">
        <p className=" text-[#315593] text-[21px] font-[450] px-6 mb-3">
          Suivez pas à pas l'état de votre commande
        </p>
        <div className="flex flex-col px-6 ">
          <div className=" flex flex-col  w-full border p-[3px]  ">
            <div className="flex flex-row w-full mb-[3px]">
              <div className=" bg-[#f6f6f6] p-3 w-2/5  mr-[2px]">Date</div>
              <div className="bg-[#f6f6f6] p-3 w-3/5 ">État</div>
            </div>
            <div className="flex flex-row w-full">
              <div className=" bg-[#f6f6f6] p-3 w-2/5  mr-[2px]">
                19/06/2024
              </div>
              <div className="bg-[#f6f6f6] p-3 w-3/5 ">
                <p className="bg-navyBlue text-white font-medium rounded-[3px] py-[2px] px-[4px] text-inherit w-[138px] flex items-center justify-center">
                  Paiement accepté{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Order-addresses */}
      <div className=" flex flex-row mt-5 ">
        <div className=" flex flex-col bg-white border py-5 px-4 w-full mr-5 ">
          <p className=" text-[20px] font-[500] ">
            Delivery address "Mon adresse"
          </p>
          <div className="pt-8 italic text-[16px] font-[500] ">
            <p>Bathier Jérome</p>
            <p>41 AVENUE DU 8 MAI 1945</p>
            <p>95200 SARCELLE</p>
            <p>France</p>
            <p>0643760296</p>
          </div>
        </div>
        <div className=" flex flex-col bg-white border py-5 px-4 w-full ">
          <p className=" text-[20px] font-[500] ">
            Adresse de facturation Mon adresse
          </p>
          <div className="pt-8 italic text-[16px] font-[500] ">
            <p>Bathier Jérome</p>
            <p>41 AVENUE DU 8 MAI 1945</p>
            <p>95200 SARCELLE</p>
            <p>France</p>
            <p>0643760296</p>
          </div>
        </div>
      </div>
      {/* Order-tracking */}
      <TrackingSlider />
      {/* Courior-product-quantity */}
      <div className=" flex flex-row mt-5 ">
        <div className=" flex flex-col bg-white border pt-5 pb-9 px-4 w-full ">
          <div className=" border">
            <div className=" flex flex-row p-[2px] ">
              <div className=" bg-[#f6f6f6] p-3 w-2/5 mr-[2px] ">
                <p className=" font-[500] text-[16px] ">Transporteur</p>
              </div>
              <div className=" bg-[#f6f6f6] p-3 w-2/5 mr-[2px] ">
                <p className=" font-[500] text-[16px] ">Produit</p>
              </div>
              <div className=" bg-[#f6f6f6] p-3 w-1/5 ">
                <p className=" font-[500] text-[16px] ">Quantité</p>
              </div>
            </div>
            <div className=" flex flex-row px-[2px] pb-[2px] ">
              <div className=" border py-6 px-3 w-2/5 mr-[2px] ">
                <p className=" font-[500] text-[16px] ">DPD Point Relais</p>
                <p className=" font-[500] text-[16px] ">Point Relais 24-72h </p>
              </div>
              <div className=" border py-6 px-3 w-2/5 mr-[2px] ">
                <p className=" font-[500] text-[16px] ">ENVOI DPD LBC </p>
              </div>
              <div className=" border py-6 px-3 w-1/5 ">
                <p className=" font-[500] text-[16px] ">1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* product-prices */}
      <div className="flex flex-row bg-white border my-5 px-6 py-5">
        <table className="min-w-full  border p-[3px] border-separate border-spacing-[3px]">
          <thead>
            <tr className=" ">
              <th className="py-3 px-4  m-[3px] bg-[#f6f6f6] text-left">
                Produit
              </th>
              <th className="py-3 px-4  m-[3px] bg-[#f6f6f6] text-left">
                Quantité
              </th>
              <th className="py-3 px-4  m-[3px] bg-[#f6f6f6] text-right">
                Prix unitaire
              </th>
              <th className="py-3 px-4  m-[3px] bg-[#f6f6f6] text-right">
                Prix total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4 border ">ENVOI DPD LBC</td>
              <td className="py-3 px-4 border ">1</td>
              <td className="py-3 px-4 border text-right">0,00 €</td>
              <td className="py-3 px-4 border text-right">0,00 €</td>
            </tr>
            <tr>
              <td
                colSpan="3"
                className="py-3 px-4 border  text-right font-bold"
              >
                Sous-total
              </td>
              <td className="py-3 px-4 border text-right">0,00 €</td>
            </tr>
            <tr>
              <td colSpan="3" className="py-3 px-4 border text-right font-bold">
                Frais de livraison
              </td>
              <td className="py-3 px-4 border text-right ">5,51 €</td>
            </tr>
            <tr>
              <td
                colSpan="3"
                className="py-3 px-4 border  text-right font-bold"
              >
                Taxes
              </td>
              <td className="py-3 px-4 border text-right">0,92 €</td>
            </tr>
            <tr>
              <td colSpan="3" className="py-3 px-4 border text-right font-bold">
                Total
              </td>
              <td className="py-3 px-4 border text-right">5,51 €</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* summary */}
      <div className="my-5 flex flex-row bg-white border px-6 py-5">
        <table className="min-w-full  border p-[3px] border-separate border-spacing-[3px]">
          <thead>
            <tr>
              <th className="py-3 px-4  m-[3px] bg-[#f6f6f6] text-left">
                Date
              </th>
              <th className="py-3 px-4  m-[3px] bg-[#f6f6f6] text-left">
                Transporteur
              </th>
              <th className="py-3 px-4  m-[3px] bg-[#f6f6f6] text-left">
                Poids de l'article
              </th>
              <th className="py-3 px-4  m-[3px] bg-[#f6f6f6] text-left">
                Frais d'expédition
              </th>
              <th className="py-3 px-4  m-[3px] bg-[#f6f6f6] text-left">
                Numéro de suivi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4  m-[3px] bg-[#f6f6f6] text-left">
                19/06/2024
              </td>
              <td className="py-3 px-4  m-[3px] bg-[#f6f6f6] text-left">
                DPD Point Relais
              </td>
              <td className="py-3 px-4  m-[3px] bg-[#f6f6f6] text-left">-</td>
              <td className="py-3 px-4  m-[3px] bg-[#f6f6f6] text-left">
                4,59 €
              </td>
              <td className="py-3 px-4  m-[3px] bg-[#f6f6f6] text-left">-</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* transform guest */}
      <div className=" bg-white border my-5 ">
        <div className="flex flex-row items-center justify-between pt-4 px-6 ">
          <p className=" text-[#414141] text-[20px] font-[600] ">
            Transformez votre compte invité en compte client et profitez-en :
          </p>
        </div>
        <div className="flex flex-col px-10 pt-3 pb-4">
          <ul className=" list-disc text-[18px] ">
            <li> -Accès personnalisé et sécurisé</li>
            <li> -Paiement rapide et facile</li>
            <li>-Retour de marchandise plus facile</li>
          </ul>
          <div className="flex flex-row items-center">
            <p className="text-[#414141] text-[1.063rem]">
              Définissez votre mot de passe:
            </p>
            <input className="border border-[#414141] outline-none ml-3" />
          </div>
          <div className="mt-5 flex flex-row justify-start w-full ">
            <Button title={"Envoyer"} onclick={() => {}} />
          </div>
        </div>
      </div>
      {/* ----- */}
    </div>
  );
}
