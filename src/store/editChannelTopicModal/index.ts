// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import {
  EditChannelTopicModalState as EditChannelTopicModalStateAlias,
  EditChannelTopicModalActionTypes as EditChannelTopicModalActionTypesAlias,
} from './types';
import EditChannelTopicModalReducer from './reducer';

export {
  closeEditChannelTopicModal,
  openEditChannelTopicModal,
} from './actions';
export { EditChannelTopicModalActions } from './types';

export type EditChannelTopicModalState = EditChannelTopicModalStateAlias;
export type EditChannelTopicModalActionTyeps = EditChannelTopicModalActionTypesAlias;
export const editChannelTopicModalReducer = EditChannelTopicModalReducer;
