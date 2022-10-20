import { Size, TreeNode, TreeParser, TreeParserError } from "./utils";

// Border bottom styles based on tree input.
const TREE_INPUT_NEUTRAL_BORDER_BOTTOM = "2px solid white";
const TREE_INPUT_VALID_BORDER_BOTTOM = "2px solid lightgreen";
const TREE_INPUT_INVALID_BORDER_BOTTOM = "2px solid orangered";

// SVG line properties
const LINE_COLOR = "#fff9";
const LINE_THICKNESS = "2";

// Base size of the node div in scroll area.
const NODE_SIZE = 60;

/**
 * Application configuration.
 */
interface AppConfig {
  identifiers: {
    treeInput: string;
    recenterButton: string;
    infoButton: string;
    scrollArea: string;
    grid: string;
    errorOverlay: string;
    errorTitle: string;
    errorMessage: string;
    infoOverlay: string;
    infoCloseButton: string;
  };
  initialTreeInput: string;
}

/**
 * Application state.
 */
interface AppState {
  treeInput: string;
  treeParserError: TreeParserError | null;
  tree: TreeNode | null;
  scrollAreaSize: Size;
}

const defaultAppState: AppState = {
  treeInput: "",
  tree: null,
  treeParserError: null,
  scrollAreaSize: { width: 0, height: 0 },
};

/** Driver class for the application. */
export class App {
  private readonly treeInputElement: HTMLInputElement;
  private readonly scrollAreaElement: HTMLDivElement;
  private readonly gridElement: HTMLDivElement;
  private readonly errorOverlayElement: HTMLDivElement;
  private readonly errorTitleElement: HTMLParagraphElement;
  private readonly errorMessageElement: HTMLParagraphElement;
  private readonly recenterButtonElement: HTMLButtonElement;
  private readonly infoButtonElement: HTMLButtonElement;
  private readonly infoOverlayElement: HTMLDivElement;
  private readonly infoCloseButtonElement: HTMLButtonElement;

  private initialTreeInput: string;
  private state: AppState;

  /**
   * Creates a new instance of the application.
   * @param config Application configuration to use.
   */
  public constructor(config: AppConfig) {
    // Assign elements
    this.treeInputElement = document.getElementById(
      config.identifiers.treeInput
    ) as HTMLInputElement;
    this.recenterButtonElement = document.getElementById(
      config.identifiers.recenterButton
    ) as HTMLButtonElement;
    this.infoButtonElement = document.getElementById(
      config.identifiers.infoButton
    ) as HTMLButtonElement;
    this.scrollAreaElement = document.getElementById(
      config.identifiers.scrollArea
    ) as HTMLDivElement;
    this.gridElement = document.getElementById(
      config.identifiers.grid
    ) as HTMLDivElement;
    this.errorOverlayElement = document.getElementById(
      config.identifiers.errorOverlay
    ) as HTMLDivElement;
    this.errorTitleElement = document.getElementById(
      config.identifiers.errorTitle
    ) as HTMLParagraphElement;
    this.errorMessageElement = document.getElementById(
      config.identifiers.errorMessage
    ) as HTMLParagraphElement;
    this.infoOverlayElement = document.getElementById(
      config.identifiers.infoOverlay
    ) as HTMLDivElement;
    this.infoCloseButtonElement = document.getElementById(
      config.identifiers.infoCloseButton
    ) as HTMLButtonElement;

    // Initial state
    this.initialTreeInput = config.initialTreeInput;
    this.state = {
      ...defaultAppState,
    };
  }

  /**
   * Initialize app by assigning appropriate listeners and reflecting the initial state.
   */
  public initialize(): void {
    this.treeInputElement.value = this.initialTreeInput;
    this.treeInputElement.focus();
    this.treeInputElement.addEventListener(
      "input",
      this.onTreeInputChanged.bind(this)
    );
    this.recenterButtonElement.addEventListener(
      "click",
      this.scrollToRootNode.bind(this)
    );
    this.infoButtonElement.addEventListener(
      "click",
      this.onClickInfo.bind(this)
    );
    this.infoCloseButtonElement.addEventListener(
      "click",
      this.onCloseInfo.bind(this)
    );
    this.updateState(this.initialTreeInput);
    this.updateUI();
  }

