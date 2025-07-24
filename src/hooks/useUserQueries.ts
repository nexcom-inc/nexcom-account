import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../stores/auth/auth-store";
import { userAPI } from "@/lib/api";

// Query keys
export const userKeys = {
  all: ["user"] as const,
  profile: () => [...userKeys.all, "profile"] as const,
};

// Hook pour récupérer le profil utilisateur
export function useUserProfile() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: () => userAPI.getProfile().then((res) => res.data),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount: number, error: { response: { status: number } }) => {
      // Ne pas retry sur les erreurs 401/403
      if (error.response?.status === 401 || error.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

// Hook combiné pour toutes les données utilisateur
export function useUser() {
  const profileQuery = useUserProfile();

  return {
    // Données
    profile: profileQuery.data,

    // États de chargement
    isLoadingProfile: profileQuery.isLoading,

    // Erreurs
    profileError: profileQuery.error,

    // Méthodes de refetch
    refetchProfile: profileQuery.refetch,
    refetch: () => {
      profileQuery.refetch();
    },
  };
}
