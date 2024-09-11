import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { createAssociatedTokenAccountInstruction, createInitializeMetadataPointerInstruction, createInitializeMint2Instruction, createInitializeMintInstruction, createMintToInstruction, ExtensionType, getAssociatedTokenAddressSync, getMinimumBalanceForRentExemptMint, getMintLen, LENGTH_SIZE, MINT_SIZE, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID, TYPE_SIZE } from "@solana/spl-token"
import { createInitializeInstruction ,pack } from "@solana/spl-token-metadata"

// createToken is the derived function of createMint where we are signing the transaction with wallet of the user 
async function createToken(wallet : any , connection : any) {
    const mintKeypair = Keypair.generate();
    const metadata = {
        mint: mintKeypair.publicKey,
        name: 'KIRA',
        symbol: 'KIR    ',
        uri: 'https://cdn.100xdevs.com/metadata.json',
        additionalMetadata: [],
    };

    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

    const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: mintLen,
            lamports,
            programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(mintKeypair.publicKey, wallet.publicKey, mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID),
        createInitializeMintInstruction(mintKeypair.publicKey, 9, wallet.publicKey, null, TOKEN_2022_PROGRAM_ID),
        createInitializeInstruction({
            programId: TOKEN_2022_PROGRAM_ID,
            mint: mintKeypair.publicKey,
            metadata: mintKeypair.publicKey,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mintAuthority: wallet.publicKey,
            updateAuthority: wallet.publicKey,
        }),
    );
        
    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.partialSign(mintKeypair);

    await wallet.sendTransaction(transaction, connection);

    console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
    const associatedToken = getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        wallet.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID,
    );

    console.log(associatedToken.toBase58());

    const transaction2 = new Transaction().add(
        createAssociatedTokenAccountInstruction(
            wallet.publicKey,
            associatedToken,
            wallet.publicKey,
            mintKeypair.publicKey,
            TOKEN_2022_PROGRAM_ID,
        ),
    );

    await wallet.sendTransaction(transaction2, connection);

    const transaction3 = new Transaction().add(
        createMintToInstruction(mintKeypair.publicKey, associatedToken, wallet.publicKey, 1000000000, [], TOKEN_2022_PROGRAM_ID)
    );

    await wallet.sendTransaction(transaction3, connection);

    console.log("Minted!")
}

export default createToken;