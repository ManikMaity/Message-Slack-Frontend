import axios from "@/config/axios.config";

export async function createOrder({ amount = 0, currency = "INR" }) {
  try {
    const resposne = await axios.post(
      "/payment/create-order",
      {
        amount,
        currency,
      },
      {
        headers: {
          slack_token: localStorage.getItem("access-token"),
        },
      }
    );
    return resposne?.data?.data;
  } catch (err) {
    throw err.response.data;
  }
}

export async function capturePayment({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  amount,
}) {
  try {
    const response = await axios.post(
      "/payment/capture-payment",
      {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
      },
      {
        headers: {
          slack_token: localStorage.getItem("access-token"),
        },
      }
    );

    return response?.data?.data;
  } catch (err) {
    throw err.response.data;
  }
}
