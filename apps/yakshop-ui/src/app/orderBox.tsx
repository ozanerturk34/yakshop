"use client";

import React, { useState } from "react";
import { Bounce, ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { order } from "./order";
import { TimeMachine } from "./timeMachine";

export const OrderBox = () => {
  const [day, setDay] = useState<number>(13);

  const orderForm = async (formData: FormData) => {
    const response = await order(day, formData);
    const toastOptions: ToastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    };
    if (response?.status === 201) {
      toast.success(
        `${response?.message} Successfully bought: ${response?.result.milk ? `milk:${response?.result.milk}` : ""} ${response?.result.skins ? `skins:${response?.result.skins}` : ""}`,
        toastOptions
      );
    } else if (response?.status === 206) {
      toast.info(
        `${response?.message} Partially bought: ${response?.result.milk ? `milk:${response?.result.milk}` : ""} ${response?.result.skins ? `skins:${response?.result.skins}` : ""}`,
        toastOptions
      );
    } else if (response?.status === 404) {
      toast.warning(response?.message);
    } else {
      toast.error(response?.message);
    }
  };

  const increment = () => {
    setDay((state) => (state - 1 > 0 ? state - 1 : 1));
  };
  const decrement = () => {
    setDay((state) => state + 1);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="mt-20 lg:mt-0 flex w-full justify-center items-center">
        <React.Suspense>
          <form action={orderForm} className="flex flex-col">
            <label htmlFor="milk" className="mt-3">
              What is your name?
            </label>
            <input type="text" name="name" className="text-black m-1 p-2" />
            <label htmlFor="milk" className="mt-3">
              Milk:
            </label>
            <input type="number" name="milk" className="text-black m-1 p-2" />
            <label htmlFor="milk" className="mt-3">
              Skins:
            </label>
            <input type="number" name="skins" className="text-black m-1 p-2" />
            <button type="submit" className="bg-green-500 m-1 p-2 rounded mt-5">
              Order
            </button>
          </form>
        </React.Suspense>
      </div>
      <TimeMachine day={day} increment={increment} decrement={decrement} />
    </React.Fragment>
  );
};
