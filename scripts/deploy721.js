const main = async () => {
  // Replace these variables as needed
  const verifierContract = 'ERC721Verifier';
  const verifierName = 'ERC721zkMint';
  const verifierSymbol = 'zkERC721';

  // Deploy contract
  const poseidonFacade = '0xD65f5Fc521C4296723c6Eb16723A8171dCC12FB0';

  const ERC721Verifier = await ethers.getContractFactory(verifierContract, {
    libraries: {
      PoseidonFacade: '0xD65f5Fc521C4296723c6Eb16723A8171dCC12FB0',
    },
  });
  const erc721Verifier = await ERC721Verifier.deploy(
    verifierName,
    verifierSymbol
  );

  // Output result
  await erc721Verifier.deployed();
  console.log(verifierName, ' contract address:', erc721Verifier.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
