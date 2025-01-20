import { capturePayment, createOrder } from "@/apis/payment";
import { RAZORPAY_ID } from "@/config/clientConfig";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useGetUserProfile from "../user/useGetUserProfile";
import useAuthContext from "../context/useAuthContext";

function usePayment() {

  const {getUserProfileMutateAsync} = useGetUserProfile();
  const {setAuth} = useAuthContext();
  
  const navigate = useNavigate();

    const {mutateAsync : capturePaymentMutateAsync} = useMutation({
        mutationFn: capturePayment,
        onSuccess: async () => {
          toast({
            title: "Payment successful.",
            description: `Your payment has been successfully done.`,
            status: "success",
          });
          const user = await getUserProfileMutateAsync();
          setAuth(prev => ({...prev, user}));
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
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
