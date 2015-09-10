/**  
 * attempts to delete cert_override.txt from your current profile directory
 */
const { Cu } = require("chrome");
let FileUtils = Cu.import("resource://gre/modules/FileUtils.jsm").FileUtils;

const { data, loadReason } = require("sdk/self");
const nw = require('./nativewindow');
const _ = require("sdk/l10n").get;


var removeCertOverridesId = nw.addToolMenu({
  label: _('removecertoverrides_id'),
  callback: function() {
    cleanupFile(FileUtils.getFile("ProfD", ["cert_override.txt"], false));
    nw.showToast({
      message: _('removecertoverrides_toast_id'),
      duration: 'long'});
  }
});

function handleUnload (reason) {
  if (reason !== 'shutdown') {
    nw.removeMenu(removeCertOverridesId);
  }
};

exports.onUnload = handleUnload;

function cleanupFile(aFile) {
  try {
    aFile.remove(true);
  } catch(e) {}
};