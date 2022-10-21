// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"5Pxls":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "dfc838fc75320e57";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"jyKRr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/** Driver class for the application. */ parcelHelpers.export(exports, "App", ()=>App);
var _utils = require("./utils");
// Border bottom styles based on tree input.
const TREE_INPUT_NEUTRAL_BORDER_BOTTOM = "2px solid white";
const TREE_INPUT_VALID_BORDER_BOTTOM = "2px solid lightgreen";
const TREE_INPUT_INVALID_BORDER_BOTTOM = "2px solid orangered";
// SVG line properties
const LINE_COLOR = "#fff9";
const LINE_THICKNESS = "2";
// Base size of the node div in scroll area.
const NODE_SIZE = 60;
const defaultAppState = {
    treeInput: "",
    tree: null,
    treeParserError: null,
    scrollAreaSize: {
        width: 0,
        height: 0
    }
};
class App {
    /**
   * Creates a new instance of the application.
   * @param config Application configuration to use.
   */ constructor(config){
        // Assign elements
        this.treeInputElement = document.getElementById(config.identifiers.treeInput);
        this.recenterButtonElement = document.getElementById(config.identifiers.recenterButton);
        this.infoButtonElement = document.getElementById(config.identifiers.infoButton);
        this.scrollAreaElement = document.getElementById(config.identifiers.scrollArea);
        this.gridElement = document.getElementById(config.identifiers.grid);
        this.errorOverlayElement = document.getElementById(config.identifiers.errorOverlay);
        this.errorTitleElement = document.getElementById(config.identifiers.errorTitle);
        this.errorMessageElement = document.getElementById(config.identifiers.errorMessage);
        this.infoOverlayElement = document.getElementById(config.identifiers.infoOverlay);
        this.infoCloseButtonElement = document.getElementById(config.identifiers.infoCloseButton);
        this.infoCardBodyElement = document.getElementById(config.identifiers.infoCardBody);
        // Initial state
        this.initialTreeInput = config.initialTreeInput;
        this.state = {
            ...defaultAppState
        };
    }
    /**
   * Initialize app by assigning appropriate listeners and reflecting the initial state.
   */ initialize() {
        this.treeInputElement.value = this.initialTreeInput;
        this.treeInputElement.focus();
        this.treeInputElement.addEventListener("input", this.onTreeInputChanged.bind(this));
        this.recenterButtonElement.addEventListener("click", this.scrollToRootNode.bind(this));
        this.infoButtonElement.addEventListener("click", this.onClickInfo.bind(this));
        this.infoCloseButtonElement.addEventListener("click", this.onCloseInfo.bind(this));
        this.updateState(this.initialTreeInput);
        this.updateUI();
    }
    /**
   * A helper method to disable overlays with smooth transitions.
   * @param evt Disable overlays when they are done transitioning.
   */ overlayTransitionEndListener(evt) {
        evt.target.classList.add("hide");
    }
    /**
   * When the info button is clicked.
   */ onClickInfo() {
        this.infoOverlayElement.removeEventListener("transitionend", this.overlayTransitionEndListener);
        this.infoOverlayElement.classList.remove("hide");
        requestAnimationFrame(()=>{
            this.infoOverlayElement.style.opacity = "1";
            // Scroll the info body to top.
            this.infoCardBodyElement.scrollTo({
                top: 0
            });
        });
    }
    /**
   * When the info overlay is closed using the close button.
   */ onCloseInfo() {
        this.infoOverlayElement.style.opacity = "0";
        this.infoOverlayElement.addEventListener("transitionend", this.overlayTransitionEndListener);
    }
    /**
   * When tree input changes.
   * @param evt Current change event.
   */ onTreeInputChanged(evt) {
        const treeInput = evt.target.value;
        this.updateState(treeInput);
        this.updateUI();
    }
    /**
   * Updates the state of the application based on the tree input provided.
   * @param treeInput The tree input to use to update the state of the application.
   */ updateState(treeInput) {
        let tree = this.state.tree;
        let scrollAreaSize = this.state.scrollAreaSize;
        let treeParserError = null;
        try {
            tree = (0, _utils.TreeParser).parseTree(treeInput);
            scrollAreaSize = (0, _utils.TreeParser).calculateScrollAreaSize(tree);
        } catch (err) {
            treeParserError = err;
        }
        this.state = {
            treeInput,
            treeParserError,
            tree,
            scrollAreaSize
        };
    }
    /**
   * Update different UI Elements.
   */ updateUI() {
        this.updateInspectorUI();
        this.updateGridElementUI();
        this.updateErrorElementsUI();
    }
    /**
   * Update the inspector UI
   */ updateInspectorUI() {
        const { treeInput , treeParserError  } = this.state;
        // Change the border color based on error state.
        if (!treeInput.trim()) this.treeInputElement.style.borderBottom = TREE_INPUT_NEUTRAL_BORDER_BOTTOM;
        else if (treeParserError) this.treeInputElement.style.borderBottom = TREE_INPUT_INVALID_BORDER_BOTTOM;
        else this.treeInputElement.style.borderBottom = TREE_INPUT_VALID_BORDER_BOTTOM;
        // Enable/Disable recenter button based on the error state.
        if (treeParserError) this.recenterButtonElement.disabled = true;
        else this.recenterButtonElement.disabled = false;
    }
    /**
   * Updates the grid area size to enable scrolling.
   */ updateGridElementUI() {
        const { scrollAreaSize , tree  } = this.state;
        this.gridElement.style.width = `max(100%, ${scrollAreaSize.width}px)`;
        this.gridElement.style.height = `max(100%, ${scrollAreaSize.height}px)`;
        this.gridElement.replaceChildren();
        this.createTreeUI(tree);
    }
    /**
   * Creates the DOM elements to render the tree.
   * @param root The root node of the tree
   */ createTreeUI(root) {
        if (root === null) return;
        this.createTreeNodeElement(root);
        this.createLineElements(root);
        this.createTreeUI(root.left);
        this.createTreeUI(root.right);
    }
    /**
   * Converts tree nodes to DOM elements recursively.
   * @param root The root node of the tree.
   */ createTreeNodeElement(root) {
        const rootElement = document.createElement("div");
        rootElement.classList.add("node");
        // If leaf node.
        if (root.left === null && root.right === null) rootElement.classList.add("leaf");
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
   */ createLineElements(root) {
        // Common properties between left and right directed lines.
        const createTemplateLineElements = ()=>{
            const lineSvgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            lineSvgNode.classList.add("line");
            lineSvgNode.style.top = root.y + "px";
            const lineNode = document.createElementNS("http://www.w3.org/2000/svg", "line");
            lineNode.setAttributeNS(null, "stroke", LINE_COLOR);
            lineNode.setAttributeNS(null, "stroke-width", LINE_THICKNESS);
            lineNode.setAttributeNS(null, "y1", "0%");
            lineNode.setAttributeNS(null, "y2", "100%");
            lineSvgNode.appendChild(lineNode);
            this.gridElement.appendChild(lineSvgNode);
            return {
                lineSvgNode,
                lineNode
            };
        };
        if (root.left) {
            const { lineSvgNode , lineNode  } = createTemplateLineElements();
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
            const { lineSvgNode: lineSvgNode1 , lineNode: lineNode1  } = createTemplateLineElements();
            const width1 = root.right.x - root.x;
            const height1 = root.right.y - root.y;
            lineSvgNode1.setAttributeNS(null, "viewBox", `0 0 ${width1} ${height1}`);
            lineSvgNode1.style.width = width1 + "px";
            lineSvgNode1.style.height = height1 + "px";
            lineSvgNode1.style.left = root.x + "px";
            // Facing right
            lineNode1.setAttributeNS(null, "x1", "0%");
            lineNode1.setAttributeNS(null, "x2", "100%");
        }
    }
    /**
   * Update the error overlay to show errors if any.
   */ updateErrorElementsUI() {
        const { treeParserError  } = this.state;
        if (treeParserError) {
            this.errorOverlayElement.removeEventListener("transitionend", this.overlayTransitionEndListener);
            this.errorTitleElement.innerText = treeParserError.title;
            this.errorMessageElement.innerText = treeParserError.message;
            this.errorOverlayElement.classList.remove("hide");
            requestAnimationFrame(()=>this.errorOverlayElement.style.opacity = "1");
        } else {
            this.errorOverlayElement.style.opacity = "0";
            this.errorOverlayElement.addEventListener("transitionend", this.overlayTransitionEndListener);
        }
    }
    /**
   * Scrolls to root node of the generated tree. Called when recenter is clicked.
   */ scrollToRootNode() {
        const { tree , treeParserError  } = this.state;
        // If tree exists and tree input is valid.
        if (tree && !treeParserError) {
            const left = tree.x - this.scrollAreaElement.clientWidth / 2;
            this.scrollAreaElement.scroll({
                behavior: "smooth",
                left,
                top: 0
            });
        }
    }
}
const appConfig = {
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
        infoCardBody: "info-card-body"
    },
    initialTreeInput: ""
};
const app = new App(appConfig);
app.initialize();
// Log github link.
console.log("%cGithub Project Link: https://github.com/kay-af/binary-tree-visualization\nPlease leave a ⭐️ if you like my work!", "background: whitesmoke; color: black; border: 1px dashed black; font-weight: bold; font-size: larger; padding: 8px 16px; margin: 4px 0px;");

},{"./utils":"hEXdO","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hEXdO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TreeNode", ()=>(0, _treeNode.TreeNode));
parcelHelpers.export(exports, "TreeParser", ()=>(0, _treeParser.TreeParser));
parcelHelpers.export(exports, "TreeParserError", ()=>(0, _treeParser.TreeParserError));
var _treeNode = require("./tree-node");
var _treeParser = require("./tree-parser");

},{"./tree-node":"iFkuB","./tree-parser":"4ji4Z","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iFkuB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Definition of a tree node that makes up a binary tree.
 */ parcelHelpers.export(exports, "TreeNode", ()=>TreeNode);
class TreeNode {
    /**
   * Creates a new tree node with given value.
   * @param value Integer value of the node.
   */ constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"4ji4Z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/** Represents errors related to tree input. */ parcelHelpers.export(exports, "TreeParserError", ()=>TreeParserError);
/** Provides utils to create the binary tree */ parcelHelpers.export(exports, "TreeParser", ()=>TreeParser);
var _treeNode = require("./tree-node");
// Matches more than one space character.
const REGEX_ONE_OR_MORE_SPACES = /\s+/g;
// The x scaling space out nodes in scroll area.
const X_MULTIPLIER = 120;
// The y scaling to space out nodes in scroll area.
const Y_MULTIPLIER = 120;
// The padding to use in scroll area after creating the tree.
const SCROLL_AREA_PADDING = 120;
class TreeParserError {
    /**
   * Creates a new instance.
   * @param title Title of the error.
   * @param message Message of the error.
   */ constructor(title, message){
        this.title = title;
        this.message = message;
    }
}
class TreeParser {
    /**
   * Create a binary tree from the tree input representation.
   * @param treeInput The tree input string.
   * @returns Root node of the tree.
   */ static parseTree(treeInput) {
        const values = this.parseValues(treeInput);
        const root = this.parseTreeHelper(values);
        const xMemo = new Map();
        this.assignRawNodePositions(root, 0, xMemo, this.calculateHeight(root));
        this.transformNodePositions(root);
        return root;
    }
    /**
   * Checks if the given value consists of only digits (Negative integers allowed).
   * @param value To value to check.
   * @returns Is a valid integer string.
   */ static isValidInteger(value) {
        if (value.length === 0) return false;
        if (value.length === 1 && value[0] === "-") return false;
        let minus = 0;
        for(let i = 0; i < value.length; i++)if (value[i] < "0" || value[i] > "9") {
            if (value[i] === "-") minus++;
            else return false;
        }
        if (minus > 1) return false;
        if (minus === 1 && value[0] !== "-") return false;
        return true;
    }
    /**
   * Converts tree input to values with integer or null.
   * @param treeInput The input string.
   * @returns The values list.
   */ static parseValues(treeInput) {
        treeInput = treeInput.trim();
        treeInput = treeInput.replace(REGEX_ONE_OR_MORE_SPACES, " ");
        if (treeInput.length === 0) return [];
        let tokens = treeInput.split(" ");
        const nodeValues = tokens.map((token)=>{
            if (token.toUpperCase() === "N") return null;
            // Check if the integer is valid.
            if (!this.isValidInteger(token)) throw new TreeParserError("Invalid Input", "Tree input shall consist of either numbers or the character 'N' (Case-insensitive) indicating a node with null value.");
            const value = Number.parseInt(token);
            // Check range.
            if (!Number.isFinite(value) || value > Math.pow(2, 31) - 1 || value < -Math.pow(2, 31)) throw new TreeParserError("Invalid Input", "Only 32-bit signed integers are supported.");
            return value;
        });
        return nodeValues;
    }
    /**
   * Calculates the size of the scroll area needed to accomodate the given tree.
   * @param tree The tree to accomodate.
   * @returns Size of the scroll area needed.
   */ static calculateScrollAreaSize(tree) {
        const bounds = {
            width: 0,
            height: 0
        };
        this.scrollAreaSizeHelper(tree, bounds);
        return bounds;
    }
    /**
   * Helper method for parsing the tree.
   * @param values Values list.
   * @returns The root node of the parsed tree.
   */ static parseTreeHelper(values) {
        const n = values.length;
        if (n === 0) return null;
        if (values[0] === null) return null;
        let pointer = 1;
        const root = new (0, _treeNode.TreeNode)(values[0]);
        const queue = [
            root
        ];
        // Level order traversal to create nodes iteratively.
        while(queue.length > 0 && pointer < n){
            const current = queue.shift();
            if (pointer < n && values[pointer] !== null) {
                current.left = new (0, _treeNode.TreeNode)(values[pointer]);
                queue.push(current.left);
            }
            pointer += 1;
            if (pointer < n && values[pointer] !== null) {
                current.right = new (0, _treeNode.TreeNode)(values[pointer]);
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
   */ static assignRawNodePositions(root, i, xMemo, height) {
        if (root === null) return;
        root.x = this.calculateX(i, height, xMemo);
        root.y = this.calculateY(i);
        this.assignRawNodePositions(root.left, i * 2 + 1, xMemo, height);
        this.assignRawNodePositions(root.right, i * 2 + 2, xMemo, height);
    }
    /**
   * Transforms the node positions of the given tree to fit the scroll area.
   * @param root The root node of the tree.
   */ static transformNodePositions(root) {
        const result = {
            node: null
        };
        this.getLeftmostNode(root, result);
        const { node: leftmost  } = result;
        if (!leftmost) return;
        this.transformNodePositionsHelper(root, leftmost.x);
    }
    /**
   * Get the leftmost node of the tree after the raw positions have been calculated.
   * @param root The root node of the tree.
   * @param result Reference to the object carrying the result.
   */ static getLeftmostNode(root, result) {
        if (!root) return;
        this.getLeftmostNode(root.left, result);
        this.getLeftmostNode(root.right, result);
        if (root.x < (result.node?.x ?? Number.POSITIVE_INFINITY)) result.node = root;
    }
    /**
   * Helper method to transform node positions.
   * @param root The root node of the tree.
   * @param xOffset The offset to subtract from the x value of each node.
   */ static transformNodePositionsHelper(root, xOffset) {
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
   */ static calculateHeight(root) {
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
   */ static calculateX(i, height, xMemo) {
        if (xMemo.has(i)) return xMemo.get(i);
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
        return xMemo.get(i);
    }
    /**
   * Calculates the raw y position of a node.
   * @param i Index of the node in the array as per the fully-complete representation of the binary tree.
   * @returns The raw y position.
   */ static calculateY(i) {
        i = i + 1;
        let y = 0;
        while(i > 0){
            i = i >> 1;
            y += 1;
        }
        return y - 1;
    }
    /**
   * Helper method to calculate scroll area size.
   * @param root The root node of the tree.
   * @param size Reference to the size storing the result.
   */ static scrollAreaSizeHelper(root, size) {
        if (root !== null) {
            // Find the rightmost node.
            size.width = Math.max(size.width, root.x + SCROLL_AREA_PADDING);
            size.height = Math.max(size.height, root.y + SCROLL_AREA_PADDING);
            this.scrollAreaSizeHelper(root.left, size);
            this.scrollAreaSizeHelper(root.right, size);
        }
    }
}

},{"./tree-node":"iFkuB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["5Pxls","jyKRr"], "jyKRr", "parcelRequiree10c")

//# sourceMappingURL=index.75320e57.js.map
