const numbers = [
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 24, 500, 848, 29, 500,
];
// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 15];

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

  return { root };
};

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

const bst = Tree(numbers);
const newNode = Node(1);

// console.log(bst);
console.log(prettyPrint(bst.root));
// console.log(newNode);
