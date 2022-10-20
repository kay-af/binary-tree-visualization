import { Size } from "./size";
import { TreeNode } from "./tree-node";

// Matches more than one space character.
const REGEX_ONE_OR_MORE_SPACES = /\s+/g;

// The x scaling space out nodes in scroll area.
const X_MULTIPLIER = 140;
// The y scaling to space out nodes in scroll area.
const Y_MULTIPLIER = 140;
// The padding to use in scroll area after creating the tree.
const SCROLL_AREA_PADDING = 140;

/** Represents errors related to tree input. */
export class TreeParserError {
  /** Error title */
  public readonly title: string;
  /** Error message */
  public readonly message: string;

  /**
   * Creates a new instance.
   * @param title Title of the error.
   * @param message Message of the error.
   */
  public constructor(title: string, message: string) {
    this.title = title;
    this.message = message;
  }
}

/** Provides utils to create the binary tree */
export class TreeParser {
  /**
   * Create a binary tree from the tree input representation.
   * @param treeInput The tree input string.
   * @returns Root node of the tree.
   */
  public static parseTree(treeInput: string): TreeNode | null {
    const values = this.parseValues(treeInput);
    const root = this.parseTreeHelper(values);
    const xMemo = new Map<number, number>();
    this.assignRawNodePositions(root, 0, xMemo, this.calculateHeight(root));
    this.transformNodePositions(root);
    return root;
  }

