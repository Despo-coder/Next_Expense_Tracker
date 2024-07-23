import getUserBalance from '@/app/actions/getUserBalance';
import { addCommas } from '@/assets/utility/addCommas';

const Balance = async () => {
  const { balance } = await getUserBalance();

  return (
    <>
    {balance && balance < 0 ? ( 
      <h1 className='lowbalance'>${addCommas(Number(balance?.toFixed(2) ?? 0))}  Balance</h1>) : ( 
        <h1 className='goobalance'>${addCommas(Number(balance?.toFixed(2) ?? 0))} Balance</h1>)}
     
    </>
  );
};

export default Balance;