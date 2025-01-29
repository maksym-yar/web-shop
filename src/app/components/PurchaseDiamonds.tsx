'use client'

import { useSession } from "next-auth/react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/Dialog";
import { useState } from "react";
import { wait } from "../lib/utils";
import Loader from "../ui/Loader";

function Purchase() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [balance, setBalance] = useLocalStorage('diamondBalance', 0);

  const handlePurchase = async (amount: number) => {
    setIsSubmitting(true);

    await wait(1000);

    setBalance(balance + amount)
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <p className="text-2xl font-bold text-pretty">Current diamond balance: {balance}</p>

      <Dialog>
        <DialogTrigger className="p-3 bg-blue-700 text-bold text-white rounded-md">Purchase</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How many do you want to buy?</DialogTitle>
          </DialogHeader>

          {isSubmitting ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              <li>
                <button onClick={() => handlePurchase(10)} className="text-2xl w-full p-2 bg-blue-200 rounded-md">
                1$ for 10 diamond
                </button>
              </li>
              <li>
                <button onClick={() => handlePurchase(25)} className="text-2xl w-full p-2 bg-blue-200 rounded-md">
                2$ for 25 diamonds <p className="text-xs">0.5$ profit</p>
                </button>
              </li>
              <li>
                <button onClick={() => handlePurchase(90)} className="text-2xl w-full p-2 bg-blue-200 rounded-md">
                5$ for 90 diamonds <p className="text-xs">4$ profit</p>
                </button>
              </li>
              <li>
                <button onClick={() => handlePurchase(300)} className="text-2xl w-full p-2 bg-blue-200 rounded-md">
                15$ for 300 diamonds <p className="text-xs">15$ profit</p>
                </button>
              </li>
            </ul>
            )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function PurchaseDiamonds() {
  const { status } = useSession();

  if (status !== 'authenticated') return null;

  return status === 'authenticated' ? <Purchase /> : null;
}
