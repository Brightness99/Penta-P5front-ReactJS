// @flow 

import React from 'react';

class ContentTextGlossary extends React.Component {
  render() {
    return (
      <div className="org-content-text">
        <h3 className="title-texts">Alorem ipsum dolor sit amet</h3>
        <p className="p-text">Sed posuere consectetur est at lobortis. Nullam id dolor id nibh ultricies vehicula ut id elit. Donec id elit non mi porta gravida at eget metus. Nulla vitae elit libero, a pharetra augue. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur blandit tempus porttitor.</p>
        <img src={require('assets/media/images/image-glossary-content.png')} alt="Layout" />
        <p className="p-text">Curabitur blandit tempus porttitor. Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam quis risus eget urna mollis ornare vel eu leo. Curabitur blandit tempus porttitor. Sed posuere consectetur est at lobortis. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
        <p className="p-text">Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
      </div>
    );
  }
}

export default ContentTextGlossary;
