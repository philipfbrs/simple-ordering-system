import React, { useEffect, useMemo, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import Stepper from "./Stepper";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthContext } from "../../component/hooks/useAuthContext";

export const Login = () => {
  const { login, initialize } = useAuthContext();
  const schema = yup
    .object({
      email: yup.string().email("Invalid Email").required("Email is required!"),
      password: yup.string().required("Password is required!"),
    })
    .required();

  const defaultValues = useMemo(() => {
    return {
      email: "",
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

  const onSubmit = async (data) => {
    return handleSubmitData(data);
  };

  const handleSubmitData = async (payload) => {
    try {
      await login(payload.email, payload.password);
      await initialize();
    } catch (error) {
      console.error(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  const values = watch();

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <div className="bg-green-700 flex justify-center items-center w-full h-screen">
      <div className="w-full h-full sm:h-[700px] sm:w-[1200px] bg-white rounded-none sm:rounded-3xl flex justify-center mx-0 sm:mx-4 ">
        <div className="w-[80%] bg-blue-500 lg:block hidden rounded-l-3xl">
          <img
            className="w-full h-full object-cover object-left  rounded-l-3xl"
            src="pexels-andrea-piacquadio-3758114.jpg"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex h-full flex-col justify-between items-center p-2 sm:p-8 "
        >
          <div className="flex flex-col justify-center items-center mt-8 sm:mt-0">
            <h1
              className="font-bold text-green-800 p-0 m-3 text-4xl
          "
            >
              Sign In
            </h1>

            <h2>We offer products!</h2>
            {!!errors.afterSubmit && (
              <div className="bg-red-300 rounded-md my-4 py-2 px-10">
                {" "}
                <p className="text-xs">{errors?.afterSubmit.message}</p>{" "}
              </div>
            )}
            <div className="flex justify-center flex-col text-start w-full px-10 text-[#212121] mt-8 sm:my-2">
              <div className="w-full items-center justify-between ml-2.5 m-0 sm:mx-[18px] pr-0 sm:pr-[38px] mb-2.5 sm:mb-0">
                <label className="w-1/3 mr-4 font-semibold">Email:</label>
                <input
                  className={`p-2 w-full bg-slate-200 mt-0.5 rounded-md ${
                    errors.email?.message
                      ? "outline-red-700 border-red-700"
                      : "border-black outline-black"
                  }`}
                  {...register("email")}
                />
                <p className="text-xs text-red-700 mt-1">
                  {errors.email?.message}
                </p>
              </div>
              <div className="flex m-0 sm:m-2.5 flex-col sm:flex-row">
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
                  <div className="flex w-full justify-between mt-1">
                    <p className="text-xs text-red-700">
                      {errors.password?.message}
                    </p>
                    <a className="text-xs underline text-gray-700 cursor-pointer">
                      Forget Password?
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="justify-center flex items-center">
              <button
                type="button"
                disabled={true}
                className="font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-slate-300 text-white"
              >
                Sign Up
              </button>
              <input
                type="submit"
                value={"Login"}
                className="cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
