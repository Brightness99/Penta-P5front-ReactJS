// @flow
import React from 'react';
import { CalendarIcon, HelpIcon, FileIcon } from 'components/Icons';

const FileFormatIcon = (props: { title: string}) => (
  <section className="file-format-icon-container">
    <FileIcon />
    <span>{props.title}</span>
  </section>
);

export default FileFormatIcon;
