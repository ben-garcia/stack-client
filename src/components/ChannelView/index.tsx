import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import {
  AddPeople,
  Button,
  CreateMessage,
  ChannelDetails,
  EditChannelDescription,
  Icon,
  MessageList,
  Modal,
  Text,
  WorkspaceInfo,
} from 'components';
import { AppState } from 'store';
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
    channelDetailsIsOpen,
    currentChannel,
    currentTeammate,
    editChannelDescriptionModalIsOpen,
    user,
  } = useSelector((state: AppState) => ({
    channelDetailsIsOpen: state.channelDetailsIsOpen,
    currentChannel: state.currentChannel,
    currentTeammate: state.currentTeammate,
    editChannelDescriptionModalIsOpen: state.editChannelDescriptionModalIsOpen,
    user: state.user,
  }));
  const [openAddPeopleModal, setOpenAddPeopleModal] = useState<boolean>(false);
  let classesToAdd: string = 'main-container';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <main className={classesToAdd}>
      <section className="channel-view">
        <WorkspaceInfo />
        <div className="channel-view__container">
          {currentChannel.id !== 0 && !currentTeammate.id && (
            <div>
              <h1 className="channel-view__inner">
                <Icon
                  className="channel-view__hash-icon"
                  type="hash"
                  size="xm"
                />
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
                        onClick={() =>
                          dispatch(openEditChannelDescriptionModal())
                        }
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
                        onClose={() =>
                          dispatch(closeEditChannelDescriptionModal())
                        }
                      >
                        <EditChannelDescription
                          value={currentChannel?.description}
                        />
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
                    onClick={() => setOpenAddPeopleModal(true)}
                  >
                    <Text tag="span" size="xm">
                      Add people
                    </Text>
                  </Button>
                  {openAddPeopleModal && (
                    <Modal
                      header="Add People"
                      size="md"
                      onClose={() => setOpenAddPeopleModal(false)}
                    >
                      <AddPeople
                        setOpenAddPeopleModal={setOpenAddPeopleModal}
                      />
                    </Modal>
                  )}
                </div>
              </div>
            </div>
          )}
          {currentTeammate && currentChannel.id === 0 && (
            <div className="channel-view__inner">
              {currentChannel.id || currentTeammate.id ? (
                <div className="c-teammate">
                  <Icon
                    className="c-teammate__user-icon"
                    type="user"
                    size="lg"
                  />
                  <Text className="c-teammate__username" tag="span">
                    {currentTeammate.username}
                  </Text>
                </div>
              ) : null}
              <div className="c-teammate__inner channel-view__inner">
                {user.id === currentTeammate.id && (
                  <Text size="sm">
                    <Text className="c-teammate__message" tag="span" size="sm">
                      This is your space.
                    </Text>
                    Draft messages, list your to-dos, or keep links and files
                    handy. You can also talk to yourself here, but please bear
                    in mind you’ll have to supply both sides of the
                    conversation.
                  </Text>
                )}
                {currentTeammate.id ? (
                  <Text size="sm">
                    This is the very beginning of your direct message history
                    with
                    <Text
                      className="c-teammate__message c-teammate__message--margin-left"
                      tag="span"
                      size="sm"
                    >
                      {currentTeammate.username}
                    </Text>
                  </Text>
                ) : null}
              </div>
            </div>
          )}
          <MessageList />
        </div>
        {(currentChannel.id && !currentTeammate.id) ||
        (currentTeammate.id && !currentChannel.id) ? (
          <div className="channel-view__message">
            <CreateMessage />
          </div>
        ) : null}
      </section>
      {channelDetailsIsOpen && <ChannelDetails />}
    </main>
  );
};

export default ChannelView;
