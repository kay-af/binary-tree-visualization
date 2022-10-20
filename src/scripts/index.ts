import { Size, TreeNode, TreeParser, TreeParserError } from "./utils";

const TREE_INPUT_NEUTRAL_BORDER_BOTTOM = "2px solid white";
const TREE_INPUT_VALID_BORDER_BOTTOM = "2px solid lightgreen";
const TREE_INPUT_INVALID_BORDER_BOTTOM = "2px solid orangered";
const NODE_SIZE = 80;

interface AppConfig {
  identifiers: {
    treeInput: string;
    scrollArea: string;
    grid: string;
    errorOverlay: string;
    errorTitle: string;
    errorMessage: string;
  };
  initialTreeInput: string;
}

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

export class App {
  private readonly treeInputElement: HTMLInputElement;
  private readonly scrollAreaElement: HTMLDivElement;
  private readonly gridElement: HTMLDivElement;
  private readonly errorOverlayElement: HTMLDivElement;
  private readonly errorTitleElement: HTMLParagraphElement;
  private readonly errorMessageElement: HTMLParagraphElement;

  private initialTreeInput: string;
  private state: AppState;

  public constructor(config: AppConfig) {
    // Assign elements
    this.treeInputElement = document.getElementById(
      config.identifiers.treeInput
    ) as HTMLInputElement;
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

    // Initial state
    this.initialTreeInput = config.initialTreeInput;
    this.state = {
      ...defaultAppState,
    };
  }

  public initialize(): void {
    this.treeInputElement.value = this.initialTreeInput;
    this.treeInputElement.addEventListener(
      "input",
      this.onTreeInputChanged.bind(this)
    );
    this.updateState(this.initialTreeInput);
    this.updateUI();
  }

  private onTreeInputChanged(evt: Event): void {
    const treeInput = (evt.target as HTMLInputElement).value;
    this.updateState(treeInput);
    this.updateUI();
  }

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

  private updateUI(): void {
    this.updateTreeInputElementUI();
    this.updateGridElementUI();
    this.updateErrorElementsUI();
    this.scrollToRootNode();
  }

  private updateTreeInputElementUI() {
    const { treeInput, treeParserError } = this.state;

    if (!treeInput.trim()) {
      this.treeInputElement.style.borderBottom =
        TREE_INPUT_NEUTRAL_BORDER_BOTTOM;
    } else if (treeParserError) {
      this.treeInputElement.style.borderBottom =
        TREE_INPUT_INVALID_BORDER_BOTTOM;
    } else {
      this.treeInputElement.style.borderBottom = TREE_INPUT_VALID_BORDER_BOTTOM;
    }
  }

  private updateGridElementUI() {
    const { scrollAreaSize, tree } = this.state;

    this.gridElement.style.width = `max(100%, ${scrollAreaSize.width}px)`;
    this.gridElement.style.height = `max(100%, ${scrollAreaSize.height}px)`;
    this.gridElement.replaceChildren();

    this.createTreeUI(tree);
  }

  private createTreeUI(root: TreeNode | null): void {
    if (root === null) return;

    this.createTreeNodeElement(root);
    this.createLineElements(root);

    this.createTreeUI(root.left);
    this.createTreeUI(root.right);
  }

  private createTreeNodeElement(root: TreeNode): void {
    const rootElement = document.createElement("div");
    rootElement.classList.add("node");
    if (root.left === null && root.right === null) {
      rootElement.classList.add("leaf");
    }
    rootElement.style.width = NODE_SIZE + "px";
    rootElement.style.height = NODE_SIZE + "px";
    rootElement.style.left = root.x - NODE_SIZE / 2 + "px";
    rootElement.style.top = root.y - NODE_SIZE / 2 + "px";

    const pElement = document.createElement("p");
    pElement.innerText = root.value.toString();

    rootElement.appendChild(pElement);
    this.gridElement.appendChild(rootElement);
  }

  private createLineElements(root: TreeNode): void {
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
      lineNode.setAttributeNS(null, "stroke", "white");
      lineNode.setAttributeNS(null, "stroke-width", "2");
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
      lineNode.setAttributeNS(null, "x1", "0%");
      lineNode.setAttributeNS(null, "x2", "100%");
    }
  }

  private updateErrorElementsUI(): void {
    const { treeParserError } = this.state;
    if (treeParserError) {
      this.errorOverlayElement.removeEventListener(
        "transitionend",
        this.errorOverlayTransitionEndListener
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
        this.errorOverlayTransitionEndListener
      );
    }
  }

  private errorOverlayTransitionEndListener(evt: TransitionEvent) {
    (evt.target as HTMLDivElement).classList.add("hide");
  }

  private scrollToRootNode(): void {
    const { tree } = this.state;
    if (tree) {
      const left = tree.x - this.scrollAreaElement.clientWidth / 2;
      this.scrollAreaElement.scrollTo({
        behavior: "auto",
        left,
        top: 0,
      });
    }
  }
}

const appConfig: AppConfig = {
  identifiers: {
    treeInput: "tree-input",
    scrollArea: "scroll-area",
    grid: "grid",
    errorOverlay: "error-overlay",
    errorTitle: "error-title",
    errorMessage: "error-message",
  },
  initialTreeInput: "",
};

const app = new App(appConfig);
app.initialize();
