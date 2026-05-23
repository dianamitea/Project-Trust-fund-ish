import { useState } from 'react';
import { signAndSendTransactions } from 'helpers';
import { Address, Transaction, useGetAccount, useGetNetworkConfig } from 'lib';
import { contractAddress as defaultContractAddress } from 'config';

export const LegacyLockVault = () => {
  const { address } = useGetAccount();
  const { network } = useGetNetworkConfig();
  const [contractAddr, setContractAddr] = useState(defaultContractAddress);
  const [amountEgld, setAmountEgld] = useState('1');
  const [lockMinutes, setLockMinutes] = useState('5');

  const handleLock = async () => {
    if (!contractAddr.startsWith('erd1')) {
      alert('Please enter a valid MultiversX contract address (starts with erd1).');
      return;
    }
    const amount = parseFloat(amountEgld);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }
    const minutes = parseInt(lockMinutes, 10);
    if (isNaN(minutes) || minutes <= 0) {
      alert('Please enter a valid lock duration.');
      return;
    }

    const unlockTime = Math.floor(Date.now() / 1000) + minutes * 60;
    const valueInAtto = BigInt(Math.round(amount * 1e18));

    const transaction = new Transaction({
      value: valueInAtto,
      data: new TextEncoder().encode(`lockFunds@${unlockTime.toString(16)}`),
      receiver: new Address(contractAddr),
      sender: new Address(address),
      chainID: network.chainId,
      gasLimit: BigInt(5_000_000)
    });

    await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Securing funds in the vault...',
        errorMessage: 'Vault lock failed. Please try again.',
        successMessage: 'Funds successfully locked!'
      }
    });
  };

  const handleWithdraw = async () => {
    if (!contractAddr.startsWith('erd1')) {
      alert('Please enter a valid contract address first.');
      return;
    }

    const transaction = new Transaction({
      value: BigInt(0),
      data: new TextEncoder().encode('withdraw'),
      receiver: new Address(contractAddr),
      sender: new Address(address),
      chainID: network.chainId,
      gasLimit: BigInt(5_000_000)
    });

    await signAndSendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Attempting withdrawal...',
        errorMessage: 'Withdrawal failed. The time lock may still be active.',
        successMessage: 'Withdrawal successful! Funds returned.'
      }
    });
  };

  return (
    <div className='flex flex-col gap-6'>
      {/* Contract Address */}
      <div>
        <label className='block text-xs font-semibold text-secondary uppercase tracking-wider mb-2'>
          Vault Contract Address
        </label>
        <input
          type='text'
          value={contractAddr}
          onChange={(e) => setContractAddr(e.target.value)}
          className='w-full p-3 rounded-lg bg-neutral-900 border border-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm font-mono text-white'
        />
      </div>

      {/* Lock Configuration */}
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-xs font-semibold text-secondary uppercase tracking-wider mb-2'>
            Amount (xEGLD)
          </label>
          <input
            type='number'
            min='0.001'
            step='0.1'
            value={amountEgld}
            onChange={(e) => setAmountEgld(e.target.value)}
            className='w-full p-3 rounded-lg bg-neutral-900 border border-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm text-white'
          />
        </div>
        <div>
          <label className='block text-xs font-semibold text-secondary uppercase tracking-wider mb-2'>
            Lock Duration (minutes)
          </label>
          <input
            type='number'
            min='1'
            step='1'
            value={lockMinutes}
            onChange={(e) => setLockMinutes(e.target.value)}
            className='w-full p-3 rounded-lg bg-neutral-900 border border-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm text-white'
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex gap-4'>
        <button
          onClick={handleLock}
          className='flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg transition-all active:scale-95'
        >
          🔒 Lock xEGLD
        </button>
        <button
          onClick={handleWithdraw}
          className='flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg shadow-lg transition-all active:scale-95'
        >
          🔓 Withdraw Funds
        </button>
      </div>

      {/* Info note */}
      <p className='text-xs text-secondary text-center border-t border-neutral-700 pt-4'>
        Withdrawals will fail if the time lock has not yet expired.
      </p>
    </div>
  );
};