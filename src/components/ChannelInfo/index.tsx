import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, EditChannelTopic, Icon, Modal, Text } from 'components';
import { AppState } from 'store';
import { ChannelInfoProps } from './types';
import './styles.scss';

const ChannelInfo: React.FC<ChannelInfoProps> = ({
  channel,
  className = '',
}) => {
  const { currentChannel, membersSize } = useSelector((state: AppState) => ({
    currentChannel: state.currentChannel,
    membersSize: state.members.list.length,
  }));
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
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
          <Icon
            type="user"
            color="black"
            size="xm"
            className="channel__icon-user"
          />
          <Text tag="span" size="sm" className="channel__members-count">
            {membersSize}
          </Text>
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
            onClick={() => setOpenEditModal(true)}
          >
            Edit
          </Button>
        </div>
      </div>
      {openEditModal && (
        <Modal
          header="Edit channel topic"
          size="md"
          onClose={() => setOpenEditModal(false)}
        >
          <EditChannelTopic
            setOpenEditModal={setOpenEditModal}
            value={channel?.topic}
          />
        </Modal>
      )}
    </section>
  );
};

export default ChannelInfo;
