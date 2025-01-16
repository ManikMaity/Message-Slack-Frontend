import { capturePayment, createOrder } from "@/apis/payment";
import { RAZORPAY_ID } from "@/config/clientConfig";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation } from "@tanstack/react-query";

function usePayment() {

    const {mutateAsync : capturePaymentMutateAsync, isPending : capturePaymentPending} = useMutation({
        mutationFn: capturePayment,
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (err) => {
          toast({
            description: getErrorMessage(err),
            status: "error",
          });
        },
      });

  const { mutateAsync: createOrderMutateAsync, isPending: createOrderPending } =
    useMutation({
      mutationFn: createOrder,
      onSuccess: async (data) => {
        try {
          const { amount, currency, id: order_id } = data;
          const options = {
            key: RAZORPAY_ID,
            amount: amount,
            currency: currency,
            name: "Slack Clone",
            description: "Test Transaction",
            order_id: order_id,
            handler: async (response) => {
              console.log(response);
              await capturePaymentMutateAsync({...response, amount});
              toast({
                title: "Payment successful.",
                description: `Your payment has been successfully done. Id : ${response.razorpay_payment_id}`,
                status: "success",
              });
            },
            prefill: {
              name: "John Doe",
              email: "john.doe@example.com",
              contact: "9999999999",
            },
            theme: {
              color: "#3399cc",
            },
          };

          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        } catch (error) {
          toast({
            title: "Error while payment.",
            description: getErrorMessage(error),
          });
        }
      },
      onError: (err) => {
        toast({
          description: getErrorMessage(err),
          status: "error",
        });
      },
    });

  return {
    createOrderMutateAsync,
    createOrderPending,
  };
}

export default usePayment;
