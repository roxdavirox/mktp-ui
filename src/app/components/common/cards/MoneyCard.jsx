/* eslint-disable react/prop-types */
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Card, Icon } from '@material-ui/core';

const MoneyCard = props => {
  const theme = useTheme();
  return (
    <Card
      className="play-card p-sm-24 bg-paper"
      elevation={6}
      style={{ maxWidth: '210px', width: '200px' }}
    >
      <div className="flex flex-middle">
        <Icon
          style={{
            fontSize: '44px',
            opacity: 0.6,
            color: theme.palette.primary.main
          }}
        >
          attach_money
        </Icon>
        <div className="ml-12">
          <small className="text-muted">Valor total</small>
          <h6 className="m-0 mt-4 text-primary font-weight-500">
            R$ {props.value}
          </h6>
        </div>
      </div>
    </Card>
  );
};

export default MoneyCard;
