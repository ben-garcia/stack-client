import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Icon, List, Text } from 'components';
import { AppState } from 'store';
import { openAddPeopleModal } from 'store/addPeopleModal';
import { closeChannelDetails } from 'store/channelDetails';
import { openEditChannelDescriptionModal } from 'store/editChannelDescriptionModal';
import { openEditChannelTopicModal } from 'store/editChannelTopicModal';
import { Member } from 'store/members';
import { printFormattedDate } from 'utils';
import './styles.scss';

const ChannelDetails = () => {
  const dispatch = useDispatch();
  const { channelDetails, currentChannel, members, user } = useSelector(
    (state: AppState) => ({
      currentChannel: state.currentChannel,
      channelDetails: state.channelDetails,
      members: state.members.list,
      user: state.user,
    })
  );
  // keep track of when the user clicks the about dropdown
  const [aboutDropdownIsOpen, setAboutDropdownIsOpen] = useState<boolean>(
    false
  );
  // keep track of when the user clicks the members dropdown
  const [membersDropdownIsOpen, setMembersDropdownIsOpen] = useState<
    boolean | undefined
  >(channelDetails.withMembers);

  return (
    <section className="channel-details">
      <div className="channel-details__inner">
        <div className="channel-details__inside">
          <Text className="channel-details__text" tag="span" size="sm">
            Details
          </Text>
          <Text className="channel-details__channel-name" tag="span" size="xm">
            {`# ${currentChannel.name}`}
          </Text>
        </div>
        <Button
          className="channel-details__close-button"
          color="transparent"
          onClick={() => dispatch(closeChannelDetails())}
          type="button"
        >
          <Icon
            className="channel-details__close-icon"
            type="times"
            size="sm"
          />
        </Button>
      </div>
      <div className="channel-details__container">
        <div className="channel-details__inner-two">
          <Button
            className="channel-details__add-people-button"
            color="transparent"
            onClick={() => dispatch(openAddPeopleModal())}
            type="button"
            title={`Add people to #${currentChannel.name}`}
          >
            <Icon
              className="channel-details__user-icon"
              size="sm"
              type="user"
            />
            <Text size="xm" tag="span">
              Add
            </Text>
          </Button>
        </div>
        <div className="channel-details__about">
          <Button
            className="channel-details__dropdown-button"
            color="transparent"
            onClick={() => {
              if (membersDropdownIsOpen) {
                setMembersDropdownIsOpen(false);
              }
              setAboutDropdownIsOpen(!aboutDropdownIsOpen);
            }}
            type="button"
          >
            <Text size="sm" tag="span">
              About
            </Text>
            <Icon
              className={
                aboutDropdownIsOpen
                  ? 'channel-details__icon-chevron-right channel-details__icon-chevron-right--translate-rotate '
                  : 'channel-details__icon-chevron-right'
              }
              size="xm"
              type="chevron-right"
            />
          </Button>
          <div
            className="channel-details__about-info"
            style={
              aboutDropdownIsOpen ? { display: 'block' } : { display: 'none' }
            }
          >
            <div className="channel-details__topic">
              <Text
                className="channel-details__subtext channel-details__subtext--dark"
                tag="div"
                size="xm"
              >
                Topic
              </Text>
              {currentChannel.topic ? (
                <Text className="channel-details__subtext" tag="div" size="xm">
                  {currentChannel.topic}
                </Text>
              ) : (
                <Text className="channel-details__subtext" tag="div" size="xm">
                  Whats up for discussion?
                </Text>
              )}
              <Button
                className="channel-details__edit-button"
                color="transparent"
                onClick={() => dispatch(openEditChannelTopicModal())}
                type="button"
              >
                <Text size="xm">edit</Text>
              </Button>
            </div>
            <div className="channel-details__description">
              <Text
                className="channel-details__subtext channel-details__subtext--dark"
                tag="div"
                size="xm"
              >
                Description
              </Text>
              {currentChannel.description ? (
                <Text className="channel-details__subtext" tag="div" size="xm">
                  {currentChannel.description}
                </Text>
              ) : (
                <Text className="channel-details__subtext" tag="div" size="xm">
                  Whats up for discussion?
                </Text>
              )}
              <Button
                className="channel-details__edit-button"
                color="transparent"
                onClick={() => dispatch(openEditChannelDescriptionModal())}
                type="button"
              >
                <Text size="xm">edit</Text>
              </Button>
            </div>
            <Text className="channel-details__created" size="xm" tag="div">
              {`Created ${printFormattedDate(
                currentChannel.createdAt as string
              )}`}
            </Text>
          </div>
        </div>
        <div className="channel-details__members">
          <Button
            className="channel-details__dropdown-button"
            color="transparent"
            onClick={() => {
              if (aboutDropdownIsOpen) {
                setAboutDropdownIsOpen(false);
              }
              setMembersDropdownIsOpen(!membersDropdownIsOpen);
            }}
            type="button"
          >
            <Text size="sm" tag="span">
              Members
            </Text>
            <div className="channel-details__inner-three">
              <Text
                className="channel-details__member-count"
                size="xm"
                tag="span"
              >
                {members.length}
              </Text>
              <Icon
                className={
                  membersDropdownIsOpen
                    ? 'channel-details__icon-chevron-right channel-details__icon-chevron-right--rotate'
                    : 'channel-details__icon-chevron-right'
                }
                size="xm"
                type="chevron-right"
              />
            </div>
          </Button>
          <div
            style={
              membersDropdownIsOpen ? { display: 'block' } : { display: 'none' }
            }
          >
            <List className="channel-details__members-info members-list">
              {members.map((m: Member) => (
                <List.Item
                  className="members-list__item"
                  hover={false}
                  key={m.id}
                >
                  <Icon
                    className="members-list__icon"
                    color={m.color as any}
                    size="sm"
                    type="user"
                  />
                  {user.username === m.username
                    ? `${m.username}(you)`
                    : m.username}
                </List.Item>
              ))}
            </List>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChannelDetails;
