import { useState } from 'react';
import { signAndSendTransactions } from 'helpers';
import { Address, Transaction } from 'lib';
import { useGetAccount, useGetNetworkConfig } from 'lib';

export const PingPongRaw = () => {
  const { address } = useGetAccount();
  const { network } = useGetNetworkConfig();
  const [contractAddress, setContractAddress] = useState(
    'erd1qqqqqqqqqqqqqpgq283wn5u9f4gazvxw0xjw0hhxd8ms8sr9xtjqs72hf4' 
  );

  const handleLock = async () => {
    const unlockTime = Math.floor(Date.now() / 1000) + 300;
    
    const transaction = new Transaction({
      value: BigInt('1000000000000000000'),
      data: new TextEncoder().encode(`lockFunds@${unlockTime.toString(16)}`),
      receiver: new Address(contractAddress),
      sender: new Address(address),
      chainID: network.chainId,
      gasLimit: BigInt(5000000),
    });

    await signAndSendTransactions({ transactions: [transaction] });
  };

  const handleWithdraw = async () => {
    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode('withdraw'),
      receiver: new Address(contractAddress),
      sender: new Address(address),
      chainID: network.chainId,
      gasLimit: BigInt(5000000),
    });

    await signAndSendTransactions({ transactions: [transaction] });
  };

  return (
    <div className='flex flex-col gap-4 p-6 bg-gray-900 rounded-xl mt-6'>
      <h2 className='text-xl font-bold text-white'>Legacy Lock Vault</h2>
      
      <div className='flex flex-col gap-2'>
        <label className='text-gray-400 text-sm'>Contract Address:</label>
        <input 
          type='text' 
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          className='p-2 rounded bg-gray-800 text-white border border-gray-700 w-full'
        />
      </div>

      <div className='flex gap-4 mt-4'>
        <button 
          onClick={handleLock}
          className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
        >
          Lock 1 xEGLD (5 Mins)
        </button>
        
        <button 
          onClick={handleWithdraw}
          className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};