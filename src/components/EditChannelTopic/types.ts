import { ChannelState } from 'store/channel/types';

export interface EditChannelTopicProps {
  currentChannel: ChannelState;
  setOpenEditModal: (state: boolean) => void;
  value?: string;
}
