import Moralis from "moralis";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import React from "react";
import Image from "next/image";

function Index() {
	const [search, setSearch] = React.useState("0xa5d47698331eb7de5e57a8234aa783dfbe2cb54f");
	const [nftArry, setNFTArray] = React.useState([]);
	const Web3Api = useMoralisWeb3Api();

	React.useEffect(() => {
		console.log(nftArry);
		nftArry.forEach((data) => {
			fetchURI(data.token_uri);
		});
	}, [nftArry]);

	const fetchNFTs = async () => {
		// get polygon NFTs for address
		const options = {
			chain: "eth",
			address: search,
		};
		const polygonNFTs = await Web3Api.account.getNFTs(options);
		setNFTArray(polygonNFTs.result);
	};
	const fetchURI = async (uri) => {
		const res = await fetch(uri);
		console.log(res);
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
			{nftArry && nftArry.map((data) => <img src={null} key={data.token_id} alt={data.name} />)}
		</>
	);
}
export default Index;
