import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function useLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate: login, isLoading: isLoggingIn } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: (user) => {
			// Avoid full page spinner if coming from login page
			queryClient.setQueriesData(["user"], user);
			navigate("/dashboard");
		},
		onError: (err) => {
			toast.error("Incorrect email or password");
			throw new Error(err.message);
		},
	});

	return {
		login,
		isLoggingIn,
	};
}
