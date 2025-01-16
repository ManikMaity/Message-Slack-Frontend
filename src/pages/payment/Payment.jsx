import { Bot, Clock, ContrastIcon, PhoneCall } from "lucide-react";

import Spinner from "@/components/molecules/Spinner";
import { Button } from "@/components/ui/button";
import usePayment from "@/hooks/apis/payment/usePayment";


function Payment() {

    const {createOrderMutateAsync, createOrderPending} = usePayment();

    async function handlePayment() {
        await createOrderMutateAsync({amount: 5, currency: "INR"});
    }

  return (
    <div className="h-full w-full dark:bg-slate-900 bg-gray-300 flex items-center justify-center">
      <div className="h-[90%] flex flex-col justify-evenly m-4 p-6 md:p-7 w-full max-w-md dark:bg-slate-950  bg-gray-100 rounded-lg">
        <h1 className="text-2xl md:text-3xl text-center">Subscribe</h1>

        <div>
          <h2 className="text-5xl md:text-7xl text-center font-bold">₹5</h2>
          <p className="text-base md:text-lg text-center mt-1 opacity-50">
            Lifetime
          </p>
        </div>

        <ul className="flex flex-col h-[40%] justify-between">
          <li className="flex items-center gap-2">
            <Bot />
            <p>AI auto generate texts.</p>
          </li>
          <li className="flex items-center gap-2">
            <Clock />
            <p>Lifetime access</p>
          </li>
          <li className="flex items-center gap-2">
            <PhoneCall />
            <p>24/7 chat support</p>
          </li>
          <li className="flex items-center gap-2">
            <ContrastIcon />
            <p>Unlimited workspaces</p>
          </li>
        </ul>
        <Button className="w-full" onClick={handlePayment}>
          {createOrderPending ? <Spinner /> : <p>Pay now</p>}
        </Button>
      </div>
    </div>
  );
}

export default Payment;
