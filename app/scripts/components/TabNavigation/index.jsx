// @flow
import React from 'react';

//https://toddmotto.com/creating-a-tabs-component-with-react/
//https://codepen.io/trey/post/tabbed-navigation-react
//https://codereview.stackexchange.com/questions/132599/reactjs-tab-component
//https://onsen.io/blog/react-onsen-ui-navigator-tabs/
//https://medium.com/react-native-training/react-native-navigator-experimental-part-3-adding-tabs-28a2c57356b6
//https://codepen.io/amwill/pen/qOMyEp

type Props = {
  children?: ?[],
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
    console.log(this);
    this.setState({
      activeSlide: ev.currentTarget.name,
    });
  }

  renderLis() {
    const { children } = this.props;

    return children.map((item, key) => (
      <li name={key}>
        {item}
      </li>
    ));
  }

  render() {
    return (
      <nav>
        <ul className="list-item awol-pdd awol-list-style">
          {this.renderLis()}
        </ul>
      </nav>
    );
  }
}
