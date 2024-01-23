import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function CabinTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField="discount"
				options={[
					{ value: "all", label: "All" },
					{ value: "with-discount", label: "With discount" },
					{ value: "no-discount", label: "No discount" },
				]}
			/>
			<SortBy
				options={[
					{ value: "name-asc", label: "Sort by name (A-Z)" },
					{ value: "name-desc", label: "Sort by name (Z-A)" },
					{ value: "regular_price-asc", label: "Sort by price (low to high)" },
					{ value: "regular_price-desc", label: "Sort by price (high to low)" },
				]}
			/>
		</TableOperations>
	);
}
