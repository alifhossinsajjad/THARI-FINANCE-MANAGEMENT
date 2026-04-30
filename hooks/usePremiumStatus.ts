import { useAppSelector } from "@/Redux/hooks";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";

/**
 * Custom hook to check if the current user has an active premium subscription.
 * Returns true if the user has both a plan_id and a plan_name.
 */
export const usePremiumStatus = () => {
    const user = useAppSelector(selectCurrentUser);

    const isPremium = !!(user?.plan_id && user?.plan_name);
    const planName = user?.plan_name || null;
    const planId = user?.plan_id || null;

    return { isPremium, planName, planId, user };
};
