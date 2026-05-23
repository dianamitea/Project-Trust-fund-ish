import { useSendTransaction } from '@multiversx/sdk-dapp/hooks';
import { TokenPayment } from '@multiversx/sdk-core';

export const VaultActions = () => {
  const { sendTransaction } = useSendTransaction();

  const onLock = async () => {
    // We lock 1 xEGLD for 5 minutes (300 seconds) from now
    const unlockTime = Math.floor(Date.now() / 1000) + 300; 
    
    await sendTransaction({
      transaction: {
        value: TokenPayment.egldFromAmount('1'),
        data: `lockFunds@${unlockTime.toString(16)}`, // We encode the timestamp to hex
        receiver: 'erd1qqqqqqqqqqqqqpgq283wn5u9f4gazvxw0xjw0hhxd8ms8sr9xtjqs72hf4',
        gasLimit: 5000000
      }
    });
  };

  const onWithdraw = async () => {
    await sendTransaction({
      transaction: {
        value: '0',
        data: 'withdraw',
        receiver: 'erd1qqqqqqqqqqqqqpgq283wn5u9f4gazvxw0xjw0hhxd8ms8sr9xtjqs72hf4',
        gasLimit: 5000000
      }
    });
  };

  return (
    <div className="card p-4 m-2 text-center">
      <h3 className="mb-4">Vault Management</h3>
      <div className="flex justify-center gap-4">
        <button onClick={onLock} className="btn btn-primary px-4">Lock 1 xEGLD (5 min)</button>
        <button onClick={onWithdraw} className="btn btn-outline-secondary px-4">Withdraw Funds</button>
      </div>
    </div>
  );
};