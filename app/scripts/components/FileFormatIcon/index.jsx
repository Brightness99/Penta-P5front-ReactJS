// @flow
import React from 'react';
import { CalendarIcon, HelpIcon, FileIcon } from 'components/Icons';

const FileFormatIcon = (props: { title: string, className: string }) => (
  <section className={`file-format-icon-container ${props.className}`}>
    <FileIcon />
    <span>{props.title}</span>
  </section>
);

export default FileFormatIcon;
