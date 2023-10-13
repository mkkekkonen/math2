import { Fragment } from 'react';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import { INode, NodeType } from '@/utils/treeData';

const NodeList = ({
  nodes,
  headingLocalizationKey,
  nodeType,
}: {
  nodes: INode[];
  headingLocalizationKey: string;
  nodeType: NodeType;
}) => {
  if (!nodes || nodes.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <h3>
        <FormattedMessage id={headingLocalizationKey} />
      </h3>
      <ul>
        {nodes.map((node) => (
          <li>
            <Link className="node-link" href={`/${nodeType}/${node.slug}`}>
              {node.localized_name}
            </Link>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default NodeList;
