/* eslint-disable no-param-reassign */

const Node = (data, left = null, right = null) => ({ data, left, right });

const Tree = (array) => {
  const prepareArray = () => {
    const noDuplicates = array.filter(
      (item, index) => array.indexOf(item) === index
    );
    const sorted = noDuplicates.sort((prev, next) => (prev < next ? -1 : 1));
    return sorted;
  };

  const buildTree = (arr, start, end) => {
    if (start > end) return null;

    const mid = Math.round((start + end) / 2);
    const node = Node(arr[mid]);

    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);

    return node;
  };

  const arr = prepareArray();
  const root = buildTree(arr, 0, arr.length - 1);

  const insertNode = (value, rt = root) => {
    if (rt === null) {
      rt = Node(value);
      return rt;
    }

    if (value < rt.data) {
      rt.left = insertNode(value, rt.left);
    } else if (value > rt.data) {
      rt.right = insertNode(value, rt.right);
    }

    return rt;
  };

  const deleteNode = (value, rt = root) => {
    if (rt === null) return rt;

    if (value < rt.data) {
      rt.left = deleteNode(value, rt.left);
    } else if (value > rt.data) {
      rt.right = deleteNode(value, rt.right);
    } else {
      // Node has one or no children
      if (rt.left === null) {
        return rt.right;
      }
      if (rt.right === null) {
        return rt.left;
      }

      // Node has two children
      rt.data = minValue(rt.right);
      rt.right = deleteNode(rt.data, rt.right);
    }

    return rt;
  };

  function findValue(value, rt = root) {
    if (rt === null) return rt;
    if (value < rt.data) return findValue(value, rt.left);
    if (value > rt.data) return findValue(value, rt.right);

    return rt;
  }

  function levelOrder() {
    const values = [];
    const queue = [root];

    while (queue.length !== 0) {
      const tempNode = queue.shift();
      values.push(tempNode.data);

      if (tempNode.left != null) queue.push(tempNode.left);
      if (tempNode.right != null) queue.push(tempNode.right);
    }

    return values;
  }

  function levelOrderRec(rt = root) {}

  return { root, insertNode, deleteNode, findValue, levelOrder };
};

// Helper for deleteNode() method
function minValue(root) {
  if (root.left === null) return root.data;
  return minValue(root.left);
}

// Prints visual representation of the tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const numbers = [
  1, 7, 4, 23, 8, 9, 4, 3, 7, 9, 67, 6345, 324, 24, 500, 848, 29, 500,
];
const bst = Tree(numbers);
const newNode = Node(1);

// console.log(bst);
console.log(bst.levelOrder());
console.log(prettyPrint(bst.root));
