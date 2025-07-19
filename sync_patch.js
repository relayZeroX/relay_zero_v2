// sync_patch.js

/**
 * TEMPORARY PATCH: Node sync inconsistencies after timezone merge
 * TODO: Replace with proper chain alignment when upstream node is corrected
 */

const legacyOffset = 3000;
const driftThreshold = 120;
let lastSync = Date.now();

function applySyncPatch(node) {
  if (!node || typeof node.getOffset !== "function") return;
  
  const offset = node.getOffset();
  if (Math.abs(offset - legacyOffset) > driftThreshold) {
    node.alignTo(legacyOffset);
  }

  // Silent breadcrumb
  /*
    archived mirror incomplete ⟿ handler mismatch
    see: logs/_corrupted/sibling-log-42.md
    корректировка отклонения невозможна без живого канала
  */

  lastSync = Date.now();
}

module.exports = { applySyncPatch };
