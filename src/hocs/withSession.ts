import nookies, { setCookie } from 'nookies';
import { NextPageContext } from "next";
import { JWTAdapter } from '../api/infra/JWTAdapter';
import { JwtPayload } from 'jsonwebtoken';

export enum SESSION_STATE {
    EMPTY = 'empty',
    VALID = 'valid',
    EXPIRED = 'expired',
    REFRESHED = 'refreshed'
};

export interface Session {
    userId?: number;
    isValid: boolean;
    roles: string[];
}

function extractTokenPayload(jwtAdapter: JWTAdapter, token: string) {
    const jwt = jwtAdapter.decode(token);
    const payload = jwt?.payload as JwtPayload;
    const id = payload.id;
    const roles = payload.roles;
    return { id, roles };
}

export function withSession(callback: (session: Session) => void) {
    // TODO: encapsulate token logic to a separate class
    return async (context: NextPageContext) => {
        const cookies = nookies.get(context);
        const accessToken = cookies?.ACCESS_TOKEN_KEY;
        const refreshToken = cookies?.REFRESH_TOKEN_KEY;

        // First time accessing or cookies cleaned up
        if (!accessToken) {
            return callback({ isValid: false, roles: [] });
        }

        const tokenModule = new JWTAdapter();
        const isAccessTokenValid = tokenModule.verify(accessToken, 'access');

        // Previous access token still valid
        if (isAccessTokenValid) {
            const { id, roles } = extractTokenPayload(tokenModule, refreshToken);
            return callback({ isValid: true, userId: id, roles });
        }

        // Check if refresh token is valid
        const isRefreshTokenValid = tokenModule.verify(refreshToken, 'refresh');

        if (!isRefreshTokenValid) {
            return callback({ isValid: false, roles: [] });
        }

        // Replicate the token payload
        const { id, roles } = extractTokenPayload(tokenModule, refreshToken);

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

        return callback({ isValid: true, userId: id, roles });
    }
}
