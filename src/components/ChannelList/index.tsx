import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Button, CreateChannelForm, Icon, Modal, Text } from 'components';
import { AppState } from 'store';
import { Channel } from 'store/channels/types';
import { ChannelListProps } from './types';
import './styles.scss';

const ChannelList: React.FC<ChannelListProps> = ({
  className = '',
  channels,
}) => {
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
        <Text tag="span" className="channel-list__heading">
          Channels
        </Text>
        <Button
          className="channel-list__add-button"
          type="button"
          color="transparent"
          onClick={() => setCreateChannelFormIsOpen(true)}
        >
          <Icon type="plus" color="white" size="sm" />
        </Button>
      </div>
      <ul className="channel-list__list">
        {channels.list.map((c: Channel) => (
          <li key={c.id} className="channel-list__item">
            <Button type="button" color="transparent" onClick={() => {}}>
              {c.name}
            </Button>
          </li>
        ))}
      </ul>
      {createChannelFormIsOpen && (
        <Modal
          header="Create a Channel"
          size="md"
          onClose={() => setCreateChannelFormIsOpen(false)}
        >
          <CreateChannelForm />
        </Modal>
      )}
    </section>
  );
};

const mapStateToProps = (state: AppState) => ({
  channels: state.channels,
});

export default connect(mapStateToProps)(ChannelList);
