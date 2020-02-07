import React, { useState } from 'react';

import { Button, EditChannelTopic, Icon, Modal, Text } from 'components';
import { ChannelInfoProps } from './types';
import './styles.scss';

const ChannelInfo: React.FC<ChannelInfoProps> = ({
  channel,
  className = '',
}) => {
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
        <div className="channel__member-count">
          <Icon
            type="user"
            color="black"
            size="xm"
            className="channel__icon-user"
          />
        </div>
        {channel?.topic ? (
          <Text tag="div" className="channel__topic" size="md">
            {channel?.topic}
          </Text>
        ) : (
          <div className="channel__inner-two">
            <div className="channel__add-topic">
              <Icon type="pencil" size="xm" className="channel__icon-pencil" />
              <Text tag="span" size="sm">
                Add a topic
              </Text>
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
        )}
      </div>
      {openEditModal && (
        <Modal
          header="Edit channel topic"
          size="md"
          onClose={() => setOpenEditModal(false)}
        >
          <EditChannelTopic setOpenEditModal={setOpenEditModal} />
        </Modal>
      )}
    </section>
  );
};

export default ChannelInfo;
