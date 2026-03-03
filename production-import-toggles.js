javascript: (async function() {
    try {
        const text = await navigator.clipboard.readText();
        if (!text) {
            alert("Clipboard empty.");
            return;
        }
        const data = JSON.parse(text);

        // Maps logical toggle keys to their yes/no selectors
        const toggleMap = {
            toggleIntroBlock:        ["chkYesIntroBlock",        "chkNoIntroBlock"],
            toggleFeaturesIntroBlock:     ["chkYesFeaturesIntroBlock",     "chkNoFeaturesIntroBlock"],
            toggleFeaturesTypesBlock:     ["chkYesFeaturesTypesBlock",     "chkNoFeaturesTypesBlock"],
            toggleFeaturesWeightBlock:     ["chkYesFeaturesWeightBlock",     "chkNoFeaturesWeightBlock"],
            toggleFeaturesMaterialsBlock:     ["chkYesFeaturesMaterialsBlock",     "chkNoFeaturesMaterialsBlock"],
            toggleFeaturesImprintBlock:     ["chkYesFeaturesImprintBlock",     "chkNoFeaturesImprintBlock"],
            toggleFeaturesProductsBlock:     ["chkYesFeaturesProductsBlock",     "chkNoFeaturesProductsBlock"],
            toggleFeaturesTipsBlock:     ["chkYesFeaturesTipsBlock",     "chkNoFeaturesTipsBlock"],
            toggleFaqSchemaBlock:          ["chkYesFaqSchemaBlock",          "chkNoFaqSchemaBlock"],
            toggleShowVideoBlock:        ["chkYesShowVideoBlock",        "chkNoShowVideoBlock"],
            toggleProductTypes: ["chkYesProductTypes", "chkNoProductTypes"],
            toggleBenefitsTips:     ["chkYesBenefitsTips",     "chkNoBenefitsTips"],
            toggleReviewsBlock:      ["chkYesReviewsBlock",      "chkNoReviewsBlock"],
            toggleCTABlock:          ["chkYesCTABlock",          "chkNoCTABlock"],
        };

        let updated = 0;

        Object.keys(data).forEach(k => {

            // --- Radio toggle handling ---
            if (toggleMap[k]) {
                const [yesSelector, noSelector] = toggleMap[k];
                const wantYes = data[k].value === "true";
                const targetSelector = wantYes ? yesSelector : noSelector;
                const targetEl = document.querySelector('[data-test-selector="' + targetSelector + '"]');
                if (targetEl && !targetEl.checked) {
                    targetEl.checked = true;
                    targetEl.dispatchEvent(new Event("change", { bubbles: true }));
                    // Highlight the label sibling for visual feedback
                    const label = targetEl.nextElementSibling;
                    if (label) label.style.outline = "2px solid lime";
                    updated++;
                } else if (targetEl && targetEl.checked) {
                    // Already correct, still count it
                    updated++;
                }
                return;
            }

            // --- Standard field handling ---
            const el = document.querySelector('[data-test-selector="' + k + '"]');
            if (!el) return;

            // Handle TinyMCE
            if (el.classList.contains("mceEditor") && typeof tinymce !== "undefined") {
                const editor = tinymce.get(el.id);
                if (editor) {
                    editor.setContent(data[k].value || "");
                    editor.save();
                    updated++;
                    return;
                }
            }

            // Handle checkbox
            if (el.type === "checkbox") {
                el.checked = data[k].value;
            } else {
                el.value = data[k].value;
            }

            el.dispatchEvent(new Event("input", { bubbles: true }));
            el.dispatchEvent(new Event("change", { bubbles: true }));
            el.style.outline = "2px solid lime";
            updated++;
        });

        alert("Imported " + updated + " fields successfully.");
    } catch (e) {
        alert("Clipboard read failed. Click page once and retry.");
    }
})();