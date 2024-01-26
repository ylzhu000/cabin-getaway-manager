import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
	const queryClient = useQueryClient();

	const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, {
				status: "checked-out",
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked out`);
			// Revalidate all active queries
			queryClient.invalidateQueries({ active: true });
		},
		onError: () => {
			toast.error("Error when trying to check out");
		},
	});

	return {
		checkout,
		isCheckingOut,
	};
}
