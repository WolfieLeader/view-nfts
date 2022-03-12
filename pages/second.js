import React from "react";
import Image from "next/image";

function Index() {
	const [search, setSearch] = React.useState("0xa5d47698331eb7de5e57a8234aa783dfbe2cb54f");
	const [totalNFTs, setTotalNFTs] = React.useState(0);
	const [nftArray, setNFTArray] = React.useState([]);

	const fetchNFTs = async () => {
		setNFTArray([]);
		const options = { method: "GET", headers: { Accept: "application/json" } };
		try {
			const data = await fetch(
				`https://api.opensea.io/api/v1/assets?owner=ownerWallet&owner=${search}&order_by=pk&order_direction=desc&limit=200&include_orders=true`,
				options
			);
			const res = await data.json();
			setTotalNFTs(res.assets.length);
			setNFTArray(res.assets);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<input
				type="text"
				placeholder="Wallet"
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
				}}
			/>
			<button onClick={fetchNFTs}>GetNFTs</button>
			{totalNFTs && <div>{totalNFTs}</div>}
			<br />
			{nftArray &&
				nftArray.map((objData, index) => (
					<Image
						key={index}
						src={`/api/proxy?url=${encodeURIComponent(objData?.image_url)}`}
						width="400px"
						height="400px"
						objectFit="cover"
						quality={80}
						alt={objData?.name}
					/>
				))}
		</>
	);
}
export default Index;
