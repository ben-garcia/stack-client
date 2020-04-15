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
          color={teammate?.active ? 'green' : 'black'}
          size="xm"
          className={
            teammate?.active || teammate?.id === user.id
              ? 'teammate__circle-icon teammate__circle-icon--active'
              : 'teammate__circle-icon'
          }
        />
        <Text className="teammate__status" tag="span" size="xm">
          {teammate?.active || teammate?.id === user.id ? (
            <>Active</>
          ) : (
            <>Away</>
          )}
        </Text>
      </div>
    </section>
  );
};

export default TeammateInfo;
