import nookies, { setCookie } from 'nookies';
import { NextPageContext } from "next";
import { JWTAdapter } from '../../api/token/JWTAdapter';
import { JwtPayload } from 'jsonwebtoken';

export enum SESSION_STATE {
    EMPTY = 'empty',
    VALID = 'valid',
    EXPIRED = 'expired',
    REFRESHED = 'refreshed'
};

export interface Session {
    state: SESSION_STATE;
}

export function withSession(callback: (session: Session) => void) {
    return async (context: NextPageContext) => {
        const cookies = nookies.get(context);
        const accessToken = cookies?.ACCESS_TOKEN_KEY;
        const refreshToken = cookies?.REFRESH_TOKEN_KEY;

        // First time accessing or cookies cleaned up
        if (!accessToken) {
            return callback({ state: SESSION_STATE.EMPTY });
        }

        // TODO: see how to abstract this
        const tokenModule = new JWTAdapter();
        const isAccessTokenValid = tokenModule.verify(accessToken, 'access');

        // Previous access token still valid
        if (isAccessTokenValid) {
            return callback({ state: SESSION_STATE.VALID });
        }

        // Check if refresh token is valid
        const isRefreshTokenValid = tokenModule.verify(refreshToken, 'refresh');

        if (!isRefreshTokenValid) {
            return callback({ state: SESSION_STATE.EXPIRED });
        }

        // Replicate the token payload
        const jwt = tokenModule.decode(refreshToken);
        const payload = jwt?.payload as JwtPayload;
        const id = payload.id;

        const newAccessToken = tokenModule.create('access', { id });
        const newRefreshToken = tokenModule.create('refresh', { id });

        // Set new generated tokens
        setCookie({ res: context.res }, 'ACCESS_TOKEN_KEY', newAccessToken, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/'
        });

        setCookie({ res: context.res }, 'REFRESH_TOKEN_KEY', newRefreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/'
        });

        return callback({ state: SESSION_STATE.REFRESHED })
    }
}
