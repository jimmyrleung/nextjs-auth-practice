import type { NextPage } from 'next';
import { Session, SESSION_STATE, withSession } from '../src/hocs';

const IndexPage: NextPage = () => {
  return (
    <h1>Loading...</h1>
  )
}

export default IndexPage;

export const getServerSideProps = withSession((session: Session) => {
  const { state } = session;

  // TODO: abstract this logic so we don't have to configure this callback in every page
  if (state === SESSION_STATE.VALID || state === SESSION_STATE.REFRESHED) {
    return {
      redirect: {
        permanent: false,
        destination: '/todos'
      }
    };
  }

  if (state === SESSION_STATE.EMPTY || state === SESSION_STATE.EXPIRED) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    };
  }
});
