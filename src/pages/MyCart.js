import React, { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../component/hooks/useAuthContext";
import { useMyCartStore } from "../zustand/myCartStore";

export const MyCart = () => {
  const { user } = useAuthContext();
  const cart = useMyCartStore((state) => state.cart);
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
  }, [payload]);

  useEffect(() => {
    handleFetchCart();
  }, [handleFetchCart]);

  //   console.log(user);
  return (
    <div className="px-10 md:px-20 pt-16">
      <section className="mb-8 flex">
        <h2
          className="text-2xl leading-9 text-slate-400 font-semibold justify-center
        "
        >
          Hey <span className=" text-black">{user?.first_name}!</span>
          <br /> Welcome to your <span className=" text-black">cart.</span>
        </h2>
      </section>
      <section className=" bg-white w-full flex flex-col rounded-md">
        {cart?.map((c) => (
          <div className=" w-full h-full flex p-4 ">
            <div className="w-24 h-24 flex">
              <img
                className="object-cover w-full h-full"
                src="https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
            </div>
            <div className="flex flex-col ml-2.5">
              <span className="font-medium mb-2">{c?.product?.name}</span> <span>{c?.product?.price}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
