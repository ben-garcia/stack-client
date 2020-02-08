import { updateChannelTopic } from 'store/channel/actions';
import { ChannelState } from 'store/channel/types';

export interface EditChannelTopicProps {
  currentChannel: ChannelState;
  setOpenEditModal: (state: boolean) => void;
  updateChannelTopicAction: typeof updateChannelTopic;
  value?: string;
}