  /**
   * A helper method to disable overlays with smooth transitions.
   * @param evt Disable overlays when they are done transitioning.
   */
  private overlayTransitionEndListener(evt: TransitionEvent) {
    (evt.target as HTMLDivElement).classList.add("hide");
  }

  /**
   * When the info button is clicked.
   */
  private onClickInfo(): void {
    this.infoOverlayElement.removeEventListener(
      "transitionend",
      this.overlayTransitionEndListener
    );
    this.infoOverlayElement.classList.remove("hide");
    requestAnimationFrame(() => {
      this.infoOverlayElement.style.opacity = "1";
    });
  }

  /**
   * When the info overlay is closed using the close button.
   */
  private onCloseInfo(): void {
    this.infoOverlayElement.style.opacity = "0";
    this.infoOverlayElement.addEventListener(
      "transitionend",
      this.overlayTransitionEndListener
    );
  }

  /**
   * When tree input changes.
   * @param evt Current change event.
   */
  private onTreeInputChanged(evt: Event): void {
    const treeInput = (evt.target as HTMLInputElement).value;
    this.updateState(treeInput);
    this.updateUI();
  }

  /**
   * Updates the state of the application based on the tree input provided.
   * @param treeInput The tree input to use to update the state of the application.
   */
  private updateState(treeInput: string) {
    let tree: TreeNode | null = this.state.tree;
    let scrollAreaSize: Size = this.state.scrollAreaSize;
    let treeParserError: TreeParserError | null = null;

    try {
      tree = TreeParser.parseTree(treeInput);
      scrollAreaSize = TreeParser.calculateScrollAreaSize(tree);
    } catch (err) {
      treeParserError = err as TreeParserError;
    }

    this.state = {
      treeInput,
      treeParserError,
      tree,
      scrollAreaSize,
    };
  }

  /**
   * Update different UI Elements.
   */
  private updateUI(): void {
    this.updateInspectorUI();
    this.updateGridElementUI();
    this.updateErrorElementsUI();
    this.scrollToRootNode();
  }

  /**
   * Update the inspector UI
   */
  private updateInspectorUI() {
    const { treeInput, treeParserError } = this.state;

    // Change the border color based on error state.
    if (!treeInput.trim()) {
      this.treeInputElement.style.borderBottom =
        TREE_INPUT_NEUTRAL_BORDER_BOTTOM;
    } else if (treeParserError) {
      this.treeInputElement.style.borderBottom =
        TREE_INPUT_INVALID_BORDER_BOTTOM;
    } else {
      this.treeInputElement.style.borderBottom = TREE_INPUT_VALID_BORDER_BOTTOM;
    }

    // Enable/Disable recenter button based on the error state.
    if (treeParserError) {
      this.recenterButtonElement.disabled = true;
    } else {
      this.recenterButtonElement.disabled = false;
    }
  }

  /**
   * Updates the grid area size to enable scrolling.
   */
  private updateGridElementUI() {
    const { scrollAreaSize, tree } = this.state;

    this.gridElement.style.width = `max(100%, ${scrollAreaSize.width}px)`;
    this.gridElement.style.height = `max(100%, ${scrollAreaSize.height}px)`;
    this.gridElement.replaceChildren();

    this.createTreeUI(tree);
  }

  /**
   * Creates the DOM elements to render the tree.
   * @param root The root node of the tree
   */
  private createTreeUI(root: TreeNode | null): void {
    if (root === null) return;

    this.createTreeNodeElement(root);
    this.createLineElements(root);

    this.createTreeUI(root.left);
    this.createTreeUI(root.right);
  }

