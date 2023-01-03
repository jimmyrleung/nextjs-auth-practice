import type { NextPage, NextPageContext } from 'next';

const IndexPage: NextPage = () => {
  return (
    <h1>Loading...</h1>
  )
}

export default IndexPage;

export const getServerSideProps = (context: NextPageContext) => {
  const isValid = true;

  if (!isValid) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: '/todos'
    }
  };
};
