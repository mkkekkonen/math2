import TreeMenu from 'react-simple-tree-menu';
import { push as Menu } from 'react-burger-menu';

import { NodeType } from 'utils/treeData';

const navigate = (router) => (item) => {
  switch (item.nodeType as NodeType) {
    case 'category':
      router.push(`/category/${item.slug}`);
      break;
    case 'page':
      router.push(`/page/${item.slug}`);
    default:
      return;
  }
};

const BurgerMenu = ({ nodes, router }) => (
  <span className="burger-icon-container">
    <style jsx>{`
      .burger-icon-container {
        width: 50px;
      }
    `}</style>

    <style jsx global>{`
      /* Position and sizing of burger button */
      .bm-burger-button {
        position: fixed;
        width: 36px;
        height: 30px;
        left: 15px;
        top: 15px;
      }

      /* Color/shape of burger icon bars */
      .bm-burger-bars {
        background: #fff;
      }

      /* Color/shape of burger icon bars on hover*/
      .bm-burger-bars-hover {
        background: #a90000;
      }

      /* Position and sizing of clickable cross button */
      .bm-cross-button {
        height: 24px;
        width: 24px;
      }

      /* Color/shape of close button cross */
      .bm-cross {
        background: #bdc3c7;
      }

      /*
      Sidebar wrapper styles
      Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
      */
      .bm-menu-wrap {
        position: fixed;
        height: 100%;
      }

      /* General sidebar styles */
      .bm-menu {
        background: #fff;
        padding: 2.5em 1.5em 0;
        font-size: 1.15em;
      }

      /* Morph shape necessary with bubble or elastic */
      .bm-morph-shape {
        fill: #373a47;
      }

      /* Wrapper for item list */
      .bm-item-list {
        color: #b8b7ad;
        padding: 0.8em;
      }

      /* Individual item */
      .bm-item {
        display: inline-block;
      }

      /* Styling of overlay */
      .bm-overlay {
        background: #eee;
      }
    `}</style>

    <Menu width={400} pageWrapId="pageWrap" outerContainerId="outerContainer">
      <TreeMenu data={nodes} onClickItem={navigate(router)} />
    </Menu>
  </span>
);

export default BurgerMenu;
