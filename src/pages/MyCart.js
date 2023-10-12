import React, { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../component/hooks/useAuthContext";
import { useMyCartStore } from "../zustand/myCartStore";
import Swal from "sweetalert2";
import axios from "../component/utils/axios";

export const MyCart = () => {
  const { user } = useAuthContext();
  // const [totalAmount, setTotalAmount] = useState(0);
  const cart = useMyCartStore((state) => state.cart);
  const totalAmount = useMyCartStore((state) => state.totalAmount);
  const getCart = useMyCartStore((state) => state.getCart);

  const [payload, setPayload] = useState({
    page: 0,
    limit: 20,
    search: "",
    filter: "",
    tabStatus: "all",
  });

  const handleFetchCart = useCallback(() => {
    getCart({ ...payload, search: user?.id });
  }, [payload, user?.id, getCart]);

  useEffect(() => {
    handleFetchCart();
  }, [handleFetchCart]);

  const handleCheckoutCart = ({ id, name, price }) => {
    Swal.fire({
      title: `<strong> My Cart! </strong>`,
      text: "asfasfasfas",
      html: `<div class="flex flex-col "><div class="flex flex-col h-60 overflow-y-auto divide-y">${
        cart.length
          ? cart?.map(
              (c) =>
                `<div
              key={${c?.id}}
              class=" w-full h-full flex flex-col sm:flex-row p-4 justify-between"
            >
              
              <div class="flex">
                <div class="w-16 h-16 flex">
                  <img
                  class="object-cover w-full h-full"
                    src="https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  />
                </div>
                <div class="flex flex-col ml-2.5 justify-between h-full text-left">
                  <div class="flex flex-col leading-none">
                    <span class="font-medium mb-2 ">
                      ${c?.product?.name}
                    </span>
                    <span>₱${c?.product?.price}</span>
                  </div>
                  <div class="text-xs font-semibold">Qty: ${c?.quantity}x</div>
                </div>
          
              </div>
              <span class="font-semibold text-lg leading-none">
                      ₱${c?.product?.price * c?.quantity}
              </span>
            </div>`
            )
          : null
      }  </div><p class="relative my-2 text-right font-semibold"> <span class="font-medium">Total Amount:</span> ₱${totalAmount} </p></div>
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Checkout",
      confirmButtonAriaLabel: "Thumbs up, great!",
    }).then((result) => {
      if (result.isConfirmed) {
        const response = axios
          .post(
            `/api/cart/${user?.id}`,
            {},
            {
              headers: {
                "x-api-key": process.env.REACT_APP_API_KEY,
              },
            }
          )
          .then((res) => res.data)
          .then((res) => {
            handleFetchCart();
            Swal.fire("Purchase Complete!", "", "success");
          })
          .catch(() => Swal.fire("Cart is Empty!", "", "error"));
      }
    });
  };

  return (
    <div className="px-10 md:px-20 pt-16  mb-20">
      <section className="mb-8 flex">
        <h2
          className="text-2xl leading-9 text-slate-400 font-semibold justify-center
        "
        >
          Hey <span className=" text-black">{user?.first_name}!</span>
          <br /> Welcome to your <span className=" text-black">cart.</span>
        </h2>
      </section>
      <section className=" bg-white w-full flex flex-col rounded-md h-[600px] overflow-auto divide-y">
        {cart.length
          ? cart?.map((c) => (
              <div
                key={c?.id}
                className=" w-full h-full flex flex-col sm:flex-row p-4 justify-between max-h-[320px] sm:max-h-[130px]"
              >
                <div className="w-full h-48 flex sm:hidden">
                  <img
                    className="object-cover w-full h-full"
                    src="https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  />
                </div>
                <div className="flex justify-between sm:justify-normal mt-2 sm:m-0">
                  <div className="w-24 h-24 sm:flex hidden">
                    <img
                      className="object-cover w-full h-full"
                      src="https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    />
                  </div>
                  <div className="flex flex-col ml-2.5 justify-between h-full">
                    <div className="flex flex-col ">
                      <span className="font-medium mb-2">
                        {c?.product?.name}
                      </span>{" "}
                      <span>₱{c?.product?.price}</span>
                    </div>
                    <div className="text-xs font-semibold">{c?.quantity}x</div>
                  </div>
                  <span className="font-semibold text-lg  flex sm:hidden">
                    ₱{c?.product?.price * c?.quantity}
                  </span>
                </div>
                <span className="font-semibold text-lg  hidden sm:flex">
                  ₱{c?.product?.price * c?.quantity}
                </span>
              </div>
            ))
          : null}
      </section>
      <div className="w-full flex justify-end">
        <p className="text-lg font-medium my-3">Total Amount: {totalAmount}</p>
      </div>

      <div className="flex justify-end my-4">
        <button
          class="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 border border-violet-400 rounded shadow text-lg"
          onClick={handleCheckoutCart}
        >
          Checkout cart!
        </button>
      </div>
    </div>
  );
};
