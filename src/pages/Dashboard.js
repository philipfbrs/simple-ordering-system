import React, { useCallback, useEffect, useState } from "react";
import { useProductStore } from "../zustand/productStore";
import Swal from "sweetalert2";
import axios from "../component/utils/axios";
import { jwtDecode } from "../component/utils/utils";
import { useAuthContext } from "../component/hooks/useAuthContext";

export const Dashboard = () => {
  const { user } = useAuthContext();
  const isLoading = useProductStore((state) => state.isLoading);
  const products = useProductStore((state) => state.products);
  const getProducts = useProductStore((state) => state.getProducts);
  const [payload, setPayload] = useState({
    page: 0,
    limit: 20,
    search: "",
    filter: "",
    tabStatus: "all",
  });

  const handleFetchProduct = useCallback(() => {
    getProducts(payload);
  }, [payload]);

  useEffect(() => {
    handleFetchProduct();
  }, [handleFetchProduct]);

  const handleAddToCart = ({ id, name, price }) => {
    Swal.fire({
      title: `<strong> <u>${name}</u></strong>`,
      imageUrl:
        "https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      imageWidth: 300,
      imageHeight: 400,
      html: `<span>₱${price}</span>`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Add to Cart!",
      confirmButtonAriaLabel: "Thumbs up, great!",
    }).then((result) => {
      if (result.isConfirmed) {
        const response = axios
          .post(
            "/api/cart/add",
            { order_by: user?.id, product_id: id, quantity: 1 },
            {
              headers: {
                "x-api-key": process.env.REACT_APP_API_KEY,
              },
            }
          )
          .then((res) => res.data)
          .then((res) =>
            Swal.fire("Added to cart successfully", "", "success")
          );
      }
    });
  };

  return (
    <div className="px-10 md:px-20 pt-16  mb-20">
      <section className="mb-8 flex">
        <h2
          className="text-2xl leading-9 text-slate-400 font-semibold justify-center items-center text-center
        "
        >
          I'm looking for <span className=" text-black">anything</span>
          <br /> designed by <span className=" text-black">any brand.</span>
        </h2>
      </section>
      <section className="flex flex-wrap w-full justify-between">
        {products &&
          products.map((product) => (
            <div
              key={product.id}
              className="min-w-[12rem] min-h-[16rem] md:min-w-[16rem] md:min-h-[20rem] rounded-md  flex justify-between flex-col my-4  mx-2"
            >
              <div className="bg-blue-950 h-full mb-4 rounded-md cursor-pointer">
                <span className="absolute m-2 text-black font-medium p-1.5 rounded-md bg-white ">
                  NEW
                </span>
                <img
                  className="object-cover h-72 w-80 rounded-md"
                  onClick={() => handleAddToCart(product)}
                  src="https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
              </div>
              <div className="flex flex-col w-fit" onClick={handleAddToCart}>
                <h3 className="font-medium text-base cursor-pointer">
                  {product?.name || ""}
                </h3>
                <p className="cursor-pointer">{"₱" + product?.price || ""}</p>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};
