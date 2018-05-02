import * as storage from '@commercetools-local/utils/storage';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';

export default () => storage.get(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY);
