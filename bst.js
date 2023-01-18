/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */

const Node = (data, left = null, right = null) => ({ data, left, right });

const Tree = (array) => {
  const prepareArray = (arr = array) => {
    const noDuplicates = arr.filter(
      (item, index) => arr.indexOf(item) === index
    );
    const sorted = noDuplicates.sort((prev, next) => (prev < next ? -1 : 1));
    return sorted;
  };

  const buildTree = (arr, start = 0, end = arr.length - 1) => {
    if (start > end) return null;

    const mid = Math.round((start + end) / 2);
    const node = Node(arr[mid]);

    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);

    return node;
  };

  const arr = prepareArray();
  let root = buildTree(arr);

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

  const findValue = (value, rt = root) => {
    if (rt === null) return rt;
    if (value < rt.data) return findValue(value, rt.left);
    if (value > rt.data) return findValue(value, rt.right);

    return rt;
  };

  const levelOrder = (callback) => {
    const values = [];
    const queue = [root];

    while (queue.length !== 0) {
      const tempNode = queue.shift();
      values.push(tempNode.data);

      if (callback) callback(tempNode);

      if (tempNode.left != null) queue.push(tempNode.left);
      if (tempNode.right != null) queue.push(tempNode.right);
    }

    return callback ? null : values;
  };

  const inorder = (callback, rt = root, values = []) => {
    if (rt === null) return;

    inorder(callback, rt.left, values);
    // eslint-disable-next-line no-unused-expressions
    callback ? callback(rt) : values.push(rt.data);
    inorder(callback, rt.right, values);

    return callback ? null : values;
  };

  const preorder = (callback, rt = root, values = []) => {
    if (rt === null) return;

    callback ? callback(rt) : values.push(rt.data);
    preorder(callback, rt.left, values);
    preorder(callback, rt.right, values);

    return callback ? null : values;
  };

  const postorder = (callback, rt = root, values = []) => {
    if (rt === null) return;

    postorder(callback, rt.left, values);
    postorder(callback, rt.right, values);
    callback ? callback(rt) : values.push(rt.data);

    return callback ? null : values;
  };

  const height = (rt = root) => {
    if (rt === null) return -1;

    const leftBranch = height(rt.left) + 1;
    const rightBranch = height(rt.right) + 1;

    return leftBranch > rightBranch ? leftBranch : rightBranch;
  };

  const depth = (nodeValue, edges = 0, rt = root) => {
    if (rt === null) return;

    if (nodeValue < rt.data) return depth(nodeValue, edges + 1, rt.left);
    if (nodeValue > rt.data) return depth(nodeValue, edges + 1, rt.right);

    return edges;
  };

  const isBalanced = (rt = root) => {
    if (rt === null) return;

    const leftBranch = height(rt.left) + 1;
    const rightBranch = height(rt.right) + 1;

    if (leftBranch - rightBranch < -1 || leftBranch - rightBranch > 1) {
      return false;
    }

    return true;
  };

  const rebalance = () => {
    const values = prepareArray(inorder());
    root =  buildTree(values);
    return root;
  };

  return {
    root,
    insertNode,
    deleteNode,
    findValue,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
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
const tree = Tree(numbers);
const leaf = tree.findValue(23);

// Check if tree is balanced
console.log(`Is balanced: ${tree.isBalanced()}`)

// Print preorder, inorder, postorder
console.log(`Preorder: ${tree.preorder()}`);
console.log(`Inorder: ${tree.inorder()}`);
console.log(`Postorder: ${tree.postorder()}`);

// Unbalance tree
console.log('Unbalance tree')
leaf.right = Node(666);
leaf.right.right = Node(999);
leaf.right.right.left = Node(333);

// Check if tree is balanced
console.log(`Is balanced: ${tree.isBalanced()}`)

// Rebalance
console.log('Rebalance')
tree.root = tree.rebalance();

// Check if tree is balanced
console.log(`Is balanced: ${tree.isBalanced()}`)

// Print graph
console.log(prettyPrint(tree.root));
