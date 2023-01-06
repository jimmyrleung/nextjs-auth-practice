import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { Input, PageContainer, Button } from '../src/components/common';
import { Credentials } from '../src/entities';
import { authService } from '../src/services';
import appStyles from '../styles/app.module.css';
import { Session, SESSION_STATE, withSession } from '../src/hocs';

const LoginPage: NextPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('user1@test.com');
    const [password, setPassword] = useState('senha123');

    async function login(credentials: Credentials) {
        if (credentials.isValid()) {
            await authService.login(credentials);
            router.push('/todos');
        } else {
            // TODO: better alert message
            alert('Invalid credentials')
        }
    }

    return (
        <PageContainer className={appStyles.wrapper}>
            <div>
                <h1>Login</h1>
            </div>
            <div>
                <Input
                    type='email'
                    placeholder='E-mail'
                    value={email}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                />
                <Input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                />
            </div>
            <div>
                <Button onClick={() => login(new Credentials(email, password))}>Entrar</Button>
            </div>
        </PageContainer>
    )
}

export default LoginPage;

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
        return { props: {} };
    }
});
