import Moralis from "moralis";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import React from "react";
import Image from "next/image";

function Index() {
	const [search, setSearch] = React.useState("0xa5d47698331eb7de5e57a8234aa783dfbe2cb54f");
	const [nftArray, setNFTArray] = React.useState([]);

	const Web3Api = useMoralisWeb3Api();

	const fetchNFTs = async () => {
		try {
			const NFTs = await Web3Api.account.getNFTs({
				chain: "eth",
				address: search,
			});
			console.log(NFTs);
			const results = NFTs.result;
			console.log(results);

			results.forEach(async (result) => {
				const isMetaData = result.metadata != null || result.metadata != undefined;

				if (isMetaData) {
					try {
						const url = await JSON.parse(result.metadata);
						setNFTArray((pre) => [...pre, url]);
					} catch (err) {
						console.log("Error:" + err);
					}
				} else {
					try {
						const uri = await fetch(result.token_uri);
						const url = await uri.json();
						setNFTArray((pre) => [...pre, url]);
					} catch (err) {
						console.log("Error:" + err);
					}
				}
			});
		} catch (err) {
			console.log("Error:" + err);
		}
	};

	React.useEffect(() => {
		console.log(nftArray);
	}, [nftArray]);

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
			<button onClick={() => setNFTArray([])}>Reset</button>
			<br />
			{nftArray &&
				nftArray.map((metadata, index) => (
					<Image
						key={index}
						src={`/api/proxy?url=${encodeURIComponent(metadata?.image)}`}
						width="400px"
						height="400px"
						objectFit="cover"
						quality={80}
						alt={metadata?.name}
					/>
				))}
		</>
	);
}
export default Index;
