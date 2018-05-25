import * as storage from '@commercetools-local/utils/storage';
import { STORAGE_KEYS } from '../../constants';

export default () => storage.get(STORAGE_KEYS.ACTIVE_PROJECT_KEY);
