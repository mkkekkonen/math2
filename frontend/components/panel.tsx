import { FaBars } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';
import TreeMenu from 'react-simple-tree-menu';
import { IEnrichedNode, NodeType } from '@/utils/treeData';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';

const navigate = (router) => (item) => {
  switch (item.nodeType as NodeType) {
    case 'category':
      router.push(`/category/${item.slug}`);
      break;
    case 'page':
      router.push(`/page/${item.slug}`);
      break;
    case 'topLevel':
      router.push(`/${item.slug}`);
      break;
    default:
      return;
  }
};

const Panel = ({ nodes }: { nodes: IEnrichedNode[] }) => {
  const [show, setShow] = useState(false);

  const router = useRouter();

  return (
    <>
      <Button
        variant="dark"
        className="burger-btn"
        onClick={() => setShow(true)}
      >
        <FaBars />
      </Button>

      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <FormattedMessage id="mathVisualized" />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <TreeMenu
            data={nodes}
            onClickItem={(e) => {
              setShow(false);
              navigate(router)(e);
            }}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Panel;
