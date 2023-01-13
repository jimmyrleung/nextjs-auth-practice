import type { NextPage } from 'next';
import { Session, SESSION_STATE, withSession } from '../src/hocs';

const IndexPage: NextPage = () => {
  return (
    <h1>Loading...</h1>
  )
}

export default IndexPage;

export const getServerSideProps = withSession((session: Session) => {
  if (!session.isValid) {
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
});
