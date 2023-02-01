import { useSessionContext } from "../context/SessionContext"

export function withRoleCheck(Component: any, requiredRole: string) {
    const ComponentWithRoleCheck = (props: any) => {
        const [session] = useSessionContext();
        console.log('withRoleCheck::session', session);
        return session.roles.includes(requiredRole)
            ? <Component {...props} />
            : null;
    }

    return ComponentWithRoleCheck;
}