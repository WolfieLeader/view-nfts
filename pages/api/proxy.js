// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const func = async (req, res) => {
	try {
		const url = decodeURIComponent(req.query.url);
		const result = await fetch(url);
		const body = await result.body;
		body.pipe(res);
	} catch (err) {
		console.log("Error At Proxy");
	}
};

export default func;
