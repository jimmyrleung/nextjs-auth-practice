import type { NextPage } from 'next';
import { Input, PageContainer, Button } from '../src/components/common';
import { } from '../src/components/common/Button';
import styles from '../styles/login.module.css';

const LoginPage: NextPage = () => {
    return (
        <PageContainer className={styles.wrapper}>
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
