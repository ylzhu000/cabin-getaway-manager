import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

export default function DashboardLayout() {
	const { bookings, isLoading: bookingLoading } = useRecentBookings();
	const { confirmedStays, isLoading: stayLoading, numDays } = useRecentStays();
	const { cabins, isLoading: cabinsLoading } = useCabins();

	if (bookingLoading || stayLoading || cabinsLoading) return <Spinner />;

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings}
				confirmedStays={confirmedStays}
				numDays={numDays}
				cabinCount={cabins.length}
			/>
			<div>Statistics</div>
			<div>Today's activity</div>
			<div>Chart stay durations</div>
			<div>Statistics</div>
		</StyledDashboardLayout>
	);
}
