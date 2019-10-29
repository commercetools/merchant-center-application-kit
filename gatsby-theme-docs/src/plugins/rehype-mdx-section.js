const isHastHeading = require('hast-util-heading');

const isHeading = node => {
  if (node.type === 'jsx') {
    // will will later want to introspect here and consider certain of our Api generation JSX
    // as section delimiting "headings" that cause a new section to be started.
    // this requires parsing the node.value string into a DOM (parse5, see MDX introspection plugin)
  }
  return isHastHeading(node);
};

// Since we are mapping the headings shifted to one in the markdown provider
// (e.g. h1 -> h2, h2 -> h3), we return the shifted tagName here as well.
const mapNodeTagName = tagName =>
  tagName.replace(/([0-9])$/, match => parseInt(match, 10) + 1);

module.exports = ({ leadSectionClassSuffix = 'lead' } = {}) => ast => {
  const newNodes = [];
  let sectionNode = {
    type: 'element',
    tagName: 'section',
    properties: {
      class: `section-${leadSectionClassSuffix}`,
    },
    children: [],
  };
  for (const node of ast.children) {
    if (isHeading(node)) {
      if (sectionNode.children.length > 0) {
        newNodes.push(sectionNode);
      }
      sectionNode = {
        type: 'element',
        tagName: 'section',
        properties: {
          id: `section-${node.properties.id}`,
          class: `section-${mapNodeTagName(node.tagName)}`,
        },
        children: [node],
      };
    } else if (node.type === 'import' || node.type == 'export') {
      newNodes.push(node);
    } else {
      sectionNode.children.push(node);
    }
  }
  if (sectionNode.children.length > 0) {
    newNodes.push(sectionNode);
  }
  ast.children = newNodes;
  return ast;
};
