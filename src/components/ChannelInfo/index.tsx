import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, EditChannelTopic, Icon, Modal, Text } from 'components';
import { AppState } from 'store';
import { openChannelDetailsWithMembers } from 'store/channelDetails';
import {
  openEditChannelTopicModal,
  closeEditChannelTopicModal,
} from 'store/editChannelTopicModal';
import { ChannelInfoProps } from './types';
import './styles.scss';

const ChannelInfo: React.FC<ChannelInfoProps> = ({
  channel,
  className = '',
}) => {
  const dispatch = useDispatch();
  const {
    currentChannel,
    editChannelTopicModalIsOpen,
    membersSize,
  } = useSelector((state: AppState) => ({
    currentChannel: state.currentChannel,
    editChannelTopicModalIsOpen: state.editChannelTopicModalIsOpen,
    membersSize: state.members.list.length,
  }));
  let classesToAdd: string = 'channel';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <section className={classesToAdd}>
      <div className="channel__name">
        <Icon
          type={channel?.private ? 'lock' : 'hash'}
          color="black"
          size="xm"
          className="channel__icon-sm"
        />
        <Text tag="div" size="md">
          {channel?.name}
        </Text>
      </div>
      <div className="channel__inner">
        <div className="channel__inner-inside">
          <Button
            className="channel__members-button"
            color="transparent"
            onClick={() => dispatch(openChannelDetailsWithMembers())}
            title="View member list"
            type="button"
          >
            <Icon
              type="user"
              color="black"
              size="xm"
              className="channel__icon-user"
            />
            <Text tag="span" size="xm" className="channel__members-count">
              {membersSize}
            </Text>
          </Button>
        </div>
        <div className="channel__inner-two">
          <div className="channel__add-topic">
            {currentChannel?.topic ? (
              <Text tag="div" className="channel__topic" size="md">
                {currentChannel?.topic}
              </Text>
            ) : (
              <div>
                <Icon
                  type="pencil"
                  size="xm"
                  className="channel__icon-pencil"
                />
                <Text tag="span" size="sm">
                  Add a topic
                </Text>
              </div>
            )}
          </div>
          <Button
            type="button"
            color="transparent"
            className="channel__edit-topic"
            onClick={() => dispatch(openEditChannelTopicModal())}
          >
            Edit
          </Button>
        </div>
      </div>
      {editChannelTopicModalIsOpen && (
        <Modal
          header="Edit channel topic"
          size="md"
          onClose={() => dispatch(closeEditChannelTopicModal())}
        >
          <EditChannelTopic value={channel?.topic} />
        </Modal>
      )}
    </section>
  );
};

export default ChannelInfo;
