import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, {
				status: "checked-in",
				is_paid: true,
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked in`);
			// Revalidate all active queries
			queryClient.invalidateQueries({ active: true });
			navigate("/");
		},
		onError: () => {
			toast.error("Error when trying to check in");
		},
	});

	return {
		checkin,
		isCheckingIn,
	};
}
