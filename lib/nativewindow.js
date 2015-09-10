const data = require('sdk/self').data;
const utils = require('sdk/window/utils');
const recent = utils.getMostRecentBrowserWindow();


/**
 * opts: an options object that includes a name, an image and a callback.
 * note: the image can only be a file or data uri, see bug 802003
 */
function addMenu(opts) {
  let icon = opts.icon || null;
  return recent.NativeWindow.menu.add(opts.label, icon, opts.callback);
}

exports.addMenu = addMenu;

/**
 * opts: an options object that includes a name, an image and a callback.
 * note: the image can only be a file or data uri, see bug 802003
 */
function addToolMenu(opts) {
  let icon = opts.icon || null;
  return recent.NativeWindow.menu.add({
    name: opts.label,
    icon: icon,
    callback: opts.callback,
    parent: recent.NativeWindow.menu.toolsMenuID});
}

exports.addToolMenu = addToolMenu;

/**
 * menuId: the menuId of the context menu entry to be removed
 */
function removeMenu(menuId) {
  recent.NativeWindow.menu.remove(menuId);
}

exports.removeMenu = removeMenu;

/**  
 * default context objects for contextmenus.
 * for docs: https://developer.mozilla.org/en-US/docs/Extensions/Mobile/API/NativeWindow/contextmenus/add
 */
exports.defaultContext = {
  matches: function(el) { return true; }
}

exports.textContext = recent.NativeWindow.contextmenus.textContext;
exports.SelectorContext = recent.NativeWindow.contextmenus.SelectorContext;
exports.linkBookmarkableContext = recent.NativeWindow.contextmenus.linkBookmarkableContext;
exports.linkShareableContext = recent.NativeWindow.contextmenus.linkShareableContext;
exports.linkOpenableContext = recent.NativeWindow.contextmenus.linkOpenableContext;
exports.imageSaveableContext = recent.NativeWindow.contextmenus.imageSaveableContext;

/**  
 * opts: an options object that includes a name, a context and a callback.
 */
function addContextMenu(opts) {
  return recent.NativeWindow.contextmenus.add(
    opts.name, 
    opts.context,
    opts.callback
  );
}

exports.addContextMenu = addContextMenu;

/**  
 * menuId: the menuId of the context menu entry to be removed
 */
function removeContextMenu(menuId) {
  recent.NativeWindow.contextmenus.remove(menuId);
}

exports.removeContextMenu = removeContextMenu;

/**  
 * show an android toast. Not particularly useful except for
 * in-app notifications or debugging messages?
 */
function showToast(opts) {
  let duration = opts.duration || 'short';
  recent.NativeWindow.toast.show(opts.message, duration);
}

exports.showToast = showToast;
