import { getWarehousesNames } from '../../locations/APIs/apiWarehouses';
import { getBranchesNames } from '../../locations/APIs/branchesAPI';
import {
    createGlobalSettings,
    updateGlobalSettings,
} from '../APIs/settingsApi';
import {
    settingsSetMainBranch,
    settingsSetMainWarehouse,
} from '../slice/settingsSlice';

export const getSettingsData = async () => {
    const warehousesData = await getWarehousesNames();
    const branchesData = await getBranchesNames();
    return { warehousesData, branchesData };
};

export const updateMainBranch = async (
    mainBranch,
    globalSettingsId,
    selectedWarehouse,
    dispatch,
) => {
    try {
        if (!globalSettingsId) {
            createGlobalSettings();
        } else {
            updateGlobalSettings({
                mainBranchId: mainBranch?.id,
                mainWarehouseId: selectedWarehouse?.id,
                globalSettingsId,
            });
            dispatch(settingsSetMainBranch(mainBranch));
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const updateMainWarehouse = async (
    mainWarehouse,
    globalSettingsId,
    selectedBranch,
    dispatch,
) => {
    try {
        if (!globalSettingsId) {
            createGlobalSettings(mainWarehouse);
        } else {
            updateGlobalSettings({
                mainBranchId: selectedBranch?.id,
                mainWarehouseId: mainWarehouse?.id,
                globalSettingsId,
            });
            dispatch(settingsSetMainWarehouse(mainWarehouse));
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
