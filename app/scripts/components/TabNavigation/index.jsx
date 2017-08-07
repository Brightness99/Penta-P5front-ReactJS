// @flow
import React from 'react';

// https://toddmotto.com/creating-a-tabs-component-with-react/
// https://codepen.io/trey/post/tabbed-navigation-react
//  
// https://onsen.io/blog/react-onsen-ui-navigator-tabs/
// https://medium.com/react-native-training/react-native-navigator-experimental-part-3-adding-tabs-28a2c57356b6
// https://codepen.io/amwill/pen/qOMyEp
// https://codepen.io/amwill/pen/qOMyEp
//http://jsbin.com/porefa/9/edit?html,css,js,output
// http://blog.ricardofilipe.com/post/react-tabs-component
// https://codepen.io/trey/pen/PZBmjZ
// https://stackoverflow.com/questions/40699913/react-tabs-onclick-get-index-of-selected-tab

type Props = {
  children?: ?[],
  isCurrent: int,
}

type State = {
  counter: number,
  activeSlide: number,
}

export default class TabNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      activeSlide: 0,
    };
  }

  static props: Props;

  handleTabsNavigation = (ev) => {
    this.setState({
      activeSlide: ev.currentTarget.name,
    });
  }

  renderLis() {
    const { children } = this.props;

    return children.map((item) => (
      <li>
        {item}
      </li>
    ));
  }

  renderContent() {
    console.log(document.getElementsByClassName('tab-content'));
  }

  render() {
    return (
      <div>
        <nav className="tabNavigation">
          <ul className="list-item awol-pdd awol-list-style">
            {this.renderLis()}
          </ul>
        </nav>
        <div>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}
