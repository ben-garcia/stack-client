import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import {
  AddPeople,
  Button,
  EditChannelDescription,
  Icon,
  Modal,
  Text,
} from 'components';
import { AppState } from 'store';
import { closeAddPeopleModal, openAddPeopleModal } from 'store/addPeopleModal';
import {
  closeEditChannelDescriptionModal,
  openEditChannelDescriptionModal,
} from 'store/editChannelDescriptionModal';
import { printFormattedDate } from 'utils';
import { ChannelViewProps } from './types';
import './styles.scss';

const ChannelView: React.FC<ChannelViewProps> = ({ className = '' }) => {
  const dispatch: Dispatch = useDispatch();
  const {
    addPeopleModalIsOpen,
    currentChannel,
    editChannelDescriptionModalIsOpen,
  } = useSelector((state: AppState) => ({
    addPeopleModalIsOpen: state.addPeopleModalIsOpen,
    currentChannel: state.currentChannel,
    editChannelDescriptionModalIsOpen: state.editChannelDescriptionModalIsOpen,
  }));
  let classesToAdd: string = 'channel-view';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <div className={classesToAdd}>
      <h1 className="channel-view__inner">
        <Icon className="channel-view__hash-icon" type="hash" size="xm" />
        <Text className="channel-view__name" tag="span">
          {currentChannel.name}
        </Text>
      </h1>
      <div className="channel-view__inner">
        <Text tag="span" size="sm">
          You created this channel on
        </Text>
        <Text className="channel-view__created-at" tag="span" size="sm">
          {printFormattedDate(currentChannel.createdAt!)}
        </Text>
        <Text tag="span" size="sm">
          This is the very beginning of the
        </Text>
        <strong className="channel-view__inner-two">
          <Icon type="hash" size="sm" />
          <Text tag="span">{currentChannel.name}</Text>
        </strong>
        {currentChannel.description && (
          <div className="channel-view__inner-three">
            <Text tag="span" size="sm">
              Description:
            </Text>
            <Text className="channel-view__description" tag="span">
              {currentChannel.description}
            </Text>
            <Text tag="span">
              (
              <Button
                className="channel-view__edit-button"
                type="button"
                color="transparent"
                title="Edit Channel Description"
                onClick={() => dispatch(openEditChannelDescriptionModal())}
              >
                <Text tag="span" size="sm">
                  edit
                </Text>
              </Button>
              )
            </Text>
            {editChannelDescriptionModalIsOpen && (
              <Modal
                header="Edit channel description"
                size="md"
                onClose={() => dispatch(closeEditChannelDescriptionModal())}
              >
                <EditChannelDescription value={currentChannel?.description} />
              </Modal>
            )}
          </div>
        )}
        <div className="channel-view__inner-four">
          <Icon type="user" size="xm" />
          <Button
            className="channel-view__user-icon"
            type="button"
            color="transparent"
            onClick={() => dispatch(openAddPeopleModal())}
          >
            <Text tag="span" size="xm">
              Add people
            </Text>
          </Button>
          {addPeopleModalIsOpen && (
            <Modal
              header="Add People"
              size="md"
              onClose={() => dispatch(closeAddPeopleModal())}
            >
              <AddPeople />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelView;
