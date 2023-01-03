import type { NextPage } from 'next';
import { Input, PageContainer, Button } from '../src/components/common';
import appStyles from '../styles/app.module.css';

const LoginPage: NextPage = () => {
    return (
        <PageContainer className={appStyles.wrapper}>
            <div>
                <h1>Login</h1>
            </div>
            <div>
                <Input type='text' placeholder='Username' />
                <Input type='password' placeholder='Password' />
            </div>
            <div>
                <Button onClick={() => console.log('')}>Entrar</Button>
            </div>
        </PageContainer>
    )
}

export default LoginPage;
