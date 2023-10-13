import React, { useEffect, useMemo, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import Stepper from "./Stepper";
import Swal from "sweetalert2";
import { useAuthContext } from "../../component/hooks/useAuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../component/utils/axios";

export const ResetPassword = () => {
  // const { login, initialize } = useAuthContext();
  const navigate = useNavigate();
  const [token,setToken] = useState(null);
  useEffect(() => {
    try {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let token = params.get("token");
      if (!token) {
        handleNavigate("/login");
      }
      setToken(token);
    } catch (Err) {
      handleNavigate("/login");
    }
  }, []);

  const schema = yup
    .object({
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
      password: yup
        .string()
        .required("Password is required!")
        .min(5, "Minimum of 5 characters"),
    })
    .required();

  const defaultValues = useMemo(() => {
    return {
      confirmPassword: "",
      password: "",
    };
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = async (payload) => {
    try {
      console.log(payload);
      const response = axios
        .post(
          `/api/auth/reset-password?token=${token}`,
          payload,
          {
            headers: {
              "x-api-key": process.env.REACT_APP_API_KEY,
            },
          }
        )
        .then((res) => res.data)
        .then((res) => Swal.fire("Password reset successfully", "", "success"))
        .catch((res) => Swal.fire("Reset password expired!", "", "error"));
      handleNavigate("/login");
    } catch (error) {
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
      handleNavigate("/login");
    }
  };

  const values = watch();

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const handleNavigate = (link) => {
    navigate(link);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <img
        className="opacity-50 absolute w-full h-full"
        src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <div className="z-10 w-full h-full sm:h-[700px] sm:w-[1200px] bg-white rounded-none sm:rounded-3xl flex justify-center mx-0 sm:mx-4 opacity-100">
        <div className="w-[80%] bg-blue-500 lg:block hidden rounded-l-3xl">
          <img
            className="w-full h-full object-cover object-center  rounded-l-3xl"
            src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex h-full flex-col justify-between items-center p-2 sm:p-8 "
        >
          <div className="flex flex-col justify-center items-center text-center mt-8 sm:mt-0">
            <h1
              className="font-bold text-green-800 p-0 m-3 text-4xl
          "
            >
              Forget Password
            </h1>

            <h2>Please enter your email.</h2>
            {!!errors.afterSubmit && (
              <div className="bg-red-300 rounded-md my-4 py-2 px-10">
                <p className="text-xs">{errors?.afterSubmit.message}</p>
              </div>
            )}
            <div className="flex justify-center flex-col text-start w-full px-10 text-[#212121] my-8">
              <div className="w-full items-center justify-between mx-[18px] pr-[38px] mb-2.5 sm:mb-0">
                <label className="w-1/3 mr-4 font-semibold">
                  Confirm Password:
                </label>
                <input type="password"
                  className={`p-2 w-full bg-slate-200 mt-0.5 rounded-md ${
                    errors.confirmPassword?.message
                      ? "outline-red-700 border-red-700"
                      : "border-black outline-black"
                  }`}
                  {...register("confirmPassword")}
                />
                <p className="text-xs text-red-700 mt-1">
                  {errors.confirmPassword?.message}
                </p>
              </div>
              <div className="w-full items-center justify-between mx-[18px] pr-[38px] mb-2.5 sm:mb-0">
                <label className="w-1/3 mr-4 font-semibold">Password:</label>
                <input type="password"
                  className={`p-2 w-full bg-slate-200 mt-0.5 rounded-md ${
                    errors.password?.message
                      ? "outline-red-700 border-red-700"
                      : "border-black outline-black"
                  }`}
                  {...register("password")}
                />
                <p className="text-xs text-red-700 mt-1">
                  {errors.password?.message}
                </p>
              </div>
              {/* <div className="flex m-0 sm:m-2.5 flex-col sm:flex-row">
                <div className="w-full items-center justify-between mx-2.5">
                  <label className="w-1/3 mr-4 font-semibold">Password: </label>
                  <input
                    type="password"
                    className={`p-2 w-full bg-slate-200 mt-0.5 rounded-md ${
                      errors.password?.message
                        ? "outline-red-700 border-red-700"
                        : "border-black outline-black"
                    }`}
                    {...register("password")}
                  />
                </div>
              </div> */}
            </div>

            <div className="justify-center flex items-center">
              <button
                type="button"
                onClick={() => handleNavigate("/login")}
                className="font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-slate-300 text-white"
              >
                Cancel
              </button>
              <input
                type="submit"
                value={"Confirm"}
                className="cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
