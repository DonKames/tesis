import { useSelector } from 'react-redux';

const useHasAccess = (allowedRoles) => {
    const { role } = useSelector((state) => state.auth);

    return allowedRoles.includes(role);
};

export default useHasAccess;
