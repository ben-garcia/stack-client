import React, { useState } from 'react';

import { Button, CreateChannelForm, Icon, Modal } from 'components';
import { ChannelListProps } from './types';
import './styles.scss';

const ChannelList: React.FC<ChannelListProps> = ({ className = '' }) => {
  const [createChannelFormIsOpen, setCreateChannelFormIsOpen] = useState<
    boolean
  >(false);
  let classesToAdd: string = 'channel-list';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <section className={classesToAdd}>
      <div className="channel-list__inner">
        <span className="channel-list__heading">Channels</span>
        <Button
          className="channel-list__add-button"
          type="button"
          color="transparent"
          onClick={() => setCreateChannelFormIsOpen(true)}
        >
          <Icon type="plus" color="white" />
        </Button>
      </div>
      {createChannelFormIsOpen && (
        <Modal
          header="Create a Channel"
          onClose={() => setCreateChannelFormIsOpen(false)}
        >
          <CreateChannelForm />
        </Modal>
      )}
    </section>
  );
};

export default ChannelList;
