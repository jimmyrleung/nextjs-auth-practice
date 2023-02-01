import {
    createContext,
    useState,
    PropsWithChildren,
    useContext,
    Dispatch,
    SetStateAction
} from "react";
import { Session } from "../hocs";

const sessionInitialState = {
    isValid: false,
    roles: []
};

const SessionContext = createContext<[Session, Dispatch<SetStateAction<Session>>]>([
    sessionInitialState,
    () => { }
]);

export const SessionContextProvider = ({ children }: PropsWithChildren) => {
    const [session, setSession] = useState<Session>(sessionInitialState);

    return (
        <SessionContext.Provider value={[session, setSession]}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = () => useContext(SessionContext);
