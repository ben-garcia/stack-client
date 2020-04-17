// if I export from ./types the I get
// "Cannot re-export a type when the
// '--isolatedModules' flag is provided"
// erorr
import {
  EditChannelDescrptionModalState as EditChannelDescriptionModalStateAlias,
  EditChannelDescriptionModalActionTypes as EditChannelDescriptionModalActionTypesAlias,
} from './types';
import EditChannelDescriptionodalReducer from './reducer';

export {
  closeEditChannelDescriptionModal,
  openEditChannelDescriptionModal,
} from './actions';
export { EditChannelDescriptionModalActions } from './types';

export type EditChannelDescriptionModalState = EditChannelDescriptionModalStateAlias;
export type EditChannelDescriptionModalActionTypes = EditChannelDescriptionModalActionTypesAlias;
export const editChannelDescriptionModalReducer = EditChannelDescriptionodalReducer;
