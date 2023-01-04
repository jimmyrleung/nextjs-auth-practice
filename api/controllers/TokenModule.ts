export interface TokenModule {
    create(type: 'access' | 'refresh', payload: any): string;
    verify(token: string, type: 'access' | 'refresh'): boolean;
    decode(token: string): any | null;
}
