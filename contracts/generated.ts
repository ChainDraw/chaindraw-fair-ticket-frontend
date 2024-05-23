import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LotteryEscrowFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x0AC5A22dEbA7E6174704152c17fC3D0ec62483D0)
 */
export const lotteryEscrowFactoryAbi = [
  { type: 'error', inputs: [], name: 'TicketTypeAlreadyExists' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'concertId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'ticketType',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'escrowAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'EscrowCreated',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'allEscrows',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_organizer', internalType: 'address', type: 'address' },
      { name: '_concertId', internalType: 'uint256', type: 'uint256' },
      { name: '_ticketType', internalType: 'uint256', type: 'uint256' },
      { name: '_typeName', internalType: 'string', type: 'string' },
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_price', internalType: 'uint256', type: 'uint256' },
      { name: '_url', internalType: 'string', type: 'string' },
      { name: '_ticketCount', internalType: 'uint256', type: 'uint256' },
      { name: '_ddl', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createEscrow',
    outputs: [
      { name: 'escrowAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'escrows',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'ticketType', internalType: 'uint256', type: 'uint256' }],
    name: 'getEscrowAddressByTicketType',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isRegistered',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x0AC5A22dEbA7E6174704152c17fC3D0ec62483D0)
 */
export const lotteryEscrowFactoryAddress = {
  97: '0x0AC5A22dEbA7E6174704152c17fC3D0ec62483D0',
} as const

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x0AC5A22dEbA7E6174704152c17fC3D0ec62483D0)
 */
export const lotteryEscrowFactoryConfig = {
  address: lotteryEscrowFactoryAddress,
  abi: lotteryEscrowFactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lotteryEscrowFactoryAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x0AC5A22dEbA7E6174704152c17fC3D0ec62483D0)
 */
export const useReadLotteryEscrowFactory = /*#__PURE__*/ createUseReadContract({
  abi: lotteryEscrowFactoryAbi,
  address: lotteryEscrowFactoryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lotteryEscrowFactoryAbi}__ and `functionName` set to `"allEscrows"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x0AC5A22dEbA7E6174704152c17fC3D0ec62483D0)
 */
export const useReadLotteryEscrowFactoryAllEscrows =
  /*#__PURE__*/ createUseReadContract({
    abi: lotteryEscrowFactoryAbi,
    address: lotteryEscrowFactoryAddress,
    functionName: 'allEscrows',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lotteryEscrowFactoryAbi}__ and `functionName` set to `"escrows"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x0AC5A22dEbA7E6174704152c17fC3D0ec62483D0)
 */
export const useReadLotteryEscrowFactoryEscrows =
  /*#__PURE__*/ createUseReadContract({
    abi: lotteryEscrowFactoryAbi,
    address: lotteryEscrowFactoryAddress,
    functionName: 'escrows',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lotteryEscrowFactoryAbi}__ and `functionName` set to `"getEscrowAddressByTicketType"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x0AC5A22dEbA7E6174704152c17fC3D0ec62483D0)
 */
export const useReadLotteryEscrowFactoryGetEscrowAddressByTicketType =
  /*#__PURE__*/ createUseReadContract({
    abi: lotteryEscrowFactoryAbi,
    address: lotteryEscrowFactoryAddress,
    functionName: 'getEscrowAddressByTicketType',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lotteryEscrowFactoryAbi}__ and `functionName` set to `"isRegistered"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x0AC5A22dEbA7E6174704152c17fC3D0ec62483D0)
 */
export const useReadLotteryEscrowFactoryIsRegistered =
  /*#__PURE__*/ createUseReadContract({
    abi: lotteryEscrowFactoryAbi,
    address: lotteryEscrowFactoryAddress,
    functionName: 'isRegistered',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lotteryEscrowFactoryAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x0AC5A22dEbA7E6174704152c17fC3D0ec62483D0)
 */
export const useWriteLotteryEscrowFactory =
  /*#__PURE__*/ createUseWriteContract({
    abi: lotteryEscrowFactoryAbi,
    address: lotteryEscrowFactoryAddress,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lotteryEscrowFactoryAbi}__ and `functionName` set to `"createEscrow"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x0AC5A22dEbA7E6174704152c17fC3D0ec62483D0)
 */
export const useWriteLotteryEscrowFactoryCreateEscrow =
  /*#__PURE__*/ createUseWriteContract({
    abi: lotteryEscrowFactoryAbi,
    address: lotteryEscrowFactoryAddress,
    functionName: 'createEscrow',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lotteryEscrowFactoryAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x0AC5A22dEbA7E6174704152c17fC3D0ec62483D0)
 */
export const useSimulateLotteryEscrowFactory =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lotteryEscrowFactoryAbi,
    address: lotteryEscrowFactoryAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lotteryEscrowFactoryAbi}__ and `functionName` set to `"createEscrow"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x0AC5A22dEbA7E6174704152c17fC3D0ec62483D0)
 */
export const useSimulateLotteryEscrowFactoryCreateEscrow =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lotteryEscrowFactoryAbi,
    address: lotteryEscrowFactoryAddress,
    functionName: 'createEscrow',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lotteryEscrowFactoryAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x0AC5A22dEbA7E6174704152c17fC3D0ec62483D0)
 */
export const useWatchLotteryEscrowFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lotteryEscrowFactoryAbi,
    address: lotteryEscrowFactoryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lotteryEscrowFactoryAbi}__ and `eventName` set to `"EscrowCreated"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x0AC5A22dEbA7E6174704152c17fC3D0ec62483D0)
 */
export const useWatchLotteryEscrowFactoryEscrowCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lotteryEscrowFactoryAbi,
    address: lotteryEscrowFactoryAddress,
    eventName: 'EscrowCreated',
  })
