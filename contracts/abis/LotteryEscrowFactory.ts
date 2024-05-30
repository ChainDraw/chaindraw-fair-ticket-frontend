export const abi = [
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    name: 'allEscrows',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'createEscrow',
    inputs: [
      { name: '_organizer', type: 'address', internalType: 'address' },
      { name: '_concertId', type: 'string', internalType: 'string' },
      { name: '_ticketType', type: 'uint256', internalType: 'uint256' },
      { name: '_typeName', type: 'string', internalType: 'string' },
      { name: '_name', type: 'string', internalType: 'string' },
      { name: '_price', type: 'uint256', internalType: 'uint256' },
      { name: '_url', type: 'string', internalType: 'string' },
      {
        name: '_ticketCount',
        type: 'uint256',
        internalType: 'uint256',
      },
      { name: '_ddl', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      {
        name: 'escrowAddress',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'escrows',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getEscrowAddressByTicketType',
    inputs: [{ name: 'ticketType', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isRegistered',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'EscrowCreated',
    inputs: [
      {
        name: 'concertId',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'ticketType',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'escrowAddress',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'TicketTypeAlreadyExists', inputs: [] },
] as const;
