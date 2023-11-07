const Operators = {
  NOOP: 0, // No operation, skip query verification in circuit
  EQ: 1, // equal
  LT: 2, // less than
  GT: 3, // greater than
  IN: 4, // in
  NIN: 5, // not in
  NE: 6, // not equal
};

async function main() {
  const schemaBigInt = '74977327600848231385663280181476307657';

  const schemaClaimPathKey =
    '20376033832371109177683048456014525905119173674985843915445634726167450989630';

  const requestId = 1;

  const query = {
    schema: schemaBigInt,
    claimPathKey: schemaClaimPathKey,
    operator: Operators.LT, // operator
    value: [20020101, ...new Array(63).fill(0).map((i) => 0)], // for operators 1-3 only first value matters
  };

  // add the address of the contract just deployed
  const ERC721VerifierAddress = '0xb080F1DDda4Ccb93740a148080353c490Ad63d2A';

  let erc721Verifier = await hre.ethers.getContractAt(
    'ERC721Verifier',
    ERC721VerifierAddress
  );

  const validatorAddress = '0xF2D4Eeb4d455fb673104902282Ce68B9ce4Ac450'; // sig validator
  // const validatorAddress = "0x3DcAe4c8d94359D31e4C89D7F2b944859408C618"; // mtp validator

  try {
    const txId = await erc721Verifier.setZKPRequest(
      requestId,
      validatorAddress,
      query.schema,
      query.claimPathKey,
      query.operator,
      query.value
    );
    console.log('Request set: ', txId.hash);
  } catch (e) {
    console.log('error: ', e);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
