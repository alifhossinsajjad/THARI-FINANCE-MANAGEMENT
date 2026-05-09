import { useAppSelector } from "@/Redux/hooks";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";
import { getPlanById, FeatureKey } from "@/lib/subscription-plans";

/**
 * Custom hook to check if the current user has an active premium subscription
 * and what features they have access to.
 */
export const usePremiumStatus = () => {
    const user = useAppSelector(selectCurrentUser);

    const isPremium = !!(user?.plan_id && user?.plan_name);
    const planId = user?.plan_id || null;
    const planName = user?.plan_name || null;
    
    const planDetails = getPlanById(planId);

    const hasFeature = (feature: FeatureKey): boolean => {
        return planDetails.features.includes(feature);
    };

    return { 
        isPremium, 
        planName, 
        planId, 
        user, 
        planDetails,
        hasFeature,
        analysisLimit: planDetails.analysisLimit
    };
};
