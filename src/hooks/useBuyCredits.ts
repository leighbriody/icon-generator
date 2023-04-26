import { loadStripe } from "@stripe/stripe-js";
import { api } from "~/utils/api";
import { env } from "~/env.mjs";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_KEY);


//Custom hook we can use anywhere in our app
//to call function buy creates , create checkout session
//and redirect to stripe checkout page
export function useBuyCredits() {
  const checkout = api.checkout.createCheckout.useMutation();

  return {
    buyCredits: async () => {
      const response = await checkout.mutateAsync();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: response.id,
      });
    },
  };
}
