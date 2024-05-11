import React from 'react';
import {Control} from 'react-hook-form';
import {DevTool} from '@hookform/devtools';

export interface IRHFDEvToolsProps {
  control: Control<any, any>;
}
const RHFDevTools: React.FC<IRHFDEvToolsProps> = ({control}) => {
  // @ts-ignore
  if (import.meta.env.MODE !== 'production')
    return (
      <div>
        <DevTool control={control} />
      </div>
    );

  return <></>;
};

export default RHFDevTools;
