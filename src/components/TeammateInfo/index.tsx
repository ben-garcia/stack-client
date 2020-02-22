import React from 'react';
import { useSelector } from 'react-redux';

import { Icon, Text } from 'components';
import { AppState } from 'store';
import { TeammateInfoProps } from './types';
import './styles.scss';

const TeammateInfo: React.FC<TeammateInfoProps> = ({
  teammate,
  className = '',
}) => {
  const { user } = useSelector((state: AppState) => ({
    user: state.user,
  }));
  let classesToAdd: string = 'teammate';

  if (className?.trim() !== '') {
    classesToAdd += ` ${className}`;
  }

  return (
    <section className={classesToAdd}>
      <Text tag="div" className="teammate__name">
        {teammate?.username}
        {user.username === teammate?.username ? (
          <Text className="teammate__optional-info" tag="span">
            (you)
          </Text>
        ) : null}
      </Text>
      <div>
        <Icon
          type="circle"
          color="green"
          size="xm"
          className="teammate__circle-icon"
        />
        <Text className="teammate__status" tag="span" size="xm">
          active
        </Text>
      </div>
    </section>
  );
};

export default TeammateInfo;
