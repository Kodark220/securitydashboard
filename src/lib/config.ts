"use client";

/**
 * Configuration utilities for GenLayer SecurityGuard contract
 */

export const GENLAYER_CHAIN_ID = parseInt(
  import.meta.env.VITE_GENLAYER_CHAIN_ID || "61999"
);

export const GENLAYER_CHAIN_ID_HEX = `0x${GENLAYER_CHAIN_ID.toString(16).toUpperCase()}`;

export const GENLAYER_NETWORK = {
  chainId: GENLAYER_CHAIN_ID_HEX,
  chainName: import.meta.env.VITE_GENLAYER_CHAIN_NAME || "GenLayer Studio",
  nativeCurrency: {
    name: "GEN",
    symbol: "GEN",
    decimals: 18,
  },
  rpcUrls: [import.meta.env.VITE_GENLAYER_RPC_URL || "https://studio.genlayer.com/api"],
  blockExplorerUrls: [],
};

/**
 * Get the GenLayer RPC URL from environment variables
 */
export function getGenLayerRpcUrl(): string {
  return (
    import.meta.env.VITE_GENLAYER_RPC_URL || "https://studio.genlayer.com/api"
  );
}

/**
 * Get the contract address from environment variables
 */
export function getContractAddress(): string {
  const address = import.meta.env.VITE_CONTRACT_ADDRESS;
  if (!address || address === "0x") {
    return "";
  }
  return address;
}

/**
 * Format address for display
 */
export function formatAddress(address: string | null, maxLength: number = 12): string {
  if (!address) return "";
  if (address.length <= maxLength) return address;

  const prefixLength = Math.floor((maxLength - 3) / 2);
  const suffixLength = Math.ceil((maxLength - 3) / 2);

  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
}
