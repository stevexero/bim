import { Link } from 'react-router-dom';

const Receiving = () => {
  return (
    <div className='p-4'>
      <Link
        to='scanner'
        className='btn btn-lg btn-block rounded-xl btn-error text-white'
      >
        Scanner
      </Link>
    </div>
  );
};

export default Receiving;