  /**
   * Converts tree nodes to DOM elements recursively.
   * @param root The root node of the tree.
   */
  private createTreeNodeElement(root: TreeNode): void {
    const rootElement = document.createElement("div");
    rootElement.classList.add("node");

    // If leaf node.
    if (root.left === null && root.right === null) {
      rootElement.classList.add("leaf");
    }

    // Assign styles.
    rootElement.style.width = NODE_SIZE + "px";
    rootElement.style.height = NODE_SIZE + "px";
    rootElement.style.left = root.x - NODE_SIZE / 2 + "px";
    rootElement.style.top = root.y - NODE_SIZE / 2 + "px";

    const pElement = document.createElement("p");
    pElement.innerText = root.value.toString();

    rootElement.appendChild(pElement);
    this.gridElement.appendChild(rootElement);
  }

  /**
   * Creates svg lines connecting nodes recursively.
   * @param root The root node of the tree.
   */
  private createLineElements(root: TreeNode): void {
    // Common properties between left and right directed lines.
    const createTemplateLineElements = () => {
      const lineSvgNode = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      lineSvgNode.classList.add("line");
      lineSvgNode.style.top = root.y + "px";

      const lineNode = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      lineNode.setAttributeNS(null, "stroke", LINE_COLOR);
      lineNode.setAttributeNS(null, "stroke-width", LINE_THICKNESS);
      lineNode.setAttributeNS(null, "y1", "0%");
      lineNode.setAttributeNS(null, "y2", "100%");
      lineSvgNode.appendChild(lineNode);
      this.gridElement.appendChild(lineSvgNode);

      return { lineSvgNode, lineNode };
    };

    if (root.left) {
      const { lineSvgNode, lineNode } = createTemplateLineElements();
      const width = root.x - root.left.x;
      const height = root.left.y - root.y;

      lineSvgNode.setAttributeNS(null, "viewBox", `0 0 ${width} ${height}`);
      lineSvgNode.style.width = width + "px";
      lineSvgNode.style.height = height + "px";
      lineSvgNode.style.left = root.left.x + "px";

      // Facing left
      lineNode.setAttributeNS(null, "x1", "100%");
      lineNode.setAttributeNS(null, "x2", "0%");
    }

    if (root.right) {
      const { lineSvgNode, lineNode } = createTemplateLineElements();
      const width = root.right.x - root.x;
      const height = root.right.y - root.y;

      lineSvgNode.setAttributeNS(null, "viewBox", `0 0 ${width} ${height}`);
      lineSvgNode.style.width = width + "px";
      lineSvgNode.style.height = height + "px";
      lineSvgNode.style.left = root.x + "px";

      // Facing right
      lineNode.setAttributeNS(null, "x1", "0%");
      lineNode.setAttributeNS(null, "x2", "100%");
    }
  }

  /**
   * Update the error overlay to show errors if any.
   */
  private updateErrorElementsUI(): void {
    const { treeParserError } = this.state;
    if (treeParserError) {
      this.errorOverlayElement.removeEventListener(
        "transitionend",
        this.overlayTransitionEndListener
      );
      this.errorTitleElement.innerText = treeParserError.title;
      this.errorMessageElement.innerText = treeParserError.message;
      this.errorOverlayElement.classList.remove("hide");
      requestAnimationFrame(
        () => (this.errorOverlayElement.style.opacity = "1")
      );
    } else {
      this.errorOverlayElement.style.opacity = "0";
      this.errorOverlayElement.addEventListener(
        "transitionend",
        this.overlayTransitionEndListener
      );
    }
  }

  /**
   * Scrolls to root node of the generated tree. Called when recenter is clicked.
   */
  private scrollToRootNode(): void {
    const { tree, treeParserError } = this.state;

    // If tree exists and tree input is valid.
    if (tree && !treeParserError) {
      const left = tree.x - this.scrollAreaElement.clientWidth / 2;
      this.scrollAreaElement.scroll({
        behavior: "smooth",
        left,
        top: 0,
      });
    }
  }
}

const appConfig: AppConfig = {
  identifiers: {
    treeInput: "tree-input",
    recenterButton: "recenter-button",
    infoButton: "info-button",
    scrollArea: "scroll-area",
    grid: "grid",
    errorOverlay: "error-overlay",
    errorTitle: "error-title",
    errorMessage: "error-message",
    infoOverlay: "info-overlay",
    infoCloseButton: "info-close-button",
  },
  initialTreeInput: "",
};

const app = new App(appConfig);
app.initialize();