  /**
   * Checks if the given value consists of only digits (Negative integers allowed).
   * @param value To value to check.
   * @returns Is a valid integer string.
   */
  private static isValidInteger(value: string) {
    if (value.length === 0) return false;
    if (value.length === 1 && value[0] === "-") return false;
    let minus = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] < "0" || value[i] > "9") {
        if (value[i] === "-") minus++;
        else return false;
      }
    }
    if (minus > 1) return false;
    if (minus === 1 && value[0] !== "-") return false;
    return true;
  }

  /**
   * Converts tree input to values with integer or null.
   * @param treeInput The input string.
   * @returns The values list.
   */
  private static parseValues(treeInput: string): Array<number | null> {
    treeInput = treeInput.trim();
    treeInput = treeInput.replace(REGEX_ONE_OR_MORE_SPACES, " ");

    if (treeInput.length === 0) return [];

    let tokens: Array<string> = treeInput.split(" ");
    const nodeValues = tokens.map((token) => {
      if (token.toUpperCase() === "N") return null;

      // Check if the integer is valid.
      if (!this.isValidInteger(token))
        throw new TreeParserError(
          "Invalid Input",
          "Only integer values and 'N' / 'n' (Null) are supported in tree input"
        );
      const value = Number.parseInt(token);

      // Check range.
      if (
        !Number.isFinite(value) ||
        value > Math.pow(2, 31) - 1 ||
        value < -Math.pow(2, 31)
      )
        throw new TreeParserError(
          "Invalid Input",
          "Only 32-bit signed integers are supported"
        );

      return value;
    });

    return nodeValues;
  }

  /**
   * Calculates the size of the scroll area needed to accomodate the given tree.
   * @param tree The tree to accomodate.
   * @returns Size of the scroll area needed.
   */
  public static calculateScrollAreaSize(tree: TreeNode | null): Size {
    const bounds: Size = { width: 0, height: 0 };
    this.scrollAreaSizeHelper(tree, bounds);
    return bounds;
  }

  /**
   * Helper method for parsing the tree.
   * @param values Values list.
   * @returns The root node of the parsed tree.
   */
  private static parseTreeHelper(
    values: Array<number | null>
  ): TreeNode | null {
    const n = values.length;

    if (n === 0) return null;
    if (values[0] === null) return null;

    let pointer = 1;
    const root = new TreeNode(values[0]);
    const queue = [root];

    // Level order traversal to create nodes iteratively.
    while (queue.length > 0 && pointer < n) {
      const current = queue.shift()!;
      if (pointer < n && values[pointer] !== null) {
        current.left = new TreeNode(values[pointer]!);
        queue.push(current.left);
      }
      pointer += 1;
      if (pointer < n && values[pointer] !== null) {
        current.right = new TreeNode(values[pointer]!);
        queue.push(current.right);
      }
      pointer += 1;
    }

    return root;
  }

  /**
   * Assigns raw position of the nodes.
   * @param root The root node of the tree.
   * @param i Index of the node in a complete binary tree's array representation.
   * @param xMemo To memoize values for faster calculation.
   * @param height Height of the tree.
   */
  private static assignRawNodePositions(
    root: TreeNode | null,
    i: number,
    xMemo: Map<number, number>,
    height: number
  ): void {
    if (root === null) return;
    root.x = this.calculateX(i, height, xMemo);
    root.y = this.calculateY(i);
    this.assignRawNodePositions(root.left, i * 2 + 1, xMemo, height);
    this.assignRawNodePositions(root.right, i * 2 + 2, xMemo, height);
  }

  /**
   * Transforms the node positions of the given tree to fit the scroll area.
   * @param root The root node of the tree.
   */
  private static transformNodePositions(root: TreeNode | null): void {
    const result: { node: TreeNode | null } = { node: null };
    this.getLeftmostNode(root, result);
    const { node: leftmost } = result;

    if (!leftmost) return;
    this.transformNodePositionsHelper(root, leftmost.x);
  }

  /**
   * Get the leftmost node of the tree after the raw positions have been calculated.
   * @param root The root node of the tree.
   * @param result Reference to the object carrying the result.
   */
  private static getLeftmostNode(
    root: TreeNode | null,
    result: { node: TreeNode | null }
  ): void {
    if (!root) return;

    this.getLeftmostNode(root.left, result);
    this.getLeftmostNode(root.right, result);
    if (root.x < (result.node?.x ?? Number.POSITIVE_INFINITY)) {
      result.node = root;
    }
  }

  /**
   * Helper method to transform node positions.
   * @param root The root node of the tree.
   * @param xOffset The offset to subtract from the x value of each node.
   */
  private static transformNodePositionsHelper(
    root: TreeNode | null,
    xOffset: number
  ): void {
    if (!root) return;
    root.x -= xOffset;
    root.x *= X_MULTIPLIER;
    root.x += SCROLL_AREA_PADDING;
    root.y = root.y * Y_MULTIPLIER + SCROLL_AREA_PADDING;
    this.transformNodePositionsHelper(root.left, xOffset);
    this.transformNodePositionsHelper(root.right, xOffset);
  }

  /**
   * Calculates height of the binary tree.
   * @param root The root node of the tree.
   * @returns Height of the binary tree.
   */
  private static calculateHeight(root: TreeNode | null): number {
    if (root === null) return 0;
    const leftHeight = this.calculateHeight(root.left);
    const rightHeight = this.calculateHeight(root.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  /**
   * Calculates the raw x position of a node.
   * @param i Index of the node in the array as per the fully-complete representation of the binary tree.
   * @param height Height of the binary tree.
   * @param xMemo To memoize values for faster calculation.
   * @returns The raw x position.
   */
  private static calculateX(
    i: number,
    height: number,
    xMemo: Map<number, number>
  ): number {
    if (xMemo.has(i)) return xMemo.get(i)!;

    const iDepth = this.calculateY(i);
    const treeDepth = height - 1;

    if (iDepth === treeDepth) {
      const n = 1 << iDepth;
      const width = n - 1;
      const x = i - (width - 1);
      xMemo.set(i, x);
    } else {
      const a = this.calculateX(i * 2 + 1, height, xMemo);
      const b = this.calculateX(i * 2 + 2, height, xMemo);
      xMemo.set(i, (a + b) / 2);
    }
    return xMemo.get(i)!;
  }

  /**
   * Calculates the raw y position of a node.
   * @param i Index of the node in the array as per the fully-complete representation of the binary tree.
   * @returns The raw y position.
   */
  private static calculateY(i: number): number {
    i = i + 1;
    let y = 0;
    while (i > 0) {
      i = i >> 1;
      y += 1;
    }
    return y - 1;
  }

  /**
   * Helper method to calculate scroll area size.
   * @param root The root node of the tree.
   * @param size Reference to the size storing the result.
   */
  private static scrollAreaSizeHelper(root: TreeNode | null, size: Size): void {
    if (root !== null) {
      // Find the rightmost node.
      size.width = Math.max(size.width, root.x + SCROLL_AREA_PADDING);
      size.height = Math.max(size.height, root.y + SCROLL_AREA_PADDING);
      this.scrollAreaSizeHelper(root.left, size);
      this.scrollAreaSizeHelper(root.right, size);
    }
  }
}
