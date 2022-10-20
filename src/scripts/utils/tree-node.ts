/**
 * Definition of a tree node that makes up a binary tree.
 */
export class TreeNode {
  /** Left subtree. */
  public left: TreeNode | null;

  /** Right subtree. */
  public right: TreeNode | null;

  /** Offset from left of scroll area. */
  public x: number;

  /** Offset from the top of scroll area. */
  public y: number;

  /** Integer value of the node. */
  public value: number;

  /**
   * Creates a new tree node with given value.
   * @param value Integer value of the node.
   */
  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
  }
}
