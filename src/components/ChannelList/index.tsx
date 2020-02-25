import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { Button, CreateChannelForm, Icon, List, Modal, Text } from 'components';
import { AppState } from 'store';
import { getCurrentChannel } from 'store/channel';
import { Channel } from 'store/channels';
import { requestChannelMembers } from 'store/members';
import { getCurrentTeammateId } from 'store/teammate';
import { ChannelListProps } from './types';
import './styles.scss';

const ChannelList: React.FC<ChannelListProps> = ({ className = '' }) => {
  const dispatch: Dispatch = useDispatch();
  const { currentChannel, channels } = useSelector((state: AppState) => ({
    currentChannel: state.currentChannel,
    channels: state.channels,
  }));
  const [createChannelFormIsOpen, setCreateChannelFormIsOpen] = useState<
    boolean
  >(false);
  let classesToAdd: string = 'channel-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  const saveChannel = (channel: Channel) => {
    // save current channel id to be used on page reload
    localStorage.setItem('currentChannel', JSON.stringify(channel));
    // dispatch action to change the store
    dispatch(getCurrentChannel(channel));
    // dispatch action to set current member id to 0
    // so it isn't active
    dispatch(getCurrentTeammateId(0));
    // delete current teammate id from local storage too
    localStorage.removeItem('currentTeammateId');
    // dispatch action to get all current channel's members
    dispatch(requestChannelMembers());
  };

  return (
    <section className={classesToAdd}>
      <div className="channel-list__inner">
        <Text tag="span" size="sm">
          Channels
        </Text>
        <Button
          className="channel-list__add-button"
          type="button"
          color="transparent"
          onClick={() => setCreateChannelFormIsOpen(true)}
          title="Create a new Channel"
        >
          <Icon type="plus" color="white" size="sm" />
        </Button>
      </div>
      <List>
        {channels.list.map((c: Channel) => (
          <List.Item key={c.id} active={c.id === currentChannel.id}>
            <Button
              type="button"
              color="transparent"
              className="channel-list__button"
              onClick={() => saveChannel(c)}
            >
              <Icon
                type={c.private ? 'lock' : 'hash'}
                size="xm"
                color="white"
                className="channel-list__icon"
              />
              {c.name}
            </Button>
          </List.Item>
        ))}
      </List>
      {createChannelFormIsOpen && (
        <Modal
          header="Create a Channel"
          size="sm"
          onClose={() => setCreateChannelFormIsOpen(false)}
        >
          <CreateChannelForm
            createChannelFormIsOpen={setCreateChannelFormIsOpen}
          />
        </Modal>
      )}
    </section>
  );
};

export default ChannelList;
