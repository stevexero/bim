import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='p-4'>
      <Link
        to='receiving'
        className='btn btn-lg btn-block rounded-xl btn-error text-white'
      >
        Receiving
      </Link>
    </div>
  );
};

export default Home;
