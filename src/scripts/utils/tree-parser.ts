import { Size } from "./size";
import { TreeNode } from "./tree-node";

const REGEX_ONE_OR_MORE_SPACES = /\s+/g;

const ERROR_MESSAGE_NOT_AN_INTEGER =
  "Only integer values and 'N' / 'n' (Null) are supported in tree input";
const ERROR_MESSAGE_OUT_OF_RANGE = "Only 32-bit signed integers are supported";

const X_MULTIPLIER = 140;
const Y_MULTIPLIER = 140;
const SCROLL_AREA_PADDING = 140;

export class TreeParserError {
  public readonly title: string;
  public readonly message: string;

  public constructor(head: string, body: string) {
    this.title = head;
    this.message = body;
  }
}

export class TreeParser {
  public static parseTree(treeInput: string): TreeNode | null {
    const values = this.parseValues(treeInput);
    const root = this.parseTreeHelper(values);
    const xMemo = new Map<number, number>();
    this.calculateNodePositions(root, 0, xMemo, this.calculateHeight(root));
    this.transformNodePositions(root);
    return root;
  }

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

  private static parseValues(treeInput: string): Array<number | null> {
    treeInput = treeInput.trim();
    treeInput = treeInput.replace(REGEX_ONE_OR_MORE_SPACES, " ");

    if (treeInput.length === 0) return [];

    let tokens: Array<string> = treeInput.split(" ");
    const nodeValues = tokens.map((token) => {
      if (token.toUpperCase() === "N") return null;
      if (!this.isValidInteger(token))
        throw new TreeParserError(
          "Invalid Input",
          ERROR_MESSAGE_NOT_AN_INTEGER
        );
      const value = Number.parseInt(token);
      if (
        !Number.isFinite(value) ||
        value > Math.pow(2, 31) - 1 ||
        value < -Math.pow(2, 31)
      )
        throw new TreeParserError("Invalid Input", ERROR_MESSAGE_OUT_OF_RANGE);
      return value;
    });

    return nodeValues;
  }

  public static calculateScrollAreaSize(tree: TreeNode | null): Size {
    const bounds: Size = { width: 0, height: 0 };
    this.scrollAreaSizeHelper(tree, bounds);
    return bounds;
  }

  private static parseTreeHelper(
    values: Array<number | null>
  ): TreeNode | null {
    const n = values.length;

    if (n === 0) return null;
    if (values[0] === null) return null;

    let pointer = 1;
    const root = new TreeNode(values[0]);
    const queue = [root];

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

  private static calculateNodePositions(
    root: TreeNode | null,
    i: number,
    xMemo: Map<number, number>,
    height: number
  ): void {
    if (root === null) return;
    root.x = this.calculateX(i, height, xMemo);
    root.y = this.calculateY(i);
    this.calculateNodePositions(root.left, i * 2 + 1, xMemo, height);
    this.calculateNodePositions(root.right, i * 2 + 2, xMemo, height);
  }

  private static transformNodePositions(root: TreeNode | null): void {
    const result: { node: TreeNode | null } = { node: null };
    this.getLeftmostNode(root, result);
    const { node: leftmost } = result;

    if (!leftmost) return;
    this.transformNodePositionsHelper(root, leftmost.x);
  }

  private static getLeftmostNode(
    root: TreeNode | null,
    result: { node: TreeNode | null }
  ) {
    if (!root) return;

    this.getLeftmostNode(root.left, result);
    this.getLeftmostNode(root.right, result);
    if (root.x < (result.node?.x ?? Number.POSITIVE_INFINITY)) {
      result.node = root;
    }
  }

  private static transformNodePositionsHelper(
    root: TreeNode | null,
    xOffset: number
  ) {
    if (!root) return;
    root.x -= xOffset;
    root.x *= X_MULTIPLIER;
    root.x += SCROLL_AREA_PADDING;
    root.y = root.y * Y_MULTIPLIER + SCROLL_AREA_PADDING;
    this.transformNodePositionsHelper(root.left, xOffset);
    this.transformNodePositionsHelper(root.right, xOffset);
  }

  private static calculateHeight(root: TreeNode | null): number {
    if (root === null) return 0;
    const leftHeight = this.calculateHeight(root.left);
    const rightHeight = this.calculateHeight(root.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

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

  private static calculateY(i: number): number {
    i = i + 1;
    let y = 0;
    while (i > 0) {
      i = i >> 1;
      y += 1;
    }
    return y - 1;
  }

  private static scrollAreaSizeHelper(root: TreeNode | null, size: Size): void {
    if (root !== null) {
      size.width = Math.max(size.width, root.x + SCROLL_AREA_PADDING);
      size.height = Math.max(size.height, root.y + SCROLL_AREA_PADDING);
      this.scrollAreaSizeHelper(root.left, size);
      this.scrollAreaSizeHelper(root.right, size);
    }
  }
}
